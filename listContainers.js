// setup dockerode
var Docker = require('dockerode');
var fs = require('fs');
var socket = process.env.DOCKER_SOCKER || '/var/run/docker.sock';

// check if docker is running on the host
var stats = fs.statSync(socket);
if (!stats.isSocket()) {
	throw new Error("Are you sure docker is running?");
}

var docker = new Docker({socketPath: socket});

// get a count of all of our running containers
docker.listContainers({all: false},
	function countContainers(err, containers) {
		console.log('Total Containers: ' + containers.length);
});

function logContainer(container) {
	console.log("------------------------------");
	console.log("Image: " + container.Image);
	console.log("Id:    " + container.Id.slice(0, 12));
};

// list out all of our running containers, with Image names and friendly Ids
docker.listContainers({all: false},
	function listContainerIds(err, containers) {
		containers.forEach(logContainer);
	});
