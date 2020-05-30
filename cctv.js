const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const pythonBridge = require('python-bridge');

const python = pythonBridge();

python.ex`import io; import time; import picamera; import base64; from PIL import Image;`;

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



//
// print (actualImageSource)

setInterval(() => {
  python.ex`
  my_stream = io.BytesIO()
  with picamera.PiCamera() as camera:
    camera.resolution = (640, 360)
    camera.capture(my_stream, format='jpeg')

  my_stream.seek(0)
  image = Image.open(my_stream)
  buffer = io.BytesIO()
  image.save(buffer, format='PNG')
  buffer.seek(0)
  data_uri = base64.b64encode(buffer.read()).decode('ascii')
  
  actualImageSource = "data:image/png;base64," + data_uri`

  python`actualImageSource`.then(x => {
    console.log("post image " + x.length)
    io.emit('image', x);
  });

}, 200);

//python.end();
