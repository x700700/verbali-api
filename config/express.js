const express = require('express');
const session = require('express-session');
const expressWinston = require('express-winston');
const helmet = require('helmet');
const cors = require('cors');
const methodOverride = require('method-override');
const compress = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const uuid = require('uuid/v4');
const FileStore = require('session-file-store')(session);
const flash = require('connect-flash');
const logger = require('morgan');
const passport = require('./passport');



const winstonInstance = require('./logger');
const routes = require('../server/index.route');
const config = require('./config');
const error = require('../middlewares/error');


const app = express();

if (config.env === 'development') {
    app.use(logger('dev'));
}

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    genid: (req) => {
        console.log('Inside session middleware genid function');
        console.log(`Request object sessionID from client: ${req.sessionID}`);
        return uuid();
    },
    store: new FileStore(),
    secret: 'bo0liwRotEverrr4al1i1',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 15,
    },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in session



if (config.env === 'development') {
    expressWinston.requestWhitelist.push('body');
    expressWinston.responseWhitelist.push('body');
    app.use(expressWinston.logger({
        winstonInstance,
        meta: true, // optional: log meta data about request (defaults to true)
        colorStatus: true, // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
        // msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms  -->  {{JSON.stringify(req.body)}} ==> {{JSON.stringify(res.body)}}',
    }));
}

// mount all routes on /api path
app.use('/', routes);


// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);


// log error in winston transports except when executing test suite
if (config.env !== 'test') {
    /* app.use(expressWinston.errorLogger({
        winstonInstance
    })); */
}

module.exports = app;
