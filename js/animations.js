document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const tlHero = gsap.timeline({ defaults: { ease: "power3.out" } });

    tlHero
        .from(".hero .image-title", { opacity: 0, scale: 0.8, rotate: -8, duration: 1 })
        .from(".hero-content p", { opacity: 0, y: 20, stagger: 0.15, duration: 0.6 }, "-=0.6")
        .from(".hero .social-links a", { opacity: 0, y: 15, stagger: 0.08, duration: 0.4 }, "-=0.2")
        .from(".hero .buttons-content a", { opacity: 0, y: 15, stagger: 0.1, duration: 0.4 }, "-=0.2");


    /* ============================================================
       TIMELINE 2 — SOBRE (dispara quando a seção entra na tela)
       ============================================================ */
    const tlAbout = gsap.timeline({
        scrollTrigger: {
            trigger: "#about",
            start: "top 70%",
            // markers: true, // descomente pra depurar visualmente o disparo
        },
        defaults: { ease: "power2.out" },
    });

    tlAbout
        .from("#about .section-title", { opacity: 0, x: -40, duration: 0.6 })
        .from("#about .about-text p", { opacity: 0, y: 20, stagger: 0.15, duration: 0.6 }, "-=0.2")
        .from("#about .highlight-item", { opacity: 0, y: 20, stagger: 0.12, duration: 0.5 }, "-=0.2")
        .from("#about .cube-decoration", { opacity: 0, scale: 0.6, rotate: 0, duration: 0.8 }, "-=0.6")
        .from("#about .about-image img", { opacity: 0, scale: 0.85, duration: 0.8 }, "-=0.6");


    /* ============================================================
       TIMELINE 3 — HABILIDADES
       ============================================================ */
    const tlSkills = gsap.timeline({
        scrollTrigger: {
            trigger: "#skills",
            start: "top 75%",
        },
    });

    tlSkills
        .from("#skills .section-title", { opacity: 0, x: -40, duration: 0.6, ease: "power2.out" })
        .from("#skills .skill-card", {
            opacity: 0,
            y: 30,
            scale: 0.8,
            stagger: 0.06,
            duration: 0.5,
            ease: "back.out(1.7)",
        }, "-=0.2");


    /* ============================================================
       TIMELINE 4 — PROJETOS
       ============================================================ */
    const tlProjects = gsap.timeline({
        scrollTrigger: {
            trigger: "#projects",
            start: "top 75%",
        },
    });

    tlProjects
        .from("#projects .section-title", { opacity: 0, x: -40, duration: 0.6, ease: "power2.out" })
        .from("#projects .project-card", {
            opacity: 0,
            y: 40,
            stagger: 0.15,
            duration: 0.6,
            ease: "power2.out",
        }, "-=0.2");


    /* ============================================================
       TIMELINE 5 — CONTATO
       ============================================================ */
    const tlContact = gsap.timeline({
        scrollTrigger: {
            trigger: "#contact",
            start: "top 75%",
        },
    });

    tlContact
        .from("#contact .section-title", { opacity: 0, x: -40, duration: 0.6, ease: "power2.out" })
        .from("#contact .title-forms", { opacity: 0, y: 20, duration: 0.5 }, "-=0.2")
        .from("#contact .contact-subtitle", { opacity: 0, y: 15, duration: 0.5 }, "-=0.3")
        .from("#contact .form-group", { opacity: 0, y: 20, stagger: 0.12, duration: 0.5 }, "-=0.2")
        .from("#contact .btn-submit", { opacity: 0, y: 15, duration: 0.5 }, "-=0.2");

});
