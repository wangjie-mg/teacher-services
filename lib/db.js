var DB_URL = 'mongodb://0.0.0.0:27017/teacher';
var mongooseuser = require('mongoose');

mongooseuser.connect(DB_URL,function(err){
    if(err){
        console.warn('数据库连接失败：'+err);
    }else {
        console.log('数据库成功');
    }
});

exports.mongooseuser = mongooseuser;