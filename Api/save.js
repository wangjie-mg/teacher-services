const jwt = require("jsonwebtoken");
// const { restart } = require("nodemon");
const pbUser = require("../lib/user.js").pbUser;

function save(req, res) {
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

        pbUser.create({
            name:a.name,
            address:a.address,
            imgname:a.imgname,
            img:a.imgurl,
            desc:a.desc,
            support:0,
        },(err, docs) => {
          if (err) {
            res.json({ code: 502, msg: "保存当前用户失败" });
          } else {
            res.json({user:docs,code:true,msg:"信息保存成功"})
          }
        });
      }
    });
  }else{
    res.json({
      msg: '未登录请先登录',
      code: 501,
    });
  }
}

module.exports = save;