//make connection
var socket = io.connect("http://localhost:1000");

socket.on("chat", function(data) {
  var messages = document.getElementById("messages")
  $("#messages").append("<p>" + data.text + "</p>");
});

$("#channelBtn").click(function() {
  var next = $("#input").val();
  if(next.trim() == "") alert("Enter Channel Name!");

  else {
    $("iframe").remove();

    embedTwitch(next);

    socket.emit("change", {
      channel: next
    });
  }
});
