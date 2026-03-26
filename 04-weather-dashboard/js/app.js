const apiKey = "b3cb30ff25b48c1863175aa64f914bd3";
const searchBtn = document.querySelector(".search-form__btn");
const searchInput = document.querySelector(".search-form__input");
const weatherContainer = document.getElementById("weather-container");

async function fetchWeatherData(city) {
  try {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=uk`;
    let response = await fetch(url);
    let data = await response.json();

    if (data.cod === 200) {
      const cardHTML = `
        <article class="weather-card">
          <h2 class="weather-card__city">${data.name}</h2>
          <div class="weather-card__main">
            <div class="weather-card__temp">${Math.round(data.main.temp)}°C</div>
          </div>
          <p class="weather-card__desc">${data.weather[0].description}</p>
          <div class="weather-card__details">
            <span class="weather-card__detail-item">Вологість: ${data.main.humidity}%</span>
            <span class="weather-card__detail-item">Вітер: ${data.wind.speed} м/с</span>
          </div>
        </article>
      `;
      weatherContainer.innerHTML = cardHTML;
    } else {
      weatherContainer.innerHTML = `<p style="text-align: center; color: #ffb3b3;">Місто не знайдено</p>`;
    }
  } catch (error) {
    console.log("Помилка:", error);
    weatherContainer.innerHTML = `<p style="text-align: center; color: #ffb3b3;">Помилка з'єднання</p>`;
  }
}

function handleSearch() {
  let cityName = searchInput.value.trim();
  if (cityName !== "") {
    fetchWeatherData(cityName);
    searchInput.value = "";
  }
}

searchBtn.addEventListener("click", handleSearch);

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleSearch();
  }
});
