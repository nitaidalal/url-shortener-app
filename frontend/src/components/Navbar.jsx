import { NavLink, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const navClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive ? 'bg-accent text-white' : 'text-gray-300 hover:bg-border hover:text-white'
  }`;

export default function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();
  const handleLogout = async () => {
    await authService.logout();
    navigate('/login');
  };

  const getProfile = () => {
    const user = authService.getCurrentUser();
    return user
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-ink/80 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="text-lg font-bold tracking-tight text-white">
          URL Shortener
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
            Shortener
          </NavLink>
          {isAuthenticated && (
            <NavLink to="/dashboard" className={navClass}>
              Dashboard
            </NavLink>
          )}

          {!isAuthenticated ? (
            <NavLink
              to="/login"
              className="rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-white transition hover:bg-accent-light"
            >
              Login
            </NavLink>
          ) : (
            <div 
              onClick={() => navigate('/profile')}  
              className="flex items-center gap-2 justify-between">
              <div className='cursor-pointer'>
                {authService.getCurrentUser()?.avatar ? (
                  <img
                    src={authService.getCurrentUser()?.avatar}
                    alt={authService.getCurrentUser()?.name}
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-xs text-white">
                    {authService.getCurrentUser()?.name?.charAt(0)}
                  </div>
                )}
              </div>
              <div className='flex flex-col'>
                <p>{authService.getCurrentUser()?.name}</p>
                <p className='text-red-500 cursor-pointer' onClick={handleLogout}>Logout </p>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
