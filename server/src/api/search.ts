import IndexService from "../services/indexService";

var verify = require("./verify")
var express = require("express");

var router = express.Router();

var indexService = new IndexService()

router.post("/go", verify, (req, res) => {

    if (req.body && req.body.term) {
        indexService.getDocumentsFromSolrIndex(req.body.term, 0, 20)
            .then(result => {
                return res.send(result)
            })
            .catch(err => {
                console.log(err)
                return res.send([])
            })
    }
})

module.exports = router;