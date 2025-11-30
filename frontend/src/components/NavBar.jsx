// src/components/NavBar.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          APTIV ACCESSIBILITY
        </Link>
      </div>
      <div className="navbar-right">
        {user ? (
          <>
            {user.role === "admin" && (
              <Link
                to="/admin"
                className={`nav-link ${isActive("/admin") ? "active" : ""}`}
              >
                Admin
              </Link>
            )}
            <div className="nav-user-dropdown">
              <button
                className="btn-dropdown"
                onClick={toggleDropdown}
              >
                {user.name} ({user.role})
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={handleLogout} className="dropdown-item">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link to="/login" className="btn-primary no-underline">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
