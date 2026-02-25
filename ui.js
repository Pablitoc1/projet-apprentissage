export function preparerFermetureModale(modaleElement,selectorCroixFermeture) {
    const croix = modaleElement.querySelector(selectorCroixFermeture);
    if(croix) {
        croix.addEventListener("click", function() {
            modaleElement.style.display = 'none';
        });
        window.addEventListener("click", (event) => {
            if (event.target === modaleElement) { 
                modaleElement.style.display = "none";
            }
        });
        window.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                modaleElement.style.display = "none";
            }
        });
    }
}