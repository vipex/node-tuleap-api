'use strict';

var Utils = require('../utils.js');

var Debug = require('debug')('Tuleap:Projects');

var Projects = function (client) {
	this.path = '/projects';
	this.client = client;
};

// Endpoint: GET /api/projects
Projects.prototype.all = function (limit, offset, callback) {
	Debug(this.client);

	var query = null;
	if (typeof limit === 'function') {
		callback = limit;
	} else if (typeof limit === 'number') {
		query = {
			limit: limit,
			offset: offset
		}
	}

	return this.client
		.get(
			this.path,
			{query: query},
			function (err, res, data) {
				callback.apply(null, Utils.resParse(err, res, data));
			}
		);

};

// Endpoint: GET /api/projects/{id}
Projects.prototype.project = function (id, callback) {
	Debug(this.client);

	return this.client
		.get(
			this.path + '/' + id,
			{},
			function (err, res, data) {
				callback.apply(null, Utils.resParse(err, res, data));
			}
		);
};

// Endpoint: GET /projects/{id}/backlog
Projects.prototype.backlog = function (id, limit, offset, callback) {
	Debug(this.client);

	var query = null;
	if (typeof limit === 'function') {
		callback = limit;
	} else if (typeof limit === 'number') {
		query = {
			limit: limit,
			offset: offset
		}
	}

	return this.client
		.get(
			this.path + '/' + id + '/backlog',
			{ query: query },
			function (err, res, data) {
				callback.apply(null, Utils.resParse(err, res, data));
			}
		);
};

// TODO: Endpoint: GET /projects/{id}/git
// Projects.prototype.DUMMY = function (callback) {};

// TODO: Endpoint: GET /projects/{id}/milestones
// Projects.prototype.DUMMY = function (callback) {};

// TODO: Endpoint: GET /projects/{id}/phpwiki
// Projects.prototype.DUMMY = function (callback) {};

// TODO: Endpoint: GET /projects/{id}/phpwiki_plugin
// Projects.prototype.DUMMY = function (callback) {};

// TODO: Endpoint: GET /projects/{id}/plannings
// Projects.prototype.DUMMY = function (callback) {};

// Endpoint: GET /projects/{id}/trackers
Projects.prototype.trackers = function (id, limit, offset, callback) {
	Debug(this.client);

	var query = null;
	if (typeof limit === 'function') {
		callback = limit;
	} else if (typeof limit === 'number') {
		query = {
			limit: limit,
			offset: offset
		}
	}

	return this.client
		.get(
			this.path + '/' + id + '/backlog',
			{ query: query },
			function (err, res, data) {
				callback.apply(null, Utils.resParse(err, res, data));
			}
		);
};

// TODO: Endpoint: GET /projects/{id}/user_groups
// Projects.prototype.DUMMY = function (callback) {};

// TODO: Endpoint: PUT /projects/{id}/backlog
// Projects.prototype.DUMMY = function (callback) {};

// TODO: Endpoint: PATCH /projects/{id}/backlog
// Projects.prototype.DUMMY = function (callback) {};


module.exports = Projects;
