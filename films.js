const API_KEY_FILMS = "425a00cc";
const modaleFilm = document.getElementById("modale-film");
const suggestions = document.getElementById("suggestions-box");
const rechercheFilms = document.getElementById("recherche-films");

/* Recherche de films */
export function getFilmsData(titre) {
    return fetch(`https://www.omdbapi.com/?apikey=${API_KEY_FILMS}&s=${encodeURIComponent(titre)}`)
      .then(reponse => reponse.json())
}

export function updateFilmsUI(donnees) {
    const listeFilms = document.getElementById("liste-films");
    listeFilms.innerHTML = "";
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
            carteFilm.addEventListener("click", function() {
                getFilmDetails(film.imdbID)
                .then(filmDetails => updateFilmDetailsUI(filmDetails));
            });
        });
    } else {
        alert("Aucun film trouvé");
    }
}


/* Détails du film */
export function getFilmDetails(imdbID) {
    return fetch(`https://www.omdbapi.com/?apikey=${API_KEY_FILMS}&i=${imdbID}&plot=full`)
      .then(reponse => reponse.json())
}

export function updateFilmDetailsUI(filmDetails) {
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
}

/* Suggestions de films */
export function afficherSuggestions(films) {
    if (!suggestions) return;
    suggestions.innerHTML = "";
    if (!films || films.length === 0) {
        suggestions.style.display = "none";
        return;
    }
    films.forEach(film => {
        const item = document.createElement("div");
        item.classList.add("suggestion-item");
        item.textContent = film.Title;

        item.addEventListener("click", (e) => {
            e.stopPropagation();
            rechercheFilms.value = film.Title;
            masquerSuggestions();
            getFilmsData(film.Title)
            .then(donnees => updateFilmsUI(donnees))
        });
        suggestions.appendChild(item);
    });
    suggestions.style.display = "block";
}

export function masquerSuggestions() {
    if (suggestions) {
        suggestions.innerHTML = "";
        suggestions.style.display = "none";
    }
}