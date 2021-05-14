const express = require('express')
const router = express.Router()
const controller = require('../controller/IndexController')

router.get('/', controller.index);
router.get('/email', controller.email);
router.get('/download', controller.download);
router.post('/sendmail', controller.sendmail);

module.exports = router;