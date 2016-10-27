var express = require('express');
var app = express();
var server = require("http").Server(app);
var io = require('socket.io')(server);
//var exphbs  = require('express3-handlebars');

// app.engine('handlebars', exphbs({defaultLayout: '_layout'}));
// app.set('view engine', 'handlebars');

app.use('/socket.io', express.static(__dirname + 'node_modules/socket.io-client/'));

app.get('/', function(req, res){
    res.sendfile(__dirname + '/index.html')
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world', desde: 'el server' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

server.listen(8080);