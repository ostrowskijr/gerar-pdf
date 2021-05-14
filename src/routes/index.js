const express = require('express')
const router = express.Router()
const controller = require('../controller/IndexController')

router.get('/', controller.index);
router.get('/download', controller.download);

module.exports = router;