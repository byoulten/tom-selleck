import Mongoose from "mongoose";
import IWorkerModel from "./I_workerModel";

export default interface IIndexJobModel extends IWorkerModel {
    scrapeJobId: Mongoose.Schema.Types.ObjectId
    indexedDocument: Object
}