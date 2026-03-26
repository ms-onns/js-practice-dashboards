const cryptoContainer = document.getElementById("crypto-container");
const refreshBtn = document.getElementById("refresh-btn");
const url =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=1&sparkline=false";

async function fetchCryptoData() {
  cryptoContainer.innerHTML =
    '<p style="grid-column: 1 / -1; text-align: center; font-size: 1.2rem;">Завантаження даних...</p>';

  try {
    let response = await fetch(url);
    let data = await response.json();

    console.log("Дані з API:", data);

    let cardsHTML = data
      .map((coin) => {
        let changeClass =
          coin.price_change_percentage_24h >= 0 ?
            "crypto-card__change--up"
          : "crypto-card__change--down";
        let changeIcon = coin.price_change_percentage_24h >= 0 ? "↑" : "↓";
        let changeValue = Math.abs(coin.price_change_percentage_24h).toFixed(2);
        let formattedPrice = coin.current_price.toLocaleString("en-US", {
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
        </article>`;
      })
      .join("");

    cryptoContainer.innerHTML = cardsHTML;
  } catch (error) {
    console.log("Помилка мережі:", error);
    cryptoContainer.innerHTML =
      '<p style="color: #ff4d4d; grid-column: 1 / -1; text-align: center; font-size: 1.2rem;">Помилка мережі! Спробуйте пізніше.</p>';
  }
}

refreshBtn.addEventListener("click", fetchCryptoData);

fetchCryptoData();
