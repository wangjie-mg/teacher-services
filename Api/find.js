const jwt = require("jsonwebtoken");
const pbUser = require("../lib/user.js").pbUser;
function find(req, res) {
  
  if (req.headers.authorization && req.headers.authorization !=='100') {
    let token = req.headers.authorization;
    jwt.verify(token, "zypc", function (err, decode) {
      if (err) {
        res.json({
          msg: "登录过期请重新登录",
          code: 500,
        });
      } else {
        let obj = {};
    const a = JSON.parse(Object.keys(req.body)[0]);

        if (a.code === 100) {
          obj = { name: a.name };
        }
        pbUser.find(obj, (err, docs) => {
          if (err) {
            res.json({
              code: 502,
              msg: "查询出现错误",
            });
          } else {
            res.json({
              user: docs,
              code: true,
            });
          }
        });
      }
    });
  }else if(req.headers.authorization ==='100') {
    pbUser.find({}). sort({support:'-1'}).exec((err, docs) => {
      if (err) {
        res.json({
          code: 502,
          msg: "查询出现错误",
        });
      } else {
       
        const doc=docs.map((item,index)=>{
          return {...item,pm:index+1};
        })
        
        res.json({
          user: doc,
          code: true,
        });
      }
    });
  }else {
    res.json({
      msg: "未登录请先登录",
      code: 501,
    });
  }
}

module.exports = find;
