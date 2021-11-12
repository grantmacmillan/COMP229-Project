/*
Filename: index.js
Group name: Xtreme Dynamos
Date: November 11, 2021
*/

let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET about page. */
router.get('/about', indexController.displayAboutPage);

/* GET projects page. */
router.get('/projects', indexController.displayProjectsPage);

/* GET services page. */
router.get('/services', indexController.displayServicesPage);

/* GET contact page. */
router.get('/contact', indexController.displayContactMePage);

/*Get Route for displaying the Login page*/
router.get('/login', indexController.displayLoginPage);

/*Post Route for processing the Login page*/
router.post('/login', indexController.processLoginPage);

/*Get Route for displaying the Register page*/
router.get('/register', indexController.displayRegisterPage);

/*Post Route for processing the REgister page*/
router.post('/register', indexController.processRegisterPage);

/*Get Route to perform Logout*/
router.get('/logout', indexController.performLogout);

module.exports = router;
