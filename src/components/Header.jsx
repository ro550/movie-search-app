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
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites ({favoritesCount})</Link>
      </nav>
    </header>
  );
}
export default Header;