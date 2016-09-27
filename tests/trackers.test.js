'use strict';
var chai = require('chai');
var expect = chai.expect;

var Mock = require('./mock');
var mData = require('./mock-data.json');
var Client = require('../lib/client');
var Trackers = require('../lib/Models/trackers');

describe('Trackers init', function () {
	var client;

	before(function () {
		client = new Client(mData.config);
	});

	// Initialization require at least the server
	it('Expect to throw an initialization error', function () {

		expect(function () {
			return new Trackers();
		}).to.throw(Error, 'No client object.');

	});

	// if parameters are Ok,
	it('Expect to be valid Trackers object', function () {
		var t = new Trackers(client);

		expect(t).to.be.an.instanceof(Trackers);
		expect(t.path).to.be.equal('/trackers/');
	});
});

describe('Trackers functionality', function () {
	var server, trackers;

	beforeEach(function () {
		server = Mock.createAPIMock();
		trackers = new Trackers(new Client(mData.config));
	});

	after(function () { trackers = undefined; });

	it('Expect to get tracker 12', function (done) {
		trackers.tracker({id: 12}, function (err, data) {
			expect(err).to.be.equal(null);
			expect(data).to.be.deep.equal(mData.endpoints.trackers['trackers/12']);
			done();
		});
	});

	it('Expect to get artifacts for tracker 12', function (done) {
		trackers.artifacts({id: 12}, function (err, data) {
			expect(err).to.be.equal(null);
			expect(data).to.be.deep.equal(mData.endpoints.trackers['trackers/12/artifacts']);
			done();
		});
	});

	it('Expect to get parent artifacts for tracker 12', function (done) {
		trackers.parentArtifacts({id: 12}, function (err, data) {
			expect(err).to.be.equal(null);
			expect(data).to.be.deep.equal(mData.endpoints.trackers['trackers/12/parent_artifacts']);
			done();
		});
	});

	it('Expect to get tracker reports for tracker 12', function (done) {
		trackers.trackerReports({id: 12}, function (err, data) {
			expect(err).to.be.equal(null);
			expect(data).to.be.deep.equal(mData.endpoints.trackers['trackers/12/tracker_reports']);
			done();
		});
	});


	it('Expect to get error 404 for unknown tracker 99', function (done) {
		trackers.tracker({id: 99}, function (err, data) {
			expect(err).to.be.instanceOf(Error);
			expect(data).to.be.deep.equal(mData.endpoints.trackers['trackers/99']);
			done();
		});
	});

	it('Expect to get error 404 for unknown tracker 99 artifacts', function (done) {
		trackers.artifacts({id: 99}, function (err, data) {
			expect(err).to.be.instanceOf(Error);
			expect(data).to.be.deep.equal(mData.endpoints.trackers['trackers/99/artifacts']);
			done();
		});
	});

	it('Expect to get error 404 for unknown tracker 99 parent artifacts', function (done) {
		trackers.parentArtifacts({id: 99}, function (err, data) {
			expect(err).to.be.instanceOf(Error);
			expect(data).to.be.deep.equal(mData.endpoints.trackers['trackers/99/parent_artifacts']);
			done();
		});
	});

	it('Expect to get error 404 for unknown tracker 99 tracker reports', function (done) {
		trackers.trackerReports({id: 99}, function (err, data) {
			expect(err).to.be.instanceOf(Error);
			expect(data).to.be.deep.equal(mData.endpoints.trackers['trackers/99/tracker_reports']);
			done();
		});
	});

});