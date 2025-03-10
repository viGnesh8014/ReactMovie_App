import { createContext, useState, useContext, useEffect } from "react";

// Create a context to store favorite movies
const MovieContext = createContext();

// Hook to use the MovieContext in other components
export const useMovieContext = () => useContext(MovieContext);

// Context Provider component
export const MovieProvider = ({ children }) => {
    // State to store favorite movies
    const [favorites, setFavorites] = useState([]);

    // Load favorite movies from localStorage when the page loads
    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites");
        if (storedFavs) setFavorites(JSON.parse(storedFavs));
    }, []);

    // Save favorite movies to localStorage whenever the favorites list changes
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    // Function to add a movie to favorites
    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie]);
    };

    // Function to remove a movie from favorites
    const removeFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId));
    };

    // Function to check if a movie is in favorites
    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId);
    };

    // Provide these values to all children components
    return (
        <MovieContext.Provider value={{ favorites, addToFavorites, removeFavorites, isFavorite }}>
            {children}
        </MovieContext.Provider>
    );
};
