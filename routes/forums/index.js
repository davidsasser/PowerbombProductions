const forums = require('express').Router();
const db = require('../../helpers/db.js');
const auth = require('../../helpers/auth');
const fs = require('fs');

forums.get("/wwe", (req,res) => {
    // if(!topic_types.includes(topic_type)) {
    //     res.status(404);

    //     // respond with html page
    //     if (req.accepts('html')) {
    //         res.render('404', { url: req.url });
    //         return;
    //     }

    //     // respond with json
    //     if (req.accepts('json')) {
    //         res.send({ error: 'Not found' });
    //         return;
    //     }

    //     // default to plain-text. send()
    //     res.type('txt').send('Not found');
    // }
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
    res.render('forum', {active: { forum: true, wwe: true }, topics: topics, pinned: pinned, topic_title: "WWE", topic_type: "wwe"});
});

forums.get("/aew", (req,res) => {
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
    res.render('forum', {active: { forum: true, aew: true }, topics: topics, pinned: pinned, topic_title: "AEW", topic_type: "aew"});
});

forums.get("/njpw", (req,res) => {
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
    res.render('forum', {active: { forum: true, njpw: true }, topics: topics, pinned: pinned, topic_title: "NJPW", topic_type: "njpw"});
});

forums.get("/general", (req,res) => {
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
    res.render('forum', {active: { forum: true, general: true }, topics: topics, pinned: pinned, topic_title: "General", topic_type: "general"});
});

forums.get("/off_topic", (req,res) => {
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
    res.render('forum', {active: { forum: true, off_topic: true }, topics: topics, pinned: pinned, topic_title: "Off Topic", topic_type: "off_topic"});
});

forums.get("/trending", (req,res) => {
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
    res.render('forum', {active: { forum: true, trending: true }, topics: topics, pinned: pinned, topic_type: "Trending"});
});

forums.get("/post_forum", (req,res) => {
    var topic_type = req.query.topic_type;
    res.render('post_forum', {topic_type: topic_type})
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