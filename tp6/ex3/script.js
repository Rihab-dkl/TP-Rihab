// script.js

const helice = document.querySelector('.helice');

let angle = 0;           // angle courant de l'hélice
let lastScrollY = window.scrollY;  // dernière position de scroll
let speed = 0;           // vitesse actuelle de rotation

function update() {
    // calcule la vitesse en fonction du scroll
    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY; // différence de scroll
    lastScrollY = currentScrollY;

    // plus on scrolle vite, plus la vitesse augmente légèrement
    speed += delta * 0.2;

    // amortissement : la vitesse diminue doucement quand on arrête de scroller
    speed *= 0.9;

    // mise à jour de l'angle
    angle += speed;
    helice.style.transform = `rotate(${angle}deg)`; // ANIMATION : rotation via transform

    requestAnimationFrame(update); // boucle d’animation fluide
}

// on démarre la boucle d'animation
requestAnimationFrame(update);