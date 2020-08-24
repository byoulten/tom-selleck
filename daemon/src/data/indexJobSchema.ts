import IIndexJobModel from "../models/interfaces/I_indexJobModel";
import mongoose from 'mongoose'

class IndexJobSchema {

    static get schema() {
        let schema = new mongoose.Schema({
            scrapeJobId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ScrapeJob"
            },
            indexedDocument: {
                type: mongoose.Schema.Types.Mixed,
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

export default mongoose.model<IIndexJobModel>("IndexJobs", IndexJobSchema.schema);