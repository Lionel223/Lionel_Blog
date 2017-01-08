var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Use in profile page
var Blog = new Schema({
    //Username: String,
    Classification: String,    // ex. Linux, HTML, CSS, JS...
    Topic: String,
    Article: String,
    CreateDate: Date
});

/*   分類功能
var Sort = new Schema({
    Classification:String,
});
*/
var Contact = new Schema({
    Name: String,
    Contact: String,
    Comment: String,
    CreateDate: Date
});

var Comment = new Schema({
    Visitor: String,
    Comment: String,
    MessageID: Schema.Types.ObjectId,
    CreateDate: Date
});

mongoose.model('Blog', Blog);
mongoose.model('Contact', Contact);
mongoose.model('Comment', Comment);
mongoose.connect('mongodb://localhost/blog');    //use blog as a database