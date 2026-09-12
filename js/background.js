(() => {
  const canvas = document.querySelector("#background-animation");
  const ctx = canvas?.getContext("2d");

  if (!ctx) return;

  let width = 0;
  let height = 0;
  let particles = [];
  let animationId = null;
  let lastTime = 0;
  let color = "176, 38, 255";

  function updateColor() {
    color =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--color-primary-rgb")
        .trim() || "176, 38, 255";
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    const count = Math.min(
      65,
      Math.max(18, Math.floor((width * height) / 22000)),
    );

    particles = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 25 + Math.random() * 25;

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 2 + 1,
      };
    });

    draw();
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    const connectionDistance = width < 768 ? 120 : 170;

    // Conecta partículas próximas.
    particles.forEach((particle, index) => {
      for (let j = index + 1; j < particles.length; j++) {
        const other = particles[j];

        const distance = Math.hypot(particle.x - other.x, particle.y - other.y);

        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * 0.25;

          ctx.beginPath();
          ctx.strokeStyle = `rgba(${color}, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
        }
      }
    });

    // Desenha os pontos.
    particles.forEach((particle) => {
      ctx.beginPath();
      ctx.fillStyle = `rgba(${color}, 0.55)`;
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function animate(time) {
    const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;

    lastTime = time;

    particles.forEach((particle) => {
      particle.x += particle.vx * delta;
      particle.y += particle.vy * delta;

      // Faz os pontos voltarem ao atingir as bordas.
      if (particle.x < 0 || particle.x > width) {
        particle.vx *= -1;
        particle.x = Math.max(0, Math.min(width, particle.x));
      }

      if (particle.y < 0 || particle.y > height) {
        particle.vy *= -1;
        particle.y = Math.max(0, Math.min(height, particle.y));
      }
    });

    draw();
    animationId = requestAnimationFrame(animate);
  }

  function syncAnimation() {
    if (animationId !== null) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }

    lastTime = 0;

    // Pausa apenas quando a aba não está visível.
    if (document.hidden) return;

    animationId = requestAnimationFrame(animate);
  }

  // Acompanha a troca entre tema claro e escuro.
  const themeObserver = new MutationObserver(() => {
    updateColor();
    draw();
  });

  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", syncAnimation);

  updateColor();
  resize();
  syncAnimation();
})();
