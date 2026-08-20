
import { useState, useEffect } from "react";
import { getFavorites } from "../utils/favorites";
import MovieGrid from "../components/MovieGrid";

function FavoritesPage () {
    const [favorites, setFavorites] = useState([]);

    useEffect (() => {
        setFavorites(getFavorites());
    }, []);

    if (favorites === 0) {
        return "You have not saved any favorites yet. Search for movies and click the heart icon to save them.";
    }

    return (
        <div>
            <h1>Favorites Page</h1>
            <MovieGrid movies={favorites} />
        </div>
    );
}

export default FavoritesPage;