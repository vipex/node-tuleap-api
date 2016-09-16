/**
 * Tuleap module
 * @module Tuleap
 */
'use strict';

var Debug = require('debug')('Tuleap');

var Client 		= require('./client');
var Token 		= require('./Models/token');
var Projects 	= require('./Models/projects');
var Trackers 	= require('./Models/trackers');
var TrackerReports 	= require('./Models/trackerReports');
var Artifacts 			= require('./Models/artifacts');
var ArtifactFiles 	= require('./Models/artifactFiles');

/**
 * @class
 * @param {object} options - Options object
 * @param {string} options.server - server path
 * @param {boolean} [options.strictSSL=true] - to disable strictSSL
 * @param {object} [options.auth] - token authentication params
 * @param {string} options.auth.token - token string
 * @param {number} options.auth.user_id - user id associated w/ the token
 * @constructor
 */
var Tuleap = function(options) {
	Debug('Initialization: %j', options);

	var client 	= new Client(options);

	this.token 		= new Token(client);
	this.projects = new Projects(client);
	this.trackers	= new Trackers(client);
	this.trackerreports	= new TrackerReports(client);
	this.artifacts			= new Artifacts(client);
	this.artifactfiles	= new ArtifactFiles(client);
};

/**
 * Tuleap module exported
 *
 * @type {Tuleap}
 */
module.exports = Tuleap;