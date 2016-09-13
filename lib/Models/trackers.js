'use strict';

var Utils = require('../utils.js');

var Debug = require('debug')('Tuleap:Trackers');

var Trackers = function (client) {
	this.path = '/trackers';
	this.client = client;
};

// TODO: Endpoint: GET /trackers/{id}
// Trackers.prototype.DUMMY = function (callback) {};

// TODO: Endpoint: GET /trackers/{id}/artifacts
// Trackers.prototype.DUMMY = function (callback) {};

// TODO: Endpoint: GET /trackers/{id}/parent_artifacts
// Trackers.prototype.DUMMY = function (callback) {};

// TODO: Endpoint: GET /trackers/{id}/tracker_reports
// Trackers.prototype.DUMMY = function (callback) {};


module.exports = Trackers;