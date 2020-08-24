require('dotenv').config

export default class Constants {
    //database
    static DB_CONNECTION_RETRY_INTERVAL: number = 5000
    static DB_CONNECTION_RETRY_COUNT: number = 15

    //index
    static SEARCH_FIELD: string = "scrapeData"
}