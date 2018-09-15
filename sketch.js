var controller;

function setup() {
  createCanvas(windowWidth, windowHeight);
  controller = new Controller();
  controller.initialise(0, 0, 0);
}

function draw() {
  background(BACKGROUND);
  controller.update();
  controller.render();
  controller.cleanup();
}

