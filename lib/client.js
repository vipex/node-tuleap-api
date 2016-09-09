'use strict';
var Http = require('http');
var Https = require('https');
var Url = require('url');
var Q = require('q');
var Debug = require('debug')('Client');

var Client = function (options) {
	// Default config
	this.config = {}

	// Url
	if (options && options.server) {
		var ep = Url.parse(options.server);

		ep.protocol = ep.protocol.replace(/:\/?\/?$/, '') || 'https';
		ep.port = ep.port || ep.protocol.startsWith('https') ? 443 : 80;
		ep.pathname = ep.pathname.endsWith('/') ? ep.pathname.replace(/\/$/, '') : ep.pathname;

		// endpoint configuration
		this.config.endpoint = {
			host: ep.hostname,
			prot: ep.protocol,
			port: ep.port,
			path: ep.pathname + '/api'
		};
	} else {
		throw new Error('No url specified');
	}

};

// Define method calls
['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].forEach(function (method) {
  Client.prototype[method.toLowerCase()] = function (action, options) {
    return this.request(action, method, options);
  };
});

// Define request method
Client.prototype.request = function (action, method, options, callback) {
	options = options || {};

	var self = this;
	var defer = Q.defer();

	var headers = {
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	};
	if (this.config.auth) {
		headers['X-Auth-Token']		= this.config.auth.token;
		headers['X-Auth-UserId']	= this.config.auth.userid;
	}

	var scheme = { http: Http, https: Https }[this.config.endpoint.prot];

	var rqo = {
		hostname: this.config.endpoint.host,
		port: this.config.endpoint.port,
		method: method,
		path: this.config.endpoint.path + action,
		headers: headers
	};

	Debug('rpc: opts:%j, req:%j', options, rqo);

	var req = scheme.request(rqo, function (res) {
		if (res.setEncoding) {
			res.setEncoding('utf-8');
		}

		var data = '';
		res.on('data', function (chunk) {
			data += chunk;
		});

		res.on('end', function () {
			if (res.statusCode < 200 || res.statusCode >= 400) {
				defer.reject(new Error(res.statusCode + ':' + data));
			}

			try {
				var body = JSON.parse(body);
				defer.resolve(body);
			} catch (err) {
				defer.reject(new Error(res.statusCode + ': Unable to parse body, ' + data));
			}
		});
	});

	req.on('error', function (err) {
		defer.reject(err);
	});

	if (options.body) {
		req.write(JSON.stringify(options.body));
	}

	req.end();

	return defer.promise.catch(function (e) {
		Debug('rpc error: %s', e);
		throw e;
	});
}


module.exports = Client;