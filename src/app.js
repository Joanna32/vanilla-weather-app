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
function showForecast() {
  let weatherForecast = document.querySelector("#forecast");
  let forecastHTML = `<div class ="row">`;
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
            <div class="col">
              <div class="days">${day}</div>
              <img src="images/cloudy.png" alt="cloudy" />
              <div class="forecast-temperature">
                <span class="temperature-max">20°</span
                ><span class="temperature-min">15°</span>
              </div>
             </div>
             `;
  });
  weatherForecast.innerHTML = forecastHTML;
}

function showCurrentConditions(response) {
  let inputCity = document.querySelector("#city");
  let weatherIcon = document.querySelector("#icon");

  inputCity.innerHTML = response.data.name;
  celsiusTemp = response.data.main.temp;

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
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
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

function showFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperature = document.querySelector("#current-temp");
  let fahrenheitTemperature = Math.round((celsiusTemp * 9) / 5 + 32);
  temperature.innerHTML = fahrenheitTemperature;
}
function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperature = document.querySelector("#current-temp");
  temperature.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-mark");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-mark");
celsiusLink.addEventListener("click", showCelsiusTemperature);

searchCity("Dublin");
showForecast();
