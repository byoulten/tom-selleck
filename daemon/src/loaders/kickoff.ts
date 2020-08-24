import Container from "typedi";
import OutlookEmailThreadpool from "../threadpools/outlookEmailThreadpool";
import ConvertThreadpool from "../threadpools/convertThreadpool";
import CleanThreadpool from "../threadpools/cleanThreadpool";
import ScrapeThreadpool from "../threadpools/scrapeThreadpool";
import IndexThreadpool from "../threadpools/indexThreadpool";

export default ({ expressApp }) => {
    
    Container.get(OutlookEmailThreadpool).start()
    Container.get(ConvertThreadpool).start()
    Container.get(CleanThreadpool).start()
    Container.get(ScrapeThreadpool).start()
    Container.get(IndexThreadpool).start()
}