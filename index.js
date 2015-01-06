var express = require('express');
var Profile = require('fair-vote-profile');
var bodyParser = require('body-parser');
var app = express();

var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var configDB = require('./config/database.js');



var elections = {};

require('./config/passport')(passport);

    app.use(morgan('dev'));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(session({ secret: 'theresanalieninmycloset' }));
    app.use(passport.initialize());
    app.use(passport.session()); 

    mongoose.connect(configDB.url);

app.post('/election/:election',function (req, res){
  var electionName = req.params.election;
  console.log(electionName);
  elections[electionName] = new Profile();
  res.send("did it :)");
});

app.post('/election/:election/vote',passport.authenticate('vote',{session: false}),function (req, res) {
  var electionName = req.params.election;
  var ballot = req.body.vote;
  console.log(ballot);
  if(!elections[electionName]){
    elections[electionName] = new Profile("pairwise");
    elections[electionName].setAlternatives(ballot);
  }
  elections[electionName].vote(ballot);
  res.send("did it : )");
});

app.post('/signup', passport.authenticate('addUser',{session: false}),function (req,res){
  res.send("hey");
});


app.get('/election/:election/score/:rule',function(req,res){
  var electionName = req.params.election;
  res.send(elections[electionName].score(req.params.rule));
});

var server = app.listen(8080, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});


