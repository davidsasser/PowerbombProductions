const forums = require('express').Router();
const db = require('../../helpers/db.js');
const auth = require('../../helpers/auth');
const fs = require('fs');

forums.get("/wwe", (req,res) => {
    var topics = {};
    var pinned = {};
    pinned[1] = {
        "replies": Math.floor(Math.random() * 90 + 10),
        "user": "test-user",
        "title": `This is title is for the pinned tweet.`
    }
    for(var i = 1; i < 10; i++) {
        topics[i] = {
            "replies": Math.floor(Math.random() * 90 + 10),
            "user": "test-user",
            "title": `This is title # ${i}.`
        }
    }
    res.render('forum', {active: { forum: true }, topics: topics, pinned: pinned});
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