var express = require('express');
var router = express.Router();
var authMiddleware = require('../auth/middleware');
const Information = require('../db/information')

const layout = '/admin/adminLayout'

function isValidId(req, res, next) {
  if (!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}

/* GET information page. */
router.get('/', function (req, res, next) {
  Information.getAllInformation().then(function (data) {
      res.render('allInformation', {
        title: "All Information",
        message: req.flash('success_messages'),
        layout: layout,
        jsonData: data
      })
    })
    .catch(function (err) {
      return next(err);
    });
});

/* GET create information page. */
router.get('/create', authMiddleware.ensureLoggedIn, function (req, res, next) {
  res.render('infoCreate', {
    title: 'Create an information!',
    layout: layout
  });
});

/* POST information. */
router.post('/create', function (req, res, next) {
  var information = {
    title: req.body.title,
    description: req.body.description,
    user_id: req.signedCookies.user_id
  }
  Information.create(information, 'id').then(id => {
    req.flash('success_messages', 'You have created the information Successfully!')
    res.redirect('/information');
  }).catch(function (err) {
    return next(err);
  });
});

/* GET edit information page. */
router.get('/edit/:id', isValidId, function (req, res, next) {
  Information.getOne(req.params.id).then(function (data) {
    res.render('infoEdit', {
      title: 'Edit an information!',
      layout: layout,
      title: data.title,
      description: data.description,
      creator_id: data.user_id,
      id: data.id
    })
  }).catch(function (err) {
    return next(err);
  });
});

/* Edit information. */
router.post('/edit/:id', isValidId , function (req, res, next) {
  Information.edit(req.params.id, req.body).then(function () {
    req.flash('success_messages', 'You have updated the information Successfully!')
    res.redirect('/information');
  }).catch(function (err) {
    return next(err);
  })
})

/* Delete information. */
router.get('/delete/:id', isValidId, function (req, res, next) {
  console.log(req.params.id)
  Information.delete(req.params.id).then(() => {
    req.flash('success_messages', 'You have deleted the information Successfully!')
    res.redirect('/information');
  }).catch(function (err) {
    return next(err)
  })
})



module.exports = router;