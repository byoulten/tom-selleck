import ISolrModel from "./interfaces/I_solrModel";

export default class SolrModel implements ISolrModel {

    id: string;
    webLink: string;
    subject: string;
    recievedDateTime: Date;
    attachmentThumbnail: string;
    attachmentUrl: string;
    scrapeConfidence: number;
    scrapeData: string;

    constructor(id:string, 
        webLink:string, 
        subject:string, 
        recievedDateTime: Date, 
        attachementThumbnail:string, 
        attachmentUrl:string, 
        scrapeConfidence:number, 
        scrapeData:string) {

            this.id = id
            this.webLink = webLink
            this.subject = subject
            this.recievedDateTime = recievedDateTime
            this.attachmentThumbnail = attachementThumbnail
            this.attachmentUrl = attachmentUrl
            this.scrapeConfidence = scrapeConfidence
            this.scrapeData = scrapeData
    }
}