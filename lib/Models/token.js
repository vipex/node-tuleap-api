'use strict';

var Utils = require('../utils.js');

var Debug = require('debug')('Tuleap:Tokens');

var Authenticate = function (client) {
	this.path = '/tokens';
	this.client = client;
};

// Endpoint: POST /api/tokens
Authenticate.prototype.login = function (username, password, callback) {

	var body = {
		"username": username,
		"password": password
	};

	return this.client
		.post(
			this.path,
			{body: body},
			function (err, res, data) {
				Debug("Login: \n%j\n%j\n%j", err, res, data);

				var r = Utils.resParse(err, res, data);

				Debug("Login parsed:\n", r);
				if (!r[0]) { // Check for error
					this.client.config.auth = r[1]; // Save parsed data
				}

				if (callback) callback.apply(null, r);
			}.bind(this)
		);

};

// Endpoint: DELETE /api/tokens
Authenticate.prototype.logout = function (callback) {

	return this.client
		.delete(
			this.path,
			{},
			function (err, res, data) {
				Debug("Logout: \n%j\n%j\n%j", err, res, data);
				if (callback) callback.apply(null, Utils.resParse(err, res, data));
			}
		);

};

// Returns the actual token string
Authenticate.prototype.token = function () {

	if (this.client.config.auth && this.client.config.auth.token) {
		return this.client.config.auth.token;
	}

	return null;

};

// Returns the actual token string
Authenticate.prototype.userid = function () {

	if (this.client.config.auth && this.client.config.auth.user_id) {
		return this.client.config.auth.user_id;
	}

	return null;

};

module.exports = Authenticate;