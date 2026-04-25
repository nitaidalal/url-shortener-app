import { NavLink } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Create', path: '/shortener' },
  ];

  const social = [
    { icon: FiGithub, href: 'https://github.com/nitaidalal', label: 'GitHub' },
    { icon: FiTwitter, href: 'https://twitter.com/nitaidalal', label: 'Twitter' },
    { icon: FiLinkedin, href: 'https://linkedin.com/in/nitaidalal', label: 'LinkedIn' },
    { icon: FiMail, href: 'mailto:dalalnitai7@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="border-t border-border bg-gradient-to-tr from-black via-slate-950 to-black mt-16">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-3   gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div
              onClick={() => <NavLink to="/" />}
              className="flex items-center gap-2 mb-4"
            >
              <img src="./logo.png" alt="logo" className="h-8" />
              <span className="text-xl font-bold text-white">Snip</span>
            </div>
            <p className="text-muted text-sm lg:w-[250px]">
              Fast, simple, and free URL shortener to track clicks and traffic.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigate</h3>
            <ul className="space-y-2">
              {links.map((link, idx) => (
                <li key={idx}>
                  <NavLink
                    to={link.path}
                    className="text-muted text-sm hover:text-accent transition"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Follow</h3>
            <div className="flex gap-3">
              {social.map((soc, idx) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={idx}
                    href={soc.href}
                    className="w-10 h-10 rounded-lg bg-card border border-border text-muted hover:text-accent hover:border-accent transition flex items-center justify-center"
                    title={soc.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8" />

        {/* Bottom Section */}
        <div className="text-center text-sm text-muted">
          <p>&copy; {currentYear} Snip. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
