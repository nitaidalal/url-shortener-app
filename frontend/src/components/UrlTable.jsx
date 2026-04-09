import { useState } from 'react';
import { FiCopy, FiTrash2, FiExternalLink, FiActivity, FiCheck, FiTrendingUp } from 'react-icons/fi';
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

export default function UrlTable({ urls, onDelete }) {
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
      <div className="glass-card p-12 text-center">
        <div className="w-12 h-12 bg-border rounded-2xl flex items-center justify-center mx-auto mb-3">
          <FiActivity className="text-muted" size={20} />
        </div>
        <p className="text-muted text-sm">No URLs shortened yet. Create your first one above!</p>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden animate-fade-in">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h3 className=" font-bold text-white text-base">All Links Details</h3>
        {urls.length > 0 && (
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30">
            <FiTrendingUp className="text-accent" size={16} />
            <span className="text-sm  text-accent">
              {urls.length} URLs created
            </span>
          </div>
        )}{" "}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-surface/60 text-left text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-5 py-3 font-semibold">Shortcode</th>
              <th className="px-5 py-3 font-semibold">Original URL</th>
              <th className="px-5 py-3 font-semibold">Total Clicks</th>
              <th className="px-5 py-3 font-semibold">Created At</th>
              <th className="px-5 py-3 font-semibold">Last Accessed</th>
              <th className="px-5 py-3 font-semibold text-center">Copy</th>
              <th className="px-5 py-3 font-semibold text-center">Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {urls.map((url) => {
              const shortUrl = `${BASE_URL}/${url.shortCode}`;

              return (
                <tr
                  key={url._id}
                  className="hover:bg-surface/40 transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <a
                      href={shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-accent hover:text-accent-light transition-colors inline-flex items-center gap-1"
                    >
                      /{url.shortCode}
                      <FiExternalLink size={12} />
                    </a>
                  </td>

                  <td
                    className="px-5 py-3.5 text-muted"
                    title={url.originalUrl}
                  >
                    {truncate(url.originalUrl, 70)}
                  </td>

                  <td className="px-5 py-3.5">
                    <div className="inline-flex items-center gap-1.5">
                      <FiActivity size={12} className="text-success" />
                      <span className="font-medium text-success">
                        {url.clicks}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-3.5 text-muted whitespace-nowrap">
                    <span title={formatDate(url.createdAt)}>
                      {timeAgo(url.createdAt)}
                    </span>
                  </td>

                  <td className="px-5 py-3.5 text-muted whitespace-nowrap">
                    {url.lastAccessed ? (
                      <span title={formatDate(url.lastAccessed)}>
                        {timeAgo(url.lastAccessed)}
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="px-5 py-3.5 text-center">
                    <button
                      onClick={() => handleCopy(url)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-border text-muted hover:text-accent transition-all"
                      title="Copy short URL"
                    >
                      {copiedId === url._id ? (
                        <FiCheck size={14} />
                      ) : (
                        <FiCopy size={14} />
                      )}
                    </button>
                  </td>

                  <td className="px-5 py-3.5 text-center">
                    <button
                      onClick={() => handleDelete(url)}
                      disabled={deleting === url._id}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-danger/10 text-muted hover:text-danger transition-all disabled:opacity-50"
                      title="Delete URL"
                    >
                      <FiTrash2 size={14} />
                    </button>
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
