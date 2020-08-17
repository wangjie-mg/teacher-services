const jwt = require("jsonwebtoken");
const pbUser = require("../lib/user.js").pbUser;
function update(req, res) {
  const a = JSON.parse(Object.keys(req.body)[0]);
  if(req.headers.authorization){
    let token = req.headers.authorization;
    jwt.verify(token, "zypc", function (err, decode) {
      if (err) {
        res.json({
          msg: "登录过期请重新登录",
          code: 500,
        });
      } else {

        const obj={
          'name':a.name,
          'address':a.address,
          'imgname':a.imgname,
          'img':a.imgurl,
          'desc':a.desc,
        };
        pbUser.findByIdAndUpdate({_id:a._id},obj,{new:true},(err,docs)=>{
          
          if(err){
                res.json({
                    code:502,
                    msg:"修改信息出错"
                })
            }else{
                res.json({
                    code:true,
                    msg:"修改信息成功",
                    user:docs
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

module.exports = update;