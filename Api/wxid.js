const https = require("https");
const tdUser = require("../lib/user.js").tdUser;
const td = require("../lib/user.js").td;

function wxid(req, res) {
  const a = JSON.parse(Object.keys(req.body)[0]);

  const option = new URL(
    "https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=wxe0957da43aa7e2c3&corpsecret=WkgiI5TEmQlDwQk2mN6B3kAiPnoE6yomKUOoEJEZuEg"
  );

  https.get(option, (req) => {
    var dataString = "";
    req.on("data", function (data) {
      dataString += data;
    });
    req.on("end", function () {
      const reqa = JSON.parse(dataString);
      if (reqa.errcode === 0) {
        const useroption = new URL(
          "https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token=" +
            reqa.access_token +
            "&code=" +
            a.code
        );
        https.get(useroption, (reqb) => {
          let tring = "";
          reqb.on("data", function (data) {
            tring += data;
          });
          reqb.on("end", function () {
            const user = JSON.parse(tring);
            let obj = { userid: user.UserId };
            
            tdUser.findOne(obj, (err, docs) => {
              if (err) {
                res.send({ code: false, errorMsg: "查询当前用户失败，" });
                return;
              } else {
                let flag;
                if (docs) {
                  flag = false;
                } else {
                  flag = true;
                }
                td.findOne((err, doc) => {
                  if (err) {
                    res.json({ code: 500, msg: "网络错误" });
                  }
                  if (doc) {
                    res.json({
                      code: true,
                      userpur: flag,
                      userid:user.UserId,
                      state: doc.state,
                    });
                  }
                });
              }
            });
          });
        });
      }
    });
  });
}

module.exports = wxid;