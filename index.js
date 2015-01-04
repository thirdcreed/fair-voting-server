var express = require('express');
var Profile = require('fair-vote-profile');
var bodyParser = require('body-parser');
var app = express();

var elections = {};

app.use(bodyParser.json());

app.post('/election/:election',function (req, res){
  var electionName = req.params.election;
  console.log(electionName);
  elections[electionName] = new Profile();
  res.send("did it :)");
});

app.post('/election/:election/user/:user/vote', function (req, res) {
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

app.post('users/:user', function (req,res){
  var userName = req.param.user;
  console.log(userName);
  res.send("screw you, " + userName);
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
