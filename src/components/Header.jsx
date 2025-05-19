import { useState, useEffect } from "react";
import { signInWithGoogle, logout } from "./auth";
import logo from "../assets/logo.png";
import "../styles/header.css";
import { IconButton } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';




// theme styling

const ThemeToggle = ({ isDarkMode, toggleTheme }) => {
  return (
    <IconButton
      onClick={toggleTheme}
      sx={{
        width: 40,
        height: 40,
        borderRadius: '30%',
        backgroundColor: isDarkMode ? '#00000' : '#00000',
        color: isDarkMode ? '#fff' : '#fff',
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: isDarkMode ? '#414141' : '#099686',
        },
      }}
    >
      {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
};


function Header({ user }) {
  const [showMenu, setShowMenu] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);


  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setDarkMode(newDarkMode);
    document.body.classList.toggle('dark-mode', newDarkMode);
  };


  const toggleMenu = (e) => {
    e.stopPropagation(); // Avoid closing when clicking the avatar
    setShowMenu((prev) => !prev);
  };


  // Close menu when clicking outside
  useEffect(() => {
    const closeMenu = () => setShowMenu(false);
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);



  
  return (
    <header>
      <img className="logo" src={logo} alt="Logo" />
      <h1>KeepMe</h1>

      <div className="mode-container"> {/* Use a simple div */}
        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </div>


      <div className="user-profile" onClick={toggleMenu}>
        {user?.photoURL && (
        <img
          src={user?.photoURL || "User Image"}
          alt="Profile"
          className="profile-picture"
          onError={(e) => (e.target.src)}
        />
        )}
        {showMenu && (
          <div className="user-menu" onClick={(e) => e.stopPropagation()}>
            <div className="menu-loggedin">
              <p className="menu-user-email" id="user-email">
                {user?.email || "Not logged in"}
              </p>
              {user?.photoURL && (
                <img
                  src={user?.photoURL || "User Image"}
                  alt="User Profile"
                  className="menu-profile-pic"
                  id="user-pic"
                  onError={(e) => (e.target.src)}
                />
              )}
              <p className="menu-user-name" id="user-name">
                Hi, {user?.displayName || "Guest"}!
              </p>
            </div>
            <div className="add-account" onClick={signInWithGoogle}>
              Switch Account
            </div>
            <button onClick={logout} className="logout-account">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}


export default Header;