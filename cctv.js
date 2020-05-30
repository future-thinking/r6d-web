const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const pythonBridge = require('python-bridge');

const python = pythonBridge();

const Gpio = require('pigpio').Gpio;

const enable_r = new Gpio(18, {mode: Gpio.OUTPUT});
const motor_rf = new Gpio(14, {mode: Gpio.OUTPUT});
const motor_rb = new Gpio(15, {mode: Gpio.OUTPUT});

const enable_l = new Gpio(02, {mode: Gpio.OUTPUT});
const motor_lf = new Gpio(03, {mode: Gpio.OUTPUT});
const motor_lb = new Gpio(04, {mode: Gpio.OUTPUT});

const speed = 1;

var curr_direction = {
  "w": false,
  "s": false,
  "a": false,
  "d": false
}

python.ex`import io; import time; import picamera; import base64; from PIL import Image;`;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/cctv.html');
});

function updateMotors() {
  let y = (curr_direction.w ? 1 : 0) + (curr_direction.s ? -1 : 0);
  let x = (curr_direction.a ? -1 : 0) + (curr_direction.d ? 1 : 0);

  console.log("x: " + x + " y: " + y);

  if (x === 0 && y === 0) {
    setSpeed(true, 0);
    setSpeed(false, 0);
    return null;
  }

  if (x === 0) {
    setSpeed(true, y * 255);
    setSpeed(false, y * 255);
    return null;
  }

  if (y === 0) {
    setSpeed(true, x * 255);
    setSpeed(false, x * -255);
    return null;
  }

  setSpeed(true, (255 / 4 * 3 + 255 / 4 * x) * y);
  setSpeed(false, (255 / 4 * 3 + 255 / 4 * -x) * y);

}

function setSpeed(motor, lSpeed) {
  let enableVal = Math.floor(Math.abs(lSpeed * speed));
  let pVal = 0;
  let nVal = 0;
  if (lSpeed > 0) {
    pVal = 1;
  }else if(lSpeed < 0) {
    nVal = 1;
  }
  console.log("enable val: " + enableVal + " pVal: " + pVal + " nVal: " + nVal);
  if (motor) {
    enable_l.pwmWrite(enableVal);
    motor_lf.digitalWrite(pVal);
    motor_lb.digitalWrite(nVal);
  } else {
    enable_r.pwmWrite(enableVal);
    motor_rf.digitalWrite(pVal);
    motor_rb.digitalWrite(nVal);
  }

  console.log("Speed set");
}

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
