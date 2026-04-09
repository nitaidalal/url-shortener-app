import React, { useEffect, useState } from 'react'
import { authService, urlService } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiTrendingUp } from 'react-icons/fi';
import StatsBar from '../components/StatsBar';
import UrlTable from '../components/UrlTable';
import { FiPlus } from 'react-icons/fi';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [urls, setUrls] = useState([]);
    const [latestUrl, setLatestUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const fetchUrls = async () => {
      try {
        const data = await urlService.getAll();
        setUrls(data);
      } catch (error) {
        // fail silently
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (!currentUser) {
            navigate('/login');
            return;
        }
        setUser(currentUser);
        fetchUrls();
    }, [navigate]);

    const handleDelete = (id) => {
      setUrls((prev) => prev.filter((u) => u._id !== id));
      if (latestUrl?._id === id) setLatestUrl(null);
    };

    const handleSuccess = (newUrl) => {
      setLatestUrl(newUrl);
      setUrls((prev) => {
        const exists = prev.find((u) => u._id === newUrl._id);
        if (exists) return prev;
        return [newUrl, ...prev];
      });
    };

     
  return (
    <div className="min-h-screen bg-ink">
      {/* Decorative glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at center, #6c63ff 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8 ">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-3 border-border border-t-accent rounded-full animate-spin" />
          </div>
        )}

        {!loading && (
          <>
            {/* Hero Section */}
            <div className="flex justify-end mb-5">
              <p className="px-3 py-2 flex gap-1 text-accent hover:scale-105 transition  cursor-pointer items-center bg-accent/10 border border-accent rounded-md">
                <FiPlus size={15} />
                Create
              </p>
            </div>
            <div className="mb-10 animate-fade-in">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1 text-center ">
                  <h1 className="text-4xl sm:text-5xl  font-extrabold text-white mb-2">
                    Welcome back,{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-violet-400">
                      {user?.name?.split(" ")[0] || "User"}
                    </span>{" "}
                    👋
                  </h1>
                  <p className="text-gray-400 text-base">
                    Here's your link performance overview
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mb-8 animate-fade-in">
              <StatsBar urls={urls} />
            </div>

            {/* Links Table Section */}
            {urls.length > 0 && (
              <div className="animate-fade-in">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-white">
                    Your Links Overview
                  </h2>
                  <p className="text-muted text-sm mt-1">
                    Manage and track all your shortened URLs
                  </p>
                </div>
                <UrlTable urls={urls} onDelete={handleDelete} />
              </div>
            )}

            {/* Empty State */}
            {urls.length === 0 && !loading && (
              <div className="glass-card p-16 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FiArrowRight className="text-accent" size={32} />
                </div>
                <h3 className="text-xl  font-bold text-white mb-2">
                  No URLs created yet
                </h3>
                <p className="text-muted max-w-md mx-auto">
                  Start by creating your first shortened URL using the form
                  above. Track clicks, manage aliases, and share with ease.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard
