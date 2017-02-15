require("../lib/db");
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');
var Contact = mongoose.model('Contact');
var Comment = mongoose.model('Comment');


/*logined   register*/
router.post('/login', function(req, res, next) {
    
    req.session.name = "aaa";
    req.session.passwd = "bbb";
    if ((req.body.name != req.session.name)||(req.body.passwd != req.session.passwd)){
        res.redirect('/');
        return;
    }
    req.session.logined = true;
    res.redirect('/');
});


router.post('/contact', function(req, res, next){
    new Contact({
        Name: req.body.Name,
        Contact: req.body.Contact,
        Comment: req.body.Comment,
        CreateDate: Date.now()
    }).save(function(err){
        if(err){
            console.log("Fail to save to DB.\n");
            return;
        }
        console.log("Save to DB.\n");
    });
    res.redirect("/");
})

/*add article*/
router.post('/add', function(req, res, next) {
    if (!req.session.name){
        res.redirect('/');
        return;
    }
    new Blog({
        Classification: req.body.Classification,
        Topic: req.body.Topic,
        Article: req.body.Content,
        CreateDate: Date.now()
    }).save(function(err){
        if(err){
            console.log('Fail to save to DB.\n');
            return;
        }
        console.log('Save to DB.\n');
    });
    res.redirect('/tutorial');        //can it refresh??
});


/*delete article*/
router.get('/delete/:id', function(req, res, next) {
    Blog.remove({_id:req.params.id }, function(err){        
    //params (look express 4)    
    //http://expressjs.com/en/guide/routing.html#route-parameters
        if(err){console.log("Fail to delete article.");}
        else{console.log("Done");}
    });
    res.redirect('/tutorial');
});

/*update article*/
router.post('/update/:id', function(req, res, next) {
    if(!req.params.id){
        res.redirect('/');
        return;
    }
    Blog.update({_id:req.params.id},{
        Classification: req.body.Classification,
        Topic: req.body.Topic,
        Article: req.body.Content    //time don''t update
        },function(err){
        if(err){console.log('Fail to update article.');}
        else{console.log('Done')};
    });
    res.redirect('/tutorial');
});

/*  comment not yet  */
router.post('/comment/:id', function(req, res, next) {
    if (!req.params.id){
        res.redirect('/');
        return;
    }
    new Comment({
        Visitor: req.body.Visitor,
        Comment: req.body.Comment,
        MessageID: req.params.id,
        CreateDate: Date.now()
    }).save(function(err){
        if(err){
            console.log('Fail to save to DB.');
            return;
        }
        else{console.log('Save to DB.');}
    });
    res.redirect('/users/message/'+req.params.id);
});

module.exports = router;
