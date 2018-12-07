var express = require('express');
const fs = require('fs')
var router = express.Router();



router.get('/', function (req, res, next) {
  var layerNames = []
  const testFolder = './public/geojson';

  fs.readdirSync(testFolder).forEach(file => {
    var fl = file.split('.').slice(0, -1).join('.').replace('_', ' ')
    layerNames.push(fl)
  })
  res.render('maintenance', {
    title: 'Maintenance',
    layerNames
  });
});

router.get('/:name', function (req, res, next) {  
  res.render('details', {
    title: req.params.name
  });
});



module.exports = router;