// display main time and date

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
  let days =
    days[
      ("Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday")
    ];
  let day = days[now.getDay()];
  return `Last updated: ${day} ${hours}:${minutes}`;
}
// set city search
function retrieveCityInfo(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

// search engine
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

// Define current position of the user
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", retrieveCityInfo);

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("submit", getCurrentPosition);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

search("Paris");
