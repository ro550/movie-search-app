# Movie Search App

A responsive React app for searching movies, TV series, and games using the OMDB API. Users can search by title, view full details for any result, and save favorites that persist across browser sessions.

**Live site:** [movie-search-app-nu-black.vercel.app]

## Technologies Used

- **React** (with Vite) — UI library and build tool
- **React Router (react-router-dom v6+)** — client-side routing
- **Tailwind CSS** — styling and responsive design
- **OMDB API** — movie/series/game data
- **localStorage** — persisting favorites across sessions
- **Vercel** — deployment

## Features

- **Search** — search for a movie, series, or game by title; results update on Enter or button click
- **Results grid** — responsive card grid (1 column mobile, 2 columns tablet, 4 columns desktop), each card showing poster, title, year, and type
- **Movie details page** — full details (poster, title, year, rated, runtime, genre, director, actors, plot, IMDB rating) at `/movie/:imdbID`
- **Favorites** — add/remove favorites via a heart icon on any card or the details page; stored in `localStorage` so they persist after refresh; dedicated `/favorites` page
- **Loading states** — spinner shown during search and details fetches; no stale results shown while a new search loads
- **Error handling** — friendly messages for no results, invalid API responses, and network failures
- **Navigation** — header with links to Home and Favorites, including a live favorites count badge
- **Responsive design** — tested at 375px (mobile), 768px (tablet), and 1024px+ (desktop)

## Setup Instructions

### Prerequisites
- Node.js (v18 or later recommended)
- An OMDB API key ([get one free here](https://www.omdbapi.com/apikey.aspx))

### Installation

1. Clone the repository
   ```bash
   git clone <your-repo-url>
   cd movie-search-app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add your API key
   ```
   VITE_OMDB_API_KEY=your_api_key_here
   ```
   > The `VITE_` prefix is required — Vite only exposes environment variables to the app if they start with `VITE_`.

4. Start the dev server
   ```bash
   npm run dev
   ```

5. Open the local URL shown in your terminal (typically `http://localhost:5173`)

## How to Test

Run through the following to confirm everything works as expected:

| Scenario | Expected result |
|---|---|
| Search a common title (e.g. "batman") | Grid of results with posters, titles, years, types |
| Search a nonexistent title (e.g. "xyznotarealmovie") | Message: *"No movies found for '[term]'. Try a different title."* |
| Search with an empty input | No API call is made; nothing happens |
| Click a movie card | Navigates to `/movie/:imdbID` with full details |
| Visit an invalid movie ID directly (e.g. `/movie/tt0000000`) | Friendly error message, not a blank page |
| Click the heart icon on a card or details page | Toggles favorite status immediately |
| Favorite a movie, then refresh the page | Favorite status still shows as saved |
| Visit `/favorites` with saved favorites | Displays them in the same grid layout |
| Visit `/favorites` with none saved | Message: *"You have not saved any favorites yet. Search for movies and click the heart icon to save them."* |
| Disconnect from the internet and search | Message: *"Something went wrong. Please check your internet connection and try again."* |
| Resize the browser to 375px, 768px, and 1024px+ | Grid adjusts to 1 / 2 / 4 columns; no horizontal scrolling; all text and buttons remain usable |

## Deployment

This app is deployed on Vercel. To deploy your own copy:

1. Push the repository to GitHub
2. Import the repo into Vercel
3. Before deploying, add an environment variable in Vercel's dashboard: `VITE_OMDB_API_KEY` set to your OMDB API key
4. Deploy — the live site will have full functionality (search, details, favorites, routing)