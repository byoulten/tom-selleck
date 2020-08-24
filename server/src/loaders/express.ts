import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import logger from 'morgan';
import "reflect-metadata";

export default ({ expressApp }) => {

    expressApp.get('/status', (_req, res) => { res.status(200).end(); });
    expressApp.head('/status', (_req, res) => { res.status(200).end(); });
    expressApp.use(cors());
    expressApp.use(logger('dev'));
    expressApp.use(express.json());
    expressApp.use(express.urlencoded({ extended: false }));
    expressApp.use(cookieParser());
}