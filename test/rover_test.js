var assert = require("assert"),

 	Rover = require("../lib/rover.js"),
	direction = require("../lib/direction.js");

describe("Mars Rover", function () {
	describe("Initialization", function () {
		var rover;
		before(function () {
			rover = new Rover({
				"left": 1,
				"top": 1,
				"orientation": direction.NORTH,
				"verticalBoundary": 5,
				"horizontalBoundary": 5
			});
		});
		// happy path
		it("should be initialized with 'left'", function () {
			assert.equal(rover.left, 1);
		});
		it("should be initialized with 'top'", function () {
			assert.equal(rover.top, 1);
		});
		it("should be initialized with 'orientation'", function () {
			assert.equal(rover.orientation, direction.NORTH);
		});
		it("should be initialized with 'verticalBoundary'", function () {
			assert.equal(rover.verticalBoundary, 5);
		});
		it("should be initialized with 'right'", function () {
			assert.equal(rover.horizontalBoundary, 5);
		});
	});

	describe("Turn right", function () {
		var rover;
		before(function () {
			rover = new Rover({
				"orientation": direction.NORTH
			});
		});

		it("should turn to 'East'", function () {
			rover.turnRight();
			assert.equal(rover.orientation, direction.EAST);
		});
		it("should turn to 'South'", function () {
			rover.turnRight();
			assert.equal(rover.orientation, direction.SOUTH);
		});
		it("should turn to 'West'", function () {
			rover.turnRight();
			assert.equal(rover.orientation, direction.WEST);
		});
		it("should turn to 'North'", function () {
			rover.turnRight();
			assert.equal(rover.orientation, direction.NORTH);
			});
	});

	describe("Turn left", function () {
		var rover;
		before(function () {
			rover = new Rover({
				"orientation": direction.NORTH
			});
		});

		it("should turn to 'East'", function () {
			rover.turnLeft();
			assert.equal(rover.orientation, direction.WEST);
		});
		it("should turn to 'South'", function () {
			rover.turnLeft();
			assert.equal(rover.orientation, direction.SOUTH);
		});
		it("should turn to 'West'", function () {
			rover.turnLeft();
			assert.equal(rover.orientation, direction.EAST);
		});
		it("should turn to 'North'", function () {
			rover.turnLeft();
			assert.equal(rover.orientation, direction.NORTH);
		});
	});

	describe("Move forward", function () {
		var rover;
		beforeEach(function () {
			rover = new Rover({
				"left": 2,
				"top": 3,
				"verticalBoundary": 5,
				"horizontalBoundary": 5
			});

		});
		it("should move forward by one to North", function () {
			rover.orientation = direction.NORTH;
			rover.moveForward();
			assert.equal(2, rover.top);
			assert.equal(2, rover.left);
		});
		it("should move forward by 2 steps to North", function () {
			rover.orientation = direction.NORTH;
			rover.moveForward(2);
			assert.equal(1, rover.top);
			assert.equal(2, rover.left);
		});

		it("should move forward by one to East", function () {
			rover.orientation = direction.EAST;
			rover.moveForward();
			assert.equal(3, rover.top);
			assert.equal(3, rover.left);
		});

		it("should move forward by one to South", function () {
			rover.orientation = direction.SOUTH;
			rover.moveForward();
			assert.equal(4, rover.top);
			assert.equal(2, rover.left);
		});
		it("should move forward by one to West", function () {
			rover.orientation = direction.WEST;
			rover.moveForward();
			assert.equal(3, rover.top);
			assert.equal(1, rover.left);
		});
	});

	describe("Move backward", function () {
		var rover;
		beforeEach(function () {
			rover = new Rover({
				"left": 2,
				"top": 3,
				"orientation": direction.NORTH,
				"verticalBoundary": 5,
				"horizontalBoundary": 5
			});
		});
		it("should move backward by one to North", function () {
			rover.moveBackward();
			assert.equal(4, rover.top);
			assert.equal(2, rover.left);
		});

		it("should move backward by one to East", function () {
			rover.orientation = direction.EAST;
			rover.moveBackward();
			assert.equal(3, rover.top);
			assert.equal(1, rover.left);
		});

		it("should move backward by one to South", function () {
			rover.orientation = direction.SOUTH;
			rover.moveBackward();
			assert.equal(2, rover.top);
			assert.equal(2, rover.left);
		});

		it("should move backward by 2 steps to South", function () {
			rover.orientation = direction.SOUTH;
			rover.moveBackward(2);
			assert.equal(1, rover.top);
			assert.equal(2, rover.left);
		});

		it("should move backward by one to West", function () {
			rover.orientation = direction.WEST;
			rover.moveBackward();
			assert.equal(3, rover.top);
			assert.equal(3, rover.left);
		});
	});

	describe("Move forward on the edge", function () {
		var rover;
		before(function () {
			rover = new Rover({
				"left": 2,
				"top": 2,
				"orientation": direction.SOUTH,
				"verticalBoundary": 2,
				"horizontalBoundary": 2
			});
		});
		it("should die if moved North", function () {
			rover.moveForward();
			rover.moveForward();
			rover.moveForward();

			assert.equal(3, rover.top);
		});
	});

	describe("Remember footmark", function () {
		var rover;
		beforeEach(function () {
			rover = new Rover({
				"left": 2,
				"top": 4,
				"orientation": direction.SOUTH,
				"verticalBoundary": 5,
				"horizontalBoundary": 5
			});
		});
		it("should have one record once initialized", function () {
			var result = rover.footmark[0];
			var expected = {
				x: 2,
				y: 4
			};
			assert.equal(expected.x, result.x);
			assert.equal(expected.y, result.y);
		});
		it("should remember more after several moves", function () {
			rover.moveForward();
			rover.turnRight();
			rover.moveForward();
			rover.turnLeft();

			assert(3, rover.footmark.length);

			var expected = [{
				x: 2,
				y: 4
			}, {
				x: 2,
				y: 5
			}, {
				x: 1,
				y: 5
			}];
			var i;
			for (i = 0; i < expected.length; i++) {
				assert.equal(expected[i].x, rover.footmark[i].x);
				assert.equal(expected[i].y, rover.footmark[i].y);
			}
		});
		it("should not remember anymore once dead", function () {
			rover.moveForward();
			rover.moveForward();
			rover.moveForward();

			assert(2, rover.footmark.length);
			var expected = [{
				x: 2,
				y: 4
			}, {
				x: 2,
				y: 5
			}];
			var i;
			for (i = 0; i < expected.length; i++) {
				assert.equal(expected[i].x, rover.footmark[i].x);
				assert.equal(expected[i].y, rover.footmark[i].y);
			}
		});
	});

});