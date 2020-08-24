const { parentPort, workerData } = require("worker_threads")

import Common from "../utilities/common";
import CleanJobRepository from "../repositories/cleanJobRepository"
import ScrapeJobRepository from "../repositories/scrapeJobRepository"
import ImageService from "../services/imageService"
import IScrapeJobModel from "../models/interfaces/I_scrapeJobModel";

var cleanJobRepository = new CleanJobRepository()
var scrapeJobRepository = new ScrapeJobRepository()
var imageService = new ImageService()

const createScrapeJob = (id, bytes) => {
    console.log("Creating scrape job")
    var scrapeJob = <IScrapeJobModel>{
        cleanJobId: id,
        pageBytes: bytes
    }

    scrapeJobRepository.create(scrapeJob, (err, res) => {
        if (!err) {
            console.log("Created scrape job")
        } else {
            console.log(err)
        }
    })
}

parentPort.on("message", async (sleepOffset) => {

    await Common.sleep(sleepOffset)

    //loop will be exited by parent thread pool
    while (true) {

        try {
            cleanJobRepository.getOutstandingJobs()
                .then(jobs => {
                    jobs.map(job => {
                        cleanJobRepository.markJobAsProcessing(job)
                        imageService.cleanBase64Image(job.pageBytes)
                        .then(img => {
                            createScrapeJob(job.id, img)
                            job.cleanedPageBytes = img
                            cleanJobRepository.closeJob(job)
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