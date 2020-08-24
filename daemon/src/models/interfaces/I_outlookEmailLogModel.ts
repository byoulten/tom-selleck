import Mongoose from "mongoose"
import IDBModel from "./I_dbModel";

export default interface IOutlookEmailLogModel extends IDBModel {
  apiResponseJson: string
  apiResponseEmailId: string
  apiResponseSubject: string
  apiResponseWebLink: string
  apiResponseRecievedDateTime: string
  apiResponseAttachmentIds: Array<string>
}