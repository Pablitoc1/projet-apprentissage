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

const cartes = document.querySelectorAll(".carte-projet");
const modale = document.getElementById("ma-modale");
const imageAgrandie = document.getElementById("image-agrandie");
const titreProjetModale = document.getElementById("titre-projet-modale");
const texteProjetModale = document.getElementById("texte-projet-modale");

cartes.forEach(carte => {
    // C'est ici qu'on va ajouter l'événement de clic
    carte.addEventListener('click', function() {
        modale.style.display = 'flex';
        imageAgrandie.src = carte.querySelector('img').src;
        titreProjetModale.textContent = carte.querySelector('h3').textContent;
        texteProjetModale.textContent = carte.querySelector('p').textContent;
    });
});

const croixFermeture = document.querySelector(".croix-fermeture");
if(croixFermeture) {
    croixFermeture.addEventListener("click", function() {
        modale.style.display = 'none';
    });
}

const pageActuelle = window.location.pathname;
const liensNav = document.querySelectorAll('nav a');

liensNav.forEach(lien => {
    const destination = lien.getAttribute('href');
    if (pageActuelle.includes(destination)) {
        lien.classList.add('actif');
    }
});