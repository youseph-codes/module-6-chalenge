// create functions and variables to collect city inputs and target API calls.
const form = document.getElementById('city-form');
const history = [];

// API call information
let APIKey = "0813b8808a10bc147fa8e0ea7d165313";
let cap = 1;
let APILink = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&=${cap}&appid=${APIKey}`;

function fetchCity(city) {
    fetch(APILink).then((res) => {
        if(!res.ok)
        throw new Error(res.statusText);
        return res.json();
    })
    .then((cityInformation) => {
        console.log(cityInformation);
        fetchWeather(cityInformation[0], cityInformation[0].local_names.en);
    })
    .catch(console.err);
};

// create variables + API call for location and other info [lat/lon, measurement, language].
function fetchWeather(cityInformation, city) {
    // variable listing for function:
    let lat = cityInformation.lat;
    let lon = cityInformation.lon;
    let units = "imperial";
    let lang = "en";
    let APILink = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}$${lon}&appid=${APIKey}&units=${units}&lang=${lang}`;

    // fetches weather and location info.
    fetch(APILink).then((res) => {
        if(!res.ok)
        throw new Error(res.statusText);
        return res.json();
    })
    .then((weatherInformation) => {
        loadPage(weatherInformation, city);
    })
    .catch(console.err);
};

// create search history list
function createHistory(city) {
    let historyList = false;
    cityHistory.forEach(city => {
        if(city == city) {
            historyList = true;
        }
    });

    console.log(historyList);
}