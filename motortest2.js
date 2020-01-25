const Gpio = require('pigpio').Gpio;

const motor_r1 = new Gpio(08, {mode: Gpio.OUTPUT});
const motor_r2 = new Gpio(10, {mode: Gpio.OUTPUT});
const enable_r = new Gpio(12, {mode: Gpio.OUTPUT});
const motor_l1 = new Gpio(03, {mode: Gpio.OUTPUT});
const motor_l2 = new Gpio(05, {mode: Gpio.OUTPUT});
const enable_l = new Gpio(07, {mode: Gpio.OUTPUT});


while(true){
//enable_r.pwmWrite(255);
//enable_l.pwmWrite(255);
enable_r.digitalWrite(1);
enable_l.digitalWrite(0);
motor_r1.digitalWrite(1);
motor_r2.digitalWrite(0);
motor_l1.digitalWrite(1);
motor_l2.digitalWrite(0);
}
