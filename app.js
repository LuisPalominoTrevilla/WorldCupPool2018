var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');           // Use express session
var flash = require('express-flash');
var logger = require('morgan');
var bodyParser = require('body-parser');

var mainRouter = require('./routes/routers');
var apiRouter = require('./routes/api');
var quinielaRouter = require('./routes/quiniela');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Configure express session
app.use(session({
  secret: 'Hola Mundo',
  name: 'SessionCoockie',
  proxy: true,
  resave: true,
  saveUninitialized: true
}));

// Configure flash messages
app.use(flash());

// Body parser for the post requests
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Select static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/quiniela', quinielaRouter);
app.use('/api', apiRouter);
app.use('/', mainRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404);
  res.render('notfound', {code: '404', url: req.url});
});

module.exports = app;
