import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/customHooks/useAuth';
import './Header.css';

function Header() {
  const { isLoggedIn, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to home or login after logout
  };

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__brand">
          <span className="header__brand-icon" aria-hidden="true">
            家
          </span>
          <span className="header__brand-text">Uchi Nihon</span>
        </Link>

        <nav className="header__nav" aria-label="Main navigation">
          <NavLink to="/" end className="header__nav-link">
            Listings
          </NavLink>
          <NavLink to="/about" className="header__nav-link">
            About Akiya
          </NavLink>

          {isLoggedIn ? (
            <>
              <NavLink to="/saved" className="header__nav-link">
                Saved Homes
              </NavLink>
              <span className="header__username">{currentUser?.name}</span>
              <button className="header__btn header__btn--logout" onClick={handleLogout}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="header__nav-link">
                Log In
              </NavLink>
              <Link to="/register" className="header__btn header__btn--cta">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
