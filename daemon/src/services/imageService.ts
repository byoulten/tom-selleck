import "reflect-metadata"
import { Service } from "typedi"
import jimp from "jimp"
import ScrapeResult from "../models/scrapeResult"
import Constants from "../config/constants"
const uid = require('uid-safe')
const { exec } = require("child_process");

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

    //scrape the image
    scrapeBase64ImageUsingCmd(base64Data: string): Promise<ScrapeResult> {
        return new Promise(async (resolve, reject) => {
            try {

                var id = Constants.SCRAPE_IMG_PREFIX + uid.sync(18);
                var scrapeResult = new ScrapeResult()

                base64Data = base64Data.replace(/^data:image\/png;base64,/, "");

                require("fs").writeFile(id + ".png", base64Data, 'base64', function (err) {
                    if (!err) {
                        exec("tesseract " + id + ".png " + id, (error, stdout, stderr) => {
                            if (error) {
                                reject(error)
                            }

                            if (stderr) {
                                console.log(`stderr: ${stderr}`);
                            }

                            exec("cat " + id + ".txt", (error, stdout, stderr) => {
                                if (error) {
                                    console.log(`error: ${error.message}`);
                                    return;
                                }
                                if (stderr) {
                                    console.log(`stderr: ${stderr}`);
                                }

                                scrapeResult.scrapeConfidence = 0
                                scrapeResult.scrapeData = stdout
                                scrapeResult.scrapePdf = ''

                                resolve(scrapeResult)
                            })
                        });
                    } else {
                        reject(err)
                    }
                });

            } catch (err) {
                reject(err)
            }
        })
    }
}