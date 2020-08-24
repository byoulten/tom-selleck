var express = require('express');
import expressLoader from './loaders/express';
import diLoader from './loaders/di';
import assureLoader from './loaders/assure';
import kickoffLoader from './loaders/kickoff';
import errorsLoader from './loaders/errors';
const app = express();

expressLoader({ expressApp: app })

diLoader({ expressApp: app })
assureLoader({ expressApp: app })
kickoffLoader({ expressApp: app })

var indexRouter = require('./api/index')

app.use('/', indexRouter);

errorsLoader({ expressApp: app });

module.exports = app;
