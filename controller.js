exports.homePage = function (req, res, next) {
    res.render('index', {  });
};

exports.VMO = function (req, res, next) {
    res.render('V-M-O', {});
};

exports.servicesPage = function (req, res, next) {
    res.render('services', {});
};

exports.contactPage = function (req, res, next) {
    res.render('contact', {});
};

exports.newsPage = function (req, res, next) {
    res.render('news', {});
};

exports.teamPage = function (req, res, next) {
    res.render('team', {});
};

exports.justification = function (req, res , next){
    res.render('justification', {title: 'JUSTIFICATION FOR ESTABLISHING THE CENTRE'});
};