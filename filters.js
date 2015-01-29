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
};