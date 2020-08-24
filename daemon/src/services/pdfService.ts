import "reflect-metadata";
import Container, { Service } from "typedi";
import PDF2Pic, { ConvertBase64Result } from 'pdf2pic'
import Constants from "../config/constants";
import ScrapeJobRepository from "../repositories/scrapeJobRepository";

@Service()
export default class PdfService {

    private saveName: string

    constructor() {
        this.saveName = "converted"
    }

    //converts a pdf to a png image
    convertPdfToPng(serverFileUrl: string): Promise<Array<string>> {
        return new Promise((resolve, reject) => {
            this.getPdf2Pic().convertBulk(serverFileUrl, -1)
                .then((imgPaths: any[]) => {
                    resolve(imgPaths.map(r => r.path))
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    //converts a pdf to a base64 string
    convertPdfToBase64(serverFileUrl: string): Promise<Array<string>> {
        return new Promise((resolve, reject) => {
            this.getPdf2Pic().convertToBase64Bulk(serverFileUrl, -1)
                .then((results: ConvertBase64Result[]) => {
                    resolve(results.map(r => r.base64))
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    getPdf2Pic(): PDF2Pic {
        return new PDF2Pic({
            density: 100,           // output pixels per inch
            savename: this.saveName,   // output file name
            savedir: Constants.SAVE_PATH,    // output file location
            format: "png",         // output file format
            size: "1024x1024"         // output size in pixels
        });
    }

    setSaveName(saveName: string) {
        this.saveName = saveName
    }
}