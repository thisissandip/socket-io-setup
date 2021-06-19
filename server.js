const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });

const port = 5000 || process.env.PORT;

app.get('/', (req, res) => {
	res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
	console.log('a user connected', socket.id);

	// listening for chat messages
	socket.on('chatmessage', (msg) => {
		io.emit('chatmessage', msg); // use broadcast to escape self msg, else use just emit
	});

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});

server.listen(port, () => {
	console.log(`listening on ${port}`);
});
