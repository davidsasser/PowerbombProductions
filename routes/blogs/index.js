const blogs = require('express').Router();
const db = require('../../helpers/db.js');
const auth = require('../../helpers/auth');
const fs = require('fs');

blogs.get("/blogs",function(req,res){
	db.query('SELECT p.post_id as post_id, title, content, user_id, created_on, img_id, img_position, extension FROM posts p LEFT JOIN photo_in_post pp ON p.post_id = pp.post_id;', (err, results, done) => {
		if(err) {done(err)}
		var posts = {};
		for(var i = 1; i<=results.rows.length; i++) {
			console.log(results.rows[i-1]);
			var created_on = results.rows[i-1].created_on;
			var post_id = results.rows[i-1].post_id;
			var title = results.rows[i-1].title;
			var content = results.rows[i-1].content;
			var user_id = results.rows[i-1].user_id;
			var imgPos = results.rows[i-1].img_position;
			var ext = results.rows[i-1].extension;
			var photo = '/images/';
			if (imgPos == null) {
				photo =	photo + 'WWE.png'
			}
			else {
				photo = photo + post_id + '_' + imgPos + '.' + ext;
			}
				// format date
			posts[i] = {
				"post_id": post_id,
				"title": title,
				"content": content,
				"user_id": user_id,
				"created": created_on,
				"photo": photo
			}
		}
		res.render('blogs', {active: { blogs: true }, posts: posts});
	});
});

blogs.get("/blogs/:id",function(req,res){
	var post_id = req.params.id;
	console.log(post_id)
	db.query('SELECT * FROM posts p LEFT JOIN photo_in_post pp ON p.post_id = pp.post_id WHERE p.post_id=$1', [post_id], (err, results, done) => {
		if(err) {done(err)}
		var created_on = results.rows[0].created_on;
		var title = results.rows[0].title;
		var content = results.rows[0].content;
		var user_id = results.rows[0].user_id;
		var imgPos = results.rows[0].img_position;
		var ext = results.rows[0].extension;
		var photo = '/images/';
		if (imgPos == null) {
			photo =	photo + 'WWE.png'
		}
		else {
			photo = photo + post_id + '_' + imgPos + '.' + ext;
		}
			// format date
		var posts = {
			"post_id": post_id,
			"title": title,
			"content": content,
			"user_id": user_id,
			"created": created_on,
			"photo": photo
		};
		res.render('blog_view', {active: { blogs: true }, posts: posts});
	});
});

blogs.get("/post_blog", auth.authenticationMiddleware(), (req,res) => {
	res.render('post_blog', {active: { admin: true }});
});

blogs.post("/add_post", auth.authenticationMiddleware(), (req, res) => {
	var content = req.body.content;
	var title = req.body.title;
	if(req.files) {
		var photo = req.files.photo;
		var ext = photo.name.split('.')[1];
		photo.mv('./assets/images/' + photo.name)
	}
	var today = new Date();
	var created = today.toISOString().split('.')[0];

	db.query('INSERT INTO posts(title, content, user_id, created_on) VALUES ($1, $2, $3, $4) RETURNING post_id', [title, content, 1, created], (err, results, fields) => {
		if(err) { done(err) }

		var post_id = results.rows[0].post_id;
		if(photo) {
			db.query('INSERT INTO photo_in_post(post_id, img_position, extension) VALUES ($1, $2, $3) RETURNING img_position', [post_id, 1, ext], (err, results1, fields) => {
				if(err) { console.log(err) }

				var imgPos = results1.rows[0].img_position;
				var newFile = post_id + '_' + imgPos + '.' + ext;
				fs.rename('./assets/images/' + photo.name, './assets/images/' + newFile, function (err) {
					if (err) throw err;
				});
			});
		}
		res.redirect('/blogs');
	});
});

module.exports = blogs;