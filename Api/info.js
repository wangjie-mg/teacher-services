const multiparty = require("multiparty");
const path = require("path");

function info(req, res) {
  var form = new multiparty.Form();
  form.encoding = "UTF-8";
  form.uploadDir = path.join(__dirname, "../public/images");
  form.parse(req, (error, fields, fiels) => {
    if (error) {
      res.send({
        err: "上传失败",
        code: false,
      });
      return false;
    }else{
      console.log(fiels.file[0].path.toString());
      // var filesTmp = JSON.stringify(fiels, null, 2);
      // console.log(filesTmp)                      
      const imgurl=  fiels.file[0].path.substring(fiels.file[0].path.lastIndexOf("/")+1)    
                                        
      res.json({
            code:true,
            msg:"图片上传成功!",
            imgurl:imgurl,
        });
    }
  });
}
module.exports = info;
