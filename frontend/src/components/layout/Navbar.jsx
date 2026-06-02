import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../common/Button";

import "../../styles/layout/navbar.css";

const Navbar = ({ landing = false }) => {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    "Features",
    "How it Works",
    "Pricing",
    "FAQ",
  ];

  return (
    <header className="navbar-wrapper">
      <nav className="navbar">

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">🤖</div>

          <span className="logo-text">
            AI Interview
          </span>
        </Link>

        {/* Desktop Links */}
        {landing && (
          <div className="navbar-links">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              >
                {item}
              </a>
            ))}
          </div>
        )}

        {/* Desktop Buttons */}
        <div className="navbar-actions">
          {user ? (
            <>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => nav("/dashboard")}
              >
                Dashboard
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => nav("/login")}
              >
                Login
              </Button>

              <Button
                size="sm"
                onClick={() => nav("/register")}
              >
                Get Started
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

      </nav>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="mobile-menu">

          {landing &&
            navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}

          {!user ? (
            <>
              <button onClick={() => nav("/login")}>
                Login
              </button>

              <button onClick={() => nav("/register")}>
                Get Started
              </button>
            </>
          ) : (
            <>
              <button onClick={() => nav("/dashboard")}>
                Dashboard
              </button>

              <button onClick={logout}>
                Logout
              </button>
            </>
          )}

        </div>
      )}
    </header>
  );
};

export default Navbar;