class Whale {
  constructor(position, size) {
    this.pos = position;
    this.size = size;
    this.speed = 1;
    this.tail = [];
    this.active = true;
  }

  update() {
    if (this.active) {
      this.pos.x += this.speed;
      this.pos.y += sin(frameCount * 0.01)
      this.addTail();
      this.checkBorder();
      this.checkPredators();
      if (random(100) < 1) {
        if (this.pos.x < width && this.pos.x > 0 && this.pos.y < height && this.pos.y > 0) {
          this.excrete();
        }
      }
    }

  }

  checkBorder() {
    if (this.pos.x > width + 500) {
      this.active = false;
    }
  }
  
  checkPredators() {
    for (var i = 0; i < controller.predators.length; i++) {
      if (getDistance(this.pos, controller.predators[i].pos) < this.size / 1.5) {
        if (controller.predators[i].active) {
          controller.predators[i].active = false;
        }
      }
    }
  }

  addTail() {
    this.tail.push(createVector(this.pos.x, this.pos.y));
    if (this.tail.length > 250) {
      this.tail.splice(0, 1);
    }
  }

  excrete() {
    let g = new Grower(this.pos.copy());
    controller.growers.push(g);
  }

  render() {
    if (this.active) {
      fill(WHALE_COL);
      stroke(WHALE_COL);
      ellipse(this.pos.x, this.pos.y, this.size, this.size)

      for (var i = 0; i < this.tail.length; i++) {
        ellipse(this.tail[i].x, this.tail[i].y, this.size * i, this.size * i);
      }
    }
  }
}