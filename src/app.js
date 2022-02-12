function formatDate(timestamp) {
  let date = new Date(timestamp);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function showForecast(response) {
  let forecast = response.data.daily;
  let weatherForecast = document.querySelector("#forecast");
  let forecastHTML = `<div class ="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col">
              <div class="days">${formatDay(forecastDay.dt)}</div>
              <img src="https://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt=${forecastDay.weather[0].description} />
              <div class="forecast-temperature">
                <span class="temperature-max">${Math.round(
                  forecastDay.temp.max
                )}°</span
                ><span class="temperature-min">${Math.round(
                  forecastDay.temp.min
                )}°</span>
              </div>
             </div>
             `;
    }
  });
  weatherForecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5c65b0445be84c47d8d9f65d36c11cc2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}
function showCurrentConditions(response) {
  let inputCity = document.querySelector("#city");
  let weatherIcon = document.querySelector("#icon");

  inputCity.innerHTML = response.data.name;

  document.querySelector("#current-date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document.querySelector("#weather-conditions").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "5c65b0445be84c47d8d9f65d36c11cc2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentConditions);
}
function handleSubmit(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#type-city");
  searchCity(inputCity.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

searchCity("London");
