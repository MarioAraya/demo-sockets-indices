var express = require('express');
var app = express();
var server = require("http").Server(app);
var io = require('socket.io')(server);
var chokidar = require('chokidar');
var fs = require('fs');

app.use('/socket.io', express.static(__dirname + 'node_modules/socket.io-client/'));

app.get('/', function(req, res){
    res.sendfile(__dirname + '/index.html')
});

var watcher = chokidar.watch('texto.txt', {
  awaitWriteFinish: { stabilityThreshold: 1000 }
});

io.on('connection', function (socket) { 
  watcher.on('change', () => { 
     fs.readFile('texto.txt', 'utf8', (err, data) => {
      if(err) throw err;
      console.log(data);
      socket.emit('data cambiada', {dataCambiada: data});
    })
  });
  
  socket.on('haciaElServer', function (data) {
    console.log(data);
  });
});

server.listen(8080);