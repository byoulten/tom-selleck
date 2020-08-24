import Threadpool from "./base/B_threadpool";

export default class IndexThreadpool extends Threadpool {
    constructor() {
        super("indexWorker.js", 1, 0)
        this.initialize()
    }
}