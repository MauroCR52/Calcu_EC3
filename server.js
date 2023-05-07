var WebSocket = require("ws");
var server = new WebSocket.Server({ port: 8080 });

var math = require('mathjs')


function calculate(expression) {
  try {
    // Eliminar los espacios en blanco de la expresión
    expression = expression.toString();

    var result = math.evaluate(expression);


    return result.toString();  
  } catch (error) {
    console.log("Error: " + error);
    return "Error";
  }
}

server.on("connection", function(socket) {
  console.log("Client connected");

  socket.on("message", function(expression) {
    console.log("Received: " + expression);
    var result = calculate(expression);
    console.log("Result: " + result);
    socket.send(result);
  });

  socket.on("close", function() {
    console.log("Client disconnected");
  });
});
