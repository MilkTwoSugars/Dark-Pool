class Grower {
  constructor(position) {
    this.pos = position;
    this.size = 0;
    this.active = true;
    this.maxSize = random(3, 15);
  }

  update() {
    if (this.active) {
      this.size += 0.1;
      if (this.size >= this.maxSize) {
        this.bloom();
      }
    }
  }

  bloom() {
    let f = new Food(this.pos.copy(), this.maxSize);
    controller.food.push(f);
    this.active = false;
  }

  render() {
    if (this.active) {
      fill(GROWER_COL);
      stroke(GROWER_COL)
      ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }
  }
}