
class Target extends Vehicle {

    constructor(pos, vel, acc, mass) {
        super(pos, vel, acc, mass);
    }
    updatePos() {
        super.updatePos();
        this.vel.limit(this.MAX_SPEED);
    }

    border() {
        if (this.pos.x > width - this.radius) {
            this.vel.x = -this.vel.x;
        }
        if (this.pos.x < this.radius) {
            this.vel.x = -this.vel.x;
        }
        if (this.pos.y > height - this.radius) {
            this.vel.y = -this.vel.y;
        }
        if (this.pos.y < this.radius) {
            this.vel.y = -this.vel.y;
        }
    };

    noisyMove() {
        let k = frameCount / 1;
        let magn = 3;

        let force = [createVector(map(noise(k), 0, 1, -magn, magn),
            map(noise(k + 1000), 0, 1, -magn, magn))];

        this.applyForce(force[0], force[1]);
    }

    display() {
        this.noisyMove();
        this.border();
        // Draw an ellipse at the target position
        fill(100, 200, 100);
        stroke(0);
        strokeWeight(2);
        ellipse(this.pos.x, this.pos.y, this.radius * 2);
    }

}

