exports.homePage = function (req, res, next) {
    res.render('index', {  });
}

exports.servicesPage = function (req, res, next) {
    res.render('services', {});
}

exports.contactPage = function (req, res, next) {
    res.render('contact', {});
}

exports.newsPage = function (req, res, next) {
    res.render('news', {});
}

exports.teamPage = function (req, res, next) {
    res.render('team', {});
}

exports.jecPage = function (req, res, next) {
    res.render('jec', {});
}

exports.visionPage = function (req, res, next) {
    res.render('vision', {});
}

exports.missionPage = function (req, res, next) {
    res.render('mission', {});
}

exports.objectivesPage = function (req, res, next) {
    res.render('objectives', {});
}

exports.retentionPage = function (req, res, next) {
    res.render('retention', {});
}

exports.recruitmentPage = function (req, res, next) {
    res.render('recruitment', {});
}

exports.staffPage = function (req, res, next) {
    res.render('staff', {});
}

exports.operationsPage = function (req, res, next) {
    res.render('operations', {});
}

exports.educationPage = (req, res, next)=>{
    res.render('education', {})
}

exports.learningPage = (req, res, next)=>{
    res.render('learning', {})
}

exports.teachingPage = (req, res, next)=>{
    res.render('teaching', {})
}

exports.skillsPage = (req, res, next)=>{
    res.render('skills', {})
}

exports.innovationPage = (req, res, next)=>{
    res.render('innovation', {})
}

exports.innovationAssPage = (req, res, next)=>{
    res.render('innovationAss', {})
}

exports.onlineCoursePage = (req, res, next)=>{
    res.render('onlineCourse', {})
}

exports.researchPlanPage = (req, res, next)=>{
    res.render('researchPlan', {})
}

exports.industrailPage = (req, res, next)=>{
    res.render('industrail', {})
}

exports.partnershipPage = (req, res, next)=>{
    res.render('partnership', {})
}
exports.implementationPage = function (req, res, next) {
    res.render('implementation', {});
}

exports.post_contactPage =(req, res, next)=>{

    res.render('contact', {})
}