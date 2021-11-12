/*
Filename: users.js 
Group name: Xtreme Dynamos
Date: November 11, 2021
*/

var express = require('express');
var router = express.Router();

/* GET users listing.*/
router.get('/', function(req, res, next) {
  res.send('Placeholder');
});

module.exports = router;
