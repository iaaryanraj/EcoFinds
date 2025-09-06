import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import CurrencySelector from './CurrencySelector';
import './Header.css';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>EcoFinds</h1>
        </Link>
        
        <nav className="nav-menu">
          <Link to="/" className="nav-link">Browse</Link>
          <Link to="/my-listings" className="nav-link">My Listings</Link>
          <Link to="/cart" className="nav-link">Cart</Link>
          <Link to="/purchases" className="nav-link">Purchases</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
        </nav>

        <div className="user-section">
          <CurrencySelector />
          <span className="username">Hello, {user?.username}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
