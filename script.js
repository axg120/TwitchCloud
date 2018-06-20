function embedTwitch() {
  var vh = window.innerHeight;
  var vw = window.innerWidth;

  height = vh * .5;
  width = vw * .5;
  new Twitch.Embed("twitch-embed", {
    width: width,
    height: height,
    channel: "twitch",
    theme: "dark"
  });
}
