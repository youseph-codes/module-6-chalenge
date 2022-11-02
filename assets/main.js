const form = document.getElementById('city-form');
const cityHistory = [];

function fetchCity(city) {
    let APIKey = '0813b8808a10bc147fa8e0ea7d165313';
    let capacity = 1;
    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&=${capacity}&appid=${APIKey}`;

    fetch(url)
    .then((res) => {
        if(!res.ok) throw new Error(res.statusText);
        return res.json();
    })
    .then((cityInfo) => {
        console.log(cityInfo);
        fetchWeather(cityInfo[0], cityInfo[0].local_names.en);
    })
    .catch(console.err);
};

function fetchWeather(cityInfo, city) {
    let latitude = cityInfo.lat;
    let longitude = cityInfo.lon;
    let APIKey = '0813b8808a10bc147fa8e0ea7d165313';
    let language = 'en';
    let units = 'imperial';
    let url = `http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${APIKey}&units=${units}&lang=${language}`;
}