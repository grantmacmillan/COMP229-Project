/*
Filename: index.js 
Group name: Xtreme Dynamos
Date: November 11, 2021
*/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//create User Model instance
let userModel = require('../models/user');
let User = userModel.User; //alias

//Displays Home Page
module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home', displayName: req.user ? req.user.displayName : ''});
};

//Displays About Page
module.exports.displayAboutPage = (req, res, next) => {
    res.render('about', {title: 'About Me', displayName: req.user ? req.user.displayName : ''});
};

//Displays Projects Page
module.exports.displayProjectsPage = (req, res, next) => {
    res.render('projects', {title: 'Projects', displayName: req.user ? req.user.displayName : ''});
};

//Displays Services Page
module.exports.displayServicesPage = (req, res, next) => {
    res.render('services', {title: 'Services', displayName: req.user ? req.user.displayName : ''});
};

//Displays Contact Me Page
module.exports.displayContactMePage = (req, res, next) => {
    res.render('contact', {title: 'Contact Me', displayName: req.user ? req.user.displayName : ''});
};


//Displays Login Page
module.exports.displayLoginPage = (req, res, next) =>
{
    //check if the user is already logged in
    if(!req.user)
    {
        res.render('auth/login', 
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName: ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}  

//Processes Login Page
module.exports.processLoginPage = (req, res, next) =>
{
    passport.authenticate('local', 
    (err, user, info) => 
    {
       //server error?
       if(err)
       {
           return next(err);
       } 

       //is there a user login error?
       if(!user)
       {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
       }

       req.login(user, (err) => {
           //server error?
           if(err)
           {
                return next(err);               
           }
           return res.redirect('/survey-listSurvey');
       });
    }) (req, res, next);
}

//Displays Register Page
module.exports.displayRegisterPage = (req, res, next) =>
{
    //Checks if the user is not already logged in
    if(!req.user)
    {
        res.render('auth/register', {
            title: "Register",
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName: ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

//Process Register Page
module.exports.processRegisterPage = (req, res, next) =>
{
    //create a user object
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) =>
    {
        if(err)
        {
            console.log("Error: Inserting New User");
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!' 
                );
                console.log('Error: User Already Exists!')  
            }
            return res.render('auth/register', 
            {
                title: "Register",
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName: '' 
            });
        }
        else
        {
            //if no error exists, then registration is successful
            //redirect the user and authenticate them
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/survey-listSurvey');
            });
        }
    });
    if(!req.user)
    {
        res.render('auth/register', {
            title: "Register",
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName: ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

//Perform Logout
module.exports.performLogout = (req, res, next) => 
{
    req.logout();
    res.redirect('/');
}

