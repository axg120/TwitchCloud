function embedTwitch() {
  new Twitch.Embed("twitch-embed", {
    width: 1000,
    height: 520,
    channel: "ninja",
    theme: "dark"
  });
}
