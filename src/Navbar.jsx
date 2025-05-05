import React, { useContext } from 'react';
import { FaMoon, FaSun, FaBars } from 'react-icons/fa';
import { ThemeContext } from './context/ThemeContext';
import { AuthContext } from './context/AuthContext';

export default function Navbar({ toggleSidebar }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { currentUser } = useContext(AuthContext);

  return (
    <nav className={`navbar ${theme}`}>
      <button onClick={toggleSidebar} className="menu-btn">
        <FaBars />
      </button>
      <h1>MovieVerse</h1>
      <div className="nav-controls">
        <button onClick={toggleTheme} className="theme-btn">
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
        {currentUser && <span className="user-label">Hi, {currentUser.name}</span>}
      </div>
    </nav>
  );
}
