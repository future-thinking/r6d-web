async function init() {
  console.log(1);
  await sleep(1000);
  console.log(2);
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const Gpio = require('pigpio').Gpio;

const motor_r1 = new Gpio(03, {mode: Gpio.OUTPUT});
const motor_r2 = new Gpio(05, {mode: Gpio.OUTPUT});
const enable_r = new Gpio(07, {mode: Gpio.OUTPUT});
const motor_l1 = new Gpio(03, {mode: Gpio.OUTPUT});
const motor_l2 = new Gpio(05, {mode: Gpio.OUTPUT});
const enable_l = new Gpio(07, {mode: Gpio.OUTPUT});
var i = 0;

enable_r.digitalWrite(1);
enable_r.digitalWrite(1);

while (i < 2){
motor_r1.digitalWrite(1);
motor_r2.digitalWrite(0);
sleep(2000);
i++;
}
