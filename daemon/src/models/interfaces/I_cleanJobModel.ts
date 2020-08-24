import Mongoose from "mongoose";
import IWorkerModel from "./I_workerModel";

export default interface ICleanJobModel extends IWorkerModel {
    convertJobId: Mongoose.Schema.Types.ObjectId
    pageBytes: string
    cleanedPageBytes: string
}