import React from 'react';

export default function Header({ onToggleMobile }) {
  return (
    <header className="admin-header">
      <div className="header-left">
        <button
          className="mobile-toggle"
          onClick={onToggleMobile}
          aria-label="Toggle Navigation Menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>
        <span className="header-system-title">Ad Campaign & Lead Management</span>
      </div>
      <div className="header-right">
        <div className="system-status-pill">
          <span className="status-dot"></span>
          <span>System Online</span>
        </div>
      </div>
    </header>
  );
}

