// Pour chaque colonne, on relie la barre de progression au scroll
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".col");
  
    sections.forEach(section => {
      const content = section.querySelector(".col__body");
      const progressBar = section.querySelector("progress");
  
      content.addEventListener("scroll", () => {
        const scrollTop = content.scrollTop;
        const scrollHeight = content.scrollHeight - content.clientHeight;
        const ratio = scrollHeight > 0 ? (scrollTop / scrollHeight) : 0;
        progressBar.value = Math.round(ratio * 100);
      });
    });
  });


  document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".col");
    const globalBar = document.getElementById("globalProgress");
  
    function ratioFor(el) {
      const scrollable = el.scrollHeight - el.clientHeight;
      if (scrollable <= 0) return 1;              // pas de scroll => déjà "lu"
      return el.scrollTop / scrollable;           // 0 → 1
    }
  
    function updateLocalProgress(section) {
      const content = section.querySelector(".col__body");
      const bar = section.querySelector("progress");
      bar.value = Math.round(ratioFor(content) * 100);
    }
  
    function updateGlobalProgress() {
      const ratios = Array.from(sections).map(s => ratioFor(s.querySelector(".col__body")));
      const avg = ratios.reduce((a, b) => a + b, 0) / ratios.length || 0;
      globalBar.value = Math.round(avg * 100);
    }
  
    // Init + listeners
    sections.forEach(section => {
      const content = section.querySelector(".col__body");
      const progressBar = section.querySelector("progress");
  
      // init local
      updateLocalProgress(section);
  
      // MAJ à chaque scroll
      content.addEventListener("scroll", () => {
        updateLocalProgress(section);
        updateGlobalProgress();
      }, { passive: true });
    });
  
    // MAJ au chargement et lors des changements de layout
    updateGlobalProgress();
    window.addEventListener("resize", () => {
      sections.forEach(updateLocalProgress);
      updateGlobalProgress();
    });
  });