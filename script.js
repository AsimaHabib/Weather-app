const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; 
// GET your free key at https://openweathermap.org/api :contentReference[oaicite:1]{index=1}

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityNameEl = document.getElementById("cityName");
const tempEl = document.getElementById("temp");
const humidityEl = document.getElementById("humidity");
const weatherIconEl = document.getElementById("weatherIcon");
const weatherInfoDiv = document.querySelector(".weather-info");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  }
});

async function getWeather(city) {
  try {
    // API call with city name, metric units
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      showWeather(data);
    } else {
      alert("City not found!");
    }
  } catch (err) {
    console.log("Error fetching weather:", err);
  }
}

function showWeather(data) {
  cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
  tempEl.textContent = data.main.temp.toFixed(1);
  humidityEl.textContent = data.main.humidity;

  // Build icon URL from API response
  const iconCode = data.weather[0].icon;
  weatherIconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherIconEl.alt = data.weather[0].description;

  weatherInfoDiv.classList.remove("hidden");
}
