function initial() {
    const cityEl = document.getElementById("city-input");
    const clearEl = document.getElementById("clear");
    const searchEl = document.getElementById("search-button");
    const nameEl = document.getElementById("city-name");
    const currentWeatherIconEl = document.getElementById("current-weather-icon");
    const currentTempEl = document.getElementById("tempurature");
    const currentHumidityEl = document.getElementById("humidity");
    const currentWindEl = document.getElementById("wind-speed");
    const currentUVEl = document.getElementById("UV-index");
    const historyEl = document.getElementById("history");
    var fiveDayForecastEl = document.getElementById("forecast");
    var todayweatherEl = document.getElementById("current-weather");
    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

    const APIKey = "0813b8808a10bc147fa8e0ea7d165313";

    function getWeather(city) {
        let queryURL = "api.openweathermap.org/data/2.5/forecast?lat=" + city + "&appid=" + APIkey;
        axious.get(queryURL)
        .then(function(response) {

            todayweatherEl.classList.remove("d-none");

            const currentDate = new Date(response.data.dt * 1000);
            const day = currentDate.getDate();
            const month = currentDate.getMonth();
            const year = currentDate.getFullYear();

            nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";

            let weatherIcon = response.data.weather[0].icon;
            currentWeatherIconEl.setAttribute("src", "/" + weatherIcon + "@2x.png");
            currentWeatherIconEl.setAttribute("alt", response.data.weather[0].description);
            currentTempEl.innerHTML = "Tempurature: " + k2f(response.data.main.temp) + " &#176F";
            currentHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
            currentWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";

            let latitude = response.data.coord.lat;
            let longitude = response.data.coord.lon;
            let UVQueryURL = "api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey;
            axious.get(UVQueryURL)
            .then(function(response) {
                let UVIndex = document.createElement("span");
                if (response.data[0].value < 4) {
                    UVIndex.setAttribute("class", "badge bg-success");
                }
                else if (response.data[0].value < 8) {
                    UVIndex.setAttribute("class", "badge bg-warning");
                }
                else {
                    UVIndex.setAttribute("class", "badge bg-danger");
                }
                console.log(response.data[0].value)
                UVIndex.innerHTML = response.data[0].value;
                currentUVEl.innerHTML = "UV Index: ";
                currentUVEl.append(UVIndex);
            });

            let cityID = response.data.id;
            let forecastQueryURL = "api.openweathermap.org/data/2.5/forecast?q=" + cityID + "&appid=" + APIKey;
            axious.get(forecastQueryURL)
            .then(function(response) {
                fiveDayForecastEl.classList.remove("d-none");

                const forecastEl = document.querySelectorAll(".forecast");
                for (i = 0; i < forecastEl.length; i++) {
                    forecastEl[i].innerHTML = "";
                    const forecastIndex = i * 8 + 4;
                    const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
                    const forecastDay = forecastDate.getDate();
                    const forecastMonth = forecastDate.getMonth() + 1;
                    const forecastYear = forecastDate.getFullYear();
                    const forecastDateEl = document.createElement("p");
                    forecastDateEl.setAttribute("class", forecast-date);
                    forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                    forecastEl[i].append(forecastDateEl);

                    const forecastWeatherEl = document.createElement("img");
                    forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
                    forecastWeatherEl.setAttribute("alt", response.data.list[forecastIndex].weather[0].description);
                    forecastEl[i].append(forecastWeatherEl);
                    const forecastTempEl = document.createElement("p");
                    forecastTempEl.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
                    forecastEl[i].append(forecastTempEl);
                    const forecastHumidityEl = document.createElement("p");
                    forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
                    forecastEl[i].append(forecastHumidityEl);
                }
            })
        });
    }

    searchEl.addEventListener("click", function () {
        const searchTerm = cityEl.value;
        getWeather(searchTerm);
        searchHistory.push(searchTerm);
        localStorage.setItem("search", JSON.stringify(searchHistory));
        renderSearchHistory();
    })

    // Clear History button event listener
    // Search history is cleared from the page when this button is clicked.

    clearEl.addEventListener("click", function () {
        localStorage.clear();
        searchHistory = [];
        renderSearchHistory();
    })

    function k2f(K) {
        return Math.floor((K - 273.15) * 1.8 + 32);
    }

    // A history of cities searched by the user renders on the page.

    function renderSearchHistory() {
        historyEl.innerHTML = "";
        for (let i = 0; i < searchHistory.length; i++) {
            const historyItem = document.createElement("input");
            historyItem.setAttribute("type", "text");
            historyItem.setAttribute("readonly", true);
            historyItem.setAttribute("class", "form-control d-block bg-white");
            historyItem.setAttribute("value", searchHistory[i]);
            historyItem.addEventListener("click", function () {
                getWeather(historyItem.value);
            })
            historyEl.append(historyItem);
        }
    }

    // Sets a condition for when to render the search history.

    renderSearchHistory();
    if (searchHistory.length > 0) {
        getWeather(searchHistory[searchHistory.length - 1]);
    }
}

initial();