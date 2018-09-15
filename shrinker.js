class Shrinker {
  constructor(position, size, colour) {
    this.pos = position;
    this.colour = colour;
    this.size = size;
    this.active = true;
  }

  update() {
    if (this.active) {
      this.size -= 0.25;
      if (this.size <= 0) {
        this.die();
      }
    }
  }

  die() {
    this.active = false;
    for (var i = 0; i < 3; i++) {
      let h = new Food(randomVectorFromVector(this.pos), random(5, 7));
      controller.newFood.push(h);
    }
  }

  render() {
    if (this.active) {
      fill(this.colour);
      stroke(this.colour)
      ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }
  }
}