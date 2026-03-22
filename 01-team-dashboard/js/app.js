const loadBtn = document.getElementById("load-btn");
const usersContainer = document.getElementById("users-container");

loadBtn.addEventListener("click", async () => {
  console.log("test");
  usersContainer.innerHTML =
    '<p style="text-align: center; grid-column: 1 / -1;">Завантаження даних...</p>';
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
    let data = await response.json();
    let postHTML = data
      .map(
        (item) =>
          `<article class="user-card" lang="en">
            <h3 class="user-card__name">${item.name}</h3>
            <p class="user-card__info">${item.email}</p>
            <p class="user-card__info">Company: ${item.company.name}</p>
          </article>`,
      )
      .join("");
    usersContainer.innerHTML = postHTML;
  } catch (error) {
    usersContainer.innerHTML = `<span class="error-text">Сервер не відповідає! Спробуйте пізніше.</span>`;
    console.log(error);
  }
});
