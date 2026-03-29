const apiKey = "b3cb30ff25b48c1863175aa64f914bd3";
const searchBtn = document.querySelector(".search-form__btn");
const searchInput = document.querySelector(".search-form__input");
const weatherContainer = document.getElementById("weather-container");

function showMessage(message, isError = false) {
  const colorStyle = isError ? "color: #ffb3b3;" : "";
  weatherContainer.innerHTML = `<p style="text-align: center; ${colorStyle}">${message}</p>`;
}

function createWeatherCard(data) {
  const temp = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  return `
    <article class="weather-card">
      <h2 class="weather-card__city">${data.name}</h2>
      <div class="weather-card__main">
        <div class="weather-card__temp">${temp}°C</div>
      </div>
      <p class="weather-card__desc">${description}</p>
      <div class="weather-card__details">
        <span class="weather-card__detail-item">Вологість: ${humidity}%</span>
        <span class="weather-card__detail-item">Вітер: ${windSpeed} м/с</span>
      </div>
    </article>
  `;
}

async function fetchWeatherAPI(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=uk`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.status === 404 ? "not_found" : "network_error");
  }

  return await response.json();
}

async function updateWeatherDashboard(city) {
  showMessage("Шукаємо дані...");

  try {
    const data = await fetchWeatherAPI(city);
    weatherContainer.innerHTML = createWeatherCard(data);
  } catch (error) {
    if (error.message === "not_found") {
      showMessage("Місто не знайдено", true);
    } else {
      showMessage("Помилка з'єднання", true);
    }
  }
}

function handleSearch() {
  const cityName = searchInput.value.trim();
  if (cityName === "") return;

  updateWeatherDashboard(cityName);
  searchInput.value = "";
}

searchBtn.addEventListener("click", handleSearch);

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleSearch();
  }
});
