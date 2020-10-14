import Container from "typedi";
import UserService from "../services/userService";

async function verify(req, res, next) {

    var token = req.cookies.token
    var username = req.cookies.username;

    var userService = Container.get(UserService)

    if (username && token) {
        await userService.verify(username, token)
            .then(result => {
                if (result.type != 200) {
                    return res.status(result.type).send({ auth: result.auth, id: result.id });
                }
            })
            .catch(err => {
                return res.status(401).send(err)
            });
    } else {
        return res.status(401).send({ auth: false, id: null })
    }

    next();
}

module.exports = verify;