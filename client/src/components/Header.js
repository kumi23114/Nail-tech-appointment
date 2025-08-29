import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: '首頁' },
    { path: '/booking', label: '預約服務' },
    { path: '/services', label: '服務項目' },
    { path: '/about', label: '關於我們' },
    { path: '/tech-dashboard', label: '美甲師面板' },
    { path: '/admin-dashboard', label: '管理面板' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div className="container">
        <div className="flex flex-between" style={{ padding: '1rem 0' }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="flex flex-center" style={{ gap: '10px' }}>
              <Sparkles size={32} color="#667eea" />
              <h1 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                美甲預約系統
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  textDecoration: 'none',
                  color: isActive(item.path) ? '#667eea' : '#333',
                  fontWeight: isActive(item.path) ? '600' : '400',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  background: isActive(item.path) ? 'rgba(102, 126, 234, 0.1)' : 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item.path)) {
                    e.target.style.background = 'rgba(102, 126, 234, 0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.path)) {
                    e.target.style.background = 'transparent';
                  }
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            padding: '1rem 0',
            borderTop: '1px solid rgba(0, 0, 0, 0.1)'
          }}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                style={{
                  textDecoration: 'none',
                  color: isActive(item.path) ? '#667eea' : '#333',
                  fontWeight: isActive(item.path) ? '600' : '400',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  background: isActive(item.path) ? 'rgba(102, 126, 234, 0.1)' : 'transparent'
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          nav:first-of-type {
            display: none !important;
          }
          
          button {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
