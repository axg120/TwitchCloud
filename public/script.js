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
var svg = d3.select("#wordcloud").append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")

var color = d3.scaleOrdinal(d3.schemeSet3);

function draw(words) {
  var cloud = svg.selectAll("text")
    .data(words, function(d) { return d.text; });

  cloud.enter()
    .append("text")
    .style("font-size", function(d) { return d.size + "px"; })
    .style("font-family", "Impact")
    .style("fill",function(d, i){return color(i);})
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

function wordcloud() {
  return {
    update: function(map) {
      layout.words(map)
      .padding(5)
      .rotate(function() { return ~~(Math.random() * 2); })
      .font("Impact")
      .fontSize(function(d) { return d.size; })
      .on("end", draw)
      .start();
    }
  }
}

function showNewWords(vis) {
    if(words.length >= 200) words = words.splice(100, 200);

    freqs = {};
    for(word of words) {
      if(freqs[word]) freqs[word]++;
      else freqs[word] = 1;
    }

    keys = Object.keys(freqs);
    map = keys.map(function(word) {
      return {text: word, size: freqs[word] > 16 ? 130 : freqs[word] * 8}
    });
    vis.update(map);
    setTimeout(function() { showNewWords(vis)}, 3000);
}

var myWordCloud = wordcloud();
showNewWords(myWordCloud);
