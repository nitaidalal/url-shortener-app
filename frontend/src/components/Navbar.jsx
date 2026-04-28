import { NavLink, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { useState, useRef, useEffect } from 'react';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';

const navClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive ? 'bg-accent text-black' : 'text-gray-300 hover:bg-border hover:text-white'
  }`;

export default function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

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
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isDropdownOpen || isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen, isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-ink/80 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <NavLink to="/" className="text-lg font-bold tracking-tight text-white">
          <div className="flex items-center gap-2">
            <img src="./logo.png" alt="logo" className="h-8" />
            <span className="text-2xl font-bold">Snip</span>
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
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
                className="flex items-center gap-2 px-2 py-1 rounded-full bg-cyan/10 border border-cyan hover:bg-cyan/20 transition focus:outline-none"
              >
                {authService.getCurrentUser()?.avatar ? (
                  <img
                    src={authService.getCurrentUser()?.avatar}
                    alt={authService.getCurrentUser()?.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs font-semibold text-black">
                    {authService
                      .getCurrentUser()
                      ?.name?.charAt(0)
                      ?.toUpperCase()}
                  </div>
                )}
                <span className="text-sm font-medium ">
                  {authService.getCurrentUser()?.name}
                </span>
                <FiChevronDown size={16} className="text-gray-700" />
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

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          {isAuthenticated && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-2 py-1 rounded-full bg-cyan/10 border border-cyan hover:bg-cyan/20 transition focus:outline-none"
              >
                {authService.getCurrentUser()?.avatar ? (
                  <img
                    src={authService.getCurrentUser()?.avatar}
                    alt={authService.getCurrentUser()?.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs font-semibold text-black">
                    {authService
                      .getCurrentUser()
                      ?.name?.charAt(0)
                      ?.toUpperCase()}
                  </div>
                )}
                <span className="text-sm font-medium  max-w-[100px] truncate">
                  {authService.getCurrentUser()?.name}
                </span>
                <FiChevronDown size={16} className="text-gray-700" />
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

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-border transition"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden border-t border-border bg-card/80 backdrop-blur-sm"
          ref={mobileMenuRef}
        >
          <div className="mx-auto max-w-6xl px-4 py-4 space-y-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-accent text-black font-medium"
                    : "text-gray-300 hover:bg-border hover:text-white"
                }`
              }
              end
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-accent text-black font-medium"
                    : "text-gray-300 hover:bg-border hover:text-white"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to={isAuthenticated ? "/shortener" : "/login"}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-accent text-black font-medium"
                    : "text-gray-300 hover:bg-border hover:text-white"
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Create
            </NavLink>
            {!isAuthenticated && (
              <NavLink
                to="/login"
                className="block px-4 py-2 rounded-lg bg-accent text-black font-medium transition hover:bg-accent-light"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
