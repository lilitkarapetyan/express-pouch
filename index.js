var PouchDB = require('pouchdb');
var express = require('express');
var cors = require('cors')
var app = express();

app.use(cors());

app.use('/', require('express-pouchdb')(PouchDB));

app.listen(80);
