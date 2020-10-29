var graph = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');

import OutlookEmailLogRepository from "../repositories/outlookEmailLogRepository"
import OutlookAttachmentLogRepository from "../repositories/outlookAttachmentLogRepository"
import ConvertJobRepository from "../repositories/convertJobRepository"
import IOutlookEmailLogModel from "../models/interfaces/I_outlookEmailLogModel";
import IOutlookAttachmentLogModel from "../models/interfaces/I_outlookAttachmentLogModel";
import { EventDispatcher } from "event-dispatch";
import Constants from "../config/constants";
import Common from "../utilities/common";
import IConvertJobModel from "../models/interfaces/I_convertJobModel";
import crypto from 'crypto';
import { Inject } from "typedi";
import TokenService from "./tokenService";

export default class OutlookService {

    @Inject()
    private tokenService!: TokenService

    @Inject()
    private outlookEmailLogRepository!: OutlookEmailLogRepository

    @Inject()
    private outlookAttachmentLogRepository!: OutlookAttachmentLogRepository

    @Inject()
    private convertJobRepository!: ConvertJobRepository

    private eventDispatcher: EventDispatcher

    //constructor injection because we cant use DI in threads
    constructor() {

        //create the event dispatcher for the save events
        this.eventDispatcher = new EventDispatcher()
        this.setupEventDispatcher()

        //use the tokenservice to manage tokens
        if (!this.tokenService) {
            this.tokenService = new TokenService()
        }

        if (!this.outlookEmailLogRepository) {
            this.outlookEmailLogRepository = new OutlookEmailLogRepository()
        }

        if (!this.outlookAttachmentLogRepository) {
            this.outlookAttachmentLogRepository = new OutlookAttachmentLogRepository()
        }

        if (!this.convertJobRepository) {
            this.convertJobRepository = new ConvertJobRepository()
        }
    }

    //returns the promises to obtain the list of emaillogs
    getLatestEmails(top: number) {

        this.tokenService.getToken((err, token) => {
            if (!err && token) {
                // Initialize Graph client
                var client = graph.Client.init({
                    // Use the provided access token to authenticate
                    // requests
                    authProvider: (done) => {
                        done(null, token);
                    }
                })

                client.api("/users/" + this.tokenService.getUser() + "/mailFolders('Inbox')/messages")
                    .orderby("hasAttachments, createdDateTime DESC")
                    .select("id, receivedDateTime, subject, webLink")
                    .filter("hasAttachments eq true and createdDateTime ge 1900-01-01T00:00:00Z")
                    .expand("attachments($select=id,contentType,size)")
                    .top(top)
                    .get()
                    .then(async res => {

                        var values = await Promise.all(res.value.map(obj => {

                            var email = <IOutlookEmailLogModel>{
                                apiResponseJson: JSON.stringify(res),
                                apiResponseEmailId: obj.id,
                                apiResponseSubject: obj.subject,
                                apiResponseWebLink: obj.webLink,
                                apiResponseRecievedDateTime: obj.receivedDateTime,
                                apiResponseAttachmentIds: obj.attachments.map(att => {

                                //filter on files type and size
                                if (process.env.ATTACHMENT_FILE_TYPES?.split("|").includes(att.contentType) && 
                                    att.size < Number(process.env.ATTACHMENT_MAX_SIZE)) { 
                                   return att.id
                                }

                                }).filter(id => id)
                            }

                            return email
                        }))

                        return values
                    })
                    .then(emailLogs => {
                        //outer resolve for the caller
                        //return a new promise array, for the parent caller to then loop through
                        emailLogs.map(emailLog => {
                            this.outlookEmailLogRepository.getOutlookLogByEmailId(emailLog.apiResponseEmailId)
                                .then(exists => {
                                    if (!exists) {
                                        this.outlookEmailLogRepository.create(emailLog, (err, doc) => {
                                            if (err) {
                                                console.log(err)
                                            } else {
                                                this.eventDispatcher.dispatch("onSavedEmail", doc)
                                            }
                                        })
                                    }
                                })
                        })

                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } else {
                console.log(err)
            }
        })
    }

    getAttachmentByEmailAndAttachmentId(email: IOutlookEmailLogModel, aid: string) {

        const attQuery = "/users/" + this.tokenService.getUser() + "/mailFolders('Inbox')/messages/" + email.apiResponseEmailId + "/attachments/" + aid

        this.tokenService.getToken((err, token) => {

            if (!err && token) {
                // Initialize Graph client
                var client = graph.Client.init({
                    // Use the provided access token to authenticate
                    // requests
                    authProvider: (done) => {
                        done(null, token);
                    }
                })

                client.api(attQuery)
                    .filter("")
                    .get()
                    .then(res => {

                        var outlookAttachmentLogModel = <IOutlookAttachmentLogModel>{
                            emailLogId: email.id,
                            apiRequest: attQuery,
                            apiResponseContentBytes: res.contentBytes,
                            apiResponseContentId: res.contentId,
                            apiResponseContentType: res.contentType,
                            apiResponseName: res.name,
                            apiResponseSize: res.size
                        }

                        this.outlookAttachmentLogRepository.create(outlookAttachmentLogModel, (err, doc) => {
                            if (err) {
                                console.log(err)
                            } else {
                                this.eventDispatcher.dispatch("onSavedAttachment", doc)
                            }
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } else {
                console.log(err)
            }
        })
    }

    private createConvertJob = (id) => {
        var convertJob = <IConvertJobModel>{
            outlookLogId: id
        }

        this.convertJobRepository.create(convertJob, (err, res) => {
            if (err) {
                console.log(err)
            }
        })
    }

    private saveAttachment = (contentBytes): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            try {
                var md5sum = crypto.createHash('md5');

                //calculate hash for filename
                const hash = md5sum.update(contentBytes).digest("hex")
                const filePath = Constants.SAVE_PATH + "/" + hash + ".pdf"

                Common.saveContentBytesToFile(contentBytes, filePath)
                    .then(saved => {
                        if (saved) {
                            resolve(hash)
                        } else {
                            reject("Could not save the file")
                        }
                    })
            } catch (err) {
                reject(err)
            }
        })
    }

    private setupEventDispatcher() {

        this.eventDispatcher.on("onSavedEmail", (email) => {
            console.log("Saved email: " + email.id);

            email.apiResponseAttachmentIds.map(attid => {
                console.log("Found attachments")
                this.getAttachmentByEmailAndAttachmentId(email, attid)
            })
        })

        this.eventDispatcher.on("onSavedAttachment", (attachment) => {
            console.log("Saved attachment: " + attachment.id);

            this.saveAttachment(attachment.apiResponseContentBytes)
                .then(() => {
                    this.createConvertJob(attachment.id)
                })
                .catch(err => {
                    console.log(err)
                })
        })
    }
}