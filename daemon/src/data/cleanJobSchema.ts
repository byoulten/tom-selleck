import ICleanJobModel from "../models/interfaces/I_cleanJobModel";
import mongoose from 'mongoose'

class CleanJobSchema {

    static get schema() {
        let schema = new mongoose.Schema({
            convertJobId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ConvertJob"
            },
            pageBytes: {
                type: String
            },
            cleanedPageBytes: {
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

export default mongoose.model<ICleanJobModel>("CleanJobs", CleanJobSchema.schema);