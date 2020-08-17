const createError = require('http-errors');
const express = require('express');

const router = require('./routes/router');
const app = express();
var path = require('path');

app.use('/static',express.static(path.join(__dirname, 'public')));


app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Authorization");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});


app.use('/', router);

module.exports = app;