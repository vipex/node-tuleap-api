'use strict';

var Utils = require('../utils.js');

var Debug = require('debug')('Tuleap:TrackerReports');

var TrackerReports = function (client) {
	this.path = '/tracker_reports';
	this.client = client;
};

// TODO: GET /tracker_reports/{id}
// TrackerReports.prototype.DUMMY = function (callback) {};

// TODO: GET /tracker_reports/{id}/artifacts
// TrackerReports.prototype.DUMMY = function (callback) {};


module.exports = TrackerReports;