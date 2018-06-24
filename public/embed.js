function embedTwitch(channel="twitch") {
  var vh = window.innerHeight;
  var vw = window.innerWidth;

  var height = vh * .5;
  var width = vw * .5;
  new Twitch.Embed("twitch-embed", {
    width: width,
    height: height,
    channel: channel,
    theme: "dark"
  });
}
