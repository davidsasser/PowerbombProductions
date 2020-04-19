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
        "title": `This is title is for the pinned tweet.`,
        "topic_id": Math.floor(Math.random() * 10 + 1),
        "topic_type": "wwe"
    }
    for(var i = 1; i < 10; i++) {
        topics[i] = {
            "replies": Math.floor(Math.random() * 90 + 10),
            "user": "test-user",
            "title": `This is title # ${i}.`,
            "topic_id": Math.floor(Math.random() * 10 + 1),
            "topic_type": "wwe"
        }
    }
    res.render('forum', {active: { forum: true }, topics: topics, pinned: pinned});
});

forums.get("/aew", (req,res) => {

});

forums.get("/njpw", auth.authenticationMiddleware(), (req,res) => {

});

forums.get("/general", auth.authenticationMiddleware(), (req, res) => {

});

forums.get("/off-topic", auth.authenticationMiddleware(), (req, res) => {

});

forums.get("/trending", auth.authenticationMiddleware(), (req, res) => {

});

forums.post("/remove_topic/:topic_type/:id", auth.authenticationMiddleware(), (req, res) => {
    var topic_id = req.params.id;
    var topic_type = req.params.topic_type;
    console.log(`Topic ID is ${topic_id} of topic type ${topic_type}`)

    res.redirect(`/forums/${topic_type}`)
});

forums.post("/pin_topic/:topic_type/:id", auth.authenticationMiddleware(), (req, res) => {
    var topic_id = req.params.id;
    var topic_type = req.params.topic_type;
    console.log(`Topic ID is ${topic_id} of topic type ${topic_type}`)

    res.redirect(`/forums/${topic_type}`)
});

forums.post("/unpin_topic/:topic_type/:id", auth.authenticationMiddleware(), (req, res) => {
    var topic_id = req.params.id;
    var topic_type = req.params.topic_type;
    console.log(`Topic ID is ${topic_id} of topic type ${topic_type}`)

    res.redirect(`/forums/${topic_type}`)
});

module.exports = forums;