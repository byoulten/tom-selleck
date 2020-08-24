const { parentPort, workerData } = require("worker_threads")

import Common from "../utilities/common"
import CleanJobRepository from "../repositories/cleanJobRepository"
import ConvertJobRepository from "../repositories/convertJobRepository";
import OutlookLogJobRepository from "../repositories/outlookAttachmentLogRepository";
import PdfService from "../services/pdfService"
import ICleanJobModel from "../models/interfaces/I_cleanJobModel"
import Constants from "../config/constants";
import crypto from 'crypto';

var cleanJobRepository = new CleanJobRepository()
var convertJobRepository = new ConvertJobRepository()
var outlookLogRepository = new OutlookLogJobRepository()
var pdfService = new PdfService()

const createCleanJob = (id, img) => {
    console.log("Creating clean job")
    var cleanJob = <ICleanJobModel>{
        convertJobId: id,
        pageBytes: img
    }

    cleanJobRepository.create(cleanJob, (err, res) => {
        if (!err) {
            console.log("Created clean job")
        } else {
            console.log(err)
        }
    })
}

const getFileName = (contentBytes): string => {
    var filePath = ''

    try {
        console.log("Saving attachment")
        var md5sum = crypto.createHash('md5');

        //calculate hash for filename
        const hash = md5sum.update(contentBytes).digest("hex")
        filePath = Constants.SAVE_PATH + "/" + hash + ".pdf"

    } catch (err) {
        console.log(err)
    }

    return filePath
}

parentPort.on("message", async (sleepOffset) => {

    await Common.sleep(sleepOffset)

    //loop will be exited by parent thread pool
    while (true) {
        
        try {
            convertJobRepository.getOutstandingJobs()
                .then(jobs => {
                    jobs.map(job => {
                        convertJobRepository.markJobAsProcessing(job)
                        outlookLogRepository.findById(job.outlookLogId, (err, log) => {
                            if (!err) {
                                const fileName = getFileName(log.apiResponseContentBytes)

                                pdfService.convertPdfToBase64(fileName)
                                    .then(imgs => {
                                        imgs.forEach(img => {
                                            createCleanJob(job.id, img)
                                        })
                                        
                                        job.pagesBytes = imgs
                                        convertJobRepository.closeJob(job)
                                    })
                                    .catch(err => {
                                        console.log(err)
                                    })
                                    .finally(() => {
                                        //clean up pdf
                                        Common.deleteFile(fileName)
                                    })
                            } else {
                                console.log("could not retrieve log for convert job")
                            }
                        })
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }
        catch (err) {
            console.log(err)
        }

        await Common.sleep(10000)
    }
})