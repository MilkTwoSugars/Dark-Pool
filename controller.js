class Controller {
  constructor() {
    this.growers = [];
    this.shrinkers = [];

    this.food = [];
    this.herbivores = [];
    this.predators = [];
    this.whale = null;

    this.newGrowers = [];
    this.newFood = [];
    this.newHerbivores = [];
    this.newPredators = [];
  }

  initialise(foodCount, herbivoreCount, predatorCount) {
    for (var i = 0; i < foodCount; i++) {
      let f = new Food(randomVector());
      this.food.push(f);
    }

    for (var j = 0; j < herbivoreCount; j++) {
      let h = new Herbivore(randomVector(), random(10, 15), 1);
      this.herbivores.push(h);
    }

    for (var k = 0; k < predatorCount; k++) {
      let p = new Predator(randomVector(), random(10, 15), 1);
      this.predators.push(p);
    }

  }

  update() {
    this.createGrowers();
    this.createWhale();
    this.growers.forEach(g => g.update());
    this.shrinkers.forEach(s => s.update());
    this.food.forEach(f => f.update());
    this.herbivores.forEach(h => h.update());
    this.predators.forEach(p => p.update());

    if (this.whale) {
      this.whale.update()
    }
  }

  render() {
    this.shrinkers.forEach(s => s.render());
    this.growers.forEach(g => g.render());
    this.food.forEach(f => f.render());
    this.herbivores.forEach(h => h.render());
    this.predators.forEach(p => p.render());

    if (this.whale) {
      this.whale.render();
    }
  }

  createGrowers() {
    let r = random(100);
    if (r < 2.5) {
      let g = new Grower(randomVector());
      this.growers.push(g);
    }
  }

  createWhale() {
    let r = random(100);
    if (r < 0.05) {
      if (!this.whale) {
        this.whale = new Whale(createVector(-150, random(150, height - 150)), 0.5);
      }
    }
  }

  cleanup() {

    // Cleanup growers
    for (var g = this.growers.length - 1; g >= 0; g--) {
      if (!this.growers[g].active) {
        this.growers.splice(g, 1);
      }
    }

    // Cleanup shrinkers
    for (var s = this.shrinkers.length - 1; s >= 0; s--) {
      if (!this.shrinkers[s].active) {
        this.shrinkers.splice(s, 1);
      }
    }

    // Cleanup food
    for (var f = this.food.length - 1; f >= 0; f--) {
      if (!this.food[f].active) {
        this.food.splice(f, 1);
      }
    }

    // Cleanup herbivores
    for (var h = this.herbivores.length - 1; h >= 0; h--) {
      if (!this.herbivores[h].active) {
        this.herbivores.splice(h, 1);
      }
    }

    // Cleanup predators
    for (var p = this.predators.length - 1; p >= 0; p--) {
      if (!this.predators[p].active) {
        this.predators.splice(p, 1);
      }
    }

    // Cleanup whale
    if (this.whale) {
      if (!this.whale.active) {
        this.whale = null;
      }
    }

    // Add new food
    for (var nf = 0; nf < this.newFood.length; nf++) {
      this.food.push(this.newFood[nf]);
    }
    this.newFood = [];

    // Add new herbivores
    for (var nh = 0; nh < this.newHerbivores.length; nh++) {
      this.herbivores.push(this.newHerbivores[nh]);
    }
    this.newHerbivores = [];

    // Add new predators
    for (var np = 0; np < this.newPredators.length; np++) {
      this.predators.push(this.newPredators[np]);
    }
    this.newPredators = [];

  }


}