var express = require('express');
var controller = require('../controllers/scanner');
var router = express.Router();

router.route('/').get(controller.index);
router.route('/run-scan').post(controller.runScan);

module.exports = router;