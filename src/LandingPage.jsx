import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css"; // Import the CSS file
import { FaFilm, FaPlay } from 'react-icons/fa';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <>
            <div className="landing-container">
                {/* Header */}
                <nav className="navbar">
                    <div className="logo">
                        <FaFilm className="logo-icon" />
                        <span className="logo-text">MovieVerse</span>
                    </div>
                    <div className="nav-buttons">
                        <button className="nav-btn" onClick={() => handleNavigation("/login")}>Login</button>
                        <button className="nav-btn signup" onClick={() => handleNavigation("/signup")}>Sign Up</button>
                    </div>
                </nav>

                {/* Main Section */}
                <div className="main-content">
                    <h1 className="get-started">Discover Your Next Favorite Movie</h1>
                    <p className="subtitle">Your personal movie companion for endless entertainment</p>
                    <div className="cta-buttons">
                        <button className="cta-btn primary" onClick={() => handleNavigation("/signup")}>
                            <FaPlay className="btn-icon" /> Get Started
                        </button>
                        <button className="cta-btn secondary" onClick={() => handleNavigation("/login")}>
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LandingPage;
