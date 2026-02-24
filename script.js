const themeBtn = document.getElementById('theme-toggle');
const root = document.documentElement; // même élément que le script inline dans le HTML

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        root.classList.toggle('dark-mode');

        if (root.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
}

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
    window.addEventListener("click", (event) => {
        if (event.target === modale) { 
            modale.style.display = "none";
        }
    });
    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            modale.style.display = "none";
        }
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
        /* Nom */
        nomPokemon.textContent = donnees.name;
        /* Image */
        imagePokemon.src = donnees.sprites.front_default;
        /* Types */
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
        /* Stats */
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

function lancerRecherchePokemon() {
    const nomsaisi = recherchePokemon.value.toLowerCase();
    cartePokemon.style.display = 'flex';
    obtenirPokemon(nomsaisi);
}
if(recherchePokemon) {
    recherchePokemon.addEventListener("keypress", function(event) {
        if(event.key === "Enter") {
            lancerRecherchePokemon();
        }
    });
    boutonPokedex.addEventListener("click", function() {
        lancerRecherchePokemon();
    });
}

/* Films */
const rechercheFilms = document.getElementById("recherche-films");
const boutonFilms = document.getElementById("bouton-films");
const listeFilms = document.getElementById("liste-films");
const modaleFilm = document.getElementById("modale-film");
const API_KEY_FILMS = "425a00cc";

function obtenirFilms(titre) {
    listeFilms.innerHTML = "";
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY_FILMS}&s=${encodeURIComponent(titre)}`)
      .then(reponse => reponse.json())
      .then(donnees => {
        if(donnees.Search) {
            donnees.Search.forEach(film => {
            const carteFilm = document.createElement("div");
            const imageAffiche = film.Poster !== "N/A" ? film.Poster : "https://picsum.photos/400/300?random=7";
            carteFilm.classList.add("carte-film");
            carteFilm.innerHTML = `
                <img src="${imageAffiche}" alt="${film.Title}">
                <h3>${film.Title}</h3>
            `;
            listeFilms.appendChild(carteFilm);
            /* Obtenir les détails du film */
            carteFilm.addEventListener("click", function() {
                obtenirDetailsFilm(film.imdbID);
            });
            }); 
        } else {
            alert("Aucun film trouvé");
        }

      });
}

let horloge;
let dernierFetch = null; // pour ignorer les réponses en retard (race condition)
const box = document.getElementById('suggestions-box');

if (rechercheFilms && box) {
    rechercheFilms.addEventListener('input', (e) => {
        const texteSaisi = e.target.value.trim();

        clearTimeout(horloge);

        if (texteSaisi.length <= 2) {
            masquerSuggestions();
            return;
        }

        horloge = setTimeout(() => {
            const termeRecherche = texteSaisi;
            dernierFetch = termeRecherche;

            fetch(`https://www.omdbapi.com/?apikey=${API_KEY_FILMS}&s=${encodeURIComponent(termeRecherche)}`)
                .then(reponse => reponse.json())
                .then(donnees => {
                    if (dernierFetch !== termeRecherche) return;
                    if (donnees.Search) {
                        afficherSuggestions(donnees.Search);
                    } else {
                        masquerSuggestions();
                    }
                })
                .catch(() => {
                    if (dernierFetch === termeRecherche) masquerSuggestions();
                });
        }, 400);
    });

    document.addEventListener('click', (e) => {
        const wrapper = box.parentElement;
        if (wrapper && !wrapper.contains(e.target)) {
            masquerSuggestions();
        }
    });
}

function masquerSuggestions() {
    if (box) {
        box.innerHTML = "";
        box.style.display = "none";
    }
}

function afficherSuggestions(films) {
    if (!box) return;
    box.innerHTML = "";
    if (!films || films.length === 0) {
        box.style.display = "none";
        return;
    }
    films.forEach(film => {
        const item = document.createElement('div');
        item.classList.add('suggestion-item');
        item.textContent = film.Title;

        item.addEventListener('click', (e) => {
            e.stopPropagation();
            rechercheFilms.value = film.Title;
            masquerSuggestions();
            lancerRechercheFilms();
        });

        box.appendChild(item);
    });
    box.style.display = "block";
}



function lancerRechercheFilms() {
    masquerSuggestions();
    const titresaisi = rechercheFilms.value;
    listeFilms.style.display = 'flex';
    obtenirFilms(titresaisi);
}
if(rechercheFilms) {
    rechercheFilms.addEventListener("keypress", function(event) {
        if(event.key === "Enter") {
            lancerRechercheFilms();
        }
    });
    boutonFilms.addEventListener("click", function() {
        lancerRechercheFilms();
    });
}

function obtenirDetailsFilm(imdbID) {
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY_FILMS}&i=${imdbID}&plot=full`)
      .then(reponse => reponse.json())
      .then(filmDetails => {
        const corps = document.getElementById("details-corps");
        const noteNum = parseFloat(filmDetails.imdbRating);
        const pourcentageEtoiles = (noteNum / 10) * 100;
        corps.innerHTML = `
        <div id="details-texte">
            <h2>${filmDetails.Title} (${filmDetails.Year})</h2>

            <div class="rating-container">
            <div class="stars-outer">
                <div class="stars-inner" style="width: ${pourcentageEtoiles}%"></div>
            </div>
            <span>${filmDetails.imdbRating}/10</span>
        </div>

            <p><strong>Réalisateur :</strong> ${filmDetails.Director}</p>
            <p><strong>Acteurs :</strong> ${filmDetails.Actors}</p>
            <p><strong>Genre :</strong> ${filmDetails.Genre}</p>
            <p><strong>Résumé :</strong> ${filmDetails.Plot}</p>
        </div>
        <img src="${filmDetails.Poster !== 'N/A' ? filmDetails.Poster : 'https://picsum.photos/400/300?random=7'}" alt="Affiche">
        `;
            modaleFilm.style.display = "block";
        });
}

function genererEtoiles(note) {
    const noteSurCinq = Math.round(note / 2); 
    let etoiles = "";
    
    for (let i = 1; i <= 5; i++) {
        if (i <= noteSurCinq) {
            etoiles += "⭐"; 
        } else {
            etoiles += "☆";
        }
    }
    return etoiles;
}


const croixFermetureModale = document.querySelector(".croix-fermeture-modale");
if(croixFermetureModale) {
    croixFermetureModale.addEventListener("click", function() {
        modaleFilm.style.display = 'none';
    });
    window.addEventListener("click", (event) => {
        if (event.target === modaleFilm) { 
            modaleFilm.style.display = "none";
        }
    });
    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            modaleFilm.style.display = "none";
        }
    });
}