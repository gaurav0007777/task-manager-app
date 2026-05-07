import { useState } from "react";

import { FaTasks } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const [darkMode, setDarkMode] =
    useState(false);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {

    localStorage.removeItem("user");

    localStorage.removeItem("token");

    navigate("/");
  };

  const toggleDarkMode = () => {

    setDarkMode(!darkMode);

    document.body.classList.toggle(
      "dark-mode"
    );
  };

  return (

    <nav className="navbar">

      <div className="logo">

        <FaTasks />

        <h2>TaskFlow</h2>

      </div>

      <div className="nav-right">

        <div className="user-info">

          <span>
            Hi, {user.name}
          </span>

          {user.role === "admin" && (

            <span className="admin-badge">
              Admin
            </span>

          )}

        </div>

        <button
          onClick={toggleDarkMode}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <button onClick={handleLogout}>
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;