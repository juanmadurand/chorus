// Require our dependencies
var express = require('express'),
	app = express(),
	http = require('http').Server(app),
	socketio = require('socket.io')(http),
	path = require('path'),
	exphbs = require('express-handlebars');
var favicon = require('serve-favicon');


// some environment variables
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

// Set handlebars as the templating engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(favicon(path.join(__dirname,'public','images','icons','favicon.ico')));

// Database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb');
var redis = require("redis");
var dbClient = redis.createClient();

// send app to router
app.use('/', require('./app/controllers')({
	io: socketio,
	mongo: mongoose,
	redis: dbClient
}));

socketio.on('connection', function(socket){
	console.log("Client connected...");
	socket.emit('welcome', {askUsername: (!socket.username)}); 

	// Show previous messages
	dbClient.lrange("messages", 0, -1, function(err, msgs){
		msgs = msgs.reverse();
		msgs.forEach(function(msg){
			var msg = JSON.parse(msg);
			socket.emit("receiveMsg", msg.name, msg.data);
		});
	});

	// Socket events
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
	socket.on('chatmsg', function(username, msg){
		console.log('message: ' + msg);
		
		// Save message
		var jsonMsg = JSON.stringify({name: username, data: msg});
		dbClient.lpush("messages", jsonMsg, function(err, reply){
			dbClient.ltrim("messages",0,10);
		});

		// And broadcast!
		socket.broadcast.emit("receiveMsg", username, msg);
	});

	socket.on('addUser', function(username){
		socket.username = username;
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});