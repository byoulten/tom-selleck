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

    getDocumentsFromSolrIndex(str: string, start: number, rows: number): any {
        return new Promise((resolve, reject) => {
            var query = this.buildSolrQueryFromString(str)
            this.getSolrClient().then(client => {
                var objQuery = client.query().q(query).hlQuery({
                    on: true,
                    fl: Constants.SEARCH_FIELD,
                    simplePre: "<b>",
                    simplePost: "</b>"
                })
                .start(start)
                .rows(rows)
                client.search(objQuery, function (err, result) {
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

    private buildSolrQueryFromString(str: string): string {
        var queries = [Constants.SEARCH_FIELD + ":" + str + "^100", Constants.SEARCH_FIELD + ":\"" + str + "\"~2^80"]
        var tokenized = str.split(" ")

        if (tokenized.length > 0) {
            tokenized.map(term => {
                queries.push(Constants.SEARCH_FIELD + ":" + term + "~2^" + (100 / tokenized.length).toFixed(2))
            })
        }

        return queries.join(" ")
    }
}