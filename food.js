class Food {
  constructor(position, size) {
    this.pos = position;
    this.size = size ? size : random(5, 10);
		this.active = true;
  }

  update() {
		if(random(100) < 0.01) {
     let h = new Herbivore(randomVectorFromVector(this.pos), random(5, 7));
      controller.newHerbivores.push(h);
    }
  }

  render() {
    if (this.active) {
      fill(FOOD_COL);
      stroke(FOOD_COL)
      ellipse(this.pos.x, this.pos.y, this.size, this.size)
    }
  }
} 