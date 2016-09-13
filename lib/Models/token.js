'use strict';

var Debug = require('debug')('Tuleap:Token');

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
				this.client.config.auth = JSON.parse(data);

				Debug(this.client);

				callback(err, data);
			}.bind(this)
		);

};

// Endpoint: DELETE /api/tokens
Authenticate.prototype.logout = function () {

	return this.client
		.delete(
			this.path,
			{},
			function (err, res, data) {
				callback(err, data);
			}
		);

};

Authenticate.prototype.token = function () {

	if (this.client.config.auth && this.client.config.auth.token) {
		return this.client.config.auth.token;
	}

	return null;

};

module.exports = Authenticate;