var express = require('express');
var router = express.Router();

/* GET add_page listing. */
router.get('/', function(req, res, next) {
  res.render('add', {});
});

router.post('/submit', function(req, res, next) {
	var models = require('../models/');
	var title = req.body.title;
	var body = req.body.body_content;
	var url_name = title.replace(/\s/g, "_").replace(/\W/g, "");
	var p = new models.Page({'title': title, 'body': body, 'url_name': url_name});
	p.save();
	res.redirect('/');
});


module.exports = router;
