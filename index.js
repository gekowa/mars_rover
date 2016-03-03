var Rover = require("./lib/rover.js"),
	fs = require('fs');

// read input from input.txt
var input = fs.readFileSync("./input.txt", {
	"encoding": "utf8"
});
// console.log(input);

// split with lines
var linesOfInput = input.split("\n");

// first line
var firstLine = linesOfInput[0];
var charsOfFirstLine = firstLine.split("\x20");
var upperBoundary = parseInt(charsOfFirstLine[0]);
var rightBoundary = parseInt(charsOfFirstLine[1]);

// console.log(upperBoundary);
// console.log(rightBoundary);

// rest of lines
var i;
for (i = 1; i < linesOfInput.length; i += 2) {
	var cordString = linesOfInput[i];
	var controlString = linesOfInput[i + 1];

	var charsOfCordString = cordString.split("\x20");
	var left = parseInt(charsOfCordString[0]);
	var top = parseInt(charsOfCordString[1]);
	var orientation = charsOfCordString[2];

	var rover = new Rover({
		"left": left,
		"top": top,
		"orientation": orientation.charAt(0),
		"upperBoundary": upperBoundary,
		"rightBoundary": rightBoundary
	});

	// process control string
	var j;
	for (j = 0; j < controlString.length; j++) {
		// console.log(controlString.charAt(j));
		switch(controlString.charAt(j)) {
			case "L":
				rover.turnLeft();
				break;
			case "R":
				rover.turnRight();
				break;
			case "M":
				rover.moveForward();
				break;
			case "B":
				rover.moveBackward();
				break;
		}
		// console.log(rover.output());
	}

	console.log(rover.output());
}


//
/*
var i;
for (i = 0; i < controlString.length; i++) {
	switch(controlString.charAt(i)) {
		case "L":
			this.turnLeft();
			break;
		case "R":
			this.turnRight();
			break;
		case "M":
			this.moveForward();
	}
}
*/