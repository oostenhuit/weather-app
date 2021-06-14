function formatDate(date) {
  let weekday = date.getDay();
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = weekdays[weekday];

  return `${day} ${hour}:${minutes}`;
}
let timeset = document.querySelector(".date-time");
let now = new Date();
timeset.innerHTML = formatDate(now);

// function showCelsiusTemperature(event) {
//   event.preventDefault();
//   let celsiusH2 = document.querySelector("#temperature");
//   celsiusH2.innerHTML = "25";
//   celsiusLink.innerHTML = "<strong>°C</strong>";
//   fahrenheitLink.innerHTML = "°F";
// }
// function showFahrenheitTemperature(event) {
//   event.preventDefault();
//   let fahrenheitH2 = document.querySelector("#temperature");
//   fahrenheitH2.innerHTML = "77";
//   fahrenheitLink.innerHTML = "<strong>°F</strong>";
//   celsiusLink.innerHTML = "°C";
// }
// let celsiusLink = document.querySelector("#celsius-link");
// celsiusLink.addEventListener("click", showCelsiusTemperature);
// let fahrenheitLink = document.querySelector("#fahrenheit-link");
// fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let unit = "metric";
let apiKey = "a7de365924edf156fe268686a1a61738";

function showTemperature(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("h3").innerHTML = response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );
  document.querySelector("#max-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  ocument.querySelector("#min-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
}
function showCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
function getData(event) {
  event.preventDefault();
  let city = document.querySelector("#input-value").value;
  showCity(city);
}
let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", getData);

// by location
function showPositionData(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
function getLocationData(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPositionData);
}
let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getLocationData);

// default
showCity("Berlin");
