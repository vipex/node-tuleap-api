'use strict';

var Authenticate = function (client) {
	this.path = '/tokens';
	this.client = client;
};

Authenticate.prototype.login = function (username, password) {
		var body = {
			"username": username,
			"password": password
		 };

		return this.client
			.post('/token', { body: body })
			.then(function (res) {
					this.client.config.auth = res;
				}.bind(this)
			);

};

Authenticate.prototype.logout = function () {
	return this.client.delete(this.path + '/' + this.client.config.auth.token);
};

Authenticate.prototype.token = function() {
	if (this.client.config.auth && this.client.config.auth.token) {
		return this.client.config.auth.token;
	}

	return null;
};

module.exports = Authenticate;