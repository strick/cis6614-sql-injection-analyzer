var express = require('express');
var controller = require('../controllers/attack-vector-tester');
var router = express.Router();

router.route('/').get(controller.index);
router.route('/js-injection-one').post(controller.jsInjectionAttack);
router.route('/verb-attack').post(controller.verbAttack);

module.exports = router;
