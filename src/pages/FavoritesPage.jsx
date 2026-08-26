
import { useState, useEffect } from "react";
import { getFavorites } from "../utils/favorites";
import MovieGrid from "../components/MovieGrid";

function FavoritesPage () {
    const [favorites, setFavorites] = useState([]);

    useEffect (() => {
        setFavorites(getFavorites());
    }, []);

    if (favorites === 0) {
        return (
            <div className="max-w-md mx-auto px-4 py-16 text-center text-slate-600">
                "You have not saved any favorites yet. Search for movies and click the heart icon to save them.";
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-6">
            <h1 className="text-2xl font-bold px-4 max-w-6xl mx-auto mb-4 sm:text-3xl">Favorites Page</h1>
            <MovieGrid movies={favorites} />
        </div>
    );
}

export default FavoritesPage;