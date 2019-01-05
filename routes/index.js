var express = require('express');
var router = express.Router();
const controller = require('../controller')

/* GET home page. */
router.get('/', controller.homePage);
router.get('/V-M-O', controller.VMO);
router.get('/services', controller.servicesPage);
router.get('/contact', controller.contactPage);
router.get('/news', controller.newsPage);
router.get('/team', controller.teamPage);
router.get('/justification', controller.justification);


module.exports = router;
