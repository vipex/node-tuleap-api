'use strict';

var Url = require('url');
var Request = require('request');
var Utils = require('./utils.js');

var Debug = require('debug')('Tuleap:Client');

var Client = function (options) {
	// Default config
	this.config = Utils.extend({}, options);

	// don't want these here...
	delete this.config.username;
	delete this.config.password;

	// Url
	if (options && options.server) {
		var ep = Url.parse(options.server);

		ep.protocol = ep.protocol.replace(/:\/?\/?$/, '') || 'https';
		ep.port = ep.port || ep.protocol.startsWith('https') ? 443 : 80;
		ep.pathname = ep.pathname.replace(/\/$/, '');

		// endpoint configuration
		this.config.endpoint = {
			host: ep.hostname,
			prot: ep.protocol,
			port: ep.port,
			path: ep.pathname + '/api'
		};

		delete this.config.server;
	} else {
		throw new Error('No server specified.');
	}

	Debug('Configuration: %j', this.config);

};

// Define method calls
['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].forEach(function (method) {
	Client.prototype[method.toLowerCase()] = function (action, data, callback) {
		return this._request(action, method, data, callback);
	};
});

// Define request method
Client.prototype._request = function (action, method, data, callback) {
	data = Utils.extend({}, data);

	Debug('Config: %j', this.config);

	var headers = {
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	};

	var rqo = {
		method: method,
		json: true,
		strictSSL: this.config.strictSSL,
		url: Utils.genUrl(this.config.endpoint) + action,
		headers: headers
	};

	if (this.config.auth) {
		rqo.headers['X-Auth-Token'] = this.config.auth['token'];
		rqo.headers['X-Auth-UserId'] = this.config.auth.user_id;
	}

	if (data.headers) {
		rqo.headers = Utils.extend(rqo.headers, data.headers);
	}

	if (data.query) {
		rqo.url += '?' + qs.stringify(data.query);
	}

	if (data.body) {
		rqo.body = data.body;
	}

	Debug('rpc: %j', rqo);

	return Request(rqo, callback);
};

module.exports = Client;