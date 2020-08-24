import Mongoose from "mongoose"
import IWorkerModel from "./I_workerModel";

export default interface IConvertJobModel extends IWorkerModel {
  outlookLogId: Mongoose.Schema.Types.ObjectId
  pagesBytes: Array<string>
}

