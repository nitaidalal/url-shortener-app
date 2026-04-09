import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function SiteLayout() {
  return (
    <div className="min-h-screen bg-ink text-white">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
