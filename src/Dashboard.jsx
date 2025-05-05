import { FaSun, FaMoon } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import HomePage from './HomePage';
import { FaBars, FaTimes, FaHome, FaUser, FaFilm, FaStar, FaHistory, FaBookmark, FaCog } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { MdLocalMovies } from 'react-icons/md';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            navigate('/login');
        } else {
            setUser(JSON.parse(currentUser));
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/login');
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const menuItems = [
        { icon: <FaHome />, text: 'Home', action: () => navigate('/dashboard') },
        { icon: <FaFilm />, text: 'Movies', action: () => navigate('/movies') },
        { icon: <FaStar />, text: 'Top Rated', action: () => navigate('/top-rated') },
        { icon: <FaHistory />, text: 'Recently Added', action: () => navigate('/recent') },
        { icon: <FaBookmark />, text: 'My List', action: () => navigate('/my-list') },
        { icon: <FaUser />, text: 'Profile', action: () => navigate('/profile') },
        { icon: <FaCog />, text: 'Settings', action: () => navigate('/settings') },
        { icon: <BiLogOut />, text: 'Logout', action: handleLogout, isRed: true },
    ];

    if (!user) {
        return (
            <div className="loading-container">
                <div className="spinner">{/* Add spinner styles in Dashboard.css */}</div>
            </div>
        );
    }

    return (
        <div className={`dashboard-container ${darkMode ? 'dark' : 'light'}`}>
            <header className="dashboard-header">
                <div className="header-left">
                    <button 
                        className="menu-toggle"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                    <div className="logo" onClick={() => navigate('/dashboard')}>
                        <MdLocalMovies className="logo-icon" />
                        <h1>MovieVerse</h1>
                    </div>
                </div>
                <div className="header-right">
                    <button 
                        className="theme-toggle" 
                        onClick={toggleDarkMode}
                        aria-label="Toggle theme"
                    >
                        {darkMode ? <FaSun /> : <FaMoon />}
                    </button>
                    <div 
                        className="user-avatar"
                        onClick={() => navigate('/profile')}
                        title={user?.username}
                    >
                        {user?.username?.charAt(0).toUpperCase()}
                    </div>
                </div>
            </header>
            
            <nav className={`side-menu ${menuOpen ? 'open' : ''}`}>
                <div className="menu-header">
                    <div className="user-info">
                        <div className="user-avatar large">
                            {user?.username?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h3>{user?.username}</h3>
                            <p className="user-email">{user?.email}</p>
                        </div>
                    </div>
                </div>
                <ul className="menu-items">
                    {menuItems.map((item, index) => (
                        <li 
                            key={index}
                            onClick={() => {
                                item.action();
                                setMenuOpen(false);
                            }}
                            className={`menu-item ${item.isRed ? 'red' : ''}`}
                        >
                            <span className="menu-icon">{item.icon}</span>
                            <span className="menu-text">{item.text}</span>
                        </li>
                    ))}
                </ul>
            </nav>
            
            <main className="dashboard-content">
                <HomePage />
            </main>
        </div>
    );
};

export default Dashboard;
