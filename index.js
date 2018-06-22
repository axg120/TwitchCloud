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

var opts = {
  identity: {
    username: "twitchcloudbot",
    password: "oauth:5qbcbkk0hexlw3hdo14a8q0hqi04lt"
  },
  channels: ["ninja"]
};

// Create a client with our options:
var client = new tmi.client(opts);
client.connect();

client.on("chat", function(channel, user, message, self) {
  console.log(message);
});
