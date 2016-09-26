//
'use strict';

var Debug = require('debug')('Tuleap:Util');

module.exports.resParse = _resParse;
function _resParse(err, res, data) {
	Debug(err, res, data);

	// if (err) throw new Error(err);

	try {
		if (typeof data === 'string') data = JSON.parse(data);
		if (res.statusCode >= 400) {
			return [new Error(res.statusCode), data];
		} else {
			return [null, data];
		}
	} catch (catched) {
		return [catched, data];
	}
}

// Extend objects
module.exports.extend = _extend;
function _extend(object, properties) {
	var val;
	for (var key in properties) {
		if (properties.hasOwnProperty(key)) {
			val = properties[key];
			object[key] = val;
		}
	}
	return object;
}

// Concatenate URLs
module.exports.genUrl = _genUrl;
function _genUrl(opt) {
	var opx = _extend({prot: 'https', host: 'localhost', path: '/'}, opt);
	var _url = opx.prot + '://' + opx.host;

	if (opx.port) {
		_url += ':' + opx.port;
	}
	_url += opx.path;
	return _url;
}
