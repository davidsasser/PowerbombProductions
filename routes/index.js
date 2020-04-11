var express = require("express");
var router = express.Router();
var bcrypt = require('bcrypt');
var passport = require('passport');
const saltRounds = 10;
const db = require('../helpers/db.js');
const wf = require('../helpers/wordFreq.js')
const flash = require('express-flash-notification');
var nodemailer = require('nodemailer');
const jwt = require('jwt-simple');
const fs = require('fs');

var path = require('path');



require('url-search-params-polyfill');

var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var textract = require('textract');

var $ = jQuery = require('jquery')(window);

router.use(function (req,res,next) {
	next();
});
  
router.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login'
}));

router.get('/logout', (req, res) => {
	req.logout();
	req.session.destroy();
	res.redirect('/');
})

router.get('/wordcloud', (req, res) => {
	var id = req.query.id;
	var freq={};
	db.query('SELECT keyword, frequency FROM keywords WHERE doc_id = $1 ORDER BY frequency DESC LIMIT 10', [id], function(err, results, fields) {
			if(err) {done(err)}
			console.log(results.rows)
			for(var i = 0; i<10 ; i++) {
				freq[i] = { word: results.rows[i].keyword, freq: results.rows[i].frequency };
			}
			res.render('wordCloud', {frequency: freq});
	});
	
})

router.get('/resetpassword/:id/:token', (req, res) => {
    db.query('SELECT password, created_on FROM user_account WHERE user_id = $1', [req.params.id], function(err, results, fields) {
		var password = results.rows[0].password;
		var created_on = results.rows[0].created_on;

		var secret = `${password}-${created_on}`;
		var payload = jwt.decode(req.params.token, secret);

		res.render('resetPassword', {id: payload.id, token: req.params.token});
	});
});
router.post('/resetpassword', (req, res) => {
	db.query('SELECT password, created_on FROM user_account WHERE user_id = $1', [req.body.id], function(err, results, fields) {
		if(err) {done(err)}

		var password = results.rows[0].password;
		var created_on = results.rows[0].created_on;

		var secret = `${password}-${created_on}`;
		var payload = jwt.decode(req.body.token, secret);

		bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
			db.query('UPDATE user_account SET password = $1 WHERE user_id = $2', [hash, req.body.id], function(err, results, fields) {
				if(err) {done(err)}

			});
		});
		res.redirect('/login')
	});
})

router.get('/forgotpassword', (req, res) => {
	res.render('forgotPassword');
})
router.post('/forgotpassword', (req, res) => {
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		  user: process.env.EMAIL_USER,
		  pass: process.env.EMAIL_PASSWORD
		}
	});
	var username = req.body.username;
	db.query('SELECT user_id, password, email, created_on FROM user_account WHERE username = $1', [username], function(err, results, fields) {
		if(err) {done(err)}
		
		if(typeof results.rows[0] !== 'undefined') {
			var email = results.rows[0].email;
			var user_id = results.rows[0].user_id;
			var password = results.rows[0].password;
			var created_on = results.rows[0].created_on;

			var payload = {
				id: user_id,        // User ID from database
				email: email
			};
			var secret = `${password}-${created_on}`;
			var token = jwt.encode(payload, secret);
			var url = `http://localhost:8000/resetpassword/${payload.id}/${token}`
			var mailOptions = {
				from: process.env.EMAIL_FROM,
				to: process.env.EMAIL_TO, //email var needs to be used
				subject: 'Your password has been changed.',
				html: `<p>Please use the following link to change your password:</p><p><a href="${url}">Reset Password</a></p>`
			};
			
			transporter.sendMail(mailOptions, function(error, info){
				if (error) {
					console.log(error);
				} else {
					console.log('Email sent: ' + info.response);
				}
			});
		}
		else {
			console.log("Username does not exist.")
		}
	});
})

router.post("/register", function(req, res){
	req.checkBody('username', 'Username field cannot be empty').notEmpty();
	req.checkBody('username', 'Username must be between 3-20 characters long.').len(3, 20);
	req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
	req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
	req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
	req.checkBody('passMatch', 'Password must be between 8-100 characters long.').len(8, 100);
	req.checkBody('passMatch', 'Passwords do not match, please try again.').equals(req.body.password);

	const errors = req.validationErrors();

	if(errors) {
		console.log(`errors: ${JSON.stringify(errors)}`);

		res.render('register', {errors: errors});
	}
	else {
		var username = req.body.username;
		// var hash = bcrypt.hashSync(req.body.psw, 10);
		var password = req.body.password;
		var email = req.body.email;
		var admin = req.body.admin;
		var today = new Date();
		var created = today.toISOString().split('.')[0];
		var login = today.toISOString().split('.')[0];

		if(admin == null) {
			admin = false;
		}
		else {
			admin = true;
		}

		bcrypt.hash(password, saltRounds, (err, hash) => {
			db.query('INSERT INTO user_account (username, password, email, created_on, last_login, is_admin) VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id', [username, hash, email, created, login, admin], (error, results) => {
				if (error) {
					console.log("error ocurred", error);
					res.send({
						"code":400,
						"failed":"error ocurred"
					})
				}
				else {
					var user_id = results.rows[0];
					req.login(user_id, (err) => {
						res.redirect('/')
					});
				}
			})
		});
	}
});

passport.serializeUser((user_id, done) => {
	done(null, user_id);
})
passport.deserializeUser((user_id, done) => {
	done(null, user_id);
})

function authenticationMiddleware() {
	return (req, res, next) => {
		console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

		if (req.isAuthenticated()) return next();

		const error = 'You must login to view this page.'
		req.flash('info', error, '/')

		
	}
}

router.get("/",function(req,res){
	//console.log(req.user);
	//console.log(req.isAuthenticated());
	res.render('index', {active: { home: true }});
});

router.post('/search', (req, res) => {
	var keywords = req.body.keyword;
	keywords = keywords.replace(/\s+/g, '');
	var each_keyword = keywords.split(",");
	var errors = {};
	if(each_keyword.length > 4) {
		errors[0] = { msg: 'You may only use up to 4 search terms at a time.'}
		res.render('search', {errors: errors});
		return;
	}
	var params = [];
	for(var i = 1; i <= each_keyword.length; i++) {
		params.push('$' + i);
	}
	var each_doc = {};
	console.log(each_keyword.join());
	db.query('SELECT doc_title, d.doc_id as id, sum(k.frequency) as total_frequency FROM documents d INNER JOIN keywords k ON d.doc_id = k.doc_id WHERE k.keyword IN (' + params.join(',') + ') GROUP BY d.doc_id ORDER BY total_frequency DESC LIMIT 5', each_keyword, (err, results, fields) => {
		if(err) {done(err)}
		for(var i = 1; i<=results.rows.length; i++) {
			each_doc[i] = { title: results.rows[i-1].doc_title, id: results.rows[i-1].id };
		}
		if (results.rows.length > 0) {
			var success = true;
		}
		else {
			var success = false;
			errors[0] = { msg: 'No documents were matched with the keyword(s) provided.'}
			res.render('search', {errors: errors});
			return;
		}
		var today = new Date();
		var created_on = today.toISOString().split('.')[0];
		db.query('INSERT INTO searches (success, created_on) VALUES ($1, $2)', [success, created_on], (err1, results1, fields1) => {
			if(err) {done(err)}
			res.render('search', {active: { search: true }, docs: each_doc});
		});
	});
	
})

router.get("/search", authenticationMiddleware(), (req,res) => {
	res.render('search', {active: { search: true }});
});

router.get("/reports", authenticationMiddleware(), (req,res) => {
	res.render('reports', {active: { reports: true }});
});

router.post("/reports", authenticationMiddleware(), (req,res) => {
	var today = new Date();
	today.setDate(today.getDate()-1);
	var pastDay = today.toISOString().split('.')[0];
	today.setDate(today.getDate()-6);
	var pastWeek = today.toISOString().split('.')[0];
	var added_doc = {};
	var deleted_doc = {};
	db.query('SELECT count(user_id) as num_users FROM user_account WHERE last_login >= $1', [pastDay], (err, results, done) => {
		if(err) {done(err)}
		db.query('SELECT doc_title FROM documents WHERE added_on >= $1', [pastWeek], (err1, results1, done) => {
			if(err1) {done(err1)}
			db.query('SELECT doc_title FROM documents WHERE deleted_on >= $1', [pastWeek], (err2, results2, done) => {
				if(err2) {done(err2)}
				db.query('SELECT SUM(CASE WHEN success = TRUE then 1 else 0 end) as success, SUM(CASE WHEN success = FALSE then 1 else 0 end) as fail FROM searches WHERE created_on >= $1', [pastDay], (err3, results3, done) => {
					if(err3) {done(err3)}

					var success = results3.rows[0].success;
					var fail = results3.rows[0].fail;
					for(var i = 1; i<=results1.rows.length; i++) {
						added_doc[i] = results1.rows[i-1].doc_title;
					}
					for(var i = 1; i<=results2.rows.length; i++) {
						deleted_doc[i] = results2.rows[i-1].doc_title;
					}
					var num_users = results.rows[0].num_users;
					res.render('reports', {active: { reports: true }, user_count: num_users, add: added_doc, delete: deleted_doc, successful: success, failure: fail});
			});
			});
		});
	});
});

router.get("/about",function(req,res){
	res.render('about', {active: { about: true }});
});

router.get("/blogs",function(req,res){
	db.query('SELECT * FROM posts p LEFT JOIN photo_in_post pp ON p.post_id = pp.post_id;', (err, results, done) => {
		if(err) {done(err)}
		var posts = {};
		for(var i = 1; i<=results.rows.length; i++) {
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
		console.log(posts)
		res.render('blogs', {active: { reports: true }, posts: posts});
	});
});

router.get("/login",function(req,res){
	res.render('login', {active: { login: true }});
});

router.get("/register",function(req,res){
	res.render('register', {active: { register: true }});
});

router.get("/post_blog", authenticationMiddleware(), (req,res) => {
	res.render('post_blog', {active: { admin: true }});
});

router.post("/add_post", authenticationMiddleware(), (req, res) => {
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
		res.redirect('/about');
	});
});

router.post("/delete_document", authenticationMiddleware(), (req,res) => {
	var doc_name = req.body.doc;
	db.query('SELECT doc_id FROM documents WHERE doc_name = $1', [doc_name], (err, results, fields) => {
		if(err) { done(err) }
		var doc_id = results.rows[0].doc_id;
		db.query('DELETE FROM keywords WHERE doc_id = $1', [doc_id], (err, results, fields) => {
			if(err) { done(err) }
			var today = new Date();
			var deleted = today.toISOString().split('.')[0];
			db.query('UPDATE documents SET deleted_on = $1	WHERE doc_id = $2', [deleted, doc_id], (err, results, fields) => {
				if(err) { done(err) }
				db.query('DELETE FROM requests WHERE doc_name = $1', [doc_name], (err, results, fields) => {
					if(err) { done(err) }
				});
			});
		});
	});
	res.redirect('/requests');
});

router.post("/decline_request", authenticationMiddleware(), (req,res) => {
	var doc_name = req.body.doc
	db.query('DELETE FROM requests WHERE doc_name = $1', [doc_name], (err, results, fields) => {
		if(err) { done(err) }
	});
	res.redirect('/requests');
});

router.get("/request_add", authenticationMiddleware(), (req,res) => {
	res.render('addDocument')
});

router.post("/request_delete", authenticationMiddleware(), (req,res) => {
	var doc_name = req.body.doc + '.docx';
	db.query('INSERT INTO requests(doc_name, request_type) VALUES ($1, \'delete\')', [doc_name], function(err, results, fields) {
		if(err) {done(err)}
			res.redirect('/')
	});
});

router.get("/requests", authenticationMiddleware(), (req,res) => {
	var request = {};
	db.query('SELECT doc_name, request_type FROM requests;', (err, results, fields) => {
		if(err) { done(err) }

		for(var i = 1; i<=results.rows.length; i++) {
			request[i] = { name: results.rows[i-1].doc_name, type: results.rows[i-1].request_type };
		}
		if(results.rows.length == 0) {
			request = null;
		}
		res.render('requests', {active: { reports: true }, requests: request});
	});
});

module.exports = router;