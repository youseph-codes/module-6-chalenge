const form = document.getElementById('city-form');
const cityHistory = [];

function fetchCity(city) {
    let APIKey = '0813b8808a10bc147fa8e0ea7d165313';
    let capacity = 1;

    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&=${capacity}&appid=${APIKey}`;

    fetch(url)
        .then((res) => {
            if (!res.ok) throw new Error(res.statusText);
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

    // Fetches the weather information (API call) along with location information
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

// Creates history list feature
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
        e.className = "container history-item form-input";
        e.innerHTML = `${city}`;
        e.type = 'submit';
        form.appendChild(e);
    }
}

// Loads search history
function loadPage(weatherInfo, city) {
    console.log(weatherInfo);
    let day = new Date;
    createHistory(city);
    loadDisplay(weatherInfo.current, day, city);
    loadCards(weatherInfo.daily, day);
};

// Displays current weather information
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

// Color coordinates UV index by warning/danger/safe 
function UVIndex(uvi) {
    // safe
    if (uvi < 3.3) {
        return "green";
    }
    // warning
    else if (uvi < 6.7) {
        return "yellow";
    }
    // danger
    else {
        return "red";
    }
}


// Displays information for 5-day forecast
function loadCards(dailyWeather, day) {
    for (let i = 1; i < 6; i++) {
        day.setDate(day.getDate() + 1);
        document.getElementById(i).innerHTML = `<div class="card-body">
        <h5 class="card-title">(${day.getMonth()}/${day.getDate()}/${day.getFullYear()})</h5>
        <img src="http://openweathermap.org/img/wn/${dailyWeather[i].weather[0].icon}@2x.png" style="height: 3em">
        <p class="card-text">Tempurature: ${dailyWeather[i].temp.day}°F</p>
        <p class="card-text">Wind Speed: ${dailyWeather[i].wind_speed}MPH</p>
        <p class="card-text">Humidity: ${dailyWeather[i].humidity}%</p>
        </div>`
    }
};

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (event.submitter.innerText != "Search") {
        fetchCity(event.submitter.innerText);
    }
    else {
        fetchCity(form.elements['city'].value);
    }
});
