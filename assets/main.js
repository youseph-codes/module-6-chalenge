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
            let UVQueryURL = "api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
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

            
        })
    }
}