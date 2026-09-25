// Stores, retrieves, adds, removes and checks favorite movies using localStorage.
// Dispatches a 'favoritesChanged' event on every write so other components
// (Header badge, FavoritesPage, MovieCard) can react without polling.
const FAVORITES_KEY = 'movieFavorites';

function notifyChange() {
  window.dispatchEvent(new Event('favoritesChanged'));
}

export function getFavorites() {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveFavorite(movie) {
  const favorites = getFavorites();
  const updated = [...favorites, movie];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  notifyChange();
}

export function removeFavorite(imdbID) {
  const favorites = getFavorites();
  const updated = favorites.filter((movie) => movie.imdbID !== imdbID);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  notifyChange();
}

export function isFavorite(imdbID) {
  const favorites = getFavorites();
  return favorites.some((movie) => movie.imdbID === imdbID);
}