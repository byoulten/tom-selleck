import IOutlookAttachmentLogModel from "../models/interfaces/I_outlookAttachmentLogModel";
import OutlookAttachmentLogSchema from "../data/outlookAttachmentLogSchema";
import RepositoryBase from "./base/B_repository";

export default class UserRepository extends RepositoryBase<IOutlookAttachmentLogModel> {
    constructor() {
        super(OutlookAttachmentLogSchema);
    }

    getOutlookLogByAttachmentQuery(emailId: string, attId: string): Promise<IOutlookAttachmentLogModel> {
        return new Promise<IOutlookAttachmentLogModel>((resolve, reject) => {
            const attQuery = "/me/messages/" + emailId + "/attachments/" + attId

            try {
                resolve(this._model.findOne({
                    apiRequest: attQuery
                }))
            } catch (err) {
                reject(err)
            }
        })
    }
} 