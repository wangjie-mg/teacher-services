
const mongoose = require('./db.js').mongooseuser;

const UserSchema = mongoose.Schema({
    name:{type:String},
    password:{type:String}
})
const tdSchame = mongoose.Schema({
    state:{type:Boolean}
})
const pbUserSchema = mongoose.Schema({
    name:{type:String},
    address:{type:String},
    img:{type:String},
    imgname:{type:String},
    desc:{type:String},
    support:{type:Number},
})
const tdUserSchema = mongoose.Schema({
    userid:{type:String},
    id:{type:String}
})
const adUser = mongoose.model('adUser',UserSchema,'adUser');
const pbUser = mongoose.model('pbUser',pbUserSchema,'pbUser');
const td = mongoose.model('td',tdSchame,'td');
const tdUser = mongoose.model('tdUser',tdUserSchema,'tdUser');

exports.td = td
exports.pbUser = pbUser;
exports.tdUser = tdUser;
exports.adUser = adUser;