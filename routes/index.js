var express = require('express');
const fs = require('fs')
var router = express.Router();

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



module.exports = router;