function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "6f578534f7bda58a70b66bd674c4d531";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function showTemp(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  celsiusTemp = response.data.main.temp;
  tempElement.innerHTML = Math.round(celsiusTemp);
  let icon = document.querySelector("#icon");
  icon.setAttribute("alt", response.data.weather[0].description);
  if (response.data.weather[0].main === "Clear") {
    icon.setAttribute("src", "media/clear-day.png");
  } else if (response.data.weather[0].main === "Clouds") {
    icon.setAttribute("src", "media/clouds-day.png");
  } else if (response.data.weather[0].main === "Snow") {
    icon.setAttribute("src", "media/Snow.png");
  } else if (
    response.data.weather[0].main === "Rain" ||
    response.data.weather[0].main === "Drizzle"
  ) {
    icon.setAttribute("src", "media/rain.png");
  } else if (response.data.weather[0].main === "Thunderstorm") {
    icon.setAttribute("src", "media/thunderstorm.png");
  } else {
    icon.setAttribute("src", "media/wind.png");
  }
  document.querySelector("#date").innerHTML = formatDate();
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#feels").innerHTML = Math.round(
    response.data.main.feels_like
  );
  feelsTemp = Math.round(response.data.main.feels_like);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  getForecast(response.data.coord);
}

function formatDate() {
  let date = new Date();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
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
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function getCurrentLoc() {
  function getPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "6f578534f7bda58a70b66bd674c4d531";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemp);
  }

  navigator.geolocation.getCurrentPosition(getPosition);
}

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemp);
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
  let feelsElement = document.querySelector("#feels");
  let feelsF = (feelsTemp * 9) / 5 + 32;
  feelsElement.innerHTML = Math.round(feelsF);
}

function showCelsius(event) {
  event.preventDefault();
  tempElement.innerHTML = Math.round(celsiusTemp);
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
  let feelsElement = document.querySelector("#feels");
  feelsElement.innerHTML = feelsTemp;
}

function getForecast(coordinates) {
  let apiKey = "1266ad07b66517497b1acf79ea5a6a64";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = `<div class="row forecast">`;
  forecast.forEach(function (days, index) {
    if (index < 5) {
      forecastHtml += `<div class="forecast-days col-2">
           <img src="http://openweathermap.org/img/wn/${
             days.weather[0].icon
           }.png" alt="icon" />
            <div class="day">${formatDay(days.dt)}</div>
            <span id="forecast-max">${Math.round(days.temp.max)}°</span>
           <span class="min" id="forecast-min">${Math.round(
             days.temp.min
           )}°</span>
        </div>`;
    }
  });
  forecastHtml += `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentBtn = document.querySelector("#current");
currentBtn.addEventListener("click", getCurrentLoc);

let tempElement = document.querySelector("#temp");

let celsiusTemp = null;
let feelsTemp = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);

searchCity("tehran");
