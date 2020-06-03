const pythonHandler = require("./backend/pythonHandler")();
const netHandler = require("./backend/netHandler")();

pythonHandler.start();
//netHandler.start();



// setInterval(() => {
//   python.ex`
//   my_stream = io.BytesIO()
//   with picamera.PiCamera() as camera:
//     camera.resolution = (640, 360)
//     camera.capture(my_stream, format='jpeg')
//
//   my_stream.seek(0)
//   image = Image.open(my_stream)
//   buffer = io.BytesIO()
//   image.save(buffer, format='PNG')
//   buffer.seek(0)
//   data_uri = base64.b64encode(buffer.read()).decode('ascii')
//
//   actualImageSource = "data:image/png;base64," + data_uri`
//
//   python`actualImageSource`.then(x => {
//     console.log("post image " + x.length)
//     io.emit('image', x);
//   });
//
// }, 200);