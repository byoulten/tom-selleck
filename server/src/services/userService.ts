import "reflect-metadata"
import { Service, Inject } from "typedi"
import UserRepository from "../repositories/userRepository"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

@Service()
export default class UserService {

    @Inject()
    private userRepository!: UserRepository

    //constructor injection because we cant use DI in threads
    constructor() {

        if (!this.userRepository) {
            this.userRepository = new UserRepository()
        }
    }

    generateEncryptedPassword(password: string) {
        const hash = bcrypt.hashSync(password, 10);
        return Buffer.from(hash).toString('base64');
    }

    login(username: string, password: string): Promise<{ auth: boolean, token: string | null, type: number }> {
        return new Promise((resolve, reject) => {
            this.userRepository.getUserByUsername(username)
                .then(user => {

                    if (!user) {
                        resolve({ auth: false, token: null, type: 404 });
                    }

                    // check if the password is valid
                    var passwordIsValid = bcrypt.compareSync(password, Buffer.from(user.password, 'base64').toString('ascii'));

                    if (!passwordIsValid) {
                        resolve({ auth: false, token: null, type: 401 });
                    }

                    // if user is found and password is valid
                    // create a token
                    var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                        expiresIn: 86400 // expires in 24 hours
                    });

                    // return the information including token as JSON
                    resolve({ auth: true, token: token, type: 200 });
                })
                .catch(err => {
                    reject(err)
                })
        });
    }

    verify(username: string, token: string): Promise<{ auth: boolean, id: string | null, type: number }> {
        return new Promise((resolve, reject) => {
            try {
                this.userRepository.getUserByUsername(username)
                    .then((user) => {
                        // verifies secret and checks exp
                        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
                            if (err) {
                                return resolve({ auth: false, id: user.id, type: 500 });
                            } else {
                                if (user.id == decoded.id) {
                                    return resolve({ auth: true, id: decoded.id, type: 200 })
                                } else {
                                    return resolve({ auth: false, id: user.id, type: 401 })
                                }

                            }
                        });
                    })
            } catch (err) {
                reject(err)
            }
        });
    }
}