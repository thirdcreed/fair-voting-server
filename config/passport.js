var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport) {

passport.use('vote', new LocalStrategy({
    
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true

},
 function(req,email,password,done){
    console.log(email,password);
    User.findOne({'local.email' : email }, function(err, user){
     console.log(user);
       if (err)
           return done(err);

       if(!user)
           return done(null,false,"no user");
	
       if(!user.validPassword(password))
           return done(null, false, "Wrong password, keep trying, be persistent, be positive, you'll remember it");

       return done(null,user);
     //});
     });
}));

passport.use('addUser', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
},function(req,email,password,done){
   
   process.nextTick(function(){
   
   User.findOne({'local.email': email}, function(err, user){
       if (err)
          return done(err);
       if (user) {
           return done(null,user);
       } else {
       
           var newUser = new User();
	   
	   newUser.local.email = email;
	   newUser.local.password = newUser.generateHash(password);

	   newUser.save(function(err) {
	     if (err)
	         throw err;

	     return done(null,newUser);
	   });
       }
   return done(null,":)");

   });

}
   
);

 }
));
};
