import IOutlookEmailLogModel from "../models/interfaces/I_outlookEmailLogModel";
import mongoose from 'mongoose'

class OutlookEmailLogSchema {

    static get schema() {
        let schema = new mongoose.Schema({
            apiResponseJson: {
                type: String,
                required: true
            },
            apiResponseEmailId: {
                type: String,
                required: true
            },
            apiResponseSubject: {
                type: String
            },
            apiResponseWebLink: {
                type: String
            },
            apiResponseRecievedDateTime: {
                type: String
            },
            apiResponseAttachmentIds: {
                type: Array
            }
        }, {
            timestamps: true
        })

        return schema;
    }

}

export default mongoose.model<IOutlookEmailLogModel>("OutlookEmailLogs", OutlookEmailLogSchema.schema);