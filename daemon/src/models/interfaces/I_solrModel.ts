export default interface ISolrModel {
    id: string
    webLink: string
    subject: string
    recievedDateTime: Date
    attachmentThumbnail: string
    attachmentId: string
    scrapeConfidence: number
    scrapeData: string
}