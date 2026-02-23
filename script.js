let bouton = document.getElementById("mode-sombre");

bouton.addEventListener("click", function() {
    document.body.classList.toggle("mode-sombre");
});

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

/* Citation */
const nouvelleCitationBouton = document.getElementById("nouvelle-citation-bouton");
const textCitation = document.getElementById("text-citation");
const auteurCitation = document.getElementById("auteur-citation");

function obtenirCitation() {
    fetch("https://dummyjson.com/quotes/random")
      .then(reponse => reponse.json()) // On transforme le "colis" en format lisible (JSON)
      .then(donnees => {
          textCitation.textContent = donnees.quote;
          auteurCitation.textContent = donnees.author;
      });
}
if(nouvelleCitationBouton) {
    nouvelleCitationBouton.addEventListener("click", obtenirCitation);
}


/* Météo */
const entreeVille = document.getElementById("entree-ville");
const meteoBouton = document.getElementById("meteo-bouton");
const resultatMeteo = document.getElementById("resultat-meteo");
const temperature = document.getElementById("temperature");
const villeMeteo = document.getElementById("ville-meteo");
const iconMeteo = document.getElementById("icon-meteo");
const API_KEY_METEO = "ddb399aea97388640fc275e7b938f2b5";

function obtenirMeteo(ville) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${API_KEY_METEO}&units=metric`)
      .then(reponse => reponse.json())
      .then(donnees => {
        if(donnees.cod === 200) {
            temperature.textContent = donnees.main.temp+ " °C";
            villeMeteo.textContent = donnees.name;
            iconMeteo.src = `https://openweathermap.org/img/wn/${donnees.weather[0].icon}.png`;
        } else {
            alert("Erreur: " + donnees.message);
        }
      });
}

if(entreeVille) {
entreeVille.addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        resultatMeteo.style.display = 'flex';
        obtenirMeteo(entreeVille.value);
    }
    });
    meteoBouton.addEventListener("click", function() {
        resultatMeteo.style.display = 'flex';
        obtenirMeteo(entreeVille.value);
    });
}

/* Pokédex */
const recherchePokemon = document.getElementById("recherche-pokemon");
const boutonPokedex = document.getElementById("bouton-pokedex");
const cartePokemon = document.getElementById("carte-pokemon");
const nomPokemon = document.getElementById("nom-pokemon");
const imagePokemon = document.getElementById("image-pokemon");
const typesPokemon = document.getElementById("types-pokemon");
const statsPokemon = document.getElementById("stats-pokemon");
const couleursTypes = {
    fire: "#FF421C",
    water: "#2980ef",
    grass: "#3fa129",
    electric: "#fac000",
    psychic: "#ef4179",
    ice: "#74cfaf",
    dragon: "#5060e1",
    dark: "#624d4e",
    fairy: "#ef70ef",
    normal: "#919aa2"
};


function obtenirPokemon(nom) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${nom}`)
      .then(reponse => reponse.json())
      .then(donnees => {
        nomPokemon.textContent = donnees.name;
        imagePokemon.src = donnees.sprites.front_default;
        typesPokemon.innerHTML ="";
        donnees.types.forEach(type => {
            const typeElement = document.createElement("span");
            typeElement.classList.add("type");
            typeElement.textContent = type.type.name;
            typesPokemon.appendChild(typeElement);
            const typePrincipalPokemon = donnees.types[0].type.name
            if (couleursTypes[typePrincipalPokemon]) {
                const couleur = couleursTypes[typePrincipalPokemon];
                cartePokemon.style.backgroundColor = couleur;
            }

        });
        statsPokemon.innerHTML ="";
        donnees.stats.forEach(stat => {
            const ligneStats = document.createElement("div");
            const statElement = document.createElement("span");
            const barreStats = document.createElement("progress");
            barreStats.value = stat.base_stat;
            barreStats.max = 255;
            statElement.classList.add("stat");
            statElement.textContent = stat.stat.name;
            ligneStats.appendChild(statElement);
            ligneStats.appendChild(barreStats);
            statsPokemon.appendChild(ligneStats);
        });
      })
      .catch(erreur => {
        alert("Erreur: " + erreur);
      });
}

function lancerRecherche() {
    const nomsaisi = recherchePokemon.value.toLowerCase();
    cartePokemon.style.display = 'flex';
    obtenirPokemon(nomsaisi);
}
if(recherchePokemon) {
    recherchePokemon.addEventListener("keypress", function(event) {
        if(event.key === "Enter") {
            lancerRecherche();
        }
    });
    boutonPokedex.addEventListener("click", function() {
        lancerRecherche();
    });
}