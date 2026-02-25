import { initTheme } from './theme.js';
import { getMeteoData, updateMeteoUI } from './meteo.js';
import { getPokemonData, updatePokemonUI } from './pokedex.js';
import { getFilmsData, updateFilmsUI, afficherSuggestions, masquerSuggestions} from './films.js';
import { preparerFermetureModale } from './ui.js';
/* Theme */
initTheme();

/* Liens actifs */
const pageActuelle = window.location.pathname;
const liensNav = document.querySelectorAll('nav a');

liensNav.forEach(lien => {
    const destination = lien.getAttribute('href');
    if (pageActuelle.includes(destination)) {
        lien.classList.add('actif');
    }
});

/* Fermeture modale */
const modaleProjets = document.getElementById("ma-modale");
if (modaleProjets) preparerFermetureModale(modaleProjets, ".croix-fermeture");

const modaleFilms = document.getElementById("modale-film");
if (modaleFilms) preparerFermetureModale(modaleFilms, ".croix-fermeture-modale");

/* Galerie */
let toutesLesCartes = document.querySelectorAll('.carte');
toutesLesCartes.forEach(carte => {
    carte.addEventListener('click', function() {
        let detail = this.querySelector('.details');
        detail.classList.toggle('affiche-details');
    });
});

/* Modale */
const cartes = document.querySelectorAll(".carte-projet");
const modale = document.getElementById("ma-modale");
const imageAgrandie = document.getElementById("image-agrandie");
const titreProjetModale = document.getElementById("titre-projet-modale");
const texteProjetModale = document.getElementById("texte-projet-modale");

cartes.forEach(carte => {
    carte.addEventListener('click', function() {
        modale.style.display = 'flex';
        imageAgrandie.src = carte.querySelector('img').src;
        titreProjetModale.textContent = carte.querySelector('h3').textContent;
        texteProjetModale.textContent = carte.querySelector('p').textContent;
    });
});

/* Météo */
const entreeVille = document.getElementById("entree-ville");
const meteoBouton = document.getElementById("meteo-bouton");
const resultatMeteo = document.getElementById("resultat-meteo");

function rechercherMeteo() {
    const ville = entreeVille.value.trim(); 
    resultatMeteo.style.display = 'flex'; 
    
    getMeteoData(ville)
      .then(donnees => updateMeteoUI(donnees)); 
}

if(entreeVille && meteoBouton) {
    entreeVille.addEventListener("keypress", function(event) {
        if(event.key === "Enter") {
            rechercherMeteo();
        }
    });
    meteoBouton.addEventListener("click", function() {
        rechercherMeteo();
    });
}

/* Pokédex */
const recherchePokemon = document.getElementById("recherche-pokemon");
const boutonPokedex = document.getElementById("bouton-pokedex");
const cartePokemon = document.getElementById("carte-pokemon");

function rechercherPokemon() {
    const nom = recherchePokemon.value.trim().toLowerCase();
    cartePokemon.style.display = 'flex';
    getPokemonData(nom)
    .then(donnees => updatePokemonUI(donnees));
}

if(recherchePokemon && boutonPokedex) {
    recherchePokemon.addEventListener("keypress", function(event) {
        if(event.key === "Enter") {
            rechercherPokemon();
        }
    });
    boutonPokedex.addEventListener("click", function() {
        rechercherPokemon();
    });
}

/* Films */
const rechercheFilms = document.getElementById("recherche-films");
const boutonFilms = document.getElementById("bouton-films");
const listeFilms = document.getElementById("liste-films");
const suggestions = document.getElementById("suggestions-box");
let horloge;
let dernierFetch = null;

function rechercherFilms() {
    const titre = rechercheFilms.value.trim();
    listeFilms.style.display = 'flex';
    getFilmsData(titre)
    .then(donnees => updateFilmsUI(donnees));
}

if(rechercheFilms && boutonFilms) {
    rechercheFilms.addEventListener("input", (e) => {
        const texteSaisi = e.target.value.trim();
        clearTimeout(horloge);
        if(texteSaisi.length <= 2) {
            masquerSuggestions();
            return;
        }
        horloge = setTimeout(() => {
            const termeRecherche = texteSaisi;
            dernierFetch = termeRecherche;
            getFilmsData(termeRecherche)
            .then(donnees => {
                if (dernierFetch !== termeRecherche) return;
                if (donnees.Search) {
                    afficherSuggestions(donnees.Search);
                } else {
                    masquerSuggestions();
                }
            });
        }, 400);
    });
    document.addEventListener("click", (e) => {
        const wrapper = suggestions.parentElement;
        if(wrapper && !wrapper.contains(e.target)) {
            masquerSuggestions();
        }
    });
    boutonFilms.addEventListener("click", function() {
        rechercherFilms();
    });
    rechercheFilms.addEventListener("keypress", function(event) {
        if(event.key === "Enter") {
            rechercherFilms();
        }
    });
}
