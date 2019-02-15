var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 9998;

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
	socket.on('item', function (data) {
		console.log('socket.on-item');
		io.emit('item', data);
	});
	socket.on('search', function (searchStr) {
		console.log('socket.on-search');
		io.emit('search', searchStr);
	});
	socket.on('activate', function (btnName) {
		console.log('socket.on-activate');
		io.emit('activate', btnName);
	});
	socket.on('deactivate', function (btnName) {
		console.log('socket.on-deactivate');
		io.emit('deactivate', btnName);
	});
});

http.listen(port, function() {
	console.log('Server running on port ' + port + '...');
});