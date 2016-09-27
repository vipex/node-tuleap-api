'use strict';
var chai = require('chai');
var expect = chai.expect;

var Mock = require('./mock');
var mData = require('./mock-data.json');
var Client = require('../lib/client');
var Artifacts = require('../lib/Models/artifacts');

describe('Artifacts init', function () {
	var client;

	before(function () {
		client = new Client(mData.config);
	});

	// Initialization require at least the server
	it('Expect to throw an initialization error', function () {

		expect(function () {
			return new Artifacts();
		}).to.throw(Error, 'No client object.');

	});

	// if parameters are Ok,
	it('Expect to be valid Artifacts object', function () {
		var t = new Artifacts(client);

		expect(t).to.be.an.instanceof(Artifacts);
		expect(t.path).to.be.equal('/artifacts/');
	});
});

describe('Artifacts functionality', function () {
	var server, artifacts;

	beforeEach(function () {
		server = Mock.createAPIMock();
		artifacts = new Artifacts(new Client(mData.config));
	});

	after(function () { artifacts = undefined; });

	it('Expect to get artifact 19', function (done) {
		artifacts.artifact({id: 19}, function (err, data) {
			expect(err).to.be.equal(null);
			expect(data).to.be.deep.equal(mData.endpoints.artifacts['artifacts/19']);
			done();
		});
	});

	it('Expect to get changesets for artifact 19', function (done) {
		artifacts.changesets({id: 19}, function (err, data) {
			expect(err).to.be.equal(null);
			expect(data).to.be.deep.equal(mData.endpoints.artifacts['artifacts/19/changesets']);
			done();
		});
	});

	it('Expect to get linked artifacts for artifact 19', function (done) {
		artifacts.linkedArtifacts({id: 19}, function (err, data) {
			expect(err).to.be.equal(null);
			expect(data).to.be.deep.equal(mData.endpoints.artifacts['artifacts/19/linked_artifacts']);
			done();
		});
	});

	it('Expect to get links for artifact 19', function (done) {
		artifacts.links({id: 19}, function (err, data) {
			expect(err).to.be.equal(null);
			expect(data).to.be.deep.equal(mData.endpoints.artifacts['artifacts/19/links']);
			done();
		});
	});

	it('Expect to get error 404 for unknown artifact 999', function (done) {
		artifacts.artifact({id: 999}, function (err, data) {
			expect(err).to.be.instanceOf(Error);
			expect(data).to.be.deep.equal(mData.endpoints.artifacts['artifacts/999']);
			done();
		});
	});

	it('Expect to get error 404 for unknown artifact 999 changesets', function (done) {
		artifacts.changesets({id: 999}, function (err, data) {
			expect(err).to.be.instanceOf(Error);
			expect(data).to.be.deep.equal(mData.endpoints.artifacts['artifacts/999/changesets']);
			done();
		});
	});

	it('Expect to get error 404 for unknown artifact 999 linked artifacts', function (done) {
		artifacts.linkedArtifacts({id: 999}, function (err, data) {
			expect(err).to.be.instanceOf(Error);
			expect(data).to.be.deep.equal(mData.endpoints.artifacts['artifacts/999/linked_artifacts']);
			done();
		});
	});

	it('Expect to get error 404 for unknown artifact 999 links', function (done) {
		artifacts.links({id: 999}, function (err, data) {
			expect(err).to.be.instanceOf(Error);
			expect(data).to.be.deep.equal(mData.endpoints.artifacts['artifacts/999/links']);
			done();
		});
	});

});