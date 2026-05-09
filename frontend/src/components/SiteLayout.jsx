import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function SiteLayout() {
  return (
    <div className="min-h-screen bg-ink text-white flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="mx-auto w-full max-w-6xl py-4 sm:px-6 lg:px-8 flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
