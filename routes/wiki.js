var express = require('express');
var router = express.Router();

/* GET add_page listing. */
router.get('/:url_name', function(req, res, next) {
	req.page = 'show';
	req.url_name = req.params.url_name;
	next();
});

router.get('/edit/:url_name', function(req, res, next) {
	req.page = 'edit';
	req.url_name = req.params.url_name;
	next();
});




router.post('/edit/submit/:url_name', function(req, res, next) {
	var url_name = req.params.url_name;
	var body = req.body.body_content;
	var models = require('../models/');
	var Page = models.Page;

	Page.findOne({'url_name': url_name}).exec(function(err, doc) {
		Page.update({'url_name': url_name}, {'body': body}).exec(function(err) {
			res.redirect('/wiki/' + url_name);
		});
	});
});





router.use('/', function(req, res, next) {
	var url_name = req.url_name;
	var models = require('../models/');
	models.Page.findOne({'url_name': url_name}).exec(function(err, doc) {
		if (err) res.status(404).send('Not found');
		res.render(req.page, {doc: doc});
	});
});


module.exports = router;