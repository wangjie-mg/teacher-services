const jwt = require("jsonwebtoken");
const pbUser = require("../lib/user.js").pbUser;
// const md5 = require('md5-node');
function strike(req, res) {
  const a = JSON.parse(Object.keys(req.body)[0]);
  if(req.headers.authorization){
    let token = req.headers.authorization;
    // var decoded = jwt.decode(token);
    jwt.verify(token, "zypc", function (err, decode) {
      if (err) {
        res.json({
          msg: "登录过期请重新登录",
          code: 500,
        });
      } else {

        pbUser.remove({_id:a._id},(err,docs)=>{
            if(err){
                res.json({
                    code:502,
                    msg:"删除出错"
                })
            }else{
                res.json({
                    code:true,
                    msg:"删除成功"
                })
            }
        })
      }
    });
  }else{
    res.json({
      msg: '未登录请先登录',
      code: 501,
    });
  }
}

module.exports = strike;