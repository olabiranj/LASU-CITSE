const path = require('path');
var express = require('express');
var router = express.Router();
let passport = require("passport");
const multer =require("multer");
let User = require('../models/users');
let Slider = require('../models/slider');
const methodOverride = require("method-override");
const controller = require('../controller')
let dashboardController = require('../controllers/dashboard-controllers.js');

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
router.get('/education', controller.educationPage);
router.get('/learning', controller.learningPage);
router.get('/teaching', controller.teachingPage);
router.get('/skills', controller.skillsPage);
router.get('/innovation', controller.innovationPage);
router.get('/innovation', controller.innovationPage);
router.get('/innovationAss', controller.innovationAssPage);
router.get('/onlineCourse', controller.onlineCoursePage);
router.get('/researchPlan', controller.researchPlanPage);
router.get('/industrial', controller.industrailPage);
router.get('/partnership', controller.partnershipPage);

router.post('/post_contact', controller.post_contactPage);









router.get('/implementation-timeline', controller.implementationPage); 

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

//slider
router.get('/dashboard/slider', function(req, res, next){
      let failure = req.flash('failure');
      let success = req.flash('success');     
      let uploaded = req.flash('uploaded');     

   Slider.find({}).then((result)=>{
    if (result){
       res.render('slider', {result, failure, success, uploaded})
      console.log(result)
    }else{
       res.render('slider')      
    }
  })
})

const  storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function(req, file, cb){
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
})


const upload = multer({
  storage: storage ,
  //limits: {fileSize: 10},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).fields([{name: "slider1"},{name: "slider2"},{name: "slider3"}])

//check file type 
function checkFileType(file, cb){
  //Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // check ext
  const extname = filetypes.test(path.extname
  (file.originalname).toLowerCase());
  //check mime
  const mimetype = filetypes.test(file.mimetype)

  if(mimetype && extname){
    return cb(null, true);
  }else {
    cb('Error: images Only!')
  }
}

router.post("/uploadslider", function (req, res){

  upload(req, res, (err) => {
    if (err){
    
    //res.render('students', {msg : err})
   res.send(err)
    }else{
      console.log(req.files);
      Slider.findOne({name: "slider"}).then(function(result){
   if (result){ 
        
               req.flash('failure', "Sorry You can only update sliders not create new ones");
             res.redirect("/dashboard/slider");

        
         }else if(!result){
           let newSlider = new Slider();
           newSlider.slider1.name = req.files['slider1'][0].fieldname;
           newSlider.slider1.path = '/uploads/' + req.files['slider1'][0].filename;
           newSlider.slider2.name = req.files['slider2'][0].fieldname;
           newSlider.slider2.path = '/uploads/' + req.files['slider2'][0].filename;
           newSlider.slider3.name = req.files['slider3'][0].fieldname;
           newSlider.slider3.path = '/uploads/'+ req.files['slider3'][0].filename;
           newSlider.name = "slider";           
           
         newSlider.save().then((result)=>{
           if(result){
             console.log(result)  
               req.flash('uploaded', "Slidder has been uploaded successfully");             
             res.redirect("/dashboard/slider");
           }else{
             res.send("err")
           }
         })

    // console.log("sorry cannot save new data")
   }   
     // res.send("test")
    })
    }
  })
})


router.put("/update/uploadslider", function (req, res){

  upload(req, res, (err) => {
    if (err){
    
    //res.render('students', {msg : err})
   res.send(err)
    }else{
      console.log(req.files);
      Slider.findOneAndUpdate({"name": "slider"},
       {$set:{"slider1.name": req.files['slider1'][0].fieldname,
        "slider1.path": req.files['slider1'][0].filename,
        "slider2.name": req.files['slider2'][0].fieldname,
      "slider2.path": req.files['slider2'][0].filename,
     "slider3.name": req.files['slider3'][0].fieldname,
     "slider3.path": req.files['slider3'][0].filename,
    
    }},
     {new: true})
      .then((result)=>{
          if (result) {
               req.flash('success', "Slider has been updated");            
            res.redirect("/dashboard/slider")
          } else {
            res.send("error")
          }
      })
       
      
     // res.send("test")
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
  failureRedirect: '/login',
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
