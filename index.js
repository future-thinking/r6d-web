const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
//const cv = require('opencv');
const Gpio = require('pigpio').Gpio;

const motor_rf = new Gpio(03, {mode: Gpio.OUTPUT});
const motor_rb = new Gpio(05, {mode: Gpio.OUTPUT});
const motor_lf = new Gpio(08, {mode: Gpio.OUTPUT});
const motor_lb = new Gpio(10, {mode: Gpio.OUTPUT});
const enable_r = new Gpio(07, {mode: Gpio.OUTPUT});
const enable_l = new Gpio(12, {mode: Gpio.OUTPUT});

const speed = 1;

//var wCap = new cv.VideoCapture(0);
//enable code

var curr_direction = {
  "w": false,
  "s": false,
  "a": false,
  "d": false
}

function setSpeed(motor, lSpeed) {
  let enableVal = Math.abs(lSpeed * speed);
  let pVal = 0;
  let nVal = 0;
  if (lSpeed > 0) {
    pVal = 1;
  }else if(lSpeed < 0) {
    nVal = 1;
  }
  if (motor){
    enable_l.pwmWrite(enableVal);
    motor_lf.digitalWrite(pVal);
    motor_lb.digitalWrite(nVal);
  } else {
    enable_r.pwmWrite(enableVal);
    motor_rf.digitalWrite(pVal);
    motor_rb.digitalWrite(nVal);
  }

  //Den Code um den richtigen Motor mit, enableVal, pVal und nVal anzusteuern
  //als "motor" gibt es "r" und "l"


  console.log("Speed set");
}

function updateMotors() {
  let y = 0 + (curr_direction.w ? 1 : 0) + (curr_direction.s ? -1 : 0);
  let x = 0 + (curr_direction.a ? -1 : 0) + (curr_direction.d ? 1 : 0);

  if (x == 0 && y == 0) {
    setSpeed(true, 0);
    setSpeed(false, 0);
    return null;
  }

  if (x == 0) {
    setSpeed(true, y * 255);
    setSpeed(false, y * 255);
    return null;
  }

  if (y == 0) {
    setSpeed(true, x * 255);
    setSpeed(false, x * -255);
    return null;
  }

  setSpeed(true, (255 / 4 * 3 + 255 / 4 * x) * y);
  setSpeed(false, (255 / 4 * 3 + 255 / 4 * -x) * y);

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
    console.log(msg);
    updateMotors();
  });
});

/*setInterval(() => {
  const frame = wCap.read();
  const image = cv.imencode('.jpg', frame).toString('base64');

  io.emit('frame', image);
}, 1000)*/

http.listen(3000, function(){
  console.log('listening on *:3000');
});
