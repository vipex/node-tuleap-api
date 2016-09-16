/**
 * Artifacts module
 * @module Tuleap/Models/artifacts
 */

'use strict';

/**
 * Standard request cb
 * @callback requestCallback
 * @param {Error} Error
 * @param {object} Data
 */

var Utils = require('../utils.js');

var Debug = require('debug')('Tuleap:Artifacts');

/**
 * @class
 * @param {object} client - API client
 * @constructor
 */
var Artifacts = function (client) {
	this.path = '/artifacts';
	this.client = client;
};

/**
 * Endpoint: GET /artifacts/{id}
 * https://tuleap.net/api/explorer/#!/artifacts/retrieveId
 * Get the content of a given artifact. In addition to the artifact representation,
 * it sets Last-Modified header with the last update date of the element.
 *
 * @param {object} query - Query parameters
 * @param {number} query.id - Artifact id
 * @param {requestCallback}  cb - The callback function
 * @returns {object} - Request object
 */
Artifacts.prototype.artifact = function (query, cb) {
	Debug('Artifact query:' + query);

	var qr = {
		values_format: 'all'
	};

	return this.client
		.get(
			this.path + query.id,
			{query: qr},
			function (err, res, data) {
				cb.apply(null, Utils.resParse(err, res, data));
			}
		);
};

/**
 * Endpoint: GET /artifacts/{id}/changesets
 * https://tuleap.net/api/explorer/#!/artifacts/retrieveArtifactChangesets
 * Get the changesets of a given artifact.
 *
 * @param {object} query - Query parameters
 * @param {number} query.id - Artifact id
 * @param {number} [query.limit=100] - Results limit
 * @param {number} [query.offset=0] - Results offset
 * @param {'asc'||'desc'} [query.order=asc] - Results order (id)
 * @param {requestCallback} cb - The callback function
 * @returns {object} - Request object
 */
Artifacts.prototype.changesets = function (query, cb) {
	Debug(this.client);

	var qr = {
		fields: 'all',
		limit: query.limit || 100,
		offset: query.offset || 0,
		order: query.order || 'asc'
	};

	return this.client
		.get(
			this.path + query.id + '/changesets',
			{query: qr},
			function (err, res, data) {
				cb.apply(null, Utils.resParse(err, res, data));
			}
		);
};

/**
 * Endpoint: GET /artifacts/{id}/linked_artifacts
 * https://tuleap.net/api/explorer/#!/artifacts/retrieveLinkedArtifacts
 * Get all the artifacts linked by type. If no type is provided, it will search linked artifacts witn no type.
 *
 * @param {object} query - Query parameters
 * @param {number} query.id - Artifact id
 * @param {'forward'||'reverse'} [query.direction='forward'] - Link direction
 * @param {string} [query.nature] - Link type to filter
 * @param {number} [query.limit=100] - Results limit
 * @param {number} [query.offset=0] - Results offset
 * @param {requestCallback} cb - The callback function
 * @returns {object} - Request object
 */
Artifacts.prototype.linkedArtifacts = function (query, cb) {
	Debug(this.client);

	var qr = {
		direction: query.direction || 'forward',
		nature: query.nature || '',
		limit: query.limit || 100,
		offset: query.offset || 0
	};

	return this.client
		.get(
			this.path + query.id + '/linked_artifacts',
			{query: qr},
			function (err, res, data) {
				cb.apply(null, Utils.resParse(err, res, data));
			}
		);
};

/**
 * Endpoint: GET /artifacts/{id}/links
 * https://tuleap.net/api/explorer/#!/artifacts/retrieveArtifactLinkNatures
 *
 * @param {object} query - Query parameters
 * @param {number} query.id - Artifact id
 * @param {requestCallback} cb - The callback function
 * @returns {object} - Request object
 */
Artifacts.prototype.links = function (query, cb) {
	Debug(this.client);

	return this.client
		.get(
			this.path + query.id + '/links',
			{},
			function (err, res, data) {
				cb.apply(null, Utils.resParse(err, res, data));
			}
		);
};

/**
 * Endpoint: POST /artifacts
 * https://tuleap.net/api/explorer/#!/artifacts/create
 *
 */
// TODO: Implement artifact creation

/**
 * Endpoint: PUT /artifacts/{id}
 * https://tuleap.net/api/explorer/#!/artifacts/updateId
 *
 */
// TODO: Implement artifact update

/**
 * Artifacts module exported
 *
 * @type {Artifacts}
 */
module.exports = Artifacts;