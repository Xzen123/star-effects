
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let w, h;
const layerCount = 3;
const starsPerLayer = 80;
const stars = [];

function resizeCanvas() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

function createStars() {
  stars.length = 0;
  for (let layer = 0; layer < layerCount; layer++) {
    const layerSpeed = 0.1 + layer * 0.1;
    const layerSize = 0.5 + layer * 0.5;

    for (let i = 0; i < starsPerLayer; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * layerSize + 0.3,
        speed: layerSpeed,
        opacity: Math.random() * 0.8 + 0.2,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
      });
    }
  }
}

function updateStars() {
  for (let star of stars) {
    star.y -= star.speed;
    if (star.y < 0) {
      star.y = h;
      star.x = Math.random() * w;
    }
    star.twinklePhase += star.twinkleSpeed;
    star.opacity = 0.6 + 0.4 * Math.sin(star.twinklePhase);
  }
}

function drawGradientBackground() {
  const gradient = ctx.createLinearGradient(0, 0, 0, h);
  gradient.addColorStop(0, '#0a0a1f');  // Very dark blue
  gradient.addColorStop(1, '#000000');  // Black

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);
}

function drawStars() {
  drawGradientBackground();

  for (let star of stars) {
    const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 2);
    gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

function animate() {
  updateStars();
  drawStars();
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  createStars();
});

resizeCanvas();
createStars();
animate();
