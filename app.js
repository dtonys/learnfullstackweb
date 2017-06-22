var fs = require('fs');
var path = require('path');
var ejs = require('ejs');
var _ = require('lodash');

var express = require('express');

// middleware
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var favicon = require('serve-favicon');
var compression = require('compression');
var errorhandler = require('errorhandler');

var app = express();

// Connect to firebase
var admin = require("firebase-admin");
var serviceAccount = require("./brilliant-torch-6200-firebase-adminsdk-mochz-9ec46832fa.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://brilliant-torch-6200.firebaseio.com"
});
var firebaseDB = admin.database();

// setup middleware
app.use( express.static(__dirname + '/public') );          // serve static assets
app.use(favicon(__dirname + '/public/favicon.ico'));       // serve favicon
app.use(bodyParser.json());                                // body parser, for POST request
app.use(bodyParser.urlencoded({ extended: true }));        // body parser, for POST request
app.use(methodOverride());                                 // allow PUT and DELETE
app.use(cookieParser());                                   // populate req.cookies

// setup views
app.set('view engine', 'ejs');                             // set template engine
app.set('views', __dirname + '/app/views');                // set views dir
app.set('view cache', true);

app.get('/', function(req, res) {
  return res.sendFile(
    path.resolve( __dirname + '/public/index.html' )
  );
});

app.post('/save-user', function(req, res) {
  var userEmail = req.body.email;
  var userAbout = req.body.about;
  var emailID = userEmail.split('@')[0];
  var userNode = firebaseDB.ref('emails').child(emailID);
  userNode.set({ email: userEmail, about: userAbout });
  res.json({
    success: true
  });
});

app.listen(3000, function() {
  console.log("Express server listening on port ", this.address().port, app.settings.env);
});

