export function getMeteoData(ville) {
    const API_KEY_METEO = "ddb399aea97388640fc275e7b938f2b5";

    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${API_KEY_METEO}&units=metric`)
      .then(reponse => reponse.json());
}

export function updateMeteoUI(donnees) {
    const temperature = document.getElementById("temperature"); 
    const villeMeteo = document.getElementById("ville-meteo"); 
    const iconMeteo = document.getElementById("icon-meteo");
    
    if(donnees.cod === 200) {
        temperature.textContent = donnees.main.temp + " °C"; 
        villeMeteo.textContent = donnees.name;
        iconMeteo.src = `https://openweathermap.org/img/wn/${donnees.weather[0].icon}.png`;
    }
}