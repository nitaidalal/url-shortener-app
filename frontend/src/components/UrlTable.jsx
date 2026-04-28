import { useState } from 'react';
import { FiCopy, FiTrash2, FiExternalLink, FiActivity, FiCheck, FiTrendingUp, FiCalendar, FiLink } from 'react-icons/fi';
import { urlService, BASE_URL } from '../services/api';
import toast from 'react-hot-toast';

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function truncate(str, n = 40) {
  return str.length > n ? str.slice(0, n) + '…' : str;
}

function formatDate(dateStr) {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toLocaleString();
}

export default function UrlTable({ urls, onDelete, totalCount }) {
  const [copiedId, setCopiedId] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const handleCopy = (url) => {
    const shortUrl = `${BASE_URL}/${url.shortCode}`;
    navigator.clipboard.writeText(shortUrl);
    setCopiedId(url._id);
    toast.success('Copied!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (url) => {
    if (!window.confirm(`Delete /${url.shortCode}? This cannot be undone.`)) return;
    setDeleting(url._id);
    try {
      await urlService.delete(url._id);
      toast.success('URL deleted');
      onDelete(url._id);
    } catch {
      toast.error('Failed to delete');
    } finally {
      setDeleting(null);
    }
  };

  if (!urls.length) {
    return (
      <div className="glass-card p-16 text-center">
        <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FiLink className="text-accent" size={32} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No URLs shortened yet</h3>
        <p className="text-muted max-w-sm mx-auto">Start creating your first shortened URL to see it appear here. Track clicks, manage aliases, and share with ease.</p>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="px-6 py-5 border-b border-border/50 bg-gradient-to-r from-surface/40 to-surface/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <FiLink className="text-accent" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Recent Links Details</h3>
              <p className="text-muted text-xs mt-0.5">Manage and track your shortened URLs</p>
            </div>
          </div>
          {urls.length > 0 && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 border border-accent/30">
              <FiTrendingUp className="text-accent" size={16} />
              <span className="text-sm font-semibold text-accent">
                {totalCount || urls.length}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-surface/30 border-b border-border/50">
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted uppercase tracking-wider">Shortcode</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted uppercase tracking-wider">Original URL</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted uppercase tracking-wider">Clicks</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted uppercase tracking-wider">Created</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted uppercase tracking-wider">Last Accessed</th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-muted uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {urls.map((url, index) => {
              const shortUrl = `${BASE_URL}/${url.shortCode}`;
              const isHighClicks = url.clicks > 5;

              return (
                <tr
                  key={url._id}
                  className="hover:bg-surface/40 transition-all duration-200 group"
                >
                  {/* Shortcode */}
                  <td className="px-6 py-4">
                    <a
                      href={shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm gap-2 px-3 py-1.5 bg-accent/10 border border-accent/30 rounded-lg hover:bg-accent/20 hover:border-accent/50 transition-all"
                    >
                      <span className="font-mono font-semibold text-accent">/{url.shortCode}</span>
                      <FiExternalLink size={13} className="opacity-60 group-hover:opacity-100" />
                    </a>
                  </td>

                  {/* Original URL */}
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <a 
                        href={url.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={url.originalUrl}
                        className="text-muted hover:text-accent transition-colors text-sm truncate block"
                      >
                        {truncate(url.originalUrl, 50)}
                      </a>
                    </div>
                  </td>

                  {/* Clicks */}
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-md ${
                      isHighClicks 
                        ? 'bg-success/15 text-success' 
                        : 'bg-muted/10 text-muted'
                    }`}>
                      <FiActivity size={14} />
                      <span className="font-semibold text-sm">{url.clicks}</span>
                    </div>
                  </td>

                  {/* Created At */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-muted text-sm">
                      <FiCalendar size={13} className="opacity-60" />
                      <span title={formatDate(url.createdAt)}>
                        {timeAgo(url.createdAt)}
                      </span>
                    </div>
                  </td>

                  {/* Last Accessed */}
                  <td className="px-6 py-4">
                    <div className="text-muted text-sm">
                      {url.lastAccessed ? (
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-success/60 rounded-full"></div>
                          <span title={formatDate(url.lastAccessed)}>
                            {timeAgo(url.lastAccessed)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-muted/50">No access</span>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleCopy(url)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 hover:bg-accent/20 border border-accent/30 hover:border-accent/50 text-accent transition-all duration-200 hover:scale-105"
                        title="Copy short URL"
                      >
                        {copiedId === url._id ? (
                          <FiCheck size={16} className="text-success" />
                        ) : (
                          <FiCopy size={16} />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(url)}
                        disabled={deleting === url._id}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-danger/10 hover:bg-danger/20 border border-danger/30 hover:border-danger/50 text-danger transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete URL"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
