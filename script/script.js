let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let changeDate = document.querySelector("#date-change");
changeDate.innerHTML = `Last updated: ${day} ${hours}:${minutes}`;

function displayWeather(response) {
  console.log(response);
  let cityName = response.data.name;
  let countryName = response.data.sys.country;
  document.querySelector(
    "#city-name"
  ).innerHTML = `${cityName}, ${countryName}`;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-desc").innerHTML =
    response.data.weather[0].description;
}

function search(city) {
  let apiKey = "eca78134d1ed96b1b6068a57ba23b8ed";

  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function retrieveCityInfo(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", retrieveCityInfo);

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

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", getCurrentPosition);

search("Paris");
