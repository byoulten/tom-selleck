import IScrapeJobModel from "../models/interfaces/I_scrapeJobModel";
import mongoose from 'mongoose'

class ScrapeJobSchema {

    static get schema() {
        let schema = new mongoose.Schema({
            cleanJobId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ScrapeJob"
            },
            pageBytes: {
                type: String
            },
            scrapeConfidence: {
                type: Number
            },
            scrapeData: {
                type: String
            },
            scrapeTsv: {
                type: String
            },
            scrapeHocr: {
                type: String
            },
            scrapePdf: {
                type: String
            },
            status: {
                type: String,
                enum: ["ready", "processing", "done"],
                default: "ready"
            }
        }, {
            timestamps: true
        })

        return schema;
    }

}

export default mongoose.model<IScrapeJobModel>("ScrapeJobs", ScrapeJobSchema.schema);