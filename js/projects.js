(() => {
  function initProjects() {
    if (!window.gsap || !window.ScrollTrigger) {
      console.error("Carregue GSAP e ScrollTrigger antes de projects.js.");
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const steps = Array.from(
      document.querySelectorAll("#projects .project-step"),
    );

    if (steps.length < 2) return;

    const header = document.querySelector("header");

    let context;
    let resizeTimer;

    function createAnimation() {
      // Limpa somente esta animação antes de recalcular.
      if (context) {
        context.revert();
      }

      context = gsap.context(() => {
        const lastStep = steps[steps.length - 1];

        function getTop(step) {
          const headerBottom = header
            ? header.getBoundingClientRect().bottom + 16
            : 24;

          // Permite ler o final de cartões maiores que a tela.
          const cardBottom = window.innerHeight - step.offsetHeight - 20;

          return Math.min(headerBottom, cardBottom);
        }

        steps.forEach((step, index) => {
          gsap.set(step, {
            zIndex: index + 1,
          });

          // O último cartão continua rolando normalmente.
          if (index === steps.length - 1) return;

          ScrollTrigger.create({
            trigger: step,
            start: () => `top ${getTop(step)}px`,

            endTrigger: lastStep,
            end: () => `top ${getTop(lastStep)}px`,

            pin: step,
            pinSpacing: false,
            invalidateOnRefresh: true,
          });
        });
      });

      ScrollTrigger.refresh();
    }

    function scheduleUpdate() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(createAnimation, 200);
    }

    createAnimation();

    window.addEventListener("resize", scheduleUpdate);

    document.querySelectorAll("#projects img").forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", scheduleUpdate, { once: true });
        img.addEventListener("error", scheduleUpdate, { once: true });
      }
    });
  }

  if (document.readyState === "complete") {
    initProjects();
  } else {
    window.addEventListener("load", initProjects, { once: true });
  }
})();
