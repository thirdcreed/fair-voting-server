var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');

module.exports = function(passport) {

passport.serializeUser(function(user,done){
    done(null, user.id);
});

passport.deserialzeUser(function(id,done) {
    User.findById(id,function(err, user) {
        done(err,user);
    });
});

passport.use('vote', new LocalStrategy({

    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
    
},
 function(req,email,password,done){
     process.nextTick(function() {
         console.log("email",email,"password",password);
     })
 })
}



