# Vanilla JS API Projects & Dashboards

This repository serves as a practical roadmap and collection of standalone mini-projects. It is designed to demonstrate proficiency in Vanilla JavaScript, asynchronous API integrations, and modern responsive web design.

## Tech Stack

- **Logic:** Vanilla JavaScript (ES6+), Async/Await, Fetch API, DOM Manipulation
- **Styling:** SCSS, CSS Grid / Flexbox, BEM Methodology
- **Architecture:** Monorepo architecture for maintaining multiple isolated projects

## Project Directory & Roadmap

### 01. Team Dashboard

A directory dashboard integrating with a public REST API to fetch and render user data.

- **API Integration:** [JSONPlaceholder Users](https://jsonplaceholder.typicode.com/users)
- **Key Implementations:**
  - Asynchronous data fetching and dynamic DOM rendering.
  - Error handling for failed network requests (`try/catch`).
  - Scalable UI components using Array methods (`.map()`, `.join()`).
  - Fully responsive layout ensuring mobile-first compatibility.

### 02. Movie Search Dashboard

A dynamic search interface that fetches and displays movie/TV show data based on real-time user input.

- **API Integration:** [TVmaze Search API](https://api.tvmaze.com/search/shows)
- **Key Implementations:**
  - Form event handling (`submit`) and preventing default browser refresh (`e.preventDefault()`).
  - Dynamic URL construction using Template Literals based on user input.
  - Advanced UI/UX handling: loading states, empty search results, and missing image fallbacks.
  - Strict responsive CSS Grid layout adapting from 4 columns to 1.

### 03. Crypto Market Dashboard

A live cryptocurrency tracking interface fetching real-time financial metrics for top coins on the market.

- **API Integration:** [CoinGecko API](https://www.coingecko.com/en/api)
- **Key Implementations:**
  - Real-time market data fetching and rendering using Async/Await.
  - Advanced data formatting: `toLocaleString` for precise currency rendering and `Math.abs()` for clean percentage logic.
  - Conditional UI rendering using ternary operators for dynamic market trend indicators (up/down, green/red styling).
  - Custom "Fintech Blue" design system implemented with strict BEM architecture.

### 04. Global Weather Radar

A sleek, real-time weather tracking widget that fetches current meteorological data for any city worldwide.

- **API Integration:** [OpenWeatherMap API](https://openweathermap.org/api)
- **Key Implementations:**
  - Authentication and secure API Key integration in URL parameters.
  - Parsing and extracting data from deeply nested JSON objects.
  - Error handling for invalid user inputs (HTTP 404/401 status catching).
  - Premium UI design utilizing Glassmorphism (`backdrop-filter`) and CSS gradients.

### 05. Dashboard Project (Work in Progress)

---

_This repository is part of an intensive, structured preparation for a Full-Stack Developer position. The roadmap will be completed step-by-step._
