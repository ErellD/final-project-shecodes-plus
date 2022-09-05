function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  return `Last updated: ${day} ${hours}:${minutes}`;
}

function retrieveCityInfo(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function formatDayForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `      
          <div class="col-2">
<div class="weather-forecast-date">${formatDayForecast(forecastDay.dt)}
</div>
<img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="">
<div class="weather-forecast-temperature">
  <span class="weather-forecast-temp-max">${Math.round(
    forecastDay.temp.max
  )}°</span>
   <span class="weather-forecast-temp-min">${Math.round(
     forecastDay.temp.min
   )}°</span>
</div>
          </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function displayWeather(response) {
  let cityName = response.data.name;
  let countryName = response.data.sys.country;
  document.querySelector(
    "#city-name"
  ).innerHTML = `${cityName}, ${countryName}`;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-desc").innerHTML =
    response.data.weather[0].description;
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let dateElement = document.querySelector("#date-change");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "eca78134d1ed96b1b6068a57ba23b8ed";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function showLocation(position) {
  let apiKey = "eca78134d1ed96b1b6068a57ba23b8ed";
  let long = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiUrl = ` https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", retrieveCityInfo);

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("submit", getCurrentPosition);

search("Paris");
