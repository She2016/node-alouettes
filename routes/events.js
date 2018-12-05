var express = require('express');
var router = express.Router();
var authMiddleware = require('../auth/middleware');
const Events = require('../db/event')

const layout = '/admin/adminLayout'

function isValidId(req, res, next) {
  if (!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}

/* GET events page. */
router.get('/', function (req, res, next) {
  Events.getAllEvents().then(function (data) {
      res.render('all', {
        title: "All Events",
        message: req.flash('success_messages'),
        layout: layout,
        jsonData: data
      })
    })
    .catch(function (err) {
      return next(err);
    });
});

/* GET create event page. */
router.get('/create', authMiddleware.ensureLoggedIn, function (req, res, next) {
  res.render('create', {
    title: 'Create an event!',
    layout: layout
  });
});

/* POST create event page. */
router.post('/create', function (req, res, next) {
  var event = {
    title: req.body.title,
    description: req.body.description,
    event_date: req.body.event_date,
    user_id: req.signedCookies.user_id
  }
  Events.create(event, 'id').then(id => {
    req.flash('success_messages', 'You have created the event Successfully!')
    res.redirect('/events');
  }).catch(function (err) {
    return next(err);
  });
});

/* GET create event page. */
router.get('/edit/:id', isValidId, function (req, res, next) {
  Events.getOne(req.params.id).then(function (data) {
    var date = data.event_date
    var event_date = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().substring(0, 16)
    res.render('edit', {
      title: 'Edit an event!',
      layout: layout,
      title: data.title,
      description: data.description,
      event_date: event_date,
      creator_id: data.user_id,
      id: data.id
    })
  }).catch(function (err) {
    return next(err);
  });
});

/* GET create event page. */
router.post('/edit/:id', function (req, res, next) {
  var eventId = parseInt(req.params.id)
  if (!Number.isInteger(eventId)) {
    next(new Error('Invalid ID'))
  }
  Events.edit(eventId, req.body).then(function () {
    req.flash('success_messages', 'You have updated the event Successfully!')
    res.redirect('/events');
  }).catch(function (err) {
    return next(err);
  })
})

router.get('/delete/:id', isValidId, function (req, res, next) {
  console.log(req.params.id)
  Events.delete(req.params.id).then(() => {
    req.flash('success_messages', 'You have deleted the event Successfully!')
    res.redirect('/events');
  }).catch(function (err) {
    return next(err)
  })
})



module.exports = router;