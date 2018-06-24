var express = require("express");
var socket = require("socket.io");
var tmi = require("tmi.js");

//app setup
var app = express();
var server = app.listen(1000, function() {
  console.log("listening on requests to port 1000")
});

//static files
app.use(express.static("public"));

//twitch embed options
var opts = {
  identity: {
    username: "twitchcloudbot",
    password: "oauth:5qbcbkk0hexlw3hdo14a8q0hqi04lt"
  },
  channels: ["twitch"]
};

// Create a client with our options:
var client = new tmi.client(opts);
client.connect();

//socket setup
var io = socket(server);

io.on("connection", function(socket) {
  console.log("socket connection created", socket.id);

  socket.on("change", function(data) {
    client.part(client.getChannels()[0]);
    client.join(data.channel);
  });

  client.on("chat", function(channel, user, message, self) {
    io.sockets.emit("chat", {
      text: message
    });
  });

  socket.on("disconnecting", function() {
    client.part(client.getChannels()[0]);
    client.join("twitch");
  })
});
