import IUserModel from "../models/interfaces/I_userModel";
import mongoose from 'mongoose'

class UserSchema {

    static get schema() {
        let schema = new mongoose.Schema({
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            email: {
                type: String
            },
            username: {
                type: String
            },
            password: {
                type: String
            }
        }, {
            timestamps: true
        })

        return schema;
    }

}

export default mongoose.model<IUserModel>("Users", UserSchema.schema);