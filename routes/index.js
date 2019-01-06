var express = require('express');
var router = express.Router();
let passport = require("passport");
let User = require('../models/users');
const methodOverride = require("method-override");
const controller = require('../controller')
let dashboardController = require('../controllers/dashboard-controllers.js');

/* GET home page. */
router.get('/', controller.homePage);
router.get('/V-M-O', controller.VMO);

router.get('/services', controller.servicesPage);

router.get('/contact', controller.contactPage);

router.get('/news', controller.newsPage);

router.get('/team', controller.teamPage);

router.get('/justification', controller.justification);

router.get('/dashboard', adminLoggedIn, function(req, res, next){
  res.render('dashboard')
})

router.get('/login', dashboardController.login)
router.get('/signup', function(req, res, next){
    res.render('signup')
})

router.get('/dashboard/authorizeadmins', isLoggedIn, function(req, res, next){
  User.find({position: "member"}).then((result)=>{
    if (result){
       res.render('authorize', {result})
    }else{
       res.render('authorize')      
    }
  })
})

router.delete('/deleteadmin', function(req, res, next){

    User.deleteOne({ _id: req.body.id }).then((result)=>{
      if(result){
        if (result){
          res.redirect('/dashboard/authorizeadmins')
        }else{
          console.log('err')
        }
      }
    })

})

router.post('/createAccount', passport.authenticate('local.registerAdmin',{
  successRedirect: '/dashboard/authorizeadmins',
  failureRedirect: '/',
  failureFlash: true
}))

router.post('/login/admin', passport.authenticate('local.loginAdmin',{
  successRedirect: '/dashboard',
  failureRedirect: '/',
  failureFlash: true
}))


function  isLoggedIn(req, res,next){
  
  if (req.user.position=="head" && req.isAuthenticated()){
    return next()
  }

     res.redirect('/dashboard')

}

function  adminLoggedIn(req, res,next){
  
  if (req.user.position=="member" || req.user.position=="head" && req.isAuthenticated()){
    return next()
  }

     res.redirect('/dashboard')

}

router.get('/logout', function(req, res, next){
  req.logout()
  res.redirect('/login')
})


module.exports = router;
