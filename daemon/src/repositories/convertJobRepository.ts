import IConvertJobModel from "../models/interfaces/I_convertJobModel";
import ConvertJobSchema from "../data/convertJobSchema";
import WorkerJobRepositoryBase from "./base/B_workerJobRepository";

export default class ConvertJobRepository extends WorkerJobRepositoryBase<IConvertJobModel> {
    
    constructor() {
        super(ConvertJobSchema)
    }
} 