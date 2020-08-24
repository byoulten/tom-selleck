import IOutlookEmailLogModel from "../models/interfaces/I_outlookEmailLogModel";
import OutlookEmailLogSchema from "../data/outlookEmailLogSchema";
import RepositoryBase from "./base/B_repository";

export default class UserRepository extends RepositoryBase<IOutlookEmailLogModel> {
    constructor() {
        super(OutlookEmailLogSchema);
    }

    getOutlookLogByEmailId(emailId: string): Promise<IOutlookEmailLogModel> {
        return new Promise<IOutlookEmailLogModel>((resolve, reject) => {
            try {
                resolve(this._model.findOne({
                    apiResponseEmailId: emailId
                }))
            } catch (err) {
                reject(err)
            }
        })
    }
} 