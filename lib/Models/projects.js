'use strict';

var Debug = require('debug')('Tuleap:Token');

	var Projects = function (client) {
		this.path = '/projects';
		this.client = client;
	};

	// Endpoint: GET /api/projects
	Projects.prototype.allProjects = function (callback) {
		Debug(this.client);

		return this.client
			.get(
				this.path,
				{},
				function (err, res, data) {
					callback(err, data);
				}.bind(this)
			);

	};

	module.exports = Projects;
