import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import gsap from 'gsap';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  const sidebarRef = useRef();
  const profileRef = useRef();

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(sidebarRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
    );
  }, []);

  useEffect(() => {
    // Expand/collapse animation
    gsap.to(sidebarRef.current, {
      width: isExpanded ? 240 : 72,
      duration: 0.3,
      ease: 'power2.inOut'
    });
  }, [isExpanded]);

  const handleLogout = () => {
    gsap.to(sidebarRef.current, {
      x: -100,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        logout();
        navigate('/login');
      }
    });
  };

  const handleProfileClick = () => {
    gsap.to(profileRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => navigate('/profile')
    });
  };

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`} ref={sidebarRef}>
      {/* Logo */}
      <div className="sidebar-header">
        <div className="logo-container" onClick={() => navigate('/home')}>
          {isExpanded ? (
            <h1 className="sidebar-logo">Histogram</h1>
          ) : (
            <span className="sidebar-logo-icon">H</span>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      <button 
        className="sidebar-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
        >
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>

      {/* Spacer */}
      <div className="sidebar-spacer"></div>

      {/* Bottom Section - Profile */}
      <div className="sidebar-bottom">
        {/* Theme Toggle */}
        <button 
          className="sidebar-item theme-btn"
          onClick={toggleTheme}
        >
          <span className="sidebar-icon">{isDark ? '☀️' : '🌙'}</span>
          {isExpanded && <span className="sidebar-text">Theme</span>}
        </button>

        {/* Profile */}
        <div 
          className={`sidebar-profile ${location.pathname === '/profile' ? 'active' : ''}`}
          onClick={handleProfileClick}
          ref={profileRef}
        >
          <div className="profile-avatar">
            {user?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          {isExpanded && (
            <div className="profile-info">
              <span className="profile-name">{user?.username}</span>
              <span className="profile-role">{user?.role}</span>
            </div>
          )}
        </div>

        {/* Logout */}
        <button 
          className="sidebar-item logout-btn"
          onClick={handleLogout}
        >
          <span className="sidebar-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </span>
          {isExpanded && <span className="sidebar-text">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
