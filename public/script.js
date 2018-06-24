//make connection
var socket = io.connect("http://localhost:1000");

var words = [];

socket.on("chat", function(data) {
  words = words.concat(data.text.split(" "));
});

$("#channelBtn").click(function() {
  var next = $("#input").val();
  if(next.trim() == "") alert("Enter Channel Name!");

  else {
    words = [];
    $("iframe").remove();

    embedTwitch(next);

    socket.emit("change", {
      channel: next
    });
  }
});

var layout = d3.layout.cloud().size([1000, 500]);

function draw(words) {
  $("#wordcloud").empty();
  d3.select("#wordcloud").append("svg")
      .attr("width", layout.size()[0])
      .attr("height", layout.size()[1])
    .append("g")
      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
    .selectAll("text")
      .data(words)
    .enter().append("text")
      .style("font-size", function(d) { return d.size + "px"; })
      .style("font-family", "Impact")
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.text; });
}

setInterval(function() {
  layout.words(words.map(function(d) {
      return {text: d, size: 10 + Math.random() * 90, test: "haha"};
    }))
    .padding(5)
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .font("Impact")
    .fontSize(function(d) { return d.size; })
    .on("end", draw)
    .start();
}, 3000);
