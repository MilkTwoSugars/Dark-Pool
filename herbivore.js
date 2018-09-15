class Herbivore {
  constructor(position, size, speed) {
    this.pos = position;
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.acc = createVector(0, 0);
    this.maxSpeed = random(0.5, 1);
    this.maxForce = random(0.025, 0.75);
    this.size = size;
    this.speed = speed;
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
      this.rollMutation();
      this.checkFood();
      this.age();
    }

  }

  applyForce(force) {
    this.acc.add(force);
  }

  seek() {
    let target = this.getClosestFood();

    if (target) {
      var desired = p5.Vector.sub(target, this.pos);
      desired.setMag(this.maxSpeed);

      var steering = p5.Vector.sub(desired, this.vel);
      steering.limit(this.maxForce);
      this.applyForce(steering);
    }
  }

  getClosestFood() {
    return getClosest(this.pos, controller.food);
  }

  checkFood() {
    for (var i = 0; i < controller.food.length; i++) {
      if (getDistance(this.pos, controller.food[i].pos) < this.size / 1.5) {
        if (controller.food[i].active) {
          controller.food[i].active = false;
          this.eat();
        }
      }
    }
  }
  
    addTail() {
   this.tail.push(createVector(this.pos.x, this.pos.y));
    if (this.tail.length > 25) {
     this.tail.splice(0,1); 
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
    this.lifespan += 10;
    if (this.size > 20) {
      this.active = false;
      this.mitosis();
    }
  }

  mitosis() {

    for (var i = 0; i < 2; i++) {
      let h = new Herbivore(randomVectorFromVector(this.pos), random(5, 7));
      controller.newHerbivores.push(h);
    }
  }
  
  rollMutation() {
   if (random(100) < 0.001) {
    this.mutate(); 
   }
  }
  
  mutate() {
   this.active = false;
    let p = new Predator(this.pos, this.size);
    controller.newPredators.push(p);
  }

  die() {
    let s = new Shrinker(this.pos.copy(), this.size, HERBIVORE_COL);
    controller.shrinkers.push(s);
  }

  render() {
    if (this.active) {
      fill(HERBIVORE_COL);
      stroke(HERBIVORE_COL);
      ellipse(this.pos.x, this.pos.y, this.size, this.size)
      
      for (var i = 0; i < this.tail.length; i++) {
        ellipse(this.tail[i].x, this.tail[i].y, i / 5, i / 5);
      }
    }
  }
}