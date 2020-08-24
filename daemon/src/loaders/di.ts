import Container from 'typedi';
import PdfService from '../services/pdfService';
import ScrapeJobRepository from '../repositories/scrapeJobRepository';
import IndexService from '../services/indexService';
import ImageService from '../services/imageService';
import OutlookService from '../services/outlookService';
import TokenService from '../services/tokenService';
import OutlookEmailThreadpool from '../threadpools/outlookEmailThreadpool';
import ConvertThreadpool from '../threadpools/convertThreadpool';
import CleanThreadpool from '../threadpools/cleanThreadpool';
import ScrapeThreadpool from '../threadpools/scrapeThreadpool';
import IndexThreadpool from '../threadpools/indexThreadpool';

export default ({ expressApp }) => {
    Container.set(ScrapeJobRepository, new ScrapeJobRepository())

    Container.set(ImageService, new ImageService());
    Container.set(PdfService, new PdfService());
    Container.set(TokenService, new TokenService());
    Container.set(OutlookService, new OutlookService());
    Container.set(IndexService, new IndexService());

    Container.set(OutlookEmailThreadpool, new OutlookEmailThreadpool())
    Container.set(ConvertThreadpool, new ConvertThreadpool())
    Container.set(CleanThreadpool, new CleanThreadpool())
    Container.set(ScrapeThreadpool, new ScrapeThreadpool())
    Container.set(IndexThreadpool, new IndexThreadpool())
}