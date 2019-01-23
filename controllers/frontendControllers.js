let message = require('../models/message')
let Slider = require('../models/slider');
let News = require('../models/news');
let Page = require('../models/page');

let f = require('../config/frontNav');
let allNews = News.find({});

exports.homePage = function (req, res, next) {
    (async () => {
        let sliders = Slider.find({})
        let mission = Page.find({ tag: 'mission' })
        let vision = Page.find({ tag: 'vision' })
        let objectives = Page.find({ tag: 'objectives' })

        const [sld, mss, vss, obj, news] =
            await Promise.all(
                [sliders, mission, vision, objectives, allNews]
            );

        res.render('frontend/index', {result: sld, mission: mss[0], vision: vss[0], obj: obj[0], doc: news, activeNav: 'home' });
    })()
}

exports.renderPage = function (req, res, next) {
    let navIndex = req.path.substr(1);
    if (typeof f[navIndex] === 'undefined') {
        (async () => {
            const news = await allNews;

            res.render('frontend/404', {activeNav: '', navIndex, doc: news });
        })()
    } else {
        let thisPage = f[navIndex].data;
        let activeNav = f[navIndex].nav;
        (async () => {
            let pageData = Page.find({ tag: thisPage })

            const [dt, news] =
                await Promise.all(
                    [pageData, allNews]
                );

            res.render('frontend/template', { content: dt[0], doc: news, title: navIndex.replace(/(-)+/gi, ' '), activeNav });
        })()
    }
}

exports.servicesPage = function (req, res, next) {
    res.render('extras/services', {});
};

exports.contactPage = function (req, res, next) {
    Page.find({name: "contactus"}).then((file)=>{
        if (file){
            News.find({}).then((doc)=>{
                if(doc){
                    res.render('frontend/contact', {file, doc});
                }
            })
        }else{
            res.render('frontend/contact');
        }
    })
};

exports.newsPage = function (req, res, next) {

    News.find({}).then((doc)=>{
        if (doc){
            res.render('extras/news', {doc, activeNav: 'news'})
        }else{
            res.render('extras/news')
        }
    })

};

exports.newsListsPage = function (req, res, next) {

    News.find({}).then((doc) => {
        if (doc) {
            res.render('extras/news-lists', { doc, activeNav: 'news' })
        } else {
            res.render('extras/news-lists')
        }
    })

};

exports.teamPage = function (req, res, next) {

    News.find({}).then((doc)=>{
        if (doc){
            res.render('frontend/team', {doc});
            console.log(doc)
        }else{
            res.render('frontend/team', {});
        }
    })
};

exports.post_contactPage =(req, res, next)=>{
    let messageData = {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message

    }
    let newData = new message(messageData);
    newData.save()
    Page.find({name: "contactus"}).then((file)=>{
        if (file){
            News.find({}).then((doc)=>{
                if(doc){
                    res.render('frontend/contact', {file, doc, activeNav: 'about'});
                }
            })
        }else{
            res.render('frontend/contact');
        }
    })

}
