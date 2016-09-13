//
'use strict';

module.exports.resParse = function (err, res, data) {
	if (err) throw new Error(err);

	try {
		data = JSON.parse(data);
		if (res.statusCode > 400) {
			return [new Error(res.statusMessage, res.statusCode), data];
		} else {
			return [null, data];
		}
	} catch (err) {
		return [err, data];
	}
};

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
