var express = require('express');
var controller = require('../controllers/scanner');
var router = express.Router();

router.route('/').get(controller.index);
router.route('/run-scan').get(controller.runScan);

module.exports = router;