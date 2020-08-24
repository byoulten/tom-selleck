import "reflect-metadata"
import { Service } from "typedi"
import jimp from "jimp"
import ScrapeResult from "../models/scrapeResult"

const { createWorker } = require('tesseract.js');

@Service()
export default class ImageService {

    //clean the image
    cleanImage(serverFileUrl: string): Promise<string> {
        return new Promise((resolve, reject) => {
            jimp.read(serverFileUrl)
                .then(res => {
                    res.deflateStrategy(0)
                        .filterType(jimp.PNG_FILTER_NONE)
                        .colorType(0)
                        .getBase64Async(jimp.MIME_PNG)
                        .then(cleanedImg => {
                            resolve(cleanedImg)
                        })
                        .catch(err => {
                            reject(err)
                        })
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    cleanBase64Image(base64Data: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const buf = Buffer.from(base64Data, 'base64');
            jimp.read(buf)
                .then(res => {
                    res.deflateStrategy(0)
                        .filterType(jimp.PNG_FILTER_NONE)
                        .colorType(0)
                        .getBase64Async(jimp.MIME_PNG)
                        .then(cleanedImg => {
                            resolve(cleanedImg)
                        })
                        .catch(err => {
                            reject(err)
                        })
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    //scrape the image
    scrapeBase64ImageWithWorker(base64Data: string): Promise<ScrapeResult> {
        return new Promise(async (resolve, reject) => {
            try {
                var scrapeResult = new ScrapeResult()

                const worker = createWorker({
                    //logger: m => console.log(m)
                })
                await worker.load()
                await worker.loadLanguage('eng')
                await worker.initialize('eng')
                var { data: { text, confidence } } = await worker.recognize(base64Data)
                const { data } = await worker.getPDF("Searchable PDF");
                await worker.terminate();

                scrapeResult.scrapeConfidence = confidence
                scrapeResult.scrapeData = text
                scrapeResult.scrapePdf = Buffer.from(data).toString("base64")

                resolve(scrapeResult)

            } catch (err) {
                reject(err)
            }
        })
    }
}