var express = require('express');
var router = express.Router();
const controller = require('../controller')

/* GET home page. */
router.get('/', controller.homePage);
router.get('/services', controller.servicesPage);
router.get('/contact', controller.contactPage);
router.get('/news', controller.newsPage);
router.get('/team', controller.teamPage);
router.get('/justification-for-establishing-the-centre', controller.jecPage);
router.get('/vision', controller.visionPage);


module.exports = router;
