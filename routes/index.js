const path = require('path');
var express = require('express');
var router = express.Router();
let passport = require("passport");
const multer =require("multer");
let User = require('../models/users');
let Slider = require('../models/slider');
let News = require('../models/news');
const methodOverride = require("method-override");
const controller = require('../controllers/frontendControllers.js')
let dashboardController = require('../controllers/dashboard-controllers.js');
let About = require('../models/aboutus');


// HANDLE IMAGES 

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
}).fields([{name: "slider1"},{name: "slider2"},{name: "slider3"},{name: "newImg"}])

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


/* GET home page. */
router.get('/', controller.homePage);
router.get('/services', controller.servicesPage);

router.get('/contact', controller.contactPage);

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
router.get('/news', controller.newsPage);


router.post('/post_contact', controller.post_contactPage);

router.get('/implementation-timeline', controller.implementationPage); 

router.get('/dashboard', adminLoggedIn, function(req, res, next){
  res.render('backend/dashboard')
})

router.get('/login', dashboardController.login)
router.get('/signup', function(req, res, next){
    res.render('backend/signup')
})

router.get('/dashboard/authorizeadmins', isLoggedIn, function(req, res, next){
  User.find({position: "member"}).then((result)=>{
    if (result){
       res.render('backend/authorize', {result})
    }else{
       res.render('backend/authorize')      
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
       res.render('backend/slider', {result, failure, success, uploaded})
      console.log(result)
    }else{
       res.render('backend/slider')      
    }
  })
})


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
  //    // res.send("test")
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
        "slider1.path": '/uploads/' + req.files['slider1'][0].filename,
        "slider2.name": req.files['slider2'][0].fieldname,
      "slider2.path": '/uploads/' + req.files['slider2'][0].filename,
     "slider3.name": req.files['slider3'][0].fieldname,
     "slider3.path": '/uploads/' + req.files['slider3'][0].filename,
    
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

router.get('/dashboard/news', function(req, res, next){                      
  let upload = req.flash('upload');  
  
   News.find({}).then((doc)=>{
    if (doc){
       res.render('backend/news', {upload, doc})
      console.log(doc)
    }else{
       res.render('backend/news')      
    }
  })  
})

router.get('/dashboard/vision', function (req, res, next) {
  let upload = req.flash('upload');

  News.find({}).then((doc) => {
    if (doc) {
      res.render('backend/vision', { upload, doc })
      console.log(doc)
    } else {
      res.render('backend/vision')
    }
  })
})

router.post('/postvision', function(req, res, next){
     upload(req, res, (err) => {
    if (err){
    
    //res.render('students', {msg : err})
   res.send(err)
    }else{
        console.log(req.files)

          let newAboutus = new About();

           newAboutus.name = req.body.name;
           newAboutus.content = req.body.content;
           newAboutus.newImg = '/uploads/'+ req.files["newImg"][0].filename;
     
           newAboutus.save().then((result)=>{
           if(result){
             console.log(result)  
               req.flash('upload', "Vision has been uploaded successfully");             
             res.redirect('dashboard/vision');
           }else{
             res.send("err")
           }
         })
    }
  })
})

router.get('/dashboard/justification', function (req, res, next) {
  let upload = req.flash('upload');

  News.find({}).then((doc) => {
    if (doc) {
      res.render('backend/justification', { upload, doc })
      console.log(doc)
    } else {
      res.render('backend/justification')
    }
  })
})

router.post('/postjustification', function(req, res, next){
       upload(req, res, (err) => {
    if (err){
    
    //res.render('students', {msg : err})
   res.send(err)
    }else{
        console.log(req.files)

          let newAboutus = new About();

           newAboutus.name = req.body.name;
           newAboutus.content = req.body.content;
           newAboutus.newImg = '/uploads/'+ req.files["newImg"][0].filename;
     
           newAboutus.save().then((result)=>{
           if(result){
             console.log(result)  
               req.flash('upload', "Justification has been uploaded successfully");             
             res.redirect('dashboard/justification');
           }else{
             res.send("err")
           }
         })
    }
  })
})

router.get('/dashboard/mission', function (req, res, next) {
  let upload = req.flash('upload');

  News.find({}).then((doc) => {
    if (doc) {
      res.render('backend/mission', { upload, doc })
      console.log(doc)
    } else {
      res.render('backend/mission')
    }
  })
})

router.post('/postmission', function(req, res, next){
        upload(req, res, (err) => {
    if (err){
    
    //res.render('students', {msg : err})
   res.send(err)
    }else{
        console.log(req.files)

          let newAboutus = new About();

           newAboutus.name = req.body.name;
           newAboutus.content = req.body.content;
           newAboutus.newImg = '/uploads/'+ req.files["newImg"][0].filename;
     
           newAboutus.save().then((result)=>{
           if(result){
             console.log(result)  
               req.flash('upload', "Mission has been uploaded successfully");             
             res.redirect('dashboard/mission');
           }else{
             res.send("err")
           }
         })
    }
  })
})

router.get('/dashboard/objectives', function (req, res, next) {
  let upload = req.flash('upload');

  News.find({}).then((doc) => {
    if (doc) {
      res.render('backend/objectives', { upload, doc })
      console.log(doc)
    } else {
      res.render('backend/objectives')
    }
  })
})

router.post('/postobjectives', function(req, res, next){
       upload(req, res, (err) => {
    if (err){
    
    //res.render('students', {msg : err})
   res.send(err)
    }else{
        console.log(req.files)

          let newAboutus = new About();

           newAboutus.name = req.body.name;
           newAboutus.content = req.body.content;
           newAboutus.newImg = '/uploads/'+ req.files["newImg"][0].filename;
     
           newAboutus.save().then((result)=>{
           if(result){
             console.log(result)  
               req.flash('upload', "Objectives has been uploaded successfully");             
             res.redirect('dashboard/objectives');
           }else{
             res.send("err")
           }
         })
    }
  })
})

router.get('/dashboard/contact-us', function (req, res, next) {
  let upload = req.flash('upload');

  News.find({}).then((doc) => {
    if (doc) {
      res.render('backend/contact-us', { upload, doc })
      console.log(doc)
    } else {
      res.render('backend/contact-us')
    }
  })
})

router.post('/postcontactus', function(req, res, next){
        upload(req, res, (err) => {
    if (err){
    
    //res.render('students', {msg : err})
   res.send(err)
    }else{
        console.log(req.files)

          let newAboutus = new About();

           newAboutus.name = req.body.name;
           newAboutus.content = req.body.content;
           newAboutus.newImg = '/uploads/'+ req.files["newImg"][0].filename;
     
           newAboutus.save().then((result)=>{
           if(result){
             console.log(result)  
               req.flash('upload', "Contact-us has been uploaded successfully");             
             res.redirect('dashboard/contact-us');
           }else{
             res.send("err")
           }
         })
    }
  })
})

router.get('/dashboard/education', function (req, res, next) {
  let upload = req.flash('upload');

  News.find({}).then((doc) => {
    if (doc) {
      res.render('backend/education', { upload, doc })
      console.log(doc)
    } else {
      res.render('backend/education')
    }
  })
})

router.get('/dashboard/teaching', function (req, res, next) {
  let upload = req.flash('upload');

  News.find({}).then((doc) => {
    if (doc) {
      res.render('backend/teaching', { upload, doc })
      console.log(doc)
    } else {
      res.render('backend/teaching')
    }
  })
})

router.get('/dashboard/learning-activities', function (req, res, next) {
  let upload = req.flash('upload');

  News.find({}).then((doc) => {
    if (doc) {
      res.render('backend/learning-activities', { upload, doc })
      console.log(doc)
    } else {
      res.render('backend/learning-activities')
    }
  })
})

router.get('/dashboard/skills-gap', function (req, res, next) {
  let upload = req.flash('upload');

  News.find({}).then((doc) => {
    if (doc) {
      res.render('backend/gaps', { upload, doc })
      console.log(doc)
    } else {
      res.render('backend/gaps')
    }
  })
})

router.get('/dashboard/innovations-a', function (req, res, next) {
  let upload = req.flash('upload');

  News.find({}).then((doc) => {
    if (doc) {
      res.render('backend/innovations-a', { upload, doc })
      console.log(doc)
    } else {
      res.render('backend/innovations-a')
    }
  })
})

router.get('/dashboard/innovations-p', function (req, res, next) {
  let upload = req.flash('upload');

  News.find({}).then((doc) => {
    if (doc) {
      res.render('backend/innovations-p', { upload, doc })
      console.log(doc)
    } else {
      res.render('backend/innovations-p')
    }
  })
})

router.get('/dashboard/online-courses', function (req, res, next) {
  let upload = req.flash('upload');

  News.find({}).then((doc) => {
    if (doc) {
      res.render('backend/online-courses', { upload, doc })
      console.log(doc)
    } else {
      res.render('backend/online-courses')
    }
  })
})

router.get('/dashboard/ISP', function (req, res, next) {
  let upload = req.flash('upload');

  News.find({}).then((doc) => {
    if (doc) {
      res.render('backend/ISP', { upload, doc })
      console.log(doc)
    } else {
      res.render('backend/ISP')
    }
  })
})

router.get('/dashboard/partnership', function (req, res, next) {
  let upload = req.flash('upload');

  News.find({}).then((doc) => {
    if (doc) {
      res.render('backend/partnership', { upload, doc })
      console.log(doc)
    } else {
      res.render('backend/partnership')
    }
  })
})

router.get('/dashboard/research-plan', function (req, res, next) {
  let upload = req.flash('upload');

  News.find({}).then((doc) => {
    if (doc) {
      res.render('backend/research-plan', { upload, doc })
      console.log(doc)
    } else {
      res.render('backend/research-plan')
    }
  })
})

router.get('/dashboard/retention-support', function (req, res, next) {
  let upload = req.flash('upload');

  News.find({}).then((doc) => {
    if (doc) {
      res.render('backend/retention-support', { upload, doc })
      console.log(doc)
    } else {
      res.render('backend/retention-support')
    }
  })
})

router.get('/dashboard/student-recruitment', function (req, res, next) {
  let upload = req.flash('upload');

  News.find({}).then((doc) => {
    if (doc) {
      res.render('backend/student-recruitment', { upload, doc })
      console.log(doc)
    } else {
      res.render('backend/student-recruitment')
    }
  })
})

router.get('/dashboard/centre-operations', function (req, res, next) {
  let upload = req.flash('upload');

  News.find({}).then((doc) => {
    if (doc) {
      res.render('backend/centre-operations', { upload, doc })
      console.log(doc)
    } else {
      res.render('backend/centre-operations')
    }
  })
})

router.get('/dashboard/implementation-table', function (req, res, next) {
  let upload = req.flash('upload');

  News.find({}).then((doc) => {
    if (doc) {
      res.render('backend/implementation-table', { upload, doc })
      console.log(doc)
    } else {
      res.render('backend/implementation-table')
    }
  })
})

router.get('/dashboard/staff', function (req, res, next) {
  let upload = req.flash('upload');

  News.find({}).then((doc) => {
    if (doc) {
      res.render('backend/staff', { upload, doc })
      console.log(doc)
    } else {
      res.render('backend/staff')
    }
  })
})

router.post("/handlenews", function (req, res, next){
 
  upload(req, res, (err) => {
    if (err){
    
    //res.render('students', {msg : err})
   res.send(err)
    }else{
        console.log(req.files)

          let newNews = new News();

           newNews.title = req.body.title;
           newNews.writer = req.body.writer;
           newNews.department = req.body.department;
           newNews.content = req.body.content;
           newNews.newImg = '/uploads/'+ req.files["newImg"][0].filename;
     
           newNews.save().then((result)=>{
           if(result){
             console.log(result)  
               req.flash('upload', "News has been uploaded successfully");             
             res.redirect('dashboard/news');
           }else{
             res.send("err")
           }
         })


    }
  })
})

   

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
