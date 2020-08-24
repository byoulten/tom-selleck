import "reflect-metadata";
import { Service, Inject } from "typedi";
var AuthenticationContext = require('adal-node').AuthenticationContext;

require('isomorphic-fetch');
require('dotenv').config()

@Service()
export default class TokenService {

    private token?: string

    private expiryDate?: Date

    private authorityHostUrl?: string

    private tenant?: string // AAD Tenant name.

    private applicationId?: string // Application Id of app registered under AAD.

    private clientSecret?: string // Secret generated for app. Read this environment variable.

    private resource?: string // URI that identifies the resource for which the token is valid.

    constructor() {

        this.authorityHostUrl = process.env.AUTHORITY_HOST_URL;
        this.tenant = process.env.AAD_TENANT; // AAD Tenant name.
        this.applicationId = process.env.APP_ID; // Application Id of app registered under AAD.
        this.clientSecret = process.env.CLIENT_SECRET; // Secret generated for app. Read this environment variable.
        this.resource = process.env.RESOURCE; // URI that identifies the resource for which the token is valid.
    }

    private retrieveToken(callback: (error: any, result: any) => void) {
        var authorityUrl = this.authorityHostUrl + '/' + this.tenant;
        var context = new AuthenticationContext(authorityUrl);

        console.log(this.resource)
        console.log(this.applicationId)
        console.log(this.clientSecret)

        context.acquireTokenWithClientCredentials(this.resource, this.applicationId, this.clientSecret, callback)
    }

    getToken(callback: (error: any, result: string) => void) {

        console.log("current expiry - " + this.expiryDate)

        if (!this.token || !this.expiryDate || this.expiryDate.valueOf() < Date.now()) {
            this.retrieveToken((err, result) => {
                if (!err) {
                    this.token = result.accessToken
                    this.expiryDate = result.expiresOn

                    console.log("retrieved expiry - " + this.expiryDate)

                    if (this.token) {
                        callback(err, this.token)
                    } else {
                        callback("Unable to aquire token", "")
                    }
                } else {
                    console.log(err)
                }
            })
        } else {
            console.log("current time - " + Date.now())
            console.log("saved expiry - " + this.expiryDate)

            callback(null, this.token)
        }
    }

    getUser(): string | undefined {
        return process.env.USER_PRINCIPAL_NAME
    }
}