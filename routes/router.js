var express = require('express');
var router = express.Router();
const signin = require('../Api/signin');
const info = require('../Api/info');
const token = require('../Api/token');
const open = require('../Api/open');
const save = require('../Api/save');
const strike = require('../Api/delete');
const update =require('../Api/update');
const find = require('../Api/find');
const vote = require('../Api/vote');
const wxid = require('../Api/wxid');


var bodyParser = require('body-parser');
//中间件使用body-parser
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/wxid',wxid);
router.post('/signin',signin);
router.post('/token',token);
router.post('/open',open);

router.post('/info',info);
router.post('/save',save);
router.post('/delete',strike);
router.post('/update',update);
router.post('/find',find);
router.post('/vote',vote);
module.exports = router;