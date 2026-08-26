// src/components/Header.jsx
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getFavorites } from '../utils/favorites';

function Header() {
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    setFavoritesCount(getFavorites().length);
  });
  return (
    <header className="bg-slate-900 text-white px-4 py-3 sm:px-6">
      <nav className="flex items-center justify-between max-w-6xl mx-auto">
        <Link to="/" className="text-sm hover:text-slate-300 sm:text-base">Home</Link>
        <Link to="/favorites" className="flex items-center gap-1 text-sm hover:text-slate-300 sm:text-base">Favorites ({favoritesCount})</Link>
      </nav>
    </header>
  );
}
export default Header;