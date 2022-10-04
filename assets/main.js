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