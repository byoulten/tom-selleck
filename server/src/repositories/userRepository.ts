import IUserModel from "../models/interfaces/I_userModel";
import UserSchema from "../data/userSchema";
import Repository from "./base/B_repository";

export default class UserRepository extends Repository<IUserModel> {
    
    constructor() {
        super(UserSchema)
    }

    getUserByUsername(username: string): Promise<IUserModel> {
        return new Promise<IUserModel>((resolve, reject) => {
            try {
                resolve(this._model.findOne({
                    username: username
                }))
            } catch (err) {
                reject(err)
            }
        })
    }
} 