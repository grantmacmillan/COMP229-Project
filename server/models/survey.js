/*
Filename: survey.js 
Group name: Xtreme Dynamos
Date: November 11, 2021
*/

let mongoose =  require('mongoose');

//Create a survey model class
let surveyModel = mongoose.Schema({
    title: String,
    number: String,
    description: String
},
{
    collection: "survey"
}
);

module.exports = mongoose.model('Survey', surveyModel);