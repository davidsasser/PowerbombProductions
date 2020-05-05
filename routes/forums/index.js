const forums = require('express').Router();
const db = require('../../helpers/db.js');
const auth = require('../../helpers/auth');
const df = require('../../helpers/dateFormat');
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
    db.query("WITH RECURSIVE MyTree AS (SELECT * FROM replies WHERE parent_id IS NULL UNION ALL SELECT m.* FROM replies AS m JOIN MyTree AS t ON m.parent_id = t.reply_id) SELECT r.message, r.reply_id, r.created_on, r.parent_id, u.username FROM MyTree r LEFT JOIN user_account u ON r.user_id = u.user_id WHERE r.topic_id = $1", [req.params.id], (error, results) => {
        if(error) {
            console.log(error)
            res.render("404")
        }
        const roots = [];
        const byId = new Map();
        
        var commentList = results.rows;
        for(const reply of commentList) {
            reply.created_on = df.formatDate(reply.created_on);
            byId.set(reply.reply_id, reply);
        }

        for(const reply of commentList) {
            const {parent_id} = reply;
            if(parent_id) {
                const parent = byId.get(parent_id);
                (parent.children || (parent.children = [])).push(reply);
            } else {
                roots.push(reply);
            }
        }
        var commentHTML = createCommentHTML(req.params.id, "wwe", roots);
        db.query("SELECT t.subject, t.created_on, u.username FROM topics t LEFT JOIN user_account u ON t.user_id = u.user_id WHERE topic_id = $1", [req.params.id], (error1, results1) => {
            if(error1) {
                console.log(error1)
                res.render("404")
            }
            var subject = results1.rows[0].subject;
            var created_on = df.formatDate(results1.rows[0].created_on);
            var username = results1.rows[0].username;
            res.render("forum_view", {active: { forum: true, wwe: true }, comments: commentHTML, topic: subject, topic_id: req.params.id, created: created_on, username: username, topic_type: "wwe"});
        })
    })
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

forums.post("/add_comment", auth.authenticationAdminMiddleware(), (req, res) => {
    var topic_id = req.body.topic_id;
    var topic_type = req.body.topic_type;
    var comment = req.body.comment;
    var today = new Date();
    var created = today.toISOString().split('.')[0];
    
    db.query('INSERT INTO replies(message, created_on, parent_id, user_id, topic_id) VALUES ($1, $2, $3, $4, $5)', [comment, created, null, req.user.user_id, topic_id], (err, results, fields) => {
		if(err) { 
            console.log(err);
            res.render('404') 
        }
        else {
    		res.redirect(`/forums/${topic_type}/${topic_id}`);
        }
    });
});

forums.post("/add_reply", auth.authenticationAdminMiddleware(), (req, res) => {
    var topic_id = req.body.topic_id;
    var parent_id = req.body.comment_id;
    var topic_type = req.body.topic_type;
    var comment = req.body.comment;
    var today = new Date();
    var created = today.toISOString().split('.')[0];
    
    db.query('INSERT INTO replies(message, created_on, parent_id, user_id, topic_id) VALUES ($1, $2, $3, $4, $5)', [comment, created, parent_id, req.user.user_id, topic_id], (err, results, fields) => {
		if(err) { 
            console.log(err);
            res.render('404') 
        }
        else {
    		res.redirect(`/forums/${topic_type}/${topic_id}`);
        }
    });
});

function createCommentHTML(topic_id, topic_type, replies, depth = 0, HTML = "") {
    var tab = "";
    if(depth > 0) {
        tab = " tab"
    }
    for(const reply of replies) {
        HTML = createCommentHTML(topic_id, topic_type, reply.children || [], depth + 1, HTML  
            + `<section class="blog-meta-footer${tab}">`
            + `<div class="comment-section-border" style="margin-left:${(depth+1)*1.5}rem;">`
            + `<div class="comment-byline">`
            + `<span class="byline__authorname">${reply.username}</span>`
            + `<span class="forum-timestamp">${reply.created_on}</span>`
            + `<br/>`
            + `<span class="comment-text">${reply.message}</span>`
            + `</div>`
            + `<div class="comment-options">`
            + `<button onclick="showTextarea('${reply.reply_id}')"><i class="fas fa-comment-alt"></i> Reply</button>`
            + `<form class="report-form">`
            + `<button>Report</button>`
            + `</form>`
            + `</div>`
            + `<form id="comment-${reply.reply_id}" class="reply-form" method="POST" action="/forums/add_reply">`
            + `<input type="hidden"  name="comment_id" value="${reply.reply_id}">`
            + `<input type="hidden"  name="topic_type" value="${topic_type}">`
            + `<input type="hidden"  name="topic_id" value="${topic_id}">`
            + `<div class="blog-image-container">`
            + `<textarea type="text" name="comment" class="add-post-textarea" placeholder="Add a comment"></textarea>`
            + `<div class="reply-submit">`
            + `<input type="submit" value="Submit">`
            + `</div></div></form></div></section>`);
    }
    return HTML
}

module.exports = forums;