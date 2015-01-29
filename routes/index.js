var express = require('express');
var router = express.Router();

// GET home page
router.get('/', function(req, res, next) {
	var models = require('../models/');
	models.Page.find({}).exec(function(err, docs) {
		if (err) console.log('Error: ', err);
		console.log('docs: ', docs.length);
		res.render('index', {docs: docs});
	});
});


module.exports = router;