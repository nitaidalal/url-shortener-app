import { useState } from 'react';
import { FiZap } from 'react-icons/fi';
import ShortenForm from '../components/ShortenForm';
import ResultCard from '../components/ResultCard';


export default function Shortner() {
  const [latestUrl, setLatestUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSuccess = (newUrl) => {
    setLatestUrl(newUrl);
  };




  return (
    <div>
      {/* Glow orb */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at center, #6c63ff 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-10 sm:py-16">
        {/* Header with logout */}
        <header className="mb-10">
          <div className="flex items-center justify-center mb-6">
            <div className="inline-flex items-center gap-2 bg-accent-dim border border-accent/20 rounded-full px-4 py-1.5">
              <FiZap className="text-accent animate-pulse" size={13} />
              <span className="text-accent text-xs font-medium">
                Snip - URL Shortener
              </span>
            </div>
          </div>

          <div className="text-center animate-fade-in">
            <h1 className=" text-5xl sm:text-6xl font-extrabold text-white mb-3 leading-tight">
              Snip it.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-violet-400">
                Share it.
              </span>
            </h1>
            <p className="text-muted text-base max-w-sm mx-auto">
              Turn long, unwieldy links into clean, shareable URLs in one click.
            </p>
          </div>
        </header>

        {/* Main content */}
        <div className="space-y-4">
          <ShortenForm onSuccess={handleSuccess} />

          {latestUrl && <ResultCard url={latestUrl} />}

          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="w-6 h-6 border-2 border-border border-t-accent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
