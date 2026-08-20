
// Stores, retrieves, adds, removes and checks favorite movies using localStorage
const FAVORITES_KEY = 'movieFavorites';

export function getFavorites() {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveFavorite(movie) {
  const favorites = getFavorites();
  const updated = [...favorites, movie];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
}

export function removeFavorite(imdbID) {
  const favorites = getFavorites();
  const updated = favorites.filter((movie) => movie.imdbID !== imdbID);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
}

export function isFavorite(imdbID) {
  const favorites = getFavorites();
  return favorites.some((movie) => movie.imdbID === imdbID);
}