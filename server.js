'use strict';

const express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path'),
  util = require('./backend/util');

const app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json()); //Use body parser middleware to populate body of request
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public' + '/index.html'))
});

app.get('/getSentence', function(req, res) {
    
    util.getSentence().then(function(response) {
      res.json({'sentence': response});
    }).catch(function(e) { 
      res.json({'error': e});
    });

});

app.get('/getChatter', function(req, res) {

    try {
      
      const chatter = {};
      util.getChatter().then(function (response) {
              
              const chatterData = response.data;
              
              chatter['chatterData'] = chatterData;
              chatter['imgURL'] = util.getImgURL(chatterData);
              
              res.json(chatter);
          })
          .catch(function (error) {
              chatter['chatterData'] = DEFAULT_PERSON;
              chatter['imgURL'] = util.getImgURL(DEFAULT_PERSON);
              res.json(chatter);
          });
    } catch(e) {
      console.log('error: ' + e);
    }
    
});

app.listen(8080);