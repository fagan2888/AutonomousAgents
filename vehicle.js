
//Class definition of a vehicle

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
        this.MAX_SPEED = 10;
        this.MAX_FORCE = 0.8;
        this.colour = "green";
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
        // this.vel.limit(this.MAX_SPEED);

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
    // STEER = DESIRED - VELOCITY
    seek(target) {
        // A vector pointing from the position to the target
        let desired = p5.Vector.sub(target.pos, this.pos);

        let distance = desired.mag();

        if (distance < this.MAX_SPEED * 100) {
            let m = map(distance, 0, this.MAX_SPEED * 100, 0, this.MAX_SPEED);
            desired.setMag(m);
        }
        else {
            // Scale to maximum speed
            desired.setMag(this.MAX_SPEED);
        }

        // Steering = Desired minus velocity
        let steer = p5.Vector.sub(desired, this.vel);

        steer.add(target.vel); // consider targets velocity

        steer.limit(this.MAX_FORCE);  // Limit to maximum steering force

        this.applyForce(steer);

        this.dontHitWalls();

    }

    dontHitWalls() {

        let dist_to_below = Math.abs(this.pos.y - height);
        let dist_to_up = Math.abs(this.pos.y);
        let dist_to_right = Math.abs(this.pos.x - width);
        let dist_to_left = Math.abs(this.pos.x);

        let limit_dist = 50;
        let maxforce = 5;

        if (dist_to_below < limit_dist) {
            let forcetoapply = map(dist_to_below, 0, limit_dist, 0, maxforce);
            this.applyForce(createVector(0, -forcetoapply));
            print("dist_to_below: " + dist_to_below);
        }
        if (dist_to_up < limit_dist) {
            let forcetoapply = map(dist_to_up, 0, limit_dist, 0, maxforce);
            this.applyForce(createVector(0, forcetoapply));
            print("dist_to_up: " + dist_to_up);
        }
        if (dist_to_right < limit_dist) {
            let forcetoapply = map(dist_to_right, 0, limit_dist, 0, maxforce);
            this.applyForce(createVector(-forcetoapply, 0));
            print("dist_to_right: " + dist_to_right);

        }
        if (dist_to_left < limit_dist) {
            let forcetoapply = map(dist_to_left, 0, limit_dist, 0, maxforce);
            this.applyForce(createVector(forcetoapply, 0));
            print("dist_to_left: " + dist_to_left);

        }
    }

    display() {
        // Draw a triangle rotated in the direction of velocity
        let theta = this.vel.heading() + PI / 2;
        fill(this.colour);
        stroke(0);
        strokeWeight(1);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(theta);
        beginShape();
        vertex(0, -this.radius * 2);
        vertex(-this.radius, this.radius * 2);
        vertex(this.radius, this.radius * 2);
        endShape(CLOSE);
        pop();

    }

    static isCollide(target, mover) {
        return target.radius + mover.radius > dist(target.pos.x,
            target.pos.y, mover.pos.x, mover.pos.y);
    }
}