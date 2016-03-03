var _ = require("underscore")._,
	direction = require("./direction.js");

var Rover = function (spec) {
	_.extend(this, spec);

	this.dead = false;
	// this.lastAlivePosition = "";

	// an array of coordinates
	this.footmark = [{
		x: this.left,
		y: this.top
	}];
};

Rover.prototype.takeControlString = function (controlString) {
	this.controlString = controlString;
};

Rover.prototype.position = function () {
	return {
		x: this.left,
		y: this.top
	};
};

Rover.prototype.output = function () {

};

Rover.prototype.turnRight = function () {
	switch(this.orientation) {
		case direction.NORTH:
			this.orientation = direction.EAST;
			break;
		case direction.EAST:
			this.orientation = direction.SOUTH;
			break;
		case direction.SOUTH:
			this.orientation = direction.WEST;
			break;
		case direction.WEST:
			this.orientation = direction.NORTH;
			break;
	}
};

Rover.prototype.turnLeft = function () {
	switch(this.orientation) {
		case direction.NORTH:
			this.orientation = direction.WEST;
			break;
		case direction.EAST:
			this.orientation = direction.NORTH;
			break;
		case direction.SOUTH:
			this.orientation = direction.EAST;
			break;
		case direction.WEST:
			this.orientation = direction.SOUTH;
			break;
	}
};

Rover.prototype.moveForward = function (steps) {
	steps = steps || 1;

	for (var i = 0; i < steps; i++) {
		this.moveForwardInternal();
	}
};

Rover.prototype.moveForwardInternal = function () {
	if (this.dead) {
		return;
	} else {
		switch(this.orientation) {
			case direction.NORTH:
				this.top -= 1;
				break;
			case direction.EAST:
				this.left += 1;
				break;
			case direction.SOUTH:
				this.top += 1;
				break;
			case direction.WEST:
				this.left -= 1;
				break;
		}
		this.dead = this.isOutofBoundary();
		if (!this.dead) {
			this.footmark.push(this.position());
		}
	}
};

Rover.prototype.moveBackward = function (steps) {
	steps = steps || 1;

	for (var i = 0; i < steps; i++) {
		this.moveBackwardInternal();
	}
};

Rover.prototype.moveBackwardInternal = function () {
	if (this.dead) {
		return;
	} else {
		switch(this.orientation) {
			case direction.NORTH:
				this.top += 1;
				break;
			case direction.EAST:
				this.left -= 1;
				break;
			case direction.SOUTH:
				this.top -= 1;
				break;
			case direction.WEST:
				this.left += 1;
				break;
		}
		this.dead = this.isOutofBoundary();
		if (!this.dead) {
			this.footmark.push(this.position());
		}
	}
};

Rover.prototype.isOutofBoundary = function () {
	return this.left <= 0 ||
		this.left > this.horizontalBoundary ||
		this.top <= 0 ||
		this.top > this.verticalBoundary;
};

module.exports = Rover;