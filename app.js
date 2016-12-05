var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var hbs = require('handlebars');

var users = require('./routes/users');

var app = express();
var mysql = require('mysql');

var credentials;
try{
  credentials = require('./credentials'); //CREATE THIS FILE YOURSELF
}catch(e){
  //heroku support
  credentials = require('./credentials_env');
}

// Setup MySQL Connection
var connection  = mysql.createConnection(credentials);
// Connect to MySQL DB
connection.connect();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//hbs配置
app.engine('hbs', exphbs({
  layoutsDir: 'views',
  defaultLayout: 'layout',
  extname: '.hbs',
  partialsDir: [
    'views'
  ]
}));
app.set('view engine', 'hbs');

//hbs覆盖模块
var blocks = {};

hbs.registerHelper('extend', function(name, context) {
  var block = blocks[name];
  if (!block) {
    block = blocks[name] = [];
  }
  block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper('block', function(name) {
  var val = (blocks[name] || []).join('\n');

  // clear the block
  blocks[name] = [];
  return val;
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Support for Crossdomain JSONP
app.set('jsonp callback name', 'callback');

// Get the Routes for our API
var hospitalIndex = require ('./routes/hospital/index')(express, connection);
var apiRouter = require('./routes/api')(express, connection);

app.use('/hospital', hospitalIndex);
app.use('/users', users);

app.use('/api', apiRouter);

// Better way to disable x-powered-by
app.disable('x-powered-by');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
