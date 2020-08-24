export default interface ISolrModel {
    id: string
    webLink: string
    subject: string
    recievedDateTime: Date
    attachmentThumbnail: string
    attachmentUrl: string
    scrapeConfidence: number
    scrapeData: string
}