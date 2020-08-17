const jwt = require("jsonwebtoken");
const adUser = require("../lib/user.js").adUser;
const td= require("../lib/user.js").td;
function token(req, res) {
  var flag=false;
      // bflag=false,
      // aflag =300;
  if(req.headers.authorization){
    // console.log(1)
    let token = req.headers.authorization;
    // console.log(2)
    
    jwt.verify(token, "zypc", function (err, decode) {
      if (err) {
        res.json({
          msg: err,
          code: 500,
        });
        return;
      } else {
        const Obj = { name: decode.name };
        adUser.findOne(Obj, (err, docs) => {
          if (err) {
            res.send({ code: false, errorMsg: "查询当前用户失败，" });
            return;
          } else {
            flag= true;
          }
        });
        
      }
    });
  }else{
    res.json({
      msg: '未登录',
      code: 500,
    }); 
    return;
  }
    td.findOne((err,docs)=>{
      if(err){
        res.send({ code: false, errorMsg: "查询失败" });
        return;
      }else{
        if(flag){
          res.json({
              code: true,
              msg: "持续化登录成功",
              state: docs.state,
          });
        }else{
          res.json({
            code:502,
            msg:"持续化登录失败"
          })
        }
        flag = false;
        
      }
    })

}


module.exports = token;