const Gpio = require('pigpio').Gpio;

const motor_r1 = new Gpio(14, {mode: Gpio.OUTPUT});
const motor_r2 = new Gpio(15, {mode: Gpio.OUTPUT});
const enable_r = new Gpio(18, {mode: Gpio.OUTPUT});
const motor_l1 = new Gpio(04, {mode: Gpio.OUTPUT});
const motor_l2 = new Gpio(03, {mode: Gpio.OUTPUT});
const enable_l = new Gpio(02, {mode: Gpio.OUTPUT});


while(true){
enable_r.pwmWrite(170);
enable_l.pwmWrite(170);
motor_r1.digitalWrite(1);
motor_l1.digitalWrite(1);
motor_r2.digitalWrite(0);
motor_l2.digitalWrite(0);
}
