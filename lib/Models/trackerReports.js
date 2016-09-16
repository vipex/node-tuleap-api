/**
 * TrackerReports module
 * @module Tuleap/Models/trackerReports
 */

'use strict';

/**
 * Standard request cb
 * @callback requestCallback
 * @param {Error} Error
 * @param {object} Data
 */

var Utils = require('../utils.js');

var Debug = require('debug')('Tuleap:TrackerReports');

/**
 * @class
 * @param {object} client - API client
 * @constructor
 */
var TrackerReports = function (client) {
	this.path = '/tracker_reports/';
	this.client = client;
};

/**
 * Endpoint: GET /tracker_reports/{id}
 * https://tuleap.net/api/explorer/#!/tracker_reports/retrieveId
 * Get the definition of the given report.
 *
 * @param {object} query - Query parameters
 * @param {number} query.id - Tracker id
 * @param {requestCallback}  cb - The callback function
 * @returns {object} - Request object
 */
TrackerReports.prototype.report = function (query, cb) {
	Debug('Report query:' + query);

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
 * Endpoint: GET /tracker_reports/{id}/artifacts
 * https://tuleap.net/api/explorer/#!/tracker_reports/retrieveArtifacts
 * Get artifacts matching criteria of a report.
 *
 * @param {object} query - Query parameters
 * @param {number} query.id - Tracker id
 * @param {number} [query.limit=100] - Results limit
 * @param {number} [query.offset=0] - Results offset
 * @param {requestCallback} cb - The callback function
 * @returns {object} - Request object
 */
TrackerReports.prototype.artifacts = function (query, cb) {
	Debug('Artifacts query:', query);

	var qr = {
		values: 'all',
		limit: query.limit || 100,
		offset: query.offset || 0
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
 * TrackerReports module exported
 *
 * @type {TrackerReports}
 */
module.exports = TrackerReports;