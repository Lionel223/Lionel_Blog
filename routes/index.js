require("../lib/db");
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.locals.username = req.session.name;
	res.locals.authenticated = req.session.logined;
	Blog.find(function(err,blogs,count){		//find all data
		res.render('index', {blogs:blogs});
	});
});

/* GET other page. */
router.get('/about', function(req, res, next) {
	res.locals.username = req.session.name;
	res.locals.authenticated = req.session.logined;
	res.render('./other_page/about');
});
router.get('/contact', function(req, res, next) {
	res.locals.username = req.session.name;
	res.locals.authenticated = req.session.logined;
	res.render('./other_page/contact');
});
router.get('/tutorial',function(req,res,next){
	res.locals.username = req.session.name;
	res.locals.authenticated = req.session.logined;
	Blog.find(function(err,blogs,count){		//find all data
		res.render('./other_page/tutorial', {blogs:blogs});
	});
});
router.get('/tutorial/:id',function(req,res,next){
	res.locals.username = req.session.name;
	res.locals.authenticated = req.session.logined;
	res.locals.messageID = req.params.id;
	Blog.find(function(err,blogs,count){	//mongo語法
		Blog.find({_id:req.params.id},function(err,blog1,count){
			res.render('./other_page/tutorial_article',{
				blogs:blogs,	// all
				blog1:blog1	// 篩選
			});
		});
	});
});







//test page
router.get('/tutorial_test',function(req,res,next){
	res.locals.username = req.session.name;
	res.locals.authenticated = req.session.logined;
	res.render('./other_page/tutorial_test');
});



router.get('/test', function(req, res, next) {
	res.render('./test/test');
});
router.get('/test2', function(req, res, next) {
	res.render('./test/test2');
});
router.get('/test/:username&:bb',function(req,res,next){
	res.send('user:  '+ req.params.username+'    bb:'+req.params.bb);	//params   book chap6-18
});

module.exports = router;
