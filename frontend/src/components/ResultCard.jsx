import { useState } from 'react';
import { FiCopy, FiCheck, FiExternalLink } from 'react-icons/fi';
import { BASE_URL } from '../services/api';
import toast from 'react-hot-toast';

export default function ResultCard({ url }) {
  const [copied, setCopied] = useState(false);
  const shortUrl = `${BASE_URL}/${url.shortCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card p-5 border-accent/30 animate-pulse-glow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted mb-1">Your shortened link</p>
          <p className="font-mono text-accent text-lg font-medium truncate">{shortUrl}</p>
          <p className="text-xs text-muted mt-1 truncate">{url.originalUrl}</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={handleCopy}
            className="w-9 h-9 bg-accent-dim hover:bg-accent/20 rounded-lg flex items-center justify-center transition-all text-accent"
            title="Copy"
          >
            {copied ? <FiCheck size={15} /> : <FiCopy size={15} />}
          </button>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 bg-surface hover:bg-border rounded-lg flex items-center justify-center transition-all text-muted hover:text-white"
            title="Open"
          >
            <FiExternalLink size={15} />
          </a>
        </div>
      </div>
    </div>
  );
}
