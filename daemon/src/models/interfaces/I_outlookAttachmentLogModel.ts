import Mongoose from "mongoose"
import IDBModel from "./I_dbModel";

export default interface IOutlookAttachmentLogModel extends IDBModel {
  emailLogId: Mongoose.Schema.Types.ObjectId
  apiRequest: string
  apiResponseMediaContentType: string
  apiResponseContentBytes: string
  apiResponseContentId: string
  apiResponseContentType: string
  apiResponseName: string
  apiResponseSize: number
}