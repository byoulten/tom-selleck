import "reflect-metadata";
import Container, { Service } from "typedi";
import ScrapeJobRepository from "../repositories/scrapeJobRepository";

@Service()
export default class PdfService {

    //get pdf from scrape id
    getPdfFromId(id: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            var scrapeJobRepository = Container.get(ScrapeJobRepository)
            scrapeJobRepository.findById(id, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result.scrapePdf)
                }
            })
        })
    }
}