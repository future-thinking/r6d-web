const Gpio = require('pigpio').Gpio;

const motor_r1 = new Gpio(03, {mode: Gpio.OUTPUT});
const motor_r2 = new Gpio(05, {mode: Gpio.OUTPUT});
const enable_1 = new Gpio(07, {mode: Gpio.OUTPUT});
var i = 0;

enable_1.digitalWrite(1);

let dutyCycle = 127,5;

motor_r1.pwmWrite(dutyCycle);
