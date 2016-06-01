//GET JSON with latitude and longitude
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://weathersync.herokuapp.com/ip", false);
xhr.send();

//parse through JSON string and assign latitude and longitude to variables
var res = JSON.parse(xhr.response);
var lat = res.location.latitude;
var lon = res.location.longitude;

//use latitude and longitude to get weather info for area
var weatherUrl = 'https://weathersync.herokuapp.com/weather/'+lat+','+lon;
xhr.open("GET", weatherUrl, false);
xhr.send();

//parse JSON string and assign necessary data to appropriate variables
var weatherResponse = JSON.parse(xhr.response);
var kelvinToFahrenheit = function(degreesKelvin) {
	return degreesKelvin*9/5-459.67;
}
var temperature = kelvinToFahrenheit(weatherResponse.main.temp);
var weatherConditions = weatherResponse.weather[0].description;
var city = weatherResponse.name;

//put together url for icon
var iconProperty = weatherResponse.weather[0].icon;
var iconUrl = 'http://openweathermap.org/img/w/'+iconProperty+'.png';

//insert data into appropriate DOM elements
document.getElementById("city").innerHTML = city;
document.getElementById("temperature").innerHTML = Math.round(temperature);
document.getElementById("icon").src = iconUrl;
document.getElementById("description").innerHTML = weatherConditions.toUpperCase();