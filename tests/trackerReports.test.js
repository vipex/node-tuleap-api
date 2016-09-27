'use strict';
var chai = require('chai');
var expect = chai.expect;

var Mock = require('./mock');
var mData = require('./mock-data.json');
var Client = require('../lib/client');
var TrackerReports = require('../lib/Models/trackerReports');

describe('TrackerReports init', function () {
	var client;

	before(function () {
		client = new Client(mData.config);
	});

	// Initialization require at least the server
	it('Expect to throw an initialization error', function () {

		expect(function () {
			return new TrackerReports();
		}).to.throw(Error, 'No client object.');

	});

	// if parameters are Ok,
	it('Expect to be valid TrackerReports object', function () {
		var t = new TrackerReports(client);

		expect(t).to.be.an.instanceof(TrackerReports);
		expect(t.path).to.be.equal('/tracker_reports/');
	});
});

describe('TrackerReports functionality', function () {
	var server, trackerReports;

	beforeEach(function () {
		server = Mock.createAPIMock();
		trackerReports = new TrackerReports(new Client(mData.config));
	});

	after(function () { trackerReports = undefined; });

	it('Expect to get report 120', function (done) {
		trackerReports.report({id: 120}, function (err, data) {
			expect(err).to.be.equal(null);
			expect(data).to.be.deep.equal(mData.endpoints.trackerreports['tracker_reports/120']);
			done();
		});
	});

	it('Expect to get artifacts for report 120', function (done) {
		trackerReports.artifacts({id: 120}, function (err, data) {
			expect(err).to.be.equal(null);
			expect(data).to.be.deep.equal(mData.endpoints.trackerreports['tracker_reports/120/artifacts']);
			done();
		});
	});

	it('Expect to get error 404 for unknown report 999', function (done) {
		trackerReports.report({id: 999}, function (err, data) {
			expect(err).to.be.instanceOf(Error);
			expect(data).to.be.deep.equal(mData.endpoints.trackerreports['tracker_reports/999']);
			done();
		});
	});

	it('Expect to get error 404 for unknown report 999 artifacts', function (done) {
		trackerReports.artifacts({id: 999}, function (err, data) {
			expect(err).to.be.instanceOf(Error);
			expect(data).to.be.deep.equal(mData.endpoints.trackerreports['tracker_reports/999/artifacts']);
			done();
		});
	});

});