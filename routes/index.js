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
router.get('/mission', controller.missionPage);
router.get('/objectives', controller.objectivesPage);
router.get('/retention-and-support', controller.retentionPage);
router.get('/student-recruitment', controller.recruitmentPage);
router.get('/staff-development', controller.staffPage);
router.get('/centre-operations', controller.operationsPage);


module.exports = router;
