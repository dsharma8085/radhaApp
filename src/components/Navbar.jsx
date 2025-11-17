import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/wallpaper', label: 'Wallpaper' },
  { to: '/quotes', label: 'Quotes' },
  { to: '/festivals', label: 'Festival List' },
  { to: '/aarti', label: 'Radha Aarti' },
  { to: '/mantra', label: 'Krishna Mantra' },
  { to: '/tools', label: 'Tools' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact Us' },
  { to: '/privacy', label: 'Privacy Policy' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">राधा नाम काउंटर</Link>
      <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
        <span className={open ? 'open' : ''}></span>
        <span className={open ? 'open' : ''}></span>
        <span className={open ? 'open' : ''}></span>
      </button>
      <ul className={`nav-links${open ? ' show' : ''}`}>
        {navLinks.map(link => (
          <li key={link.to}>
            <Link to={link.to} onClick={() => setOpen(false)}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
