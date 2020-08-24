import IScrapeJobModel from "../models/interfaces/I_scrapeJobModel";
import ScrapeJobSchema from "../data/scrapeJobSchema";
import RepositoryBase from "./base/B_repository";

export default class ScrapeJobRepository extends RepositoryBase<IScrapeJobModel> {
    
    constructor() {
        super(ScrapeJobSchema)
    }
} 