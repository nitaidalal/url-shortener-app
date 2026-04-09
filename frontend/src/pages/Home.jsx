import { Link } from 'react-router-dom';
import { authService } from '../services/api';

export default function Home() {
  const isAuthenticated = authService.isAuthenticated();

  return (
    <section className="py-12">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
          Short links, cleaner sharing.
        </h1>
        <p className="mt-4 text-base text-gray-300 sm:text-lg">
          Create short, memorable URLs and track usage from your dashboard.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            to={isAuthenticated ? '/shortener' : '/login'}
            className="rounded-xl bg-accent px-5 py-2.5 font-medium text-white transition hover:bg-accent-light"
          >
            Go to URL Shortener
          </Link>
          <Link
            to="/about"
            className="rounded-xl border border-border px-5 py-2.5 font-medium text-gray-100 transition hover:bg-border"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
