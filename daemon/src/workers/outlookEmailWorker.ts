import OutlookEmailWorkerTask from "../tasks/outlookEmailWorkerTask"

const { parentPort, workerData } = require("worker_threads")

parentPort.on("message", async (sleepOffset) => {
    OutlookEmailWorkerTask.create(sleepOffset).doWork()
})