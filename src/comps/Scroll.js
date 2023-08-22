import React, { useState } from 'react';
import { HashRouter, Link } from 'react-router-dom';

function ScrollLink({ to, children }) {
  const scrollSmooth = targetId => {
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const topOffset = targetElement.offsetTop;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <a
      href={to}
      className="nav-links"
      onClick={e => {
        e.preventDefault();
        scrollSmooth(to);
      }}
    >
      {children}
    </a>
  );
}

export const Nav = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <HashRouter>
      <nav className="navbar-container">
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>

        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/photos">Photos</Link>
          </li>
          <li className="nav-item">
            <Link to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/projects">Projects</Link>
          </li>
          {/* Other navigation links */}
        </ul>
        {/* ... Other content ... */}
      </nav>
    </HashRouter>
  );
};
