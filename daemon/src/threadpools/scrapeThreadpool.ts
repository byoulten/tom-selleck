import Threadpool from "./base/B_threadpool";

export default class ScrapeThreadpool extends Threadpool {
    constructor() {
        super("scrapeWorker.js", 1, 0)
        this.initialize()
    }
}