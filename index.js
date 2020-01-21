var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var curr_direction = {
  "w": false,
  "s": false,
  "a": false,
  "d": false
}

app.get('*', function(req, res){
  res.sendFile(__dirname + '/drone.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on("disconnect", function() {
    console.log("User disconnected");
  })

  socket.on("direction_change", function(msg) {
    curr_direction = msg;
    console.log(curr_direction);
  })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
