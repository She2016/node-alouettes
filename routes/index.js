var express = require('express');
const fs = require('fs')
var router = express.Router();
const Messages = require('../db/message')
var authMiddleware = require('../auth/middleware');



/* GET home page. */
// router.get('/', function (req, res, next) {
//   var js = []
//   const testFolder = './public/javascripts';

//   fs.readdirSync(testFolder).forEach(file => {
//     js.push(file);
//   })

//   res.render('index', {
//     title: 'Alouettes',
//     js
//   });
// });

/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index', {
    title: 'Alouettes'
  });
});

/* GET home page. */
router.get('/admin', authMiddleware.allowAdmins, function (req, res, next) {

  res.render('admin', {
    title: 'Admin panel',
    layout: '/admin/adminLayout'
  });
});

/* GET instrumentation (map) page. */
router.get('/instrumentation', function (req, res, next) {
  var layerNames = []
  const testFolder = './public/geojson';

  fs.readdirSync(testFolder).forEach(file => {

    var fl = file.split('.').slice(0, -1).join('.')
    layerNames.push(fl)
  })

  res.render('instrumentation', {
    title: 'Alouettes',
    layerNames
  });
});


/* GET messages page. */
router.get('/messages', function (req, res, next) {
  Messages.getAllMessages().then(function (data) {
    res.render('all_messages', {
      title: 'all messages',
      layout: '/admin/adminLayout',
      jsonData: data
    });
  })
});

/* Delete message. */
router.get('/messages/delete/:id', function (req, res, next) {
  Messages.delete(req.params.id).then(() => {
    req.flash('success_messages', 'You have deleted the message Successfully!')
    res.redirect('/messages');
  }).catch(function (err) {
    return next(err)
  })
});



module.exports = router;