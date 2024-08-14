let n, xs, ys, radii, velocities;
let randomizeColors;

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("position", "fixed");
  canvas.style("z-index", "-1");

  n = windowWidth / 5;
  xs = [];
  ys = [];
  radii = [];
  velocities = [];
  for (let i = 0; i < n; i++) {
    xs.push(random(20, windowWidth - 20));
    ys.push(random(20, windowHeight - 20));
    radii.push(random(5, 7));
    let ang = random(0, 2 * PI);
    velocities.push([cos(ang), sin(ang)]);
  }
}

function draw() {
  clear();
  let thresh = 10000;
  background(0, 0, 0, 0);
  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      let dis = (xs[i] - xs[j]) ** 2 + (ys[i] - ys[j]) ** 2;
      if (dis < thresh) {
        let col = color(255, 255, 255, 220 * (1 - dis / thresh));
        stroke(col);
        line(xs[i], ys[i], xs[j], ys[j]);
      }
    }
  }
  for (let i = 0; i < n; i++) {
    xs[i] += velocities[i][0];
    ys[i] += velocities[i][1];
    if (xs[i] + radii[i] > windowWidth || xs[i] - radii[i] < 0) {
      velocities[i][0] *= -1;
    }
    if (ys[i] + radii[i] > windowHeight || ys[i] - radii[i] < 0) {
      velocities[i][1] *= -1;
    }
    stroke(0, 0, 0, 0);
    fill(255 + (5 - radii[i]) * 60);
    circle(xs[i], ys[i], radii[i]);
  }

  // background(0, 0, 0, 150);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
