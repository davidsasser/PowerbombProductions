const my_account = require('express').Router();
const db = require('../../helpers/db.js');
const auth = require('../../helpers/auth');
const fs = require('fs');

my_account.get("/", auth.authenticationMiddleware(), (req, res) => {
    console.log(req.user)
	res.render("my_account", {username: req.user.username, email: req.user.email})
});

module.exports = my_account;