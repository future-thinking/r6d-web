const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/cctv.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on("disconnect", function() {
    console.log("User disconnected");
  });

  socket.on("direction_change", function(msg) {
    curr_direction = msg;
    updateMotors();
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


setInterval(() => {
  io.emit('image', 'some data');
}, 1000)