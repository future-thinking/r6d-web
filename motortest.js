const Gpio = require('pigpio').Gpio;

const motor_r = new Gpio(03, {mode: Gpio.OUTPUT});

let dutyCycle = 0;

setInterval(() => {
  motor_r.pwmWrite(dutyCycle);

  dutyCycle += 5;
  if (dutyCycle > 255) {
    dutyCycle = 0;
  }
}, 20);
