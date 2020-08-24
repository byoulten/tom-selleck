import ICleanJobModel from "../models/interfaces/I_cleanJobModel";
import CleanJobSchema from "../data/cleanJobSchema";
import WorkerJobRepositoryBase from "./base/B_workerJobRepository";

export default class CleanJobRepository extends WorkerJobRepositoryBase<ICleanJobModel> {
    
    constructor() {
        super(CleanJobSchema)
    }
} 