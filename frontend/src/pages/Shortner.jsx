import { useState } from 'react';
import { FiZap } from 'react-icons/fi';
import ShortenForm from '../components/ShortenForm';
import ResultCard from '../components/ResultCard';
import { useNavigate } from 'react-router-dom';
import CyanLoader from '../components/CyanLoader';


export default function Shortner() {
  const [latestUrl, setLatestUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = (newUrl) => {
    setLatestUrl(newUrl);
  };




  return (
    <div>
      {/* Glow orb */}
      <div
        className="fixed 
        top-[-200px] 
        left-1/2 
        -translate-x-1/2  
        w-[800px] 
        h-[700px] 
        pointer-events-none 
        opacity-25 
        z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--color-cyan) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />



      <div className="relative z-10 max-w-4xl sm:mx-auto px-1 mx-2 sm:px-4 py-10 sm:py-16">
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
              <CyanLoader size="sm" label="Loading" />
            </div>
          )}
        </div>

        {/* SHOW OPTION TO GO TO DASHBOARD FOR RECENT LINKS */}
        <div className="mt-6">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-muted mb-3">For your recent links, go to your Dashboard</p>

            <button
              onClick={() => navigate('/dashboard')}
              className="btn-primary mx-auto"
            >
              <span>View Dashboard</span>
              <FiZap className="text-cyan ml-2" size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
