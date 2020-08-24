import Threadpool from "./base/B_threadpool";

export default class CleanThreadpool extends Threadpool {
    constructor() {
        super("cleanWorker.js", 1, 0)
        this.initialize()
    }
}