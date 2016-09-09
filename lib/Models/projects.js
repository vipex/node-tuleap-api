'use strict';

var Projects = function (client) {
	this.path = '/projects';
	this.client = client;
}

Projects.prototype.all = function () {
	return this.client.get(this.path)
		.then(function (projects) {
			return projects;
		}.bind(this));
}

module.exports = Projects;