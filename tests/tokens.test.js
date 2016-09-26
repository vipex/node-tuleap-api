'use strict';
var chai = require('chai');
var expect = chai.expect;

var Mock = require('./mock');
var mData = require('./mock-data.json');
var Client = require('../lib/client');
var Tokens = require('../lib/Models/tokens');

describe('Tokens init', function () {
	var client;

	before(function () {
		client = new Client(mData.config);
	});

	// Initialization require at least the server
	it('Expect to throw an initialization error', function () {

		expect(function () {
			return new Tokens();
		}).to.throw(Error, 'No client object.');

	});

	// if parameters are Ok,
	it('Expect to be valid Tokens object', function () {
		var t = new Tokens(client);

		expect(t).to.be.an.instanceof(Tokens);
		expect(t.path).to.be.equal('/tokens/');
	});
});

describe('Client functionality', function () {
	var server, tokens;

	beforeEach(function () {
		server = Mock.createAPIMock();
		tokens = new Tokens(new Client(mData.config));
	});

	after(function () { tokens = undefined; });

	it('Expect login success', function (done) {
		tokens.login(mData.config.username, mData.config.password, function (err, data) {
			expect(err).to.be.equal(null);
			expect(data).to.be.deep.equal(mData.endpoints.tokens.token);
			done();
		});
	});

	it('Expect login fails unauthorized', function (done) {
		tokens.login('aaa', 'aaa', function (err, data) {
			expect(err).to.be.instanceOf(Error);
			expect(data).to.be.deep.equal(mData.endpoints.tokens['401']);
			done();
		});
	});

	it('Expect login fails w/ bad request', function (done) {
		tokens.login('', '', function (err, data) {
			expect(err).to.be.instanceOf(Error);
			expect(data).to.be.deep.equal(mData.endpoints.tokens['400']);
			done();
		});
	});

	it('Expect logout success', function (done) {
		tokens.logout(function (err, data) {
			expect(err).to.be.equal(null);
			expect(data).to.be.equal(undefined);
			done();
		});
	});

	it('Expect getting the right token data', function (done) {
		tokens.login(mData.config.username, mData.config.password, function (err) {
			if (err) throw err;
			expect(tokens.token()).to.be.equal(mData.endpoints.tokens.token.token);
			expect(tokens.userid()).to.be.equal(mData.endpoints.tokens.token.user_id);
			done();
		});
	});


});