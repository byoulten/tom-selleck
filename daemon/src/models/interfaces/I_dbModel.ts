import Mongoose from "mongoose";

export default interface IDBModel extends Mongoose.Document {
  id: string
}