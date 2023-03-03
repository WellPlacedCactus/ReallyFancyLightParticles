
class Particle {

  constructor(x, y, s, vx, vy, image) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.vx = vx;
    this.vy = vy;
    this.image = image;
  }

  tick() {
    this.x += this.vx;
    this.y += this.vy;
    this.s -= 0.01;
    if (this.s < 0) this.dead = true;
  }

  draw(c) {
    c.drawImage(
      this.image,
      this.x - this.image.width * this.s / 2,
      this.y - this.image.height * this.s / 2,
      this.image.width * this.s,
      this.image.height * this.s
    );
  }
}

class Emitter {
  
  constructor(x, y, vx, vy, image) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.image = image;
    this.particleHandler = new Handler();
    this.bounces = 0;
  }

  move() {
    this.vy += 0.1;
    this.x += this.vx;
    this.y += this.vy;
    if (this.y > innerHeight) {
      this.bounces++;
      this.vy *= -0.75;
      this.y = innerHeight;
      for (let i = 0; i < 25; i++) {
        this.emit(
          Math.random() - 0.5,
          -Math.random()
        );
      }
    }
  }

  emit(vx, vy) {
    if (this.bounces < 5) {
      for (let i = 0; i < 2; i++) {
        this.particleHandler.add(new Particle(
          this.x,
          this.y,
          1,
          vx,
          vy,
          this.image
        ));
      }
    }
  }

  die() {
    if (this.particleHandler.empty) {
      this.dead = true;
    }
  }

  tick() {
    this.move();
    this.emit(
      Math.random() - 0.5,
      Math.random() - 0.5
    );
    this.die();
    this.particleHandler.tick();
  }

  draw(c) {
    this.particleHandler.draw(c);
  }
} 