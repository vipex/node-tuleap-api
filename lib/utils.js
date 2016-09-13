//
'use strict';

// Extend objects
module.exports.extend = function (object, properties) {
	var val;
	for (var key in properties) {
		if (properties.hasOwnProperty(key)) {
			val = properties[key];
			object[key] = val;
		}
	}
	return object;
};

// Concatenate URLs
module.exports.genUrl = function (opt) {
	var _url = (opt.prot || 'https') + '://' + opt.host;

	if (opt.port) {
		_url += ':' + opt.port;
	}
	_url += opt.path;
	return _url;
};
