import Container from "typedi";
import UserService from "../services/userService";

var verify = require("./verify")
var express = require("express");

var router = express.Router();

router.post("/login", async (req, res) => {
    var userService = Container.get(UserService) 

    await userService.login(req.body.username, req.body.password)
    .then(result => {
        res.cookie('token', result.type, { httpOnly: true });
        return res.status(result.type).send(result.auth);
    })
    .catch(err => {
        return res.status(401).send(err)
    })
})

router.get('/me', verify, async (req, res) => {
    res.send()
});

module.exports = router;
