
(() => {

  const canvas = document.querySelector('canvas');
  const c = canvas.getContext('2d');
  const mouse = {};

  const loader = new ParticleImageLoader();
  const redParticle = loader.loadImage(16, 0);
  const emitterHandler = new Handler([
    new Emitter(
      0,
      0,
      1,
      0,
      redParticle
    )
  ]);

  const loop = () => {
    emitterHandler.tick();
    c.clearRect(0, 0, canvas.width, canvas.height);
    emitterHandler.draw(c);
    requestAnimationFrame(loop);
  };

  addEventListener('load', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    c.globalCompositeOperation = 'lighter';
    mouse.x = 0;
    mouse.y = 0;
    mouse.down = false;
    requestAnimationFrame(loop);
  });

  addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    c.globalCompositeOperation = 'lighter';
  });

  addEventListener('mousemove', ({x, y}) => {
    mouse.x = x;
    mouse.y = y;
  });

  addEventListener('mousedown', () => {
    mouse.down = true;
  });

  addEventListener('mouseup', () => {
    mouse.down = false;
  });
  
  addEventListener('touchmove', ({touches}) => {
    const t = touches[0];
    mouse.x = t.clientX;
    mouse.y = t.clientY;
  });

  addEventListener('touchstart', () => {
    mouse.down = true;
  });

  addEventListener('touchend', () => {
    mouse.down = false;
  });

})();