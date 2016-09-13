'use strict';

var Utils = require('../utils.js');

var Debug = require('debug')('Tuleap:Artifacts');

var Artifacts = function (client) {
	this.path = '/artifacts';
	this.client = client;
};

// TODO: GET /artifacts/{id}
// Artifacts.prototype.DUMMY = function (callback) {};

// TODO: GET /artifacts/{id}/changesets
// Artifacts.prototype.DUMMY = function (callback) {};

// TODO: GET /artifacts/{id}/linked_artifacts
// Artifacts.prototype.DUMMY = function (callback) {};

// TODO: GET /artifacts/{id}/links
// Artifacts.prototype.DUMMY = function (callback) {};

// TODO: POST /artifacts
// Artifacts.prototype.DUMMY = function (callback) {};

// TODO: PUT /artifacts/{id}
// Artifacts.prototype.DUMMY = function (callback) {};


module.exports = Artifacts;