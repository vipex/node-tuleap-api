var chai = require('chai');
var expect = chai.expect;

var Tuleap = require('../lib/index');

describe('Tuleap init', function () {

	// Initialization require at least the server
	it('Expect to throw an initialization error', function () {

		expect(function () {
			return new Tuleap();
		}).to.throw(Error, 'No server specified.');

	});

	// if parameters are Ok,
	it('Expect to be valid Tuleap object', function () {

		expect(new Tuleap({server: 'http://dummy:123/'}))
			.to.be.an.instanceof(Tuleap);

		expect(new Tuleap({server: 'http://dummy:123/', "strictSSL": false}))
			.to.be.an.instanceof(Tuleap);

	});
});
