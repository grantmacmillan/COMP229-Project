/*
Filename: survey.js 
Group name: Xtreme Dynamos
Date: November 11, 2021
*/

let express = require('express');
const contact = require('../models/survey');
let router = express.Router();

//Create a reference to the model
let Survey = require('../models/survey');

//Display Survey List
module.exports.displaySurveyList = (req, res, next) => {
    Survey.find((err, surveyList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            let surveyArray = [];
            for(let i = 0; i < surveyList.length; i++)
            {
                surveyArray.push(surveyList[i]);
            }
            
            let sortedSurvey = surveyArray.sort((a,b) => (a.number > b.number) ? 1 : -1);
            
            res.render('survey/listSurvey', 
            {title: 'Surveys', 
            SurveyList: sortedSurvey, 
            displayName: req.user ? req.user.displayName: ''});
        }
    });
};

//Display Survey Add Page
module.exports.displaySurveyAddPage = (req, res, next) => {
    res.render('survey/addSurvey', {title: 'Survey List', displayName: req.user ? req.user.displayName: ''});
};

//Display First Template Page
module.exports.displayFirstTemplatePage = (req, res, next) => {
    res.render('survey/firstTemplateSurvey', {title: 'First Template', displayName: req.user ? req.user.displayName: ''});
};

//Display Second Template Page
module.exports.displaySecondTemplatePage = (req, res, next) => {
    res.render('survey/secondTemplateSurvey', {title: 'Second Template', displayName: req.user ? req.user.displayName: ''});
};

//Display Templates Survey Page
module.exports.displayTemplatesSurveyPage = (req, res, next) => {
    res.render('survey/templatesSurvey', {title: 'Templates', displayName: req.user ? req.user.displayName: ''});
};

//Processing Survey Add Page
module.exports.processSurveyAddPage = (req, res, next) => {
    let newSurvey = Survey({
        "title": req.body.title,
        "number": req.body.number,
        "description": req.body.description
    });

    Survey.create(newSurvey, (err, Survey) => 
    {
        if(err)
        {
            console.log(err);
            res.end(err);
        }    
        else
        {
            res.redirect('/survey-listSurvey');
        }
    });
};

//Display Survey Edit Page
module.exports.displaySurveyEditPage = (req, res, next) => {
    let id = req.params.id;
    Survey.findById(id, (err, currentSurvey) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('survey/editSurvey', {title: 'Edit Survey', survey: currentSurvey, displayName: req.user ? req.user.displayName: ''});
        }
    });
};

//Display Selected Survey
module.exports.displaySelectedSurveyPage = (req, res, next) => {
    let id = req.params.id;
    Survey.findById(id, (err, selectedSurvey) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('survey/selectedSurvey', {title: 'Selected Survey', surveySelected: selectedSurvey, displayName: req.user ? req.user.displayName: ''});
        }
    });
};

//Display Statistic Survey
module.exports.displayStatisticsSurveyPage = (req, res, next) => {
    let id = req.params.id;
    Survey.findById(id, (err, statisticSurvey) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('survey/statisticsSurvey', {title: 'Statistic', surveyStatistic: statisticSurvey, displayName: req.user ? req.user.displayName: ''});
        }
    });
};

//Process Survey Edit Page
module.exports.processSurveyEditPage = (req, res, next) => {
    let id = req.params.id;
    let updateSurvey = Survey({
        "_id": id,
        "title": req.body.title,
        "number": req.body.number,
        "description": req.body.description
    });

    Survey.updateOne({_id: id}, updateSurvey, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/survey-listSurvey');
        }
    });
};

//Perform Survey Delete
module.exports.performSurveyDelete = (req, res, next) => {
    let id = req.params.id;
    Survey.remove({_id: id}, (err) => 
    {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/survey-listSurvey');
        }
    })
};