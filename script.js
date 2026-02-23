let bouton = document.getElementById("mode-sombre");

bouton.addEventListener("click", function() {
    document.body.classList.toggle("mode-sombre");
});

// On sélectionne toutes les cartes
let toutesLesCartes = document.querySelectorAll('.carte');

// Pour chaque carte, on écoute le clic
toutesLesCartes.forEach(carte => {
    carte.addEventListener('click', function() {
        // On cherche le paragraphe 'details' à l'intérieur de CETTE carte
        let detail = this.querySelector('.details');
        // On alterne l'affichage
        detail.classList.toggle('affiche-details');
    });
});