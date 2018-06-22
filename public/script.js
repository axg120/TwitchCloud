function embedTwitch() {
  //var vh = window.innerHeight;
  //var vw = window.innerWidth;

  //height = vh * .5;
  //width = vw * .5;
  var embed = new Twitch.Embed("twitch-embed", {
    width: 500,
    height: 500,
    channel: "twitch",
    theme: "dark"
  });
}
