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

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchCity(city);
}

function searchCity(city) {
  let unit = "metric";
  let apiKey = "6f578534f7bda58a70b66bd674c4d531";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemp);
}

function showTemp(response) {
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#pressure").innerHTML = Math.round(
    response.data.main.pressure
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#date").innerHTML = formatDate();
}

function getCurrentLoc() {
  function getPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "6f578534f7bda58a70b66bd674c4d531";
    let unit = "metric";
    let ApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

    axios.get(ApiUrl).then(showTemp);
  }

  navigator.geolocation.getCurrentPosition(getPosition);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentBtn = document.querySelector("#current");
currentBtn.addEventListener("click", getCurrentLoc);

searchCity("tehran");
