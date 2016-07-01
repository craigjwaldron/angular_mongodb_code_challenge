console.log("hello from app.js");

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use( bodyParser.json() );
var path = require('path');
var mongoose = require('mongoose');

var mongoURI = "mongodb://localhost:27017/Heroes";
var MongoDB = mongoose.connect(mongoURI).connection;
var Hero = require ('../models/heroCreate');


MongoDB.on('error', function (err) {
    console.log('mongodb connection error:', err);
});

MongoDB.once('open', function () {
  console.log('mongodb connected');
});

// --------------------------------------------------------

// Home
app.get('/',function( req, res ){
  console.log( 'at base url' );
  res.sendFile( path.resolve( 'views/index.html' ));
});

// --------------------------------------------------------

// addHero POST
app.post('/addHero', function( req, res ){
  var newHero = new Hero ({
    alias: req.body.alias,
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    city: req.body.city,
    power_name: req.body.power

  }); // End of newHero object
  console.log("at addHero!" + newHero);

    newHero.save(function(err){
      if(err){
        console.log(err);
        res.sendStatus(500);
      } else {
        console.log('hero saved');
        res.sendStatus(200);
      }
    }); // End of newHero.save
  }); // End of app.post

  // --------------------------------------------------------

  // App.get to display on DOM
app.get('/getHeroes', function( req, res){
  console.log("in app.get");
  Hero.find().then(function(data){ // Finding all the heroes in DB
    res.send(data);
  }); // End of find function
}); // End of app.get

// --------------------------------------------------------

// Spinning up the server
app.listen( 4242, 'localhost', function( req, res ){
  console.log( "lisening on port 4242" );
});

// --------------------------------------------------------

// Setting up static folder
app.use( express.static( 'public' ) );
