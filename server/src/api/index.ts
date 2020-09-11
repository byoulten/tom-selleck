var express = require("express");

var router = express.Router();

router.get('/', async (req, res) => {
    res.json("pong")
});


module.exports = router;
