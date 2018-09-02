let cnv;
let vehicles = [], targets = [];
let isPressed = false;


function setup() {
	cnv = createCanvas(windowWidth, windowHeight - 30);
	background(0);

	cnv.mousePressed(() => isPressed = true);
	cnv.mouseReleased(() => isPressed = false);

	addVehicles();

	target1 = new Target(createVector(width / 2, height / 2),
		createVector(0, 0), createVector(0, 0), 7);
	targets.push(target1);

}
function draw() {

	background(0);

	// if (isPressed) {
	// 	vehicle1.mouseForce();
	// }

	// Call the appropriate behaviors for our target
	// target1.randomForce();
	targets.forEach(target => {
		target.updatePos();
		target.display();
	});

	// Call the appropriate steering behaviors for our agents
	vehicles.forEach(vehicle => {
		vehicle.seek(target1);
		vehicle.updatePos();
		vehicle.display();
	});


	// print(floor(dist(vehicle1.pos.x,
	// 	vehicle1.pos.y, target1.pos.x, target1.pos.y)),);
	vehicles.forEach(vehicle => {
		targets.forEach(target => {
			if (Vehicle.isCollide(vehicle, target)) {
				// print("Boom!");
				vehicle.colour = "red";
			}
			else {
				vehicle.colour = "white";
			}
		});
		
	});
	// if (Vehicle.isCollide(vehicle1, target1)) {
	// 	// print("Boom!");
	// 	vehicle1.colour = "red";
	// }
	// else {
	// 	vehicle1.colour = "white";
	// }
}


function windowResized() {
	// print('resized!');
	resizeCanvas(windowWidth, windowHeight);
	background(0);
}

function addVehicles(){
	vehicle1 = new Vehicle(createVector(width / 2, height / 2),
		createVector(0, 0), createVector(0, 0), 10);
	vehicles.push(vehicle1);

	vehicle2 = new Vehicle(createVector(random(width), random(height)),
		createVector(0, 0), createVector(0, 0), 10);
	vehicle2.MAX_SPEED = 7;
	vehicle2.MAX_FORCE = 0.5;
	vehicles.push(vehicle2);

	vehicle3 = new Vehicle(createVector(random(width), random(height)),
		createVector(0, 0), createVector(0, 0), 10);
	vehicle3.MAX_SPEED = 15;
	vehicle3.MAX_FORCE = 5;
	vehicles.push(vehicle3);
}