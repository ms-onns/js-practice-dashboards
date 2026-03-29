const loadBtn = document.getElementById("load-btn");
const usersContainer = document.getElementById("users-container");

function createUserCard(user) {
  return `
    <article class="user-card" lang="en">
      <h3 class="user-card__name">${user.name}</h3>
      <p class="user-card__info">${user.email}</p>
      <p class="user-card__info">Company: ${user.company.name}</p>
    </article>
  `;
}

function renderUsers(users) {
  return users.map(createUserCard).join("");
}

function showLoadingState() {
  usersContainer.innerHTML =
    '<p style="text-align: center; grid-column: 1 / -1;">Завантаження даних...</p>';
}

function showErrorState() {
  usersContainer.innerHTML = `<span class="error-text">Сервер не відповідає! Спробуйте пізніше.</span>`;
}

async function fetchUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

async function handleLoadUsers() {
  showLoadingState();

  try {
    const data = await fetchUsers();
    usersContainer.innerHTML = renderUsers(data);
  } catch (error) {
    console.error("Помилка отримання користувачів:", error);
    showErrorState();
  }
}

loadBtn.addEventListener("click", handleLoadUsers);
