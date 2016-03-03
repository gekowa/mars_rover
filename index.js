
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
		"verticalBoundary": upperBoundary,
		"horizontalBoundary": rightBoundary
	});

	// let's do something about state machine
	var j = 0, c, numberStack = [];
	var STATES = {
		"Idle": null,
		"MovingForward": "F",
		"MovingBackward": "B"
	};
	var ORDERS = ["L", "R", "F", "B"];
	var state = STATES.Idle;

	var doMove = function () {
		if (numberStack.length > 0) {
			var number = parseInt(numberStack.join(''));
			switch (state) {
				case STATES.MovingForward:
					rover.moveForward(number);
					break;
				case STATES.MovingBackward:
					rover.moveBackward(number);
					break;
			}

			numberStack = [];
		}
	};

	for (;;) {
		c = controlString.charAt(j);
		if (!c) {
			doMove();
			break;
		}

		if (c.match(/\d/)) {
			numberStack.push(c);
		} else if (ORDERS.indexOf(c) >= 0) {
			doMove();

			switch (c) {
				case "L":
					rover.turnLeft();
					break;
				case "R":
					rover.turnRight();
					break;
				case "F":
					state = STATES.MovingForward;
					break;
				case "B":
					state = STATES.MovingBackward;
					break;
			}
		}

		j++;
	}

	// console.log(rover.footmark);
	rover.outputPath();
	process.stdout.write(rover.output());
}