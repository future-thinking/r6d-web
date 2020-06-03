const raspividStream = require('raspivid-stream');

const express = require("express");
const socketIo = require("socket.io");

app = express();

const http = require("http")
server = http.createServer(app);
io = socketIo(server);

app.get('*', function(req, res){
    res.send("\n" +
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
        "</html>")
});

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

io.on('connection', function(socket) {
    console.log('[+] user');
});

server.listen(80, function() {
    console.log('web interface listening on localhost:80');
});