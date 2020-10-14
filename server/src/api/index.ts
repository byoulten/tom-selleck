import { Container } from "typedi";
import UserService from "../services/userService";

var express = require("express");

var router = express.Router();

router.get('/', async (req, res) => {
    res.json("pong")
});

router.get('/generate-pw', async (req, res) => {
    if (req.query && req.query.pw) {
        var userService = Container.get(UserService);
        var result = userService.generateEncryptedPassword(req.query.pw)
        res.json(result)
    }
});

module.exports = router;
