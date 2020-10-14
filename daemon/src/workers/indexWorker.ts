const { parentPort, workerData } = require("worker_threads")

import Common from "../utilities/common";
import IndexService from "../services/indexService"
import IndexJobRepository from "../repositories/indexJobRepository"
import OutlookEmailLogRepository from "../repositories/outlookEmailLogRepository"
import OutlookAttachmentLogRepository from "../repositories/outlookAttachmentLogRepository"
import ScrapeJobRepository from "../repositories/scrapeJobRepository"
import ConvertJobRepository from "../repositories/convertJobRepository";
import CleanJobRepository from "../repositories/cleanJobRepository";
import ISolrModel from "../models/interfaces/I_solrModel";

var indexService = new IndexService()
var indexJobRepository = new IndexJobRepository()
var outlookEmailLogRepository = new OutlookEmailLogRepository()
var outlookAttachmentLogRepository = new OutlookAttachmentLogRepository()
var convertJobRepository = new ConvertJobRepository()
var cleanJobRepository = new CleanJobRepository()
var scrapeJobRepository = new ScrapeJobRepository()

parentPort.on("message", async (sleepOffset) => {

    await Common.sleep(sleepOffset)

    //loop will be exited by parent thread pool
    while (true) {

        try {
            indexJobRepository.getOutstandingJobs()
                .then(jobs => {
                    jobs.map(job => {
                        indexJobRepository.markJobAsProcessing(job)
                        .then(() => {

                            var solrDoc:ISolrModel = {
                                id: job.id,
                                webLink: "",
                                subject: "",
                                recievedDateTime: new Date(Date.now()),
                                attachmentThumbnail: "",
                                attachmentId: "",
                                scrapeConfidence: 0,
                                scrapeData: ""                            
                            }

                            scrapeJobRepository.findById(job.scrapeJobId, (err, scrapeJob) => {
                                solrDoc.scrapeConfidence = scrapeJob.scrapeConfidence
                                solrDoc.scrapeData = scrapeJob.scrapeData
                                console.log("scrape:" + scrapeJob.id)
                                cleanJobRepository.findById(scrapeJob.cleanJobId, (err, cleanJob) => {
                                    console.log("clean:" + cleanJob.id)
                                    convertJobRepository.findById(cleanJob.convertJobId, (err, convertJob) => {
                                        console.log("convert:" + convertJob.id)
                                        outlookAttachmentLogRepository.findById(convertJob.outlookLogId, (err, attLog) => {
                                            console.log("attLog:" + attLog.id)
                                            console.log("emailLogId:" + attLog.emailLogId)
                                            outlookEmailLogRepository.findById(attLog.emailLogId, (err, emailLog) => {
                                                console.log("emailLog:" + emailLog)
                                                solrDoc.subject = emailLog.apiResponseSubject
                                                solrDoc.webLink = emailLog.apiResponseWebLink
                                                solrDoc.recievedDateTime = new Date(emailLog.apiResponseRecievedDateTime)
                                                solrDoc.attachmentThumbnail = "./demo-thumbnail.png"
                                                solrDoc.attachmentId = scrapeJob.id.toString()
    
                                                indexService.addDocumentToSolrIndex(solrDoc).then(saved => {
                                                    if (saved) {
                                                        job.indexedDocument = solrDoc
                                                        indexJobRepository.closeJob(job)
                                                    } else {
                                                        console.log("Could not add document to the index: " + solrDoc)
                                                    }
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    })
                })
        }
        catch (err) {
            console.log(err)
        }

        await Common.sleep(10000)
    }
})