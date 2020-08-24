import IIndexJobModel from "../models/interfaces/I_indexJobModel";
import IndexJobSchema from "../data/indexJobSchema";
import WorkerJobRepositoryBase from "./base/B_workerJobRepository";

export default class IndexJobRepository extends WorkerJobRepositoryBase<IIndexJobModel> {
    
    constructor() {
        super(IndexJobSchema)
    }
} 