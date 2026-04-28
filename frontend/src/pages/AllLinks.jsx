import React, { useEffect, useState } from 'react'
import { authService, urlService } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import UrlTable from '../components/UrlTable';

const AllLinks = () => {
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const fetchUrls = async () => {
      try {
        const data = await urlService.getAll();
        setUrls(data);
      } catch (error) {
        console.error('Error fetching URLs:', error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
        fetchUrls();
    }, [navigate]);

    const handleDelete = (id) => {
      setUrls((prev) => prev.filter((u) => u._id !== id));
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

            <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
                {/* Header with Back Button */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-2 text-accent hover:text-accent/80 transition mb-6"
                    >
                        <FiArrowLeft size={20} />
                        Back to Dashboard
                    </button>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
                        All Your Links
                    </h1>
                    <p className="text-gray-400 text-base mt-2">
                        Total links created: <span className="text-accent font-bold">{urls.length}</span>
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex items-center justify-center py-16">
                        <div className="w-8 h-8 border-3 border-border border-t-accent rounded-full animate-spin" />
                    </div>
                )}

                {/* Content */}
                {!loading && (
                    <div className="max-h-[600px] overflow-y-auto rounded-lg">
                        <UrlTable urls={urls} onDelete={handleDelete} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllLinks;
