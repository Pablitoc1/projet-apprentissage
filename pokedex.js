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

export function getPokemonData(nom) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${nom}`)
      .then(reponse => reponse.json())
}

export function updatePokemonUI(donnees) {
    const cartePokemon = document.getElementById("carte-pokemon");
    const nomPokemon = document.getElementById("nom-pokemon");
    const imagePokemon = document.getElementById("image-pokemon");
    const typesPokemon = document.getElementById("types-pokemon");
    const statsPokemon = document.getElementById("stats-pokemon");
    const typePrincipalPokemon = donnees.types[0].type.name
    const couleur = couleursTypes[typePrincipalPokemon];
    nomPokemon.textContent = donnees.name;
    imagePokemon.src = donnees.sprites.front_default;
    typesPokemon.innerHTML ="";
    donnees.types.forEach(type => {
        const typeElement = document.createElement("span");
        typeElement.classList.add("type");
        typeElement.textContent = type.type.name;
        typesPokemon.appendChild(typeElement);
    });
    cartePokemon.style.backgroundColor = couleur;
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
}
