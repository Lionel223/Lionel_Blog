require('../lib/db');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');		//將Schema 定義到一個叫做Blog/Comment的model，當要使用這個model
var Comment = mongoose.model('Comment');	//只要用mongoose.model()將 model讀出來，便可以對他進行操作

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

/*register	會員註冊*/
router.get('/register',function(req,res,next){
	if(req.session.logined){
		res.redirect('/');
		return;
	}
	res.render('register');		//file
});

/*signin		登入*/
router.get('/signin', function(req, res, next) {
	if(req.session.logined){
		res.redirect('/');
		return;
	}
	res.render('login');		//file
});

/*sign out	登出*/
router.get('/signout', function(req, res, next) {
	req.session.logined = false;
	res.redirect('/');
	res.end;
});
/*foget your password*/
router.get('/forget', function(req, res, next) {	//寫入個人信箱，寄密碼到郵件(undone)	 *尚未修改
	if(req.session.logined){
		res.redirect('/');
		return;
	}
	res.render('forget');
});

/*add new article*/
router.get('/add_article', function(req, res, next) {
	if((!req.session.name) || (!req.session.logined)){
		res.redirect('/');
		return;
	}
	res.locals.username = req.session.name;
	res.locals.authenticated = req.session.logined;
	res.render('add_article');
});

/*modify article*/
router.get('/modify/:id', function(req, res, next) {
	if((!req.session.name) || (!req.session.logined)){
		res.redirect('/');
		return;
	}
	res.locals.username = req.session.name;
	res.locals.authenticated = req.session.logined;
	res.locals.messageID = req.params.id;
	Blog.find({_id:req.params.id},function(err,blogs,count){
		res.render('modify',{blogs:blogs});
	});
});









//not  yet
//visit    訪客留言
router.get('/message/:id', function(req, res, next) {
	res.locals.username = req.session.name;
	res.locals.authenticated = req.session.logined;
	res.locals.messageID = req.params.id;
	Blog.find({_id: req.params.id}, function(err,blogs,count){
		Comment.find({MessageID: req.params.id}, function(err, comments, count){
			res.render('message',{
				blogs:blogs,
				comments:comments
			});
		});
	});
});

module.exports = router;
