export default class ScrapeResult {

    scrapeConfidence: number
    scrapeData: string
    scrapeTsv: string
    scrapeHocr: string
    scrapePdf: string

    constructor() {
        this.scrapeConfidence = 0
        this.scrapeData = ""
        this.scrapeTsv = ""
        this.scrapeHocr = ""
        this.scrapePdf = ""
    }
}