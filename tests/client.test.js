'use strict';
var chai = require('chai');
var expect = chai.expect;

var Mock = require('./mock');
var mData = require('./mock-data.json');
var Client = require('../lib/client');

describe('Client init', function () {

	// Initialization require at least the server
	it('Expect to throw an initialization error', function () {

		expect(function () {
			return new Client();
		}).to.throw(Error, 'No server specified.');

	});

	// if parameters are Ok,
	it('Expect to be valid Client object', function () {

		expect(new Client({server: 'http://dummy:123/'}))
			.to.be.an.instanceof(Client);

		expect(new Client({server: 'http://dummy:123/', "strictSSL": false}))
			.to.be.an.instanceof(Client);

	});
});

describe('Client functionality', function () {
	var server, client;

	before(function () { server = Mock.createBaseMock(); });

	beforeEach(function () { client = new Client(mData.config); });
	afterEach(function () { client = undefined; });

	it('Expect get return empty object', function (done) {
		client.get('/', {}, function (e, r, d) {
			expect(d).to.be.deep.equal({});
			done();
		});
	});

	it('Expect post return posted object', function (done) {
		var obj = {test: 'tested'};
		client.post('/', {body: obj}, function (e, r, d) {
			expect(d).to.be.deep.equal(obj);
			done();
		});
	});

	it('Expect put return putted obj', function (done) {
		var obj = {test: 'tested'};
		client.put('/', {body: obj}, function (e, r, d) {
			expect(d).to.be.deep.equal(obj);
			done();
		});
	});

	it('Expect patch return empty object', function (done) {
		var obj = {test: 'tested'};
		client.patch('/', {body: obj}, function (e, r, d) {
			expect(d).to.be.deep.equal(obj);
			done();
		});
	});

	it('Expect delete return empty body', function (done) {
		client.delete('/', {}, function (e, r, d) {
			expect(d).to.be.equal(undefined);
			done();
		});
	});

});