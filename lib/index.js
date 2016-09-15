'use strict';

var Debug = require('debug')('Tuleap');

var Client 		= require('./client');
var Token 		= require('./Models/token');
var Projects 	= require('./Models/projects');


var Tuleap = function(options) {
	Debug('Initialization: %j', options);

	var client 	= new Client(options);
	this.token 		= new Token(client);
	this.projects = new Projects(client);
};

module.exports = Tuleap;