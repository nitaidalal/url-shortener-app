import { NavLink, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { useState, useRef, useEffect } from 'react';

const navClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive ? 'bg-accent text-black' : 'text-gray-300 hover:bg-border hover:text-white'
  }`;

export default function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    await authService.logout();
    navigate('/login');
    setIsDropdownOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-ink/80 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <NavLink to="/" className="text-lg font-bold tracking-tight text-white">
          <div className="flex items-center gap-2">
            <img src="./logo.png" alt="logo" className='h-8' />
            <span className='text-2xl font-bold'>Snip</span>
          </div>
        </NavLink>

        <nav className="flex items-center gap-2">
          <NavLink to="/" className={navClass} end>
            Home
          </NavLink>
          <NavLink to="/about" className={navClass}>
            About
          </NavLink>
          <NavLink
            to={isAuthenticated ? "/shortener" : "/login"}
            className={navClass}
          >
            Create
          </NavLink>

          {!isAuthenticated ? (
            <NavLink
              to="/login"
              className="rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-black transition hover:bg-accent-light"
            >
              Login
            </NavLink>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-center focus:outline-none"
              >
                {authService.getCurrentUser()?.avatar ? (
                  <img
                    src={authService.getCurrentUser()?.avatar}
                    alt={authService.getCurrentUser()?.name}
                    className="w-10 h-10 rounded-full object-cover hover:ring-2 hover:ring-accent transition cursor-pointer"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-sm font-semibold text-black hover:ring-2 hover:ring-accent-light transition cursor-pointer">
                    {authService
                      .getCurrentUser()
                      ?.name?.charAt(0)
                      ?.toUpperCase()}
                  </div>
                )}
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-ink border border-border rounded-lg shadow-lg py-2 z-50">
                  <button
                    onClick={() => handleNavigation("/dashboard")}
                    className="w-full text-left px-4 py-2 text-gray-300 hover:bg-border hover:text-white transition"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => handleNavigation("/analytics")}
                    className="w-full text-left px-4 py-2 text-gray-300 hover:bg-border hover:text-white transition"
                  >
                    Analytics
                  </button>
                  <button
                    onClick={() => handleNavigation("/account-settings")}
                    className="w-full text-left px-4 py-2 text-gray-300 hover:bg-border hover:text-white transition"
                  >
                    Account Settings
                  </button>
                  <hr className="border-border my-1" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-500/20 hover:text-red-400 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
