var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var db = require("./database-connection");

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var cors = require("cors");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //check this t/f value
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../me-hive-app/build')));
app.use(cors());

app.use('/', indexRouter);
app.use('/api', apiRouter);

module.exports = app;
