const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const moviesContainer = document.getElementById("movies-container");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  let searchTerm = searchInput.value.trim();
  if (searchTerm === "") {
    moviesContainer.innerHTML =
      '<p class="empty-state" style="color: #ff4d4d;">Будь ласка, введіть назву фільму.</p>';
    return;
  }

  const url = `https://api.tvmaze.com/search/shows?q=${searchTerm}`;

  moviesContainer.innerHTML = '<p class="empty-state">Шукаємо фільми...</p>';

  try {
    let response = await fetch(url);
    let data = await response.json();
    if (data.length === 0) {
      moviesContainer.innerHTML =
        '<p class="empty-state">На жаль, за вашим запитом нічого не знайдено.</p>';
      return;
    }

    let moviesHTML = data
      .map((item) => {
        let imageUrl =
          item.show.image ?
            item.show.image.medium
          : "https://via.placeholder.com/210x295?text=No+Image";
        return `
        <article class="movie-card" lang="en">
          <img src="${imageUrl}" alt="${item.show.name}" class="movie-card__img">
          <div class="movie-card__content">
            <h3 class="movie-card__title">${item.show.name}</h3>
            <p class="movie-card__rating">⭐ ${item.show.rating?.average || "N/A"}</p>
          </div>
        </article>
      `;
      })
      .join("");

    moviesContainer.innerHTML = moviesHTML;
  } catch (error) {
    console.log("Помилка запиту:", error);
    moviesContainer.innerHTML =
      '<p class="empty-state" style="color: #ff4d4d;">Помилка мережі! Спробуйте пізніше.</p>';
  }
});
