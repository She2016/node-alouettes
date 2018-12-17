var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var hbs = require('hbs');
var MomentHandler = require("handlebars.moment");
var path = require('path');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var eventsRouter = require('./routes/events');
var informationRouter = require('./routes/information');
var maintenanceRouter = require('./routes/maintenance');
var sociallifeRouter = require('./routes/sociallife');
var auth = require('./auth');
var authMiddleware = require('./auth/middleware');

var app = express();

MomentHandler.registerHelpers(hbs);

// Set view folders
app.set('views', [path.join(__dirname, 'views'), 
                  path.join(__dirname, 'views/events'), 
                  path.join(__dirname, 'views/admin'), 
                  path.join(__dirname, 'views/information'), 
                  path.join(__dirname, 'views/users'),
                  path.join(__dirname, 'views/maintenance'),
                  path.join(__dirname, 'views/sociallife')]);
app.set('view engine', 'hbs'); // view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('keyboard_cat'));
app.use(session({
  secret: 'djhxcvxfgshajfgjhgsjhfgsakjeauytsdfy',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
  }));
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));

// send errors to page if any.
app.use(function(req, res, next){
  res.locals.success_messages = req.flash('success_messages');
  res.locals.error_messages = req.flash('error_messages');
  next();
});

app.use('/auth', auth); // http://localhost:5000/auth
app.use('/', indexRouter); // http://localhost:5000
app.use('/users', usersRouter); // http://localhost:5000/users
app.use('/events', eventsRouter); // http://localhost:5000/events
app.use('/information', informationRouter); // http://localhost:5000/information
app.use('/maintenance', maintenanceRouter); // http://localhost:5000/maintenance
app.use('/sociallife', sociallifeRouter); // http://localhost:5000/sociallife

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.code || 500)
    res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err : {}
      });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.code || 500)
  res.json({
      message: err.message,
      error: req.app.get('env') === 'development' ? err : {}
    });
});


module.exports = app;
