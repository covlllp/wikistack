var express = require('express');
var router = express.Router();

/* GET add_page listing. */
router.get('/:url_name', function(req, res, next) {
	var url_name = req.params.url_name;
	var models = require('../models/');

	models.Page.findOne({'url_name': url_name}).exec(function(err, doc) {
		if (err) res.status(404).send('Not found');
		res.render('show', {doc: doc});
	});
});


module.exports = router;