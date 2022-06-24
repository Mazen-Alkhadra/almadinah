//Requires
let express = require('express');

//Initializing
let app = express();

//Register middlewares
require('../middlewares')(app);

//Routes
require('../routes')(app);

module.exports = app;
