const Gpio = require('pigpio').Gpio;

const motor_r1 = new Gpio(02, {mode: Gpio.OUTPUT});
const motor_r2 = new Gpio(03, {mode: Gpio.OUTPUT});

let dutyCycle = 255;

motor_r1.digitalWrite(1);
motor_r2.digitalWrite(1);
