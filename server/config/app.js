/*
Filename: app.js 
Group name: Xtreme Dynamos
Date: November 11, 2021
*/

//Installed 3rd party packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

//modules for authentication
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

//Database setup
let mongoose = require('mongoose');
let db = require('./db');

//Point mongoose to the DB URI
mongoose.connect(db.URI, {useNewUrlParser: true, useUnifiedTopology: true});

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection error'));
mongoDB.once('open', () => {
  console.log('Connected to mongoDB...');
});

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let surveysRouter = require('../routes/survey');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Path to public and node_modules folders
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

//setup express session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

//Initialize flash
app.use(flash());

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());

//Passport user config

//Create User Model Instance
let userModel = require('../models/user');
let User = userModel.User;

//Implement a User Authentication strategy
passport.use(User.createStrategy());

//Serialize and Deserialize User info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//Users route
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/survey-listSurvey', surveysRouter);

//catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {title: 'Error'});
});

module.exports = app;
