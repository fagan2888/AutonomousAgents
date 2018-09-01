
//Class definition of a particle
const MAX_SPEED = 5;
const MAX_FORCE = 1;
let gravity = false;
let grv_cons = 0.05;
let drg_cons = 0.005;
let drag = false;
let lifespan = 255;

class Vehicle {

    constructor(pos, vel, acc, mass) {
        this.pos = pos;
        this.vel = vel;
        this.acc = acc;
        this.mass = mass;
        this.radius = mass;
        this.lifespan = lifespan;
        // print(this);
    }


    updatePos() {

        if (gravity) {
            this.applyForce(createVector(0, grv_cons, 0).mult(this.mass));
        }
        if (drag) {
            let drag = this.vel.copy();
            let speed = this.vel.mag();
            drag.normalize();
            drag.mult(-drg_cons * speed * speed);
            this.vel.add(drag);
        }

        //Newtons Laws
        this.vel.add(this.acc);
        this.pos.add(this.vel);

        //limit the speed
        this.vel.limit(MAX_SPEED);

        // add border
        // this.addBorder();

        // dont accumulate accelaration over frames
        this.acc.mult(0);

        
        // decrese lifespan
        // this.lifespan-=5;

    }


    applyForce(newForce) {
        this.acc.add(newForce.div(this.mass));
    }


    // mouseForce() {
    //     let K = 0.05;
    //     let mouseVec = createVector(mouseX - this.pos.x, mouseY - this.pos.y);
    //     this.applyForce(mouseVec.mult(K));
    // }

    // A method that calculates a steering force towards a target
    // STEER = DESIRED MINUS VELOCITY
    seek(target) {
        let desired = target.sub(this.pos);  // A vector pointing from the position to the target
        
        // Scale to maximum speed
        desired.setMag(MAX_SPEED);

        // Steering = Desired minus velocity
        let steer = desired.sub(this.vel);
        steer.limit(MAX_FORCE);  // Limit to maximum steering force
        
        this.applyForce(steer);
    }

    display() {
        // Draw a triangle rotated in the direction of velocity
        let theta = this.vel.heading() + PI/2;
        fill(127);
        stroke(0);
        strokeWeight(1);
        push();
        translate(this.pos.x,this.pos.y);
        rotate(theta);
        beginShape();
        vertex(0, -this.mass*2);
        vertex(-this.mass, this.mass*2);
        vertex(this.mass, this.mass*2);
        endShape(CLOSE);
        pop();
        
        
      }
}