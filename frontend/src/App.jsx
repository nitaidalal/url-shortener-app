import { Toaster } from 'react-hot-toast';
import {Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import About from './pages/About';
import SiteLayout from './components/SiteLayout';
import { authService } from './services/api';
import Shortner from './pages/Shortner';
import Settings from './pages/Settings';


function ProtectedRoute({ children }) {
  const isAuthenticated = authService.isAuthenticated();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#16161f',
            color: '#e8e8f0',
            border: '1px solid #252535',
            borderRadius: '12px',
            fontSize: '13px',
          },
        }}
      />

      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/shortener"
            element={
              <ProtectedRoute>
                <Shortner />
              </ProtectedRoute>
            }
          />
    
          <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
          } />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
           />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </>
  );
}
