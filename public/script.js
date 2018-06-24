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

var vh = window.innerHeight;
var vw = window.innerWidth;

var height = vh * .5;
var width = vw * .5;

var layout = d3.layout.cloud().size([width, height]);
var color = d3.scaleOrdinal(d3.schemeSet3);

function draw(words) {
  if(words.length >= 100) words = words.splice(0, 50);
  $("#wordcloud").empty();
  var cloud = d3.select("#wordcloud").append("svg")
      .attr("width", layout.size()[0])
      .attr("height", layout.size()[1])
    .append("g")
      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
    .selectAll("text")
      .data(words);

  cloud.enter().append("text")
    .style("font-size", function(d) { return d.size + "px"; })
    .style("font-family", "Impact")
    .attr("fill",function(d,i){return color(i);})
    .attr("text-anchor", "middle")
    .attr("transform", function(d) {
      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .text(function(d) { return d.text; });

  cloud.transition()
    .duration(600)
    .style("font-size", function(d) { return d.size + "px"; })
    .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .style("fill-opacity", 1);

  cloud.exit()
    .transition()
    .duration(200)
    .style('fill-opacity', 1e-6)
    .attr('font-size', 1)
    .remove();
}

setInterval(function() {
  layout.words(words.map(function(d) {
      return {text: d, size: 10 + Math.random() * 90, test: "haha"};
    }))
    .padding(5)
    .rotate(function() { return ~~(Math.random() * 2); })
    .font("Impact")
    .fontSize(function(d) { return d.size; })
    .on("end", draw)
    .start();
}, 3000);
