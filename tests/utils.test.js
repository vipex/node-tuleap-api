'use strict';
var chai = require('chai');
var expect = chai.expect;

var Utils = require('../lib/utils');

describe('Utils library', function () {
	// Utils.resParse should parse and manage tuleap response and errors
	it('Expect resParse to parse correctly a response', function () {
		var err, res, data, e, d;

		// Standard response
		err = undefined;
		res = {statusCode: 200};
		data = '{"dataresult":"success"}';
		e = null;
		d = {"dataresult": "success"};
		expect(Utils.resParse(err, res, data)).to.be.deep.equal([e, d]);

		// Standard response, JSON
		err = undefined;
		res = {statusCode: 200};
		data = {"dataresult":"success"};
		e = null;
		d = {"dataresult": "success"};
		expect(Utils.resParse(err, res, data)).to.be.deep.equal([e, d]);

		// Not found response, 404
		err = undefined;
		res = {statusCode: 404, statusMessage: "Not Found"};
		data = '{"error":{"code":404,"message":"Not Found"}}';
		e = new Error("Not Found", 404);
		d = {"error":{"code":404,"message":"Not Found"}};
		expect(Utils.resParse(err, res, data)).to.be.deep.equal([e, d]);

		// Malformed response
		err = undefined;
		res = {statusCode: 200};
		data = 'FFFF';
		e = new Error("SyntaxError: Unexpected token F in JSON at position 0");
		d = 'FFFF';
		expect(Utils.resParse(err, res, data)).to.be.deep.equal([e, d]);

	});

	// Utils.extend should extend an object with another
	it('Expect extend to return correct objects', function () {
		var obj, prp, res;

		// Empty objects
		obj = {};
		prp = {};
		res = {};
		expect(Utils.extend(obj, prp)).to.be.deep.equal(res);

		// No addictional properties
		obj = {a: 'aaa'};
		prp = {};
		res = {a: 'aaa'};
		expect(Utils.extend(obj, prp)).to.be.deep.equal(res);

		// Additiona property not contained in original obj
		obj = {a: 'aaa'};
		prp = {b: 'aaa'};
		res = {a: 'aaa', b: 'aaa'};
		expect(Utils.extend(obj, prp)).to.be.deep.equal(res);

		// Aditional property equal to one in original obj
		obj = {a: 'aaa'};
		prp = {a: 'bbb'};
		res = {a: 'bbb'};
		expect(Utils.extend(obj, prp)).to.be.deep.equal(res);

		// Aditional property mixed
		obj = {a: 'aaa'};
		prp = {a: 'bbb', b: 'aaa'};
		res = {a: 'bbb', b: 'aaa'};
		expect(Utils.extend(obj, prp)).to.be.deep.equal(res);

		// Aditional property mixed, origina obj mixed
		obj = {a: 'aaa', c: 'xxx'};
		prp = {a: 'bbb', b: 'aaa'};
		res = {a: 'bbb', b: 'aaa', c: 'xxx'};
		expect(Utils.extend(obj, prp)).to.be.deep.equal(res);

	});

	// Utils.genUrl should concatenate the endpoint url
	it('Expect genUrl to generate a correct endpoint url', function () {
		var opt;

		opt = {};
		expect(Utils.genUrl(opt)).to.be.equal('https://localhost/');

		opt = {prot: 'http', host: 'test.com', port: 8080, path: '/api'};
		expect(Utils.genUrl(opt)).to.be.equal('http://test.com:8080/api');

		opt = {host: 'test.com', port: 8080, path: '/api'};
		expect(Utils.genUrl(opt)).to.be.equal('https://test.com:8080/api');

		opt = {prot: 'http', host: 'test.com', path: '/api'};
		expect(Utils.genUrl(opt)).to.be.equal('http://test.com/api');

		opt = {host: 'test.com', path: '/api'};
		expect(Utils.genUrl(opt)).to.be.equal('https://test.com/api');

		opt = {host: 'test.com'};
		expect(Utils.genUrl(opt)).to.be.equal('https://test.com/');
	});
});