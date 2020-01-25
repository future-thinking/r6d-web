const Gpio = require('pigpio').Gpio;
const led = new Gpio(17, {mode: Gpio.OUTPUT});
const forward = new Gpio(27, {mode: Gpio.OUTPUT});

while (true) {
  led.pwmWrite(50);
  forward.digitalWrite(1);
}
