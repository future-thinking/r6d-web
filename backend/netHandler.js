const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

class netHandler {
    app;
    server;
    io;

    constructor() {

    }

    start() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = socketIo(this.server);

        this.setupRouter();
        this.setupSocketRouter();

        http.listen(80, function(){
            console.log('web interface listening on localhost:80');
        });
    }

    setupRouter() {
        this.app.get('*', function(req, res){
            res.sendFile(__dirname + '/client/index.html');
        });
    }

    setupSocketRouter() {
        this.io.on('connection', function(socket){
            console.log('[+] user');

            socket.on("direction_change", function(msg) {
                updateMotors();
            });
        });
    }

    end() {

    }
}

function getNewInstance() {
    return new netHandler();
}

module.exports = getNewInstance;