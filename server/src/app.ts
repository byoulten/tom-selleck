var express = require('express');
import expressLoader from './loaders/express';
import diLoader from './loaders/di';
import errorsLoader from './loaders/errors';
const app = express();

expressLoader({ expressApp: app })

diLoader({ expressApp: app })

var filesRouter = require('./api/files')
var searchRouter = require('./api/search')
var authRouter = require('./api/auth')

app.use('/files', filesRouter);
app.use('/search', searchRouter);
app.use('/auth', authRouter);

errorsLoader({ expressApp: app });

module.exports = app;
