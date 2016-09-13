'use strict';

var Utils = require('../utils.js');

var Debug = require('debug')('Tuleap:ArtifactFiles');

var ArtifactFiles = function (client) {
	this.path = '/artifact_files';
	this.client = client;
};

// TODO: GET /artifact_files/{id}
// ArtifactFiles.prototype.DUMMY = function (callback) {};


module.exports = ArtifactFiles;