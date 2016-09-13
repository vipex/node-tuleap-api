node-tuleap
===========

--

[Tuleap](https://www.tuleap.org/) API Nodejs library.
It wraps the HTTP api library described [here](https://tuleap.net/api/explorer/).


Install
=======

[N/A]

Usage
=====

URL to your Tuleap instance should not include `/api` path.

Javascript
----------
```javascript
// Connection
var tuleap = require('tuleap')({
  server:   'https://example.com',
  strictSSL: true
});

// Authentication (generate token)
tuleap.token.login(username, password, function(err, data) {
  if (!err) {
  	console.log(data); // Token and user_id
  }
});

// Listing projects
tuleap.projects.all(function(err, projects) {
  for (var i = 0; i < projects.length; i++) {
    console.log('#' + projects[i].id + ': ' + projects[i].shortname + '\nuri: ' + projects[i].uri + '\nresources: ' + projects[i].resources + '\n\n');
  }
});
```

License
-------

MIT
