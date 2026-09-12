(() => {
  function initAnimations() {
    if (!window.gsap || !window.ScrollTrigger) {
      console.error(
        "Animações: GSAP e ScrollTrigger precisam carregar primeiro.",
      );
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    /* ======================================================
       FUNÇÃO AUXILIAR
       Anima cada elemento quando ele entra na tela.
    ====================================================== */

    function reveal(selector, options = {}) {
      const elements = gsap.utils.toArray(selector);

      elements.forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 24,
          duration: 0.8,
          ease: "power2.out",

          ...options,

          scrollTrigger: {
            trigger: element,
            start: "top 95%",
            once: true,
          },
        });
      });
    }

    /* ======================================================
       HERO — apresentação em sequência
    ====================================================== */

    const hero = document.querySelector("#home");

    if (hero) {
      const timeline = gsap.timeline({
        defaults: {
          duration: 0.8,
          ease: "power2.out",
        },
      });

      function animateHero(selector, options, position) {
        const elements = hero.querySelectorAll(selector);

        if (!elements.length) return;

        timeline.from(elements, options, position);
      }

      animateHero(".hero-availability", {
        opacity: 0,
        y: 20,
      });

      animateHero(
        ".hero-greeting",
        {
          opacity: 0,
          y: 20,
        },
        "-=0.5",
      );

      animateHero(
        ".hero-name",
        {
          opacity: 0,
          y: 35,
          duration: 1,
        },
        "-=0.5",
      );

      animateHero(
        ".hero-role",
        {
          opacity: 0,
          y: 24,
        },
        "-=0.6",
      );

      animateHero(
        ".hero-description, .hero-details",
        {
          opacity: 0,
          y: 20,
          stagger: 0.15,
        },
        "-=0.4",
      );

      animateHero(
        ".hero-actions",
        {
          opacity: 0,
          y: 20,
        },
        "-=0.4",
      );

      animateHero(
        ".hero-socials, .hero-signature",
        {
          opacity: 0,
          y: 16,
          stagger: 0.15,
        },
        "-=0.4",
      );
    }

    /* ======================================================
       TÍTULOS DAS SEÇÕES
    ====================================================== */

    reveal("main > section > .section-title", {
      y: 20,
      duration: 0.8,
    });

    /* ======================================================
       SOBRE
    ====================================================== */

    reveal("#about .about-label");

    reveal("#about .about-heading", {
      y: 30,
      duration: 1,
    });

    reveal("#about .about-text > p:not(.about-label)");

    reveal("#about .about-goal", {
      y: 30,
      duration: 0.9,
    });

    reveal("#about .about-photo", {
      y: 35,
      duration: 1,
    });

    reveal("#about .about-info");

    /* ======================================================
       HABILIDADES
    ====================================================== */

    reveal("#skills .skills-intro");

    reveal("#skills .skill-info", {
      y: 28,
      duration: 0.9,
    });

    // Anima o conteúdo interno para preservar o hover dos cartões.
    document.querySelectorAll("#skills .skill-card").forEach((card) => {
      const content = card.querySelectorAll("i, h4, p");

      if (!content.length) return;

      gsap.from(content, {
        opacity: 0,
        y: 15,
        stagger: 0.1,
        duration: 0.65,
        ease: "power2.out",

        scrollTrigger: {
          trigger: card,
          start: "top 95%",
          once: true,
        },
      });
    });

    /* ======================================================
       PROJETOS
       Os cartões são controlados somente pelo projects.js.
    ====================================================== */

    reveal("#projects .projects-intro");

    /* ======================================================
       CONTATO
    ====================================================== */

    reveal("#contact .contact-label");

    reveal("#contact .contact-heading", {
      y: 30,
      duration: 1,
    });

    reveal("#contact .contact-description");
    reveal("#contact .contact-note");

    // Anima os itens externos, mantendo o hover dos links.
    reveal("#contact .contact-list > li", {
      y: 25,
      duration: 0.8,
    });

    /* ======================================================
       RODAPÉ
    ====================================================== */

    const footer = document.querySelector(".footer");

    if (footer) {
      gsap.from(footer, {
        opacity: 0,
        duration: 1,
        ease: "power2.out",

        scrollTrigger: {
          trigger: footer,
          start: "top bottom",
          once: true,
        },
      });
    }

    /* ======================================================
       ATUALIZAÇÃO DAS POSIÇÕES
    ====================================================== */

    let refreshTimer;

    function updatePositions() {
      clearTimeout(refreshTimer);

      refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    }

    // Recalcula após carregar imagens que alteram o layout.
    document.querySelectorAll("main img").forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", updatePositions, {
          once: true,
        });

        img.addEventListener("error", updatePositions, {
          once: true,
        });
      }
    });

    if (document.fonts) {
      document.fonts.ready.then(updatePositions);
    }

    if (document.readyState === "complete") {
      updatePositions();
    } else {
      window.addEventListener("load", updatePositions, {
        once: true,
      });
    }
  }

  // Funciona tanto no head com defer quanto no final do body.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAnimations, {
      once: true,
    });
  } else {
    initAnimations();
  }
})();
s;
