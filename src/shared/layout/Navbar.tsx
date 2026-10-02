// src/shared/layout/Navbar.tsx
import { NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../app-setup/providers/ThemeProvider';

// Placeholder auth hook – replace with real auth logic later
const useAuth = () => ({
  isAuthenticated: false,
  role: 'guest',
  login: () => {},
  logout: () => {}
});

export const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, role, login, logout } = useAuth();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/achievements', label: 'Achievements' },
    { to: '/projects', label: 'Projects' },
    { to: '/our-guests', label: 'Our Guests' }
  ];

  if (role === 'admin') links.push({ to: '/admin', label: 'Admin' });

  const handleAuth = () => (isAuthenticated ? logout() : login());

  return (
    <nav className="bg-primary text-primary-foreground border-b border-primary/20">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <NavLink to="/" className="text-xl font-bold">
          AI Club
        </NavLink>
        {/* Desktop links */}
        <div className="hidden md:flex space-x-4 items-center">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => (isActive ? 'underline underline-offset-4' : 'hover:underline')}
            >
              {l.label}
            </NavLink>
          ))}
          {/* Theme toggle */}
          <button onClick={toggleTheme} className="px-2 py-1 rounded border" aria-label="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          {/* Auth button */}
          <button onClick={handleAuth} className="px-2 py-1 rounded border">
            {isAuthenticated ? 'Logout' : 'Login'}
          </button>
        </div>
        {/* Mobile hamburger */}
        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>
      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-primary border-t border-primary/20 px-4 py-2 space-y-2">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} className="block hover:underline" onClick={() => setMobileOpen(false)}>
              {l.label}
            </NavLink>
          ))}
          <button onClick={handleAuth} className="block w-full text-left py-1">
            {isAuthenticated ? 'Logout' : 'Login'}
          </button>
          <button onClick={toggleTheme} className="block w-full text-left py-1">
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
      )}
    </nav>
  );
};
