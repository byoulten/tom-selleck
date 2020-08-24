import Mongoose from "mongoose";
import Constants from "../config/constants";

export default class DataAccess {

  constructor() {
    DataAccess.connect()
  }

  static connect(): Mongoose.Connection {
    const CONNECTION_STRING = "mongodb://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + "@" + process.env.DATABASE_SERVICE_HOST + ":" + process.env.DATABASE_SERVICE_PORT + "/" + process.env.DB_NAME

    Mongoose.connect(CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true

    })
      .then(() => {
        console.log("Database connection successful")
      })
      .catch(err => {
        console.error("Database connection error")
        console.error(err)
        console.log(CONNECTION_STRING)
        setTimeout(DataAccess.connect, Constants.DB_CONNECTION_RETRY_INTERVAL) //keep retrying till connected
      })
  }
}