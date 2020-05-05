//Requires
var compression = require('compression')
var express = require('express');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var passport = require('passport');
var mySqlSessionStore = require('express-mysql-session')(expressSession);
var dbConnect = require('./database/connect');
var cookieParser = require('cookie-parser');
var mojammaa = require('./bin/mojammaa');

//Initializing
var app = express();

//MiddleWare
app.use(compression());
app.use('/assets', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressSession({ secret: process.env.SESSION_SECRET || 'islamsk mojammaa, my religion is my life',
    resave: true, saveUninitialized: false,
    store: new mySqlSessionStore({endConnectionOnClose: true}, dbConnect),
    cookie: { httpOnly: true, secure: false, maxAge: (12 * 30 * 24 * 60 * 60 * 1000) } // must modify when apply SSL .
    })
); 
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(function(req, res, next) {
    const langPref = 
      req.cookies[mojammaa.config.cookies.names.userLangPref];
    req.userLangPref = langPref;

    let ipAddr = req.headers["x-forwarded-for"];
    if (ipAddr){
        var list = ipAddr.split(",");
        ipAddr = list[list.length-1];
    } else {
    ipAddr = req.connection.remoteAddress;
  }
  req.ip = ipAddr;

  mojammaa.log (
      `New ${req.method} request with url: ${req.url}\nFrom: ${ipAddr}`, 
      mojammaa.logLevels.SERVER_API_INFO, __filename, "app.use(/)", null, req.sessionID
    ); 
  
    res.on('finish', function() {
        mojammaa.log (
            `Response for ${this.req.method} request with url: ${this.req.url} has sent with status ${this.statusCode}`,
            mojammaa.logLevels.SERVER_API_INFO, __filename, "res.on(finish) callback", null, null
        );
    });
  
    next(); 
});
// configure passport for Authentication 
require('./bin/passportconfg')(passport);

//API GET 
require('./controllers/api_get')(app, passport);

//API POST
require('./controllers/api_post')(app, passport);

//API DELETE
require('./controllers/api_delete')(app, passport);

//API not supported
app.all("*", function(req, res) {
    res.status(404).end("mojammaa Server: Invalid request");
});

module.exports = app;
