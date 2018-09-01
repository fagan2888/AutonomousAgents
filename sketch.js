let cnv, border;
let vehicle1;
let isPressed = false;


function setup(){
    cnv = createCanvas(windowWidth, windowHeight - 30);
	background(0);

	cnv.mousePressed(() => isPressed = true);
	cnv.mouseReleased(() => isPressed = false);

	vehicle1 = new Vehicle(createVector(width/2, height/2),
	createVector(0,0,0), createVector(0,0,0), 10);
}
function draw(){

	background(0);
	vehicle1.updatePos();

	// if (isPressed) {
	// 	vehicle1.mouseForce();
	// }

	let mouseVec = createVector(mouseX, mouseY);
	// Draw an ellipse at the mouse position
	fill(200);
	stroke(0);
	strokeWeight(2);
	ellipse(mouseVec.x, mouseVec.y, 32, 32);

	// Call the appropriate steering behaviors for our agents
	vehicle1.seek(mouseVec);
	vehicle1.updatePos();
	vehicle1.display();
}

function windowResized() {
	// print('resized!');
	resizeCanvas(windowWidth, windowHeight);
	background(0);
}
