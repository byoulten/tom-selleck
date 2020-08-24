import Container from "typedi";
import DataAccess from "../data/dataAccess";
import IndexService from "../services/indexService";
import Common from "../utilities/common";


export default async ({ expressApp }) => {

    //blocking ping for index
    var qTime = -1;
    while (qTime < 0) {
 
        var result = Container.get(IndexService)
        .pingSolrIndex()
        .then(res => {
            console.log(res)
            qTime = res.responseHeader.QTime
        })
        .catch(err => {
            console.log(err)
        })

        console.log(result)

        await Common.sleep(2000)
    }

    //the database relies on its connection retry
    DataAccess.connect()
}

