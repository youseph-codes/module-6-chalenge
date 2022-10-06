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
        let queryURL = 
    }
}