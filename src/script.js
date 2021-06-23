function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
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
  document.querySelector(
    "#update-time"
  ).innerHTML = `${day} ${hour}:${minutes}`;
}
function showForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = date.getDay();
  let weekday = days[day];
  console.log(weekday);
  document.querySelector("#weekday-forecast").innerHTML = weekday;
  createForecast();
}

function showForecast(response, weekday) {
  document.querySelector("#forecast-max-temp").innerHTML = Math.round(
    response.data.daily[1].temp.max
  );
  document.querySelector("#forecast-min-temp").innerHTML = Math.round(
    response.data.daily[1].temp.min
  );
  let iconNameForecast = response.data.daily[1].weather[0].icon;
  let iconNameAlt = response.data.daily[1].weather[0].icon;
  let forecastDay = response.data.daily[1].dt;
  changeIconName(iconNameForecast, iconNameAlt);
  showForecastDay(forecastDay);
}

function callForecastURL(lat, lon) {
  let apiKey = "a7de365924edf156fe268686a1a61738";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showForecast);
}
function changeIconName(name, alt) {
  let newIconName = name.slice(0, 2);
  let iconChange = document.getElementById("icon");
  iconChange.setAttribute(`src`, `images/${newIconName}.svg`);
  iconChange.setAttribute(`alt`, `${alt}`);
  let iconChangeForecast = document.getElementById("icon-forecast");
  iconChangeForecast.setAttribute(`src`, `images/${newIconName}.svg`);
  iconChangeForecast.setAttribute(`alt`, `${alt}`);
}

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
  document.querySelector("#min-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  let iconName = response.data.weather[0].icon;
  let iconAlt = response.data.weather[0].description;
  let latitude = response.data.coord.lat;
  let longitude = response.data.coord.lon;
  changeIconName(iconName, iconAlt);
  formatDate(response.data.dt);
  callForecastURL(latitude, longitude);
}

function showCity(city) {
  let apiKey = "a7de365924edf156fe268686a1a61738";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
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
  let apiKey = "a7de365924edf156fe268686a1a61738";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function getLocationData(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPositionData);
}
let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getLocationData);

// default
showCity("Berlin");
