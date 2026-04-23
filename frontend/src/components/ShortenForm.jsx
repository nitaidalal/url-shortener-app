import { useState } from 'react';
import { FiLink, FiZap, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { urlService } from '../services/api';
import toast from 'react-hot-toast';

export default function ShortenForm({ onSuccess }) {
  const [url, setUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [expiry, setExpiry] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    try {
      const result = await urlService.shorten({
        originalUrl: url.trim(),
        customAlias: alias.trim() || undefined,
        expiresInDays: expiry ? parseInt(expiry) : undefined,
      });
      toast.success('URL shortened successfully!');
      onSuccess(result);
      setUrl('');
      setAlias('');
      setExpiry('');
      setShowOptions(false);
    } catch (err) {
      const msg = err.response?.data?.error || 'Something went wrong.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-6 animate-pulse-glow">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 bg-accent-dim rounded-lg flex items-center justify-center">
          <FiZap className="text-accent" size={18} />
        </div>
        <div>
          <h2 className="font-display text-lg font-bold text-white">
            Shorten a URL
          </h2>
          <p className="text-muted text-xs">Paste your long URL below</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Main URL Input */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <FiLink
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              size={15}
            />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-very-long-url.com/goes/here"
              className="input-field pl-10 font-mono text-sm"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 whitespace-nowrap"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Shortening
              </span>
            ) : (
              <>
                <FiZap size={15} />
                Snip it
              </>
            )}
          </button>
        </div>

        {/* Advanced Options Toggle */}
        <button
          type="button"
          onClick={() => setShowOptions(!showOptions)}
          className="text-xs text-muted hover:text-white transition-colors flex items-center gap-1 ml-1"
        >
          {showOptions ? (
            <FiChevronUp size={12} />
          ) : (
            <FiChevronDown size={12} />
          )}
          Advanced options
        </button>

        {/* Advanced Options */}
        {showOptions && (
          <div className="grid grid-cols-2 gap-3 pt-1 animate-fade-in">
            <div>
              <label className="text-xs text-muted mb-1.5 block">
                Custom alias
              </label>
              <input
                type="text"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                placeholder="my-custom-link"
                className="input-field text-sm font-mono"
              />
            </div>
            <div>
              <label className="text-xs text-muted mb-1.5 block">
                Expires in (days)
              </label>
              <input
                type="number"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="e.g. 30"
                min="1"
                max="365"
                className="input-field text-sm"
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
