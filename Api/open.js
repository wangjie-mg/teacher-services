const td = require("../lib/user").td;
const jwt = require("jsonwebtoken");
const adUser = require("../lib/user.js").adUser;
function open(req, res) {
  
  if (req.headers.authorization) {
    let token = req.headers.authorization;
    jwt.verify(token, "zypc", function (err, decode) {
      if (err) {
        res.json({
          msg: "登录过期请重新登录",
          code: 502,
        });
      } else {
        const Obj = { name: decode.name };
        
        adUser.findOne(Obj, (err, docs) => {
          if (err) {
            res.send({ code: false, errorMsg: "查询当前用户失败，" });
          } else {

            const a = JSON.parse(Object.keys(req.body)[0]);
            const state = a.state;
            const obj = {
              state: state,
            };
            
            td.findOneAndUpdate({}, obj,{new:true}, (err, doce) => {
              if (err) {
                res.send({ code: 502, msg: "更新失败" });
              }
              if (doce.state) {
                res.send({ code: 1, msg: "投票通道开启成功" });
              } else {
                res.send({ code: 2, msg: "投票通道关闭成功" });
              }
            });
          }
        });
      }
    });

    
  } else {
    res.send({ code: 500, msg: "不好意思请重新登录" });
  }
}

module.exports = open;
