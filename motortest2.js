const Gpio = require('pigpio').Gpio;

const motor_r1 = new Gpio(02, {mode: Gpio.OUTPUT});
const motor_r2 = new Gpio(03, {mode: Gpio.OUTPUT});

let dutyCycle = 255;

while(True){
  motor_r1.pwmWrite(dutyCycle);
  motor_r2.pwmWrite(dutyCycle);
}
