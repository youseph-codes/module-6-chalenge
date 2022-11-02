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

function createHistory(city) {
    let historyList = false;
    cityHistory.forEach(city => {
        if (city == city) {
            historyList = true;
        };
    });

    console.log(historyList);
    if (!historyList) {
        cityHistory.push(city);
        const e = document.createElement('button');
        e.className = 'container history-item for-input';
        e.innerHTML = `${city}`;
        e.type = 'submit';
        form.appendChild(e);
    }
}

function loadPage(weatherInfo, city) {
    console.log(weatherInfo);
    let day = new Date;
    createHistory(city);
    loadDisplay(weatherInfo.current, day, city);
    loadCards(weatherInfo.daily, day);
};

function fetchWeather(cityInfo, city) {
    let latitude = cityInfo.lat;
    let longitude = cityInfo.lon;
    let APIKey = '0813b8808a10bc147fa8e0ea7d165313';
    let language = 'en';
    let units = 'imperial';
    let url = `http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${APIKey}&units=${units}&lang=${language}`;

    fetch(url)
    .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
    })
    .then((weatherInfo) => {
        loadPage(weatherInfo, city);
    })
    .catch(console.err);
};

function loadDisplay(currentWeather, day, city) {
    let display = document.getElementById('current-weather');
    display.innerHTML = `<div class="card-body">
    <h2 class="card-title">${city} (${day.getMonth()}/${day.getDate()}/${day.getFullYear()})
    <img src="http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png"></h2>
    <p class="card-text">Tempurature: ${currentWeather.temp}°F</p>
    <p class="card-text">Wind Speed: ${currentWeather.wind_speed}MPH</p>
    <p class="card-text">Humidity: ${currentWeather.humidity}%</p>
    <p class="card-text">UV Index: <b class="uvi ${UVIndex(currentWeather.uvi)}">${currentWeather.uvi}</b></p>
    </div>`
};