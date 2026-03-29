const cryptoContainer = document.getElementById("crypto-container");
const refreshBtn = document.getElementById("refresh-btn");
const url =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=1&sparkline=false";

function showMessage(message, isError = false) {
  const colorStyle = isError ? "color: #ff4d4d;" : "";
  cryptoContainer.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; font-size: 1.2rem; ${colorStyle}">${message}</p>`;
}

function createCryptoCard(coin) {
  const isPositive = coin.price_change_percentage_24h >= 0;
  const changeClass =
    isPositive ? "crypto-card__change--up" : "crypto-card__change--down";
  const changeIcon = isPositive ? "↑" : "↓";
  const changeValue = Math.abs(coin.price_change_percentage_24h).toFixed(2);
  const formattedPrice = coin.current_price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });

  return `
    <article class="crypto-card">
      <div class="crypto-card__header">
        <img src="${coin.image}" alt="${coin.name}" class="crypto-card__logo">
        <div class="crypto-card__info">
          <h3 class="crypto-card__symbol">${coin.symbol.toUpperCase()}</h3>
          <p class="crypto-card__name">${coin.name}</p>
        </div>
      </div>
      <div class="crypto-card__price">$ ${formattedPrice}</div>
      <div class="crypto-card__change ${changeClass}">${changeIcon} ${changeValue}%</div>
    </article>
  `;
}

function renderCryptoData(data) {
  return data.map(createCryptoCard).join("");
}

async function fetchCryptoAPI() {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

async function updateCryptoDashboard() {
  showMessage("Завантаження даних...");

  try {
    const data = await fetchCryptoAPI();
    cryptoContainer.innerHTML = renderCryptoData(data);
  } catch (error) {
    showMessage("Помилка мережі! Спробуйте пізніше.", true);
  }
}

refreshBtn.addEventListener("click", updateCryptoDashboard);

updateCryptoDashboard();
