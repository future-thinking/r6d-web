const raspividStream = require('raspivid-stream');

const express = require("express");
const socketIo = require("socket.io");

const http = require("http");

app = express();
server = http.createServer(app);
io = socketIo(server);

app.get('*', function(req, res){
    res.send("hi")
});

io.on('connection', function(socket) {
    console.log('[+] user');
});

http.listen(80, function() {
    console.log('web interface listening on localhost:80');
});

let stream = raspividStream();

stream.on('data', (data) => {
    console.log(data);
});