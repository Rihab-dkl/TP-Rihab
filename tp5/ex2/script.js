window.addEventListener("scroll", () => {

    // Hauteur totale scrollable
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  
    // Pourcentage de défilement (entre 0 et 1)
    const progress = window.scrollY / maxScroll;
  
    // Intensité du rouge (0 à 255)
    const redValue = Math.floor(progress * 255);
  
    // Application de la couleur dans le body
    document.body.style.backgroundColor = `rgb(${redValue}, 0, 0)`;
  });