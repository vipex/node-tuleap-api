'use strict';
var chai = require('chai');
var expect = chai.expect;

var Mock = require('./mock');
var mData = require('./mock-data.json');
var Client = require('../lib/client');
var Projects = require('../lib/Models/projects');

describe('Projects init', function () {
	var client;

	before(function () {
		client = new Client(mData.config);
	});

	// Initialization require at least the server
	it('Expect to throw an initialization error', function () {

		expect(function () {
			return new Projects();
		}).to.throw(Error, 'No client object.');

	});

	// if parameters are Ok,
	it('Expect to be valid Projects object', function () {
		var t = new Projects(client);

		expect(t).to.be.an.instanceof(Projects);
		expect(t.path).to.be.equal('/projects/');
	});
});

describe('Projects functionality', function () {
	var server, projects;

	beforeEach(function () {
		server = Mock.createAPIMock();
		projects = new Projects(new Client(mData.config));
	});

	after(function () { projects = undefined; });

	it('Expect to get projects list (all)', function (done) {
		projects.all({}, function (err, data) {
			expect(err).to.be.equal(null);
			expect(data).to.be.deep.equal(mData.endpoints.projects.projects);
			done();
		});
	});

	it('Expect to get project 101', function (done) {
		projects.project({id: 101}, function (err, data) {
			expect(err).to.be.equal(null);
			expect(data).to.be.deep.equal(mData.endpoints.projects['projects/101']);
			done();
		});
	});

	it('Expect to get backlog for project 101', function (done) {
		projects.backlog({id: 101}, function (err, data) {
			expect(err).to.be.equal(null);
			expect(data).to.be.deep.equal(mData.endpoints.projects['projects/101/backlog']);
			done();
		});
	});

	it('Expect to get trackers for project 101', function (done) {
		projects.trackers({id: 101}, function (err, data) {
			expect(err).to.be.equal(null);
			expect(data).to.be.deep.equal(mData.endpoints.projects['projects/101/trackers']);
			done();
		});
	});

	it('Expect to get error 404 for unknown project 999', function (done) {
		projects.project({id: 999}, function (err, data) {
			expect(err).to.be.instanceOf(Error);
			expect(data).to.be.deep.equal(mData.endpoints.projects['projects/999']);
			done();
		});
	});

	it('Expect to get error 404 for unknown project 999 backlog', function (done) {
		projects.backlog({id: 999}, function (err, data) {
			expect(err).to.be.instanceOf(Error);
			expect(data).to.be.deep.equal(mData.endpoints.projects['projects/999/backlog']);
			done();
		});
	});

	it('Expect to get error 404 for unknown project 999 trackers', function (done) {
		projects.trackers({id: 999}, function (err, data) {
			expect(err).to.be.instanceOf(Error);
			expect(data).to.be.deep.equal(mData.endpoints.projects['projects/999/trackers']);
			done();
		});
	});



});