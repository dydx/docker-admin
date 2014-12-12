var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});

var container = docker.getContainer('ec99b4fead2d');

container.inspect( function inspect(err, data) {
	console.log(data);
});
