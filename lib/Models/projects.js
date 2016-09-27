/**
 * Projects module
 * @module Tuleap/Models/projects
 */

'use strict';

/**
 * Standard request cb
 * @callback requestCallback
 * @param {Error} Error
 * @param {object} Data
 */

var Utils = require('../utils.js');

var Debug = require('debug')('Tuleap:Projects');

/**
 * @class
 * @param {object} client - API client
 * @constructor
 */
var Projects = function (client) {
	if (!client) {
		throw new Error('No client object.');
	}
	this.path = '/projects/';
	this.client = client;
};

/**
 * Endpoint: GET /projects
 * https://tuleap.net/api/explorer/#!/projects/retrieve
 * Get the public projects and the projects the current user is member of. If current user is site administrator, then returns all active projects.
 *
 * @param {object} query - Query parameters
 * @param {number} [query.limit=100] - Results limit
 * @param {number} [query.offset=0] - Results offset
 * @param {requestCallback}  cb - The callback function
 * @returns {object} - Request object
 */
Projects.prototype.all = function (query, cb) {
	Debug('Projects.all query:', query);

	var qr = {
		limit: query.limit || 100,
		offset: query.offset || 0
	};

	return this.client
		.get(
			this.path,
			{query: qr},
			function (err, res, data) {
				cb.apply(null, Utils.resParse(err, res, data));
			}
		);

};

/**
 * Endpoint: GET /projects/{id}
 * https://tuleap.net/api/explorer/#!/projects/retrieveId
 * Get the definition of a given project.
 *
 * @param {object} query - Query parameters
 * @param {number} query.id - Tracker id
 * @param {requestCallback}  cb - The callback function
 * @returns {object} - Request object
 */
Projects.prototype.project = function (query, cb) {
	Debug('Project query:', query);

	return this.client
		.get(
			this.path + query.id,
			{},
			function (err, res, data) {
				cb.apply(null, Utils.resParse(err, res, data));
			}
		);
};

/**
 * Endpoint: /projects/{id}/backlog
 * https://tuleap.net/api/explorer/#!/projects/retrieveBacklog
 * Get the backlog items that can be planned in a top-milestone.
 *
 * @param {object} query - Query parameters
 * @param {number} query.id - Tracker id
 * @param {number} [query.limit=100] - Results limit
 * @param {number} [query.offset=0] - Results offset
 * @param {requestCallback} cb - The callback function
 * @returns {object} - Request object
 */
Projects.prototype.backlog = function (query, cb) {
	Debug('Backlog query:', query);

	var qr = {
		limit: query.limit || 100,
		offset: query.offset || 0
	};

	return this.client
		.get(
			this.path + query.id + '/backlog',
			{ query: qr },
			function (err, res, data) {
				cb.apply(null, Utils.resParse(err, res, data));
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

/**
 * Endpoint: /projects/{id}/trackers
 * https://tuleap.net/api/explorer/#!/projects/retrieveTrackers
 * Get the trackers of a given project.
 *
 * @param {object} query - Query parameters
 * @param {number} query.id - Tracker id
 * @param {number} [query.limit=100] - Results limit
 * @param {number} [query.offset=0] - Results offset
 * @param {requestCallback} cb - The callback function
 * @returns {object} - Request object
 */
Projects.prototype.trackers = function (query, cb) {
	Debug('Trackers query:', query);

	var qr = {
		limit: query.limit || 100,
		offset: query.offset || 0
	};

	return this.client
		.get(
			this.path + query.id + '/trackers',
			{ query: qr },
			function (err, res, data) {
				cb.apply(null, Utils.resParse(err, res, data));
			}
		);
};

// TODO: Endpoint: GET /projects/{id}/user_groups
// Projects.prototype.DUMMY = function (callback) {};

// TODO: Endpoint: PUT /projects/{id}/backlog
// Projects.prototype.DUMMY = function (callback) {};

// TODO: Endpoint: PATCH /projects/{id}/backlog
// Projects.prototype.DUMMY = function (callback) {};

/**
 * Projects module exported
 *
 * @type {Projects}
 */
module.exports = Projects;
