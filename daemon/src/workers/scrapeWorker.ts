const { parentPort, workerData } = require("worker_threads")

import Common from "../utilities/common";
import ScrapeJobRepository from "../repositories/scrapeJobRepository"
import IndexJobRepository from "../repositories/indexJobRepository"
import ImageService from "../services/imageService"
import IIndexJobModel from "../models/interfaces/I_indexJobModel";

var scrapeJobRepository = new ScrapeJobRepository()
var indexJobRepository = new IndexJobRepository()
var imageService = new ImageService()


const createIndexJob = (id) => {
    console.log("Creating index job")
    var indexJob = <IIndexJobModel>{
        scrapeJobId: id
    }

    indexJobRepository.create(indexJob, (err, res) => {
        if (!err) {
            console.log("Created index job")
        } else {
            console.log(err)
        }
    })
}

parentPort.on("message", async (sleepOffset: number) => {

    await Common.sleep(sleepOffset)

    //loop will be exited by parent thread pool
    while (true) {
        
        //scrape jobs show be done synchronously and scale horizontally via threadpooling
        try {
            var job = await scrapeJobRepository.getOutstandingJob()

            if (job) {
                await scrapeJobRepository.markJobAsProcessing(job)

                const start = Date.now()
                console.log("started scrape")
                const scrapeJS = await imageService.scrapeBase64ImageWithWorker(job.pageBytes)
                const scrapeCMD = await imageService.scrapeBase64ImageUsingCmd(job.pageBytes)
                console.log("finished scrape")
                const end = Date.now()

                console.log("scrape time - " + (Math.abs(end - start) / 1000) + " seconds")

                job.scrapeData = scrapeJS.scrapeData + " <-----------> " + scrapeCMD.scrapeData
                job.scrapeConfidence = scrapeJS.scrapeConfidence
                job.scrapeTsv = scrapeJS.scrapeTsv
                job.scrapeHocr = scrapeJS.scrapeHocr
                job.scrapePdf = scrapeJS.scrapePdf

                createIndexJob(job.id)

                await scrapeJobRepository.closeJob(job)
            }
        }
        catch (err) {
            console.log(err)
        }

        await Common.sleep(10000)
    }
})