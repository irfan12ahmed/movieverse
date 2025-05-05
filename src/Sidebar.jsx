import React, { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext'; // Corrected path

export default function Sidebar({ isOpen, closeSidebar }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''} ${theme}`}>
      <button className="close-btn" onClick={closeSidebar}>
        &times;
      </button>
      <h2>Sidebar</h2>
      {/* Other Sidebar content */}
    </div>
  );
}
