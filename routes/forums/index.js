const forums = require('express').Router();
const db = require('../../helpers/db.js');
const auth = require('../../helpers/auth');
const fs = require('fs');

forums.get("/wwe", (req,res) => {

});

forums.get("/aew", (req,res) => {

});

forums.get("/njpw", auth.authenticationMiddleware(), (req,res) => {

});

forums.post("/general", auth.authenticationMiddleware(), (req, res) => {

});

forums.post("/off-topic", auth.authenticationMiddleware(), (req, res) => {

});

forums.post("/trending", auth.authenticationMiddleware(), (req, res) => {

});

module.exports = forums;