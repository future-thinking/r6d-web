const Gpio = require('pigpio').Gpio;

const motor_r1 = new Gpio(06, {mode: Gpio.OUTPUT});
const motor_r2 = new Gpio(15, {mode: Gpio.OUTPUT});
const enable_r = new Gpio(14, {mode: Gpio.OUTPUT});
const motor_l1 = new Gpio(07, {mode: Gpio.OUTPUT});
const motor_l2 = new Gpio(03, {mode: Gpio.OUTPUT});
const enable_l = new Gpio(02, {mode: Gpio.OUTPUT});


while(true){
//enable_r.pwmWrite(100);
//enable_l.pwmWrite(100);
enable_r.digitalWrite(1);
enable_l.digitalWrite(1);
motor_r1.pwmWrite(100);
motor_r2.digitalWrite(0);
motor_l1.pwmWrite(100);
motor_l2.digitalWrite(0);
}
