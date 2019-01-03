var express = require('express');
var router = express.Router();
const controller = require('../controller')

/* GET home page. */
router.get('/', controller.homePage);
router.get('/about-us', controller.aboutPage);
router.get('/services', controller.servicesPage);
router.get('/contact', controller.contactPage);
router.get('/news', controller.newsPage);
router.get('/team', controller.teamPage);

module.exports = router;
