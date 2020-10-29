export default class Constants {
    //database
    static DB_CONNECTION_RETRY_INTERVAL: number = 5000
    static DB_CONNECTION_RETRY_COUNT: number = 15
    //worker
    static SAVE_PATH: string = "./temp";
    static WRITE_FILES: boolean = false

    static OUTLOOK_TASK_NUMBER_OF_EMAILS: number = 30
    static OUTLOOK_TASK_SLEEP_TIME: number = 10000
    static MULTITHREADED: true

    static SCRAPE_IMG_PREFIX: string = "scrape_img_"
}