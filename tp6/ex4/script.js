// script.js

const img = document.getElementById('photo');
const btnStart = document.getElementById('btnStart');
const btnStop = document.getElementById('btnStop');

let intervalId = null; // identifiant du setInterval

// petite fonction utilitaire pour générer un nombre aléatoire entre min et max
function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

// génère une matrice CSS "raisonnable" (on reste autour de 1 pour éviter les trucs trop moches)
function generateRandomMatrix() {
    const a  = randomBetween(0.7, 1.3);
    const d  = randomBetween(0.7, 1.3);
    const b  = randomBetween(-0.5, 0.5);
    const c  = randomBetween(-0.5, 0.5);
    const tx = randomBetween(-40, 40); // translation horizontale
    const ty = randomBetween(-40, 40); // translation verticale

    // ligne clé : on fabrique la valeur matrix(...) pour la propriété transform
    return `matrix(${a}, ${b}, ${c}, ${d}, ${tx}, ${ty})`;
}

// applique une nouvelle transformation aléatoire à l’image
function deformImage() {
    img.style.transform = generateRandomMatrix(); 
    // grâce à la transition CSS, le passage d’une matrice à l’autre est animé
}

// démarrer l’animation
btnStart.addEventListener('click', () => {
    if (intervalId !== null) return; // évite de lancer plusieurs intervalles

    // setInterval : exécute deformImage à intervalle régulier (tous les 400 ms ici)
    intervalId = setInterval(deformImage, 400);
});

// arrêter l’animation
btnStop.addEventListener('click', () => {
    if (intervalId !== null) {
        clearInterval(intervalId);   // on stoppe les appels réguliers
        intervalId = null;
    }
});