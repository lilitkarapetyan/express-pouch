var PouchDB = require('pouchdb');
var express = require('express');
var cors = require('cors')
var app = express();

app.use(cors());

app.use('/', require('express-pouchdb')(PouchDB));

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

app.listen(port);
