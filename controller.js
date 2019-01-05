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

