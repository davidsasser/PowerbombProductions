const forums = require('express').Router();
const db = require('../../helpers/db.js');
const auth = require('../../helpers/auth');
const fs = require('fs');

forums.get("/wwe", (req,res) => {
    var topics = [];
    var pinned = [];
    db.query("WITH r AS (SELECT topic_id, COUNT(reply_id) AS replies FROM replies GROUP BY topic_id) SELECT t.topic_id, t.subject, t.topic_type, t.created_on, t.pinned, r.replies, u.username FROM topics t LEFT JOIN r ON t.topic_id = r.topic_id LEFT JOIN user_account u ON t.user_id = u.user_id WHERE t.topic_type = $1", ["wwe"], (error, results) => {
        if(error) {console.log(error)}

        var forumList = results.rows;
        for(var i = 0; i<forumList.length; i++) {
            if(results.rows[i].pinned == true) {
                var replies = (forumList[i].replies == null) ? 0 : forumList[i].replies;
                pinned.push({
                    "replies": replies,
                    "user": forumList[i].username,
                    "title": forumList[i].subject,
                    "topic_id": forumList[i].topic_id,
                    "topic_type": forumList[i].topic_type
                })
            }
            else {
                var replies = (forumList[i].replies == null) ? 0 : forumList[i].replies;
                topics.push({
                    "replies": replies,
                    "user": forumList[i].username,
                    "title": forumList[i].subject,
                    "topic_id": forumList[i].topic_id,
                    "topic_type": forumList[i].topic_type
                })
            }
        }
        res.render('forum', {active: { forum: true, wwe: true }, topics: topics, pinned: pinned, topic_title: "WWE", topic_type: "wwe"});
    })
});

forums.get("/aew", (req,res) => {
    var topics = [];
    var pinned = [];
    db.query("WITH r AS (SELECT topic_id, COUNT(reply_id) AS replies FROM replies GROUP BY topic_id) SELECT t.topic_id, t.subject, t.topic_type, t.created_on, t.pinned, r.replies, u.username FROM topics t LEFT JOIN r ON t.topic_id = r.topic_id LEFT JOIN user_account u ON t.user_id = u.user_id WHERE t.topic_type = $1", ["aew"], (error, results) => {
        if(error) {console.log(error)}

        var forumList = results.rows;
        for(var i = 0; i<forumList.length; i++) {
            if(results.rows[i].pinned == true) {
                var replies = (forumList[i].replies == null) ? 0 : forumList[i].replies;
                pinned.push({
                    "replies": replies,
                    "user": forumList[i].username,
                    "title": forumList[i].subject,
                    "topic_id": forumList[i].topic_id,
                    "topic_type": forumList[i].topic_type
                })
            }
            else {
                var replies = (forumList[i].replies == null) ? 0 : forumList[i].replies;
                topics.push({
                    "replies": replies,
                    "user": forumList[i].username,
                    "title": forumList[i].subject,
                    "topic_id": forumList[i].topic_id,
                    "topic_type": forumList[i].topic_type
                })
            }
        }
        res.render('forum', {active: { forum: true, aew: true }, topics: topics, pinned: pinned, topic_title: "AEW", topic_type: "aew"});
    })
});

forums.get("/njpw", (req,res) => {
    var topics = [];
    var pinned = [];
    db.query("WITH r AS (SELECT topic_id, COUNT(reply_id) AS replies FROM replies GROUP BY topic_id) SELECT t.topic_id, t.subject, t.topic_type, t.created_on, t.pinned, r.replies, u.username FROM topics t LEFT JOIN r ON t.topic_id = r.topic_id LEFT JOIN user_account u ON t.user_id = u.user_id WHERE t.topic_type = $1", ["njpw"], (error, results) => {
        if(error) {console.log(error)}

        var forumList = results.rows;
        for(var i = 0; i<forumList.length; i++) {
            if(results.rows[i].pinned == true) {
                var replies = (forumList[i].replies == null) ? 0 : forumList[i].replies;
                pinned.push({
                    "replies": replies,
                    "user": forumList[i].username,
                    "title": forumList[i].subject,
                    "topic_id": forumList[i].topic_id,
                    "topic_type": forumList[i].topic_type
                })
            }
            else {
                var replies = (forumList[i].replies == null) ? 0 : forumList[i].replies;
                topics.push({
                    "replies": replies,
                    "user": forumList[i].username,
                    "title": forumList[i].subject,
                    "topic_id": forumList[i].topic_id,
                    "topic_type": forumList[i].topic_type
                })
            }
        }
        res.render('forum', {active: { forum: true, njpw: true }, topics: topics, pinned: pinned, topic_title: "NJPW", topic_type: "njpw"});
    })
});

forums.get("/general", (req,res) => {
    var topics = [];
    var pinned = [];
    db.query("WITH r AS (SELECT topic_id, COUNT(reply_id) AS replies FROM replies GROUP BY topic_id) SELECT t.topic_id, t.subject, t.topic_type, t.created_on, t.pinned, r.replies, u.username FROM topics t LEFT JOIN r ON t.topic_id = r.topic_id LEFT JOIN user_account u ON t.user_id = u.user_id WHERE t.topic_type = $1", ["general"], (error, results) => {
        if(error) {console.log(error)}

        var forumList = results.rows;
        for(var i = 0; i<forumList.length; i++) {
            if(results.rows[i].pinned == true) {
                var replies = (forumList[i].replies == null) ? 0 : forumList[i].replies;
                pinned.push({
                    "replies": replies,
                    "user": forumList[i].username,
                    "title": forumList[i].subject,
                    "topic_id": forumList[i].topic_id,
                    "topic_type": forumList[i].topic_type
                })
            }
            else {
                var replies = (forumList[i].replies == null) ? 0 : forumList[i].replies;
                topics.push({
                    "replies": replies,
                    "user": forumList[i].username,
                    "title": forumList[i].subject,
                    "topic_id": forumList[i].topic_id,
                    "topic_type": forumList[i].topic_type
                })
            }
        }
        res.render('forum', {active: { forum: true, general: true }, topics: topics, pinned: pinned, topic_title: "General", topic_type: "general"});
    })
});

forums.get("/off_topic", (req,res) => {
    var topics = [];
    var pinned = [];
    db.query("WITH r AS (SELECT topic_id, COUNT(reply_id) AS replies FROM replies GROUP BY topic_id) SELECT t.topic_id, t.subject, t.topic_type, t.created_on, t.pinned, r.replies, u.username FROM topics t LEFT JOIN r ON t.topic_id = r.topic_id LEFT JOIN user_account u ON t.user_id = u.user_id WHERE t.topic_type = $1", ["off_topic"], (error, results) => {
        if(error) {console.log(error)}

        var forumList = results.rows;
        for(var i = 0; i<forumList.length; i++) {
            if(results.rows[i].pinned == true) {
                var replies = (forumList[i].replies == null) ? 0 : forumList[i].replies;
                pinned.push({
                    "replies": replies,
                    "user": forumList[i].username,
                    "title": forumList[i].subject,
                    "topic_id": forumList[i].topic_id,
                    "topic_type": forumList[i].topic_type
                })
            }
            else {
                var replies = (forumList[i].replies == null) ? 0 : forumList[i].replies;
                topics.push({
                    "replies": replies,
                    "user": forumList[i].username,
                    "title": forumList[i].subject,
                    "topic_id": forumList[i].topic_id,
                    "topic_type": forumList[i].topic_type
                })
            }
        }
        res.render('forum', {active: { forum: true, off_topic: true }, topics: topics, pinned: pinned, topic_title: "Off Topic", topic_type: "off_topic"});
    })
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

forums.get("/wwe/:id", (req,res) => {
    res.render("forum_view");
});

forums.get("/aew/:id", (req,res) => {

});

forums.get("/njpw/:id", (req,res) => {

});

forums.get("/general/:id", (req,res) => {

});

forums.get("/off_topic/:id", (req,res) => {

});

forums.get("/post_forum", auth.authenticationMiddleware(), (req,res) => {
    var topic_type = req.query.topic_type;
    res.render('post_forum', {topic_type: topic_type})
});

forums.post("/post_forum", auth.authenticationMiddleware(), (req,res) => {
    var topic_type = req.body.topic_type;
    var content = req.body.content;
    var user_id = req.user.user_id;

    var today = new Date();
	var created = today.toISOString().split('.')[0];

	db.query('INSERT INTO topics(topic_type, subject, created_on, user_id) VALUES ($1, $2, $3, $4)', [topic_type, content, created, user_id], (err, results, fields) => {
		if(err) { 
            console.log(err);
            res.render('404') 
        }
        else {
    		res.redirect(`/forums/${topic_type}`);
        }
    });
});

forums.post("/remove_topic/:topic_type/:id", auth.authenticationAdminMiddleware(), (req, res) => {
    var topic_id = req.params.id;
    var topic_type = req.params.topic_type;
    console.log(`Topic ID is ${topic_id} of topic type ${topic_type}`)

    res.redirect(`/forums/${topic_type}`)
});

forums.post("/pin_topic/:topic_type/:id", auth.authenticationAdminMiddleware(), (req, res) => {
    var topic_id = req.params.id;
    var topic_type = req.params.topic_type;
    console.log("made it here")
    db.query('UPDATE topics SET pinned=true WHERE topic_id=$1', [topic_id], (err, results, fields) => {
		if(err) { 
            console.log(err);
            res.render('404') 
        }
        else {
    		res.redirect(`/forums/${topic_type}`);
        }
    });
});

forums.post("/unpin_topic/:topic_type/:id", auth.authenticationAdminMiddleware(), (req, res) => {
    var topic_id = req.params.id;
    var topic_type = req.params.topic_type;
    db.query('UPDATE topics SET pinned=false WHERE topic_id=$1', [topic_id], (err, results, fields) => {
		if(err) { 
            console.log(err);
            res.render('404') 
        }
        else {
    		res.redirect(`/forums/${topic_type}`);
        }
    });
});

module.exports = forums;