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
        
        var tokenized = str.split(" ")
        var queries = [Constants.SEARCH_FIELD + ":" + str + "^100"]

        if (str.length > 2) {
            //for 3, we need to adjust the initial query
            if (str.length == 3) { 
                queries.push(Constants.SEARCH_FIELD + ":\"" + str + "\"~1^80")
            }else{
                queries.push(Constants.SEARCH_FIELD + ":\"" + str + "\"~2^80")
            }

            //only do a tokenized query if we have more than 1 word
            if (tokenized.length > 1) {
                
                tokenized.map(term => {
                    if (term.length > 2) {
                        if (term.length == 3) { 
                            queries.push(Constants.SEARCH_FIELD + ":" + term + "~1^" + (100 / tokenized.length).toFixed(2))
                        }else{
                            queries.push(Constants.SEARCH_FIELD + ":" + term + "~2^" + (100 / tokenized.length).toFixed(2))
                        }
                    } else {
                        queries.push(Constants.SEARCH_FIELD + ":" + term + "^" + (100 / tokenized.length).toFixed(2))
                    }
                })
            }
        }

        return queries.join(" ")
    }
}