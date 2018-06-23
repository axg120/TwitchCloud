function embedTwitch(channel="twitch") {
  var vh = window.innerHeight;
  var vw = window.innerWidth;

  height = vh * .5;
  width = vw * .5;
  var embed = new Twitch.Embed("twitch-embed", {
    width: width,
    height: height,
    channel: channel,
    theme: "dark"
  });
}
