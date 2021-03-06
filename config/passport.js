let passport = require("passport");
let LocalStrategy = require('passport-local').Strategy;


let User = require('../models/users');


passport.serializeUser(function(user, done){
    done(null, user.id)
})

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    })
})

passport.use('local.registerAdmin', new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, function(req, email, password, done){
    User.findOne({'email': email}, function(err, user){
        if (err) {
            return done(err);
        }
        if (user) {
            req.flash('error', 'User account exist, login instead');
            return done(null, false)
        }

        let newUser = new User();
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        newUser.password = newUser.generateHash(req.body.password);
        newUser.position = req.body.position;

        newUser.save(function(err){
            if (err){
            return done(err)
                
            }
            
            return done(null, newUser)
        })
    })
}))


passport.use('local.loginAdmin', new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, function(req, email, password, done){
    User.findOne({'email': email}, function(err, user){
        if (err){
            return done(err);
        }
        if (!user){
            req.flash('loginError', "Invalid LogIn")
            return done(null, false)
        }

        if(!user.validatePassword(password)) {
            req.flash('wrongMatric', "Wrong Password")
            return done(null, false)
        }

        return done(null, user)

    })
}))
