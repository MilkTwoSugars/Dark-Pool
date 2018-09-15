function borders(position, size) {
  if (position.x > width + size) {
    position.x = 0
  }
  if (position.x < 0 - size) {
    position.x = width
  }
  if (position.y > height + size) {
    position.y = 0
  }
  if (position.y < 0 - size) {
    position.y = height
  }
  return position;
}

function getDistance(v1, v2) {
  return v1.dist(v2);
}

function getClosest(position, arr) {
  let closestDist = 99999;
  let closestPos = null;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].active) {
      let d = getDistance(position, arr[i].pos);
      if (d < closestDist) {
        closestDist = d;
        closestPos = arr[i].pos;
      }
    }
  }
  return closestPos;
}

function randomVector() {
  return createVector(random(width), random(height))
}

function randomVectorFromVector(vector) {
  let v = vector.copy();
  v.x += random(-10, 10);
  v.y += random(-10, 10);
  return v
}