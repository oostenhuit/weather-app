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
  return `${day} ${hour}:${minutes}`;
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = date.getDay();
  return days[day];
}

function changeBackground(iconName) {
  let backgroundClass = document.getElementById("background-color");
  if (iconName.includes("n")) {
    backgroundClass.classList.add(`background-night`);
  } else backgroundClass.classList.add(`background-${iconName}`);
}

function showForecast(response) {
  let forecast = response.data.daily;
  forecast.shift();
  let forecastElement = document.querySelector("#forecast-template");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-4 col-sm-2 forecast">
        <div id="weekday-forecast" class="weekday">${formatForecastDay(
          forecastDay.dt
        )}</div>
        <img src="images/frame.svg" alt="frame" class="frame"/>
        <div class="forecast-ul">
          <div><img id="icon-forecast" class="icon-forecast" src="images/${
            forecastDay.weather[0].icon
          }.svg" alt=${forecastDay.weather[0].description}"></div>
          <div><strong id="forecast-max-temp">${Math.round(
            forecastDay.temp.max
          )}</strong>°</div>
          <div><span id="forecast-min-temp">${Math.round(
            forecastDay.temp.min
          )}</span>°</div>
       </div>
      </div>`;
    } else {
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecastData(coordinates) {
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiKey = "a7de365924edf156fe268686a1a61738";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showTemperature(response) {
  let backgroundcheck = document.getElementById("background-color");
  backgroundcheck.removeAttribute("class");
  backgroundcheck.setAttribute("class", "wrapper");
  console.log(backgroundcheck);
  // backgroundcheck.removeAttribute(`class`);
  console.log(backgroundcheck);
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("h3").innerHTML = response.data.weather[0].description;
  document.querySelector("#update-time").innerHTML = formatDate(
    response.data.dt
  );
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

  let iconDisplay = document.querySelector("#icon");
  iconDisplay.setAttribute(
    `src`,
    `images/${response.data.weather[0].icon}.svg`
  );
  iconDisplay.setAttribute(`alt`, `response.data.weather[0].description`);

  getForecastData(response.data.coord);
  changeBackground(response.data.weather[0].icon);
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
