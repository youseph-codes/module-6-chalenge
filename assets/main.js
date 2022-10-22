// create functions and variables to collect city inputs and target API calls
const form = document.getElementById('city-form');
const history = [];


// API call information
let APIKey = "0813b8808a10bc147fa8e0ea7d165313";
let cap = 1;
let APILink = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&=${cap}&appid=${APIKey}`;

