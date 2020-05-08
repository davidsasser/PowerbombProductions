const login = require('express').Router();
const db = require('../../helpers/db.js');
var bcrypt = require('bcrypt');
var passport = require('passport');
var nodemailer = require('nodemailer');
const jwt = require('jwt-simple');
const Filter = require('bad-words')

const saltRounds = 10;

passport.serializeUser((user_id, done) => {
	done(null, user_id);
})
passport.deserializeUser((user_id, done) => {
	done(null, user_id);
})
  
login.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login'
}));

login.get('/logout', (req, res) => {
	req.logout();
	req.session.destroy();
	res.redirect('/');
})

login.get('/resetpassword/:id/:token', (req, res) => {
    db.query('SELECT password, created_on FROM user_account WHERE user_id = $1', [req.params.id], function(err, results, fields) {
		var password = results.rows[0].password;
		var created_on = results.rows[0].created_on;

		var secret = `${password}-${created_on}`;
		var payload = jwt.decode(req.params.token, secret);

		res.render('resetPassword', {id: payload.id, token: req.params.token});
	});
});

login.post('/resetpassword', (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        db.query('UPDATE user_account SET password = $1 WHERE user_id = $2', [hash, req.body.id], function(err, results, fields) {
            if(err) {done(err)}

        });
    });
    res.redirect('/login')
})

login.get('/forgotpassword', (req, res) => {
	res.render('forgotPassword');
})

login.post('/forgotpassword', (req, res) => {
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

login.post("/register", function(req, res){
    const filter = new Filter()

	req.checkBody('username', 'Username field cannot be empty').notEmpty();
	req.checkBody('username', 'Username must be between 3-20 characters long.').len(3, 20);
	req.checkBody('username', 'Please choose a different username.').custom(value => {
        return !filter.isProfane(value);
    });
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
		var today = new Date();
		var created = today.toISOString().split('.')[0];
		var login = today.toISOString().split('.')[0];

		bcrypt.hash(password, saltRounds, (err, hash) => {
			db.query('INSERT INTO user_account (username, password, email, created_on, last_login) VALUES ($1, $2, $3, $4, $5) RETURNING user_id', [username, hash, email, created, login], (error, results) => {
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

login.get("/login",function(req,res){
	res.render('login', {active: { login: true }});
});

login.get("/register",function(req,res){
	res.render('register', {active: { register: true }});
});

module.exports = login;