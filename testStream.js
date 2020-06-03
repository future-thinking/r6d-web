const raspividStream = require('raspivid-stream');

const express = require("express");
const socketIo = require("socket.io");

app = express();

const http = require("http")
server = http.createServer(app);
io = socketIo(server);

app.get('*', function(req, res){
    res.send("hi")
});

io.on('connection', function(socket) {
    console.log('[+] user');
});

server.listen(80, function() {
    console.log('web interface listening on localhost:80');
});

let stream = raspividStream();

let first = 0;

stream.on('data', (data) => {
    if (first < 10) {
      first++;
      if (first === 10) {
          console.log(data.toString());
      }
    }
});