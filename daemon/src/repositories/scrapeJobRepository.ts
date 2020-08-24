import IScrapeJobModel from "../models/interfaces/I_scrapeJobModel";
import ScrapeJobSchema from "../data/scrapeJobSchema";
import WorkerJobRepositoryBase from "./base/B_workerJobRepository";

export default class ScrapeJobRepository extends WorkerJobRepositoryBase<IScrapeJobModel> {
    
    constructor() {
        super(ScrapeJobSchema)
    }
} 