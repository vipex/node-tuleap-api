'use strict';

var Client 		= require('./client');
var Token 		= require('./Models/token');
var Projects 	= require('./Models/projects');


var Tuleap = function(options) {

	this.client 	= new Client(options);
	this.token 		= new Token(this.client);
	this.projects = new Projects(this.client);
};

module.exports = Tuleap;