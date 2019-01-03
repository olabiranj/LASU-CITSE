exports.homePage = function (req, res, next) {
    res.render('index', {  });
}

exports.aboutPage = function (req, res, next) {
    res.render('about-us', {});
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