import Threadpool from "./base/B_threadpool";

export default class OutlookEmailThreadpool extends Threadpool {
    constructor() {
        super("outlookEmailWorker.js", 1, 0)
        this.initialize()
    }
}