import Mongoose from "mongoose";
import IDBModel from "./I_dbModel";

export default interface IUserModel extends IDBModel {
    userId: Mongoose.Schema.Types.ObjectId
    email: string
    username: string
    password: string
}