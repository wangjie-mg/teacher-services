const pbUser = require("../lib/user.js").pbUser;
const tdUser = require("../lib/user.js").tdUser;

function vote(req, res) {
  const a = JSON.parse(Object.keys(req.body)[0]);
  console.log(a)
  tdUser.create(
    {
      userid: a.userid,
      id: a._id,
    },
    (err, docs) => {
      if (err) {
        res.json({ code: 502, msg: "保存当前用户失败" });
      } else {
        pbUser.findOneAndUpdate(
          { _id: docs.id },
          { $inc: { support: 1 } },
          { new: true },
          (err,docs)=>{
            if(err){
                res.json({
                    code:500,
                    msg:'更新票数失败'
                })
                console.log(123)
                tdUser.remove({_id:docs._id})
            }else{
                res.json({
                    code:true,
                    msg:'投票成功'
                })
            }
          }
        );
      }
    }
  );
}

module.exports = vote;
