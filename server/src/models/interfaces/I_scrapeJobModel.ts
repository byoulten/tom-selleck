import Mongoose from "mongoose"
import IDbModel from "./I_dbModel";

export default interface IScrapeJobModel extends IDbModel {
    cleanJobId: Mongoose.Schema.Types.ObjectId
    pageBytes: string
    scrapeConfidence: number
    scrapeData: string
    scrapeTsv: string
    scrapeHocr: string
    scrapePdf: string
    status: string
}