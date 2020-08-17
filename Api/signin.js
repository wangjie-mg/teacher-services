const jwt = require("jsonwebtoken");
const adUser = require("../lib/user.js").adUser;
function signin(req, res) {
  const a = JSON.parse(Object.keys(req.body)[0]);
  const name = a.username;
  const password = a.password;
  const Obj = {name:name};

  adUser.findOne(Obj, (err, docs) => {
    if (err) {
      res.send({ code: false, errorMsg: "查询失败" });
      return;
    }
    if (docs.password === password) {
      console.log(docs.name);
      const qwe = jwt.sign({ name: name, admin: true }, "zypc", {
        expiresIn: "48h",
      });
      res.json({
        code: true,
        msg: "登录成功",
        token:qwe,
      });
    } else {
      res.send({ code: false, msg: "密码输入错误" });
    }
  });
}

module.exports = signin;