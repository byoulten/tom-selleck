import Threadpool from "./base/B_threadpool";

export default class ConvertThreadpool extends Threadpool {
    constructor() {
        super("convertWorker.js", 1, 0)
        this.initialize()
    }
}