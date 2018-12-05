var express = require('express');
var router = express.Router();
const Events = require('../db/event')
const Information = require('../db/information')


router.get('/', function (req, res, next) {
  res.render('sociallife', {
    title: 'Social life'
  });
});

router.get('/chat', function (req, res, next) {
  
  res.render('chat', {
    title: 'Chat'
  });
});

router.get('/suggestions', function (req, res, next) {
  
  res.render('suggestions', {
    title: 'Suggestion'
  });
});

router.get('/evenements', function (req, res, next) {
  Events.getAllEvents().then(function (data) {
    res.render('evenements', {
      title: "Tout l'enevements",
      jsonData: data
    })
  })
  .catch(function (err) {
    return next(err);
  });
});

router.get('/informations', function (req, res, next) {
  Information.getAllInformation().then(function (data) {
    res.render('informations', {
      title: "Tout l'information",
      jsonData: data
    })
  })
  .catch(function (err) {
    return next(err);
  });
});



module.exports = router;