import Mongoose from "mongoose";
import Repository from "./B_repository";
import IWorkerModel from "../../models/interfaces/I_workerModel";

export default class WorkerJobRepository<T extends IWorkerModel> extends Repository<T> {

    protected _model: Mongoose.Model<Mongoose.Document>;

    getOutstandingJobs(): Promise<Array<T>> {
        return new Promise<Array<T>>((resolve, reject) => {
            try {
                resolve(this._model.find({
                    status: "ready"
                }))
            } catch (err) {
                reject(err)
            }
        })
    }

    getOutstandingJob(): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            try {
                resolve(this._model.findOne({
                    status: "ready"
                }))
            } catch (err) {
                reject(err)
            }
        })
    }

    markJobAsProcessing(job: T): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            try {
                job.status = "processing"

                this.update(job.id, job, (err, res) => {
                    if (!err) {
                        resolve(true)
                    } else {
                        reject(err)
                    }
                })
                
            } catch (err) {
                reject(err)
            }
        })
    }

    closeJob(job: T): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            try {
                job.status = "done"

                this.update(job.id, job, (err, res) => {
                    if (!err) {
                        resolve(true)
                    } else {
                        reject(err)
                    }
                })
                
            } catch (err) {
                reject(err)
            }
        })
    }
}