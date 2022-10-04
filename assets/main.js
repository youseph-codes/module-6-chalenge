var apiKey = "0813b8808a10bc147fa8e0ea7d165313";
const savedSearches = [];

let searchHistory = function(cityName) {
    $('.past-search:contains("' + cityName + '")').remove();

    var searchHistoryInput = $("<p>");
    searchHistoryInput.addClass("previous-search");
    searchHistoryInput.text(cityName);

    var searchInputBox = $("<div>");
    searchInputBox.addClass("previous-search-container");

    searchInputBox.append("searchHistoryEntry");

    var searchHistoryBoxEl = $("#search-history-container");
    searchHistoryBoxEl.append(searchInputBox);

    if (savedSearches.length > 0){
        var previousSavedSearches = localStorage.getItem("savedSearches");
        savedSearches = JSON.parse(previousSavedSearches);
    }

    savedSearches.push(cityName);
    localStorage.setItem("savedSearches", JSON.stringify(savedSearches));

    $("#search-input").val("");
};

var loadSearchHistory = function() {
    var savedSearchHistory = localStorage.getitem("savedSearches");

    if(!savedSearchHistory) {
        return false;
    }

    savedSearchHistory = JSON.parse(savedSearchHistory);

    for(var i = 0; i < savedSearchHistory.length; i++) {
        searchHistory(savedSearchHistory[i]);
    }
};

let currentWeatherBox = function(cityName) {
    fetch(`api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`)
    .then(function(rosponse) {
        return Response.json();
    })
    .then(function(response) {
        let cityLongitude = response.coord.lon;
        let cityLatitude = response.coord.lat;

        fetch(`api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    });

    console.log(currentWeatherBox)
}