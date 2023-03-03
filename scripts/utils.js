
class ParticleImageLoader {

  loadImage(s, h) {
    const canvas = document.createElement('canvas');
    const c = canvas.getContext('2d');
    const canvasSize = 1000;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    c.fillStyle = `hsl(${h}, 50%, 50%)`;
    c.shadowColor = `hsl(${h + 5}, 50%, 50%)`;
    c.shadowBlur = 25;
    c.fillRect(
      (canvas.width - s) / 2,
      (canvas.height - s) / 2,
      s,
      s
    );
    return canvas;
  }
}

class Handler {
  
  constructor(instances=[]) {
    this.instances = instances;
    this.empty = true;
  }

  add(i) {
    i.dead = false;
    this.empty = false;
    this.instances.push(i);
  }

  tick() {
    this.empty = this.instances.length == 0 ? true : false;
    for (let i = this.instances.length - 1; i >= 0; --i) {
      const o = this.instances[i];
      o.tick();
      if (o.dead) this.instances.splice(i, 1);
    }
  }

  draw(c) {
    for (let i = this.instances.length - 1; i >= 0; --i) {
      const o = this.instances[i];
      o.draw(c);
    }
  }
}