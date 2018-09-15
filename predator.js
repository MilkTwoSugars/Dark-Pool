class Predator {
 	 constructor(position, size) {
    this.pos = position;
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.acc = createVector(0, 0);
    this.maxSpeed = random(1, 2);
    this.maxForce = random(0.025, 0.75);
    this.size = size;
    this.tail = [];
    this.lifespan = random(1000, 5000);
    this.active = true;
  }

  update() {
    if (this.active) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.seek();
      this.pos = borders(this.pos, this.size);
      this.addTail();
      this.checkHerbivores();
      this.age();
    }

  }

  applyForce(force) {
    this.acc.add(force);
  }

  seek() {
    let target = this.getClosestHerbivore();

    if (target) {
      var desired = p5.Vector.sub(target, this.pos);
      desired.setMag(this.maxSpeed);

      var steering = p5.Vector.sub(desired, this.vel);
      steering.limit(this.maxForce);
      this.applyForce(steering);
    }
  }

  getClosestHerbivore() {
    return getClosest(this.pos, controller.herbivores);
  }
  
  addTail() {
   this.tail.push(createVector(this.pos.x, this.pos.y));
    if (this.tail.length > 100) {
     this.tail.splice(0,1); 
    }
  }

  checkHerbivores() {
    for (var i = 0; i < controller.herbivores.length; i++) {
      if (getDistance(this.pos, controller.herbivores[i].pos) < this.size / 1.5) {
        if (controller.herbivores[i].active) {
          controller.herbivores[i].active = false;
          this.eat();
        }
      }
    }
  }

  age() {
    this.lifespan -= 1;
    if (this.lifespan <= 0) {
      this.active = false;
      this.die();
    }
  }

  eat() {
    this.size++;
    this.lifespan += 15;
    if (this.size > 20) {
      this.size = 20;
    }
  }

  die() {
    let s = new Shrinker(this.pos.copy(), this.size, PREDATOR_COL);
    controller.shrinkers.push(s);
  }

  render() {
    if (this.active) {
      fill(PREDATOR_COL);
      stroke(PREDATOR_COL);
      ellipse(this.pos.x, this.pos.y, this.size, this.size);
      
      for (var i = 0; i < this.tail.length; i++) {
        ellipse(this.tail[i].x, this.tail[i].y, i / 10, i / 10);
      }
    }
  }
}