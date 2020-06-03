process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
    console.log(err.stack);
});

const express = require('express');
const raspividStream = require('raspivid-stream');

const app = express();
const wss = require('express-ws')(app);

app.get('/', (req, res) => res.send("" +
    "<html>\n" +
    "    <body>\n" +
    "        <script type=\"text/javascript\" src=\"https://rawgit.com/131/h264-live-player/master/vendor/dist/http-live-player.js\"></script>\n" +
    "        <script>\n" +
    "            var canvas = document.createElement(\"canvas\");\n" +
    "            document.body.appendChild(canvas);\n" +
    "\n" +
    "            var wsavc = new WSAvcPlayer(canvas, \"webgl\");\n" +
    "\n" +
    "            var protocol = window.location.protocol === \"https:\" ? \"wss:\" : \"ws:\"\n" +
    "            wsavc.connect(protocol + '//' + window.location.host + '/video-stream');\n" +
    "        </script>\n" +
    "    </body>\n" +
    "</html>"));

app.ws('/video-stream', (ws, req) => {
    console.log('Client connected');

    ws.send(JSON.stringify({
        action: 'init',
        width: '960',
        height: '540'
    }));

    var videoStream = raspividStream({ rotation: 180 });

    videoStream.on('data', (data) => {
        ws.send(data, { binary: true }, (error) => { if (error) console.error(error); });
    });

    ws.on('close', () => {
        console.log('Client left');
        videoStream.removeAllListeners('data');
    });
});

app.use(function (err, req, res, next) {
    console.error(err);
    next(err);
})

app.listen(80, () => console.log('Server started on 80'));