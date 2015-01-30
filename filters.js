var marked = require('marked');

module.exports = function(swig) {
	var page_link = function(doc) {
		var link_name = get_title(doc);
		return "<a href='" + doc.full_route + "'>" + link_name + "</a>";
	};
	page_link.safe = true;
	swig.setFilter('page_link', page_link);

	var get_title = function(doc) {
		var title;
		if (typeof doc.title !== 'undefined' && doc.title !== '') {
			title = doc.title;
		} else {
			title = 'Page ' + doc.url_name;
		}
		return title;
	}
	get_title.safe = true;
	swig.setFilter('get_title', get_title);

	var get_body = function(doc) {
		return marked(doc.body);
	}
	get_body.safe = true;
	swig.setFilter('get_body', get_body);

	var get_tags = function(doc) {
		return doc.tags.join(' ');
	}
	get_tags.safe = true;
	swig.setFilter('get_tags', get_tags);
};