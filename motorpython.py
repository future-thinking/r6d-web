import RPi.GPIO as GPIO
from time import sleep
GPIO.setmode(GPIO.BOARD)
GPIO.setup(03, GPIO.OUT)
GPIO.setup(05, GPIO.OUT)
GPIO.setup(07, GPIO.OUT)
pwm=GPIO.PWM(07, 100)
pwm.start(0)
while(x<10){
    GPIO.output(03, True)
    GPIO.output(05, False)
    sleep(2)
    GPIO.output(03, False)
    GPIO.output(05, True)
    sleep(2)
    x += 1
}
pwm.stop()
GPIO.cleanup()
