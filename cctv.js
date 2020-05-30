const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const pythonBridge = require('python-bridge');

const python = pythonBridge();

python.ex`import io; import time; import picamera`;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/cctv.html');
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
  python`
  my_stream = io.BytesIO()
  with picamera.PiCamera() as camera:
    camera.start_preview()
    # Camera warm-up time
    time.sleep(2)
    camera.capture(my_stream, 'jpeg')
    print("hi")`.then(x => {
     console.log(x);
  });
  //io.emit('image', image);
}, 10);

python.end();
