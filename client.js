var socket = new WebSocket("ws://localhost:8080");
var currentNumber = "";
var currentOperation = "";
var firstOperand = "";
var secondOperand = "";

function addNumber(num) {
  document.getElementById("display").value += num;
  currentNumber += num;
}

function clearDisplay() {
  document.getElementById("display").value = "";
  currentNumber = "";
  currentOperation = "";
  firstOperand = "";
  secondOperand = "";
}

function setOperation(op) {
  if (currentNumber !== "") {
    currentOperation = op;
    document.getElementById("display").value += op;
    firstOperand = currentNumber;
    currentNumber = "";
  }
}

function calculate() {
  if (currentOperation !== "" && firstOperand !== "" && currentNumber !== "") {
    secondOperand = currentNumber;

    
    socket.send(firstOperand + currentOperation + secondOperand);
    currentNumber = "";;
    //console.log("Current: "+ currentNumber);
    currentOperation = "";
  }
}
socket.onmessage = function(event) {
  currentNumber = event.data;
  document.getElementById("display").value = event.data;
}
