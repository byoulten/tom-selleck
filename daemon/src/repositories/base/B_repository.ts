import "reflect-metadata";
import Container, { Service } from "typedi";

import Mongoose from "mongoose";
import DataAccess from "../../data/dataAccess";
import IDBModel from "../../models/interfaces/I_dbModel"

@Service()
export default class Repository<T extends IDBModel> {

    protected _model: Mongoose.Model<T>;

    constructor(schemaModel: Mongoose.Model<T>) {
        DataAccess.connect() //connect if we are using the repo
        this._model = schemaModel;
    }

    create(item: T, callback: (error: any, result: T[]) => void) {
        this._model.create(item, callback);
    }

    retrieve(callback: (error: any, result: T[]) => void) {
        this._model.find({}, callback)
    }

    update(_id: Mongoose.Types.ObjectId, item: T, callback: (error: any, result: any) => void) {
        this._model.updateOne({ _id: _id }, item, callback);
    }

    delete(_id: string, callback: (error: any, result: any) => void) {
        this._model.remove({ _id: this.toObjectId(_id) }, (err) => callback(err, null));
    }

    findById(_id: string, callback: (error: any, result: T) => void) {
        this._model.findById(_id, callback);
    }

    private toObjectId(_id: string): Mongoose.Types.ObjectId {
        return Mongoose.Types.ObjectId.createFromHexString(_id)
    }

}