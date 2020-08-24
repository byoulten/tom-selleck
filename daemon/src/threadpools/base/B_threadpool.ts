import path from "path";
const { StaticPool } = require("node-worker-threads-pool");

export default class Threadpool {

    private readonly workerPath = path.resolve(__dirname, "../../workers/")
    private workerFile: string
    private workerThreadpool: typeof StaticPool
    private size: number
    private sleepOffset: number

    constructor(workerFile: string, size: number, sleepOffset: number) {
        this.workerFile = workerFile
        this.workerThreadpool = null
        this.size = size
        this.sleepOffset = sleepOffset
    }

    protected initialize() {
        if (this.workerThreadpool == null) {
            this.workerThreadpool = new StaticPool({
                size: this.size,
                task: this.workerPath + "/" + this.workerFile
            })
        }
    }

    start() {
        this.workerThreadpool?.exec(this.sleepOffset)
    }

    destroy() {
        if (this.workerThreadpool != null) {
            this.workerThreadpool.destroy()
            this.workerThreadpool = null
        }
    }
}