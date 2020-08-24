import "reflect-metadata";
import { Service } from "typedi";
import Constants from "../config/constants";
import ISolrModel from "../models/interfaces/I_solrModel";

var solrNode = require("solr-node")

@Service()
export default class IndexService {

    private solr: any

    constructor() {
        this.solr = new solrNode({
            host: process.env.INDEX_SERVICE_HOST,
            port: process.env.INDEX_SERVICE_PORT,
            core: process.env.INDEX_CORE_NAME,
            protocol: process.env.INDEX_SCHEME
        })
    }

    addDocumentToSolrIndex(solrDoc: ISolrModel): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.getSolrClient().then(client => {
                client.update(solrDoc, function (err, result) {
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(err)
                    }
                })
            })
        })
    }

    pingSolrIndex(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getSolrClient().then(client => {
                var query = client.query().q("*:*").start(1).rows(1)
                client.search(query, function (err, result) {
                    if (!err) {
                        resolve(result)
                    } else {
                        reject(err)
                    }
                })
            })
        })
    }

    getSolrClient(): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve(this.solr)
        })
    }
}