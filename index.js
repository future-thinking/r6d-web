const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cv = require('opencv');

var wCap = new cv.VideoCapture(0);

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
  })
});

setInterval(() => {
  const frame = wCap.read();
  const image = cv.imencode('.jpg', frame).toString('base64');

  io.emit('frame', image);
}, 1000)

http.listen(3000, function(){
  console.log('listening on *:3000');
});
