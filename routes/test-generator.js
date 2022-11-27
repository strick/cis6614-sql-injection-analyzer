var express = require('express');
var controller = require('../controllers/test-generator');
var router = express.Router();

router.route('/').get(controller.index);

module.exports = router;