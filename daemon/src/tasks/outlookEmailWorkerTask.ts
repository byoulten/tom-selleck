import { Service, Inject } from "typedi";
import Common from "../utilities/common"
import OutlookService from "../services/outlookService"
import Constants from "../config/constants";

export default class OutlookEmailWorkerTask {

    private sleepOffset: number

    @Inject()
    private outlookService!: OutlookService

    constructor(sleepOffset) {
        this.sleepOffset = sleepOffset

        if (!this.outlookService) {
            this.outlookService = new OutlookService()
        }
    }

    static create(sleepOffset) : OutlookEmailWorkerTask {
        return new OutlookEmailWorkerTask(sleepOffset)
    }

    async doWork() {
        await Common.sleep(this.sleepOffset)

        while (true) {

            this.outlookService.getLatestEmails(Constants.OUTLOOK_TASK_NUMBER_OF_EMAILS)

            await Common.sleep(Constants.OUTLOOK_TASK_SLEEP_TIME)
        }
    }
}