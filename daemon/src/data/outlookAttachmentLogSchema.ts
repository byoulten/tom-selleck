import IOutlookAttachmentLogModel from "../models/interfaces/I_outlookAttachmentLogModel";
import mongoose from 'mongoose'

class OutlookAttachmentLogSchema {

    static get schema() {
        let schema = new mongoose.Schema({
            emailLogId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "EmailLog"
            },
            apiRequest: {
                type: String,
                required: true,
                unique: true
            },
            apiResponseContext: {
                type: String
            },
            apiResponseMediaContentType: {
                type: String
            },
            apiResponseContentBytes: {
                type: String
            },
            apiResponseContentId: {
                type: String
            },
            apiResponseContentType: {
                type: String
            },
            apiResponseName: {
                type: String
            },
            apiResponseSize: {
                type: Number
            }
        }, {
            timestamps: true
        })

        return schema;
    }

}

export default mongoose.model<IOutlookAttachmentLogModel>("OutlookAttachmentLogs", OutlookAttachmentLogSchema.schema);