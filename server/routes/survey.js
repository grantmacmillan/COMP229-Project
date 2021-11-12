/*
Filename: survey.js 
Group name: Xtreme Dynamos
Date: November 11, 2021
*/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

//helper function for guard purposes
function requireAuth(req, res, next)
{
    //check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

//reference to survey controller
let contactController = require('../controllers/survey');

/*Get Route for the Survey List page - READ Operation*/
router.get('/', contactController.displaySurveyList);

/*Get Route for displaying the Add page - CREATE Operation*/
router.get('/addSurvey', requireAuth, contactController.displaySurveyAddPage);

/*Get Route for displaying the Templates Survey page*/
router.get('/templatesSurvey', requireAuth, contactController.displayTemplatesSurveyPage);

/*Get Route for displaying the First Template page*/
router.get('/firstTemplateSurvey', requireAuth, contactController.displayFirstTemplatePage);

/*Get Route for displaying the Second Template page*/
router.get('/secondTemplateSurvey', requireAuth, contactController.displaySecondTemplatePage);

/*Post Route for processing the Add page - CREATE Operation*/
router.post('/firstTemplateSurvey', requireAuth, contactController.processSurveyAddPage);

/*Post Route for processing the Add page - CREATE Operation*/
router.post('/secondTemplateSurvey', requireAuth, contactController.processSurveyAddPage);

/*Get Route for displaying the Edit page - UPDATE Operation*/
router.get('/editSurvey/:id', requireAuth, contactController.displaySurveyEditPage);

/*Post Route for processing the Edit page - UPDATE Operation*/
router.post('/editSurvey/:id', requireAuth, contactController.processSurveyEditPage);

/*Get to perform contact deletion - DELETE Operation*/
router.get('/delete/:id', requireAuth, contactController.performSurveyDelete);

/*Get Route for displaying the Selected Survey page*/
router.get('/selectedSurvey/:id', contactController.displaySelectedSurveyPage);

/*Get Route for displaying the Selected Survey page*/
router.get('/statisticsSurvey/:id', contactController.displayStatisticsSurveyPage);

module.exports = router;