/*
Filename: user.js 
Group name: Xtreme Dynamos
Date: November 11, 2021
*/

//require modules for the user model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

//create a user model class
let User = mongoose.Schema(
    {
        username: 
        {
            type: String,
            default: "",
            trim: true,
            required: "Username is required"
        },
        email:
        {
            type: String,
            default: "",
            trim: true,
            required: "Email is required"
        },
        displayName:
        {
            type: String,
            default: "",
            trim: true,
            required: "Display Name is required"
        },
        created:
        {
            type: Date,
            default: Date.now,
           
        },
        updated:
        {
            type: Date,
            default: Date.now,
           
        }
    },
    {
        collection: "users"
    }
);

//configure options for the User Model
let options = ({missingPasswordError: 'Wrong/Missing Password'});
User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', User);