var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Get first page */
router.get('/first', function(req, res) {
  res.render('first', { title: 'First page'});
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({}, {}, function(e,docs) {
    res.render('userlist', {
      "userlist" : docs,
      "passValue" : 23
    });
  });
});

/* Get newUser page */
router.get('/newuser', function(req, res) {
  res.render('newuser', {
    title: 'Add New User'
  });
});

/*Post to add user service */ 
router.post('/adduser', function(req, res) {
  var db = req.db;
  var username = req.body.username;
  var useremail = req.body.useremail;
  var collection = db.get('usercollection');
  collection.insert({
    "username" :username,
    "emial" : useremail
  }, function(err, doc) {
    if (err) {
      res.send("Error adding item to database");
    } else {
      res.redirect("userlist");
    }
  });
});

module.exports = router;
