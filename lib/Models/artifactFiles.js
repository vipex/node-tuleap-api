/**
 * ArtifactsFiles module
 * @module Tuleap/Models/artifactsFiles
 */

'use strict';

/**
 * Standard request cb
 * @callback requestCallback
 * @param {Error} Error
 * @param {object} Data
 */

var Utils = require('../utils.js');

var Debug = require('debug')('Tuleap:ArtifactFiles');

/**
 * @class
 * @param {object} client - API client
 * @constructor
 */
var ArtifactFiles = function (client) {
	this.path = '/artifact_files/';
	this.client = client;
};

/**
 * Endpoint: GET /artifact_files/{id}
 * https://tuleap.net/api/explorer/#!/artifact_files
 * A user can only access the attached files they can view.
 * Returns a file Chunk of max 1048576 bytes.
 *
 * @param {object} query - Query parameters
 * @param {number} query.id - File id
 * @param {number} [query.offset=0] - File offset
 * @param {number} [query.limit=1048576] - File size read per request (max 1048576)
 * @param {requestCallback} cb - The callback function
 * @returns {object} - Request object
 */
ArtifactFiles.prototype.file = function (query, cb) {
	Debug('File query:', query);

	query.limit = query.limit || 1048576;
	var qr = {
		offset: query.offset || 0,
		limit: (query.limit <= 1048576 ? query.limit : 1048576)
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
 * ArtifactFiles module exported
 *
 * @type {ArtifactFiles}
 */
module.exports = ArtifactFiles;