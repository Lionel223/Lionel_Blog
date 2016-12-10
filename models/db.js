var settings = require('../settings'),
        Db = require('mongodb').Db,
        Connection = require('mongodb').Connection,
        Server = require('mongodb').Server;

module.exports = new Db(settings.db, new Server(settings.host, settings.port),
 {safe: true});


//设置数据库名、數據庫地址和數據庫端口創建了一個數據庫連接實例，
//並通過module.exports導出該實例