'use strict';
var chai = require('chai');
var expect = chai.expect;

var Mock = require('./mock');
var mData = require('./mock-data.json');
var Client = require('../lib/client');
var ArtifactFiles = require('../lib/Models/artifactFiles');

describe('ArtifactFiles init', function () {
	var client;

	before(function () {
		client = new Client(mData.config);
	});

	// Initialization require at least the server
	it('Expect to throw an initialization error', function () {

		expect(function () {
			return new ArtifactFiles();
		}).to.throw(Error, 'No client object.');

	});

	// if parameters are Ok,
	it('Expect to be valid ArtifactFiles object', function () {
		var t = new ArtifactFiles(client);

		expect(t).to.be.an.instanceof(ArtifactFiles);
		expect(t.path).to.be.equal('/artifact_files/');
	});
});

describe('ArtifactFiles functionality', function () {
	var server, artifactFiles;

	beforeEach(function () {
		server = Mock.createAPIMock();
		artifactFiles = new ArtifactFiles(new Client(mData.config));
	});

	after(function () { artifactFiles = undefined; });

	it('Expect to get artifact file 244', function (done) {
		artifactFiles.getFile({id: 244}, function (err, data) {
			expect(err).to.be.equal(null);
			expect(data).to.be.deep.equal(mData.endpoints.artifactfiles['artifact_files/244']);
			done();
		});
	});

});