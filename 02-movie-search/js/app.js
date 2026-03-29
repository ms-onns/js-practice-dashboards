const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const moviesContainer = document.getElementById("movies-container");

function showMessage(message, isError = false) {
  const colorStyle = isError ? ' style="color: #ff4d4d;"' : "";
  moviesContainer.innerHTML = `<p class="empty-state"${colorStyle}>${message}</p>`;
}

function createMovieCard(item) {
  const imageUrl =
    item.show.image ?
      item.show.image.medium
    : "https://via.placeholder.com/210x295?text=No+Image";

  const rating = item.show.rating?.average || "N/A";

  return `
    <article class="movie-card" lang="en">
      <img src="${imageUrl}" alt="${item.show.name}" class="movie-card__img">
      <div class="movie-card__content">
        <h3 class="movie-card__title">${item.show.name}</h3>
        <p class="movie-card__rating">⭐ ${rating}</p>
      </div>
    </article>
  `;
}

function renderMovies(movies) {
  return movies.map(createMovieCard).join("");
}

async function fetchMovies(searchTerm) {
  const url = `https://api.tvmaze.com/search/shows?q=${searchTerm}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

async function handleSearch(e) {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();

  if (searchTerm === "") {
    showMessage("Будь ласка, введіть назву фільму.", true);
    return;
  }

  showMessage("Шукаємо фільми...");

  try {
    const data = await fetchMovies(searchTerm);

    if (data.length === 0) {
      showMessage("На жаль, за вашим запитом нічого не знайдено.");
      return;
    }

    moviesContainer.innerHTML = renderMovies(data);
  } catch (error) {
    showMessage("Помилка мережі! Спробуйте пізніше.", true);
  }
}

searchForm.addEventListener("submit", handleSearch);
