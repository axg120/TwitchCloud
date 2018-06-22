const tmi = require('tmi.js');

var opts = {
  identity: {
    username: 'twitchcloudbot',
    password: 'oauth:5qbcbkk0hexlw3hdo14a8q0hqi04lt'
  },
  channels: ['shiphtur']
};

// Create a client with our options:
var client = new tmi.client(opts);
client.connect();

client.on('chat', function(channel, user, message, self) {
  console.log(message);
});
