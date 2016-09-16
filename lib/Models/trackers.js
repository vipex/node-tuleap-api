/**
 * Trackers module
 * @module Tuleap/Models/trackers
 */

'use strict';

/**
 * Standard request cb
 * @callback requestCallback
 * @param {Error} Error
 * @param {object} Data
 */

var Utils = require('../utils.js');

var Debug = require('debug')('Tuleap:Trackers');

/**
 * @class
 * @param {object} client - API client
 * @constructor
 */
var Trackers = function (client) {
	this.client = client;
	this.path = '/trackers/';
};

/**
 * Endpoint: GET /trackers/{id}
 * https://tuleap.net/api/explorer/#!/trackers/retrieveId
 * Get the definition of the given tracker.
 *
 * @param {object} query - Query parameters
 * @param {number} query.id - Tracker id
 * @param {requestCallback}  cb - The callback function
 * @returns {object} - Request object
 */
Trackers.prototype.tracker = function (query, cb) {
	Debug('Tracker query:' + query);

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
 * Endpoint: GET /trackers/{id}/artifacts
 * https://tuleap.net/api/explorer/#!/trackers/retrieveArtifacts
 * Get all artifacts of a given tracker the user can view.
 *
 * @param {object} query - Query parameters
 * @param {number} query.id - Tracker id
 * @param {number} [query.limit=100] - Results limit
 * @param {number} [query.offset=0] - Results offset
 * @param {object} [query.query={}] - Search query
 * @param {'asc'||'desc'} [query.order=asc] - Results order (id)
 * @param {requestCallback} cb - The callback function
 * @returns {object} - Request object
 */
Trackers.prototype.artifacts = function (query, cb) {
	Debug(this.client);

	var qr = {
		values: 'all',
		limit: query.limit || 100,
		offset: query.offset || 0,
		query: query.query || null,
		order: query.order || 'asc'
	};

	return this.client
		.get(
			this.path + query.id + '/artifacts',
			{query: qr},
			function (err, res, data) {
				cb.apply(null, Utils.resParse(err, res, data));
			}
		);
};

/**
 * Endpoint: GET /trackers/{id}/parent_artifacts
 * https://tuleap.net/api/explorer/#!/trackers/retrieveParentArtifacts
 * Given a tracker, get all open artifacts of its parent tracker ordered by their artifact id in decreasing order.
 * If the given tracker doesn't have a parent, it returns an error (404).
 *
 * @param {object} query - Query parameters
 * @param {number} query.id - Tracker id
 * @param {number} [query.limit=100] - Results limit
 * @param {number} [query.offset=0] - Results offset
 * @param {requestCallback} cb - The callback function
 * @returns {object} - Request object
 */
Trackers.prototype.parentArtifacts = function (query, cb) {
	Debug(this.client);

	var qr = {
		limit: query.limit || 100,
		offset: query.offset || 0
	};

	return this.client
		.get(
			this.path + query.id + '/parent_artifacts',
			{query: qr},
			function (err, res, data) {
				cb.apply(null, Utils.resParse(err, res, data));
			}
		);
};

/**
 * Endpoint: GET /trackers/{id}/tracker_reports
 * https://tuleap.net/api/explorer/#!/trackers/retrieveReports
 * All reports the user can see
 *
 * @param {object} query - Query parameters
 * @param {number} query.id - Tracker id
 * @param {number} [query.limit=100] - Results limit
 * @param {number} [query.offset=0] - Results offset
 * @param {requestCallback} cb - The callback function
 * @returns {object} - Request object
 */
Trackers.prototype.trackerReports = function (query, cb) {
	Debug(this.client);

	var qr = {
		limit: query.limit || 100,
		offset: query.offset || 0
	};

	return this.client
		.get(
			this.path + query.id + '/tracker_reports',
			{query: qr},
			function (err, res, data) {
				cb.apply(null, Utils.resParse(err, res, data));
			}
		);
};

/**
 * Trackers module exported
 *
 * @type {Trackers}
 */
module.exports = Trackers;