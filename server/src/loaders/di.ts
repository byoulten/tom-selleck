import Container from 'typedi';
import PdfService from '../services/pdfService';
import ScrapeJobRepository from '../repositories/scrapeJobRepository';
import IndexService from '../services/indexService';
import UserService from '../services/userService';

export default ({ expressApp }) => {
    Container.set(ScrapeJobRepository, new ScrapeJobRepository())

    Container.set(PdfService, new PdfService());
    Container.set(IndexService, new IndexService());
    Container.set(UserService, new UserService());
}