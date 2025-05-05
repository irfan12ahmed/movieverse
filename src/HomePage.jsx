import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import { FaPlay, FaStar, FaHeart, FaRegHeart, FaSearch, FaMoon, FaSun } from 'react-icons/fa';
import { GiPopcorn } from 'react-icons/gi';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(true);
    const [moodFilter, setMoodFilter] = useState('all');
    const navigate = useNavigate();

    const moods = [
        { id: 'all', name: 'All Movies' },
        { id: 'excited', name: 'Action & Adventure' },
        { id: 'romantic', name: 'Romance' },
        { id: 'thoughtful', name: 'Drama' },
        { id: 'scared', name: 'Horror' },
        { id: 'laughing', name: 'Comedy' }
    ];

    useEffect(() => {
        setTimeout(() => {
            const mockMovies = [
                {
                    id: 1,
                    title: "The Shawshank Redemption",
                    year: 1994,
                    rating: 9.3,
                    genre: "Drama",
                    mood: "thoughtful",
                    image: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
                    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
                },
                {
                    id: 2,
                    title: "The Dark Knight",
                    year: 2008,
                    rating: 9.0,
                    genre: "Action, Crime, Drama",
                    mood: "excited",
                    image: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
                    description: "When the menace known as the Joker wreaks havoc on Gotham, Batman must face one of the toughest challenges to justice."
                },
            ];

            const shuffled = [...mockMovies].sort(() => 0.5 - Math.random());
            setMovies(shuffled);
            setLoading(false);
        }, 1500);
    }, []);

    const toggleFavorite = (movieId) => {
        setFavorites(prev =>
            prev.includes(movieId)
                ? prev.filter(id => id !== movieId)
                : [...prev, movieId]
        );
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const filteredMovies = movies.filter(movie => {
        const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            movie.genre.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesMood = moodFilter === 'all' || movie.mood === moodFilter;
        return matchesSearch && matchesMood;
    });

    if (loading) {
        return (
            <div className={`loading-container ${darkMode ? 'dark' : 'light'}`}>
                <div className="spinner"></div>
                <p>Curating your cinematic experience...</p>
            </div>
        );
    }

    return (
        <div className={`home-container ${darkMode ? 'dark' : 'light'}`}>
            {/* Sidebar */}
            <div className="sidebar">
                <div className="sidebar-header">
                    <h2>MovieVerse</h2>
                </div>
                <div className="sidebar-menu">
                    <ul>
                        <li onClick={() => navigate('/dashboard')}>Dashboard</li>
                        <li onClick={() => navigate('/moodstring')}>MoodString</li>
                        <li onClick={() => navigate('/topmovies')}>TopMovies</li>
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* Top Navigation Bar */}
                <header className="sticky-header">
                    <div className="logo">
                        <h1>MovieVerse</h1>
                    </div>
                    <div className="search-bar">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Search movies, genres..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className="theme-toggle" onClick={toggleDarkMode}>
                        {darkMode ? <FaSun /> : <FaMoon />}
                    </button>
                </header>

                {/* Hero Section */}
                <div className="hero-section">
                    <div className="hero-content">
                        <h1>Welcome to MovieVerse</h1>
                        <p>Your personalized movie discovery experience</p>
                    </div>
                </div>

                {/* Featured Movies */}
                <div className="featured-section">
                    <h2><GiPopcorn /> Featured Movies</h2>
                    <div className="featured-carousel">
                        {movies.slice(0, 5).map(movie => (
                            <div key={movie.id} className="featured-card" style={{ backgroundImage: `url(${movie.image})` }}>
                                <div className="featured-overlay">
                                    <h3>{movie.title}</h3>
                                    <div className="rating">
                                        <FaStar /> {movie.rating}
                                    </div>
                                    <button onClick={() => navigate(`/movie/${movie.id}`)}>Watch Now</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mood Filter Section */}
                <div className="mood-filter">
                    {moods.map(mood => (
                        <button key={mood.id} onClick={() => setMoodFilter(mood.id)} className={`mood-button ${moodFilter === mood.id ? 'active' : ''}`}>
                            {mood.name}
                        </button>
                    ))}
                </div>

                {/* Movies Grid */}
                <div className="movies-grid">
                    {filteredMovies.map(movie => (
                        <div key={movie.id} className="movie-card">
                            <img src={movie.image} alt={movie.title} />
                            <div className="movie-info">
                                <h3>{movie.title}</h3>
                                <p>{movie.year}</p>
                                <div className="rating">
                                    <FaStar /> {movie.rating}
                                </div>
                                <button className="play-btn" onClick={() => navigate(`/movie/${movie.id}`)}>
                                    <FaPlay /> Watch Now
                                </button>
                                <button className={`favorite-btn ${favorites.includes(movie.id) ? 'active' : ''}`} onClick={() => toggleFavorite(movie.id)}>
                                    {favorites.includes(movie.id) ? <FaHeart /> : <FaRegHeart />} Save
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
