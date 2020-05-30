const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const pythonBridge = require('python-bridge');

const python = pythonBridge();

python.ex`import io; import time; import picamera; import base64`;

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
    camera.resolution = (500, 500)
    camera.capture(my_stream, format='jpeg')
    
  my_stream.seek(0)
  image = Image.open(my_stream)
  buffer = io.BytesIO()
  image.save(buffer, format="PNG")
  data_uri = base64.b64encode(buffer.read()).decode('ascii')
  
  aIm = "data:image/png;base64," + data_uri
  
  print (aIm)
  
    `.then(x => {
     console.log(x);
  });
  //io.emit('image', image);
}, 1000);

python.end();
