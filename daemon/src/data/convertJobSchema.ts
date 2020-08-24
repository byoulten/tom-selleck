import IConvertJobModel from "../models/interfaces/I_convertJobModel";
import mongoose from 'mongoose'

class ConvertJobSchema {

    static get schema() {
        let schema = new mongoose.Schema({
            outlookLogId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "OutlookLog",
                required: true
            },
            pagesBytes: {
                type: Array
            },
            status: {
                type: String,
                enum: ["ready", "processing", "done"],
                default: "ready"
            }
        }, {
            timestamps: true
        })

        return schema
    }

}

export default mongoose.model<IConvertJobModel>("ConvertJobs", ConvertJobSchema.schema);