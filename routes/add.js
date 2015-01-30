var express = require('express');
var router = express.Router();

/* GET add_page listing. */
router.get('/', function(req, res, next) {
  res.render('add', {});
});

router.post('/submit', function(req, res, next) {
	var models = require('../models/');
	var Page = models.Page;
	var title = req.body.title;
	var body = req.body.body_content;
	var tags = req.body.tags.split(',').map(function(tag) {
		return tag.trim();
	});

	var url_name = title.replace(/\s/g, "_").replace(/\W/g, "");
	Page.findOne({'url_name': url_name}).exec(function(err, doc) {
		if (doc) {
			Page.update(
				{'url_name': url_name}, 
				{'body': doc.body + '\n\r' + body, 'tags': doc.tags.concat(tags)}
			).exec(function(err) {
				res.redirect('/wiki/' + url_name);
			});
		} else {
			var p = new Page({'title': title, 'body': body, 'url_name': url_name, 'tags': tags});
			p.save().exec(function(err) {
				res.redirect('/wiki/' + url_name);
			});
		}
	});
});


module.exports = router;
