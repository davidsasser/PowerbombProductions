var express = require("express");
var router = express.Router();

const blogs = require('./blogs');
const login = require('./login');

router.use('/', blogs);
router.use('/', login);

require('url-search-params-polyfill');

var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);

router.use(function (req,res,next) {
	next();
});

router.get("/",function(req,res){
	res.render('index', {active: { home: true }});
});

router.get("/about",function(req,res){
	res.render('about', {active: { about: true }});
});

module.exports = router;