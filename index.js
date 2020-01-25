const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
//const cv = require('opencv');
const Gpio = require('pigpio').Gpio;

const motor_r = new Gpio(03, {mode: Gpio.OUTPUT});
const motor_l = new Gpio(03, {mode: Gpio.OUTPUT});

const speed = 1;

//var wCap = new cv.VideoCapture(0);



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

  //Den Code um den richtigen Motor mit, enableVal, pVal und nVal anzusteuern
  //als "motor" gibt es "r" und "l"

  console.log("Speed set");
}

function updateMotors() {
  let y = 0 + (curr_direction.w ? 1 : 0) + (curr_direction.s ? -1 : 0);
  let x = 0 + (curr_direction.a ? -1 : 0) + (curr_direction.d ? 1 : 0);

  if (x == 0 && y == 0) {
    return;
  }

  if (x == 0) {
    setSpeed("r", y * 255);
    setSpeed("l", y * 255);
    return;
  }

  if (y == 0) {
    setSpeed("r", x * 255);
    setSpeed("l", x * -255);
    return;
  }

  setSpeed("r", (255 / 4 * 3 + 255 / 4 * x) * y);
  setSpeed("l", (255 / 4 * 3 + 255 / 4 * -x) * y);

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
