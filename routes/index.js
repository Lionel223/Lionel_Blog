require("../lib/db");
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.locals.username = req.session.name;
    res.locals.authenticated = req.session.logined;
    Blog.find(function(err,blogs,count){        //find all data
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

    //tutorial page
router.get('/tutorial',function(req,res,next){
    res.locals.username = req.session.name;
    res.locals.authenticated = req.session.logined;
    Blog.find(function(err, all) {
        Blog.find().distinct("Classification",function(err,BlogDistinct){
            if(err){
                res.send(err);
            }else{
                res.render('./other_page/tutorial',{
                    BlogDistinct:BlogDistinct,
                    all:all
                });
            }
        });
    });
});

router.get('/tutorial/:id',function(req,res,next){
    res.locals.username = req.session.name;
    res.locals.authenticated = req.session.logined;
    res.locals.messageID = req.params.id;
    Blog.find({}).exec(function(err,all,count){    //mongo語法
        Blog.find().distinct("Classification",function(err,BlogDistinct){
            Blog.find({_id:req.params.id},function(err,blog1){
                if(err){
                    res.send(err);
                }else{
                    blog1[0].Article = blog1[0].Article;
                    res.render('./other_page/tutorial_article',{
                        BlogDistinct:BlogDistinct,
                        all:all,
                        blog1:blog1
                    });
                }
            });
        });
    });
});

router.get('/about_detail',function(req,res){
    res.render('./other_page/about(detail)');
});

//貪吃蛇
router.get('/snake',function(req,res){
    res.locals.username = req.session.name;
    res.locals.authenticated = req.session.logined;
    res.render('./other_page/貪吃蛇');
});



//test page
router.get('/test', function(req, res, next) {
    res.render('./test/test');
});
router.get('/test2', function(req, res, next) {
    res.render('./test/test2');
});
router.get('/test3', function(req, res, next) {
    res.render('./test/test3');
});
router.get('/test/:username&:bb',function(req,res,next){
    res.send('user:  '+ req.params.username+'    bb:'+req.params.bb);    //params   book chap6-18
});



module.exports = router;
