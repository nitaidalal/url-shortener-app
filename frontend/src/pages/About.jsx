import {
  FiLink2,
  FiBarChart2,
  FiShield,
  FiZap,
  FiUsers,
  FiTrendingUp,
  FiSmartphone,
  FiGlobe,
  FiArrowRight,
} from "react-icons/fi";

export default function About() {
  const features = [
    {
      icon: FiLink2,
      title: "URL Shortening",
      description:
        "Create short, memorable links instantly with custom slugs or auto-generated codes.",
    },
    {
      icon: FiBarChart2,
      title: "Real-time Analytics",
      description:
        "Track every click with detailed statistics and performance metrics.",
    },
    {
      icon: FiSmartphone,
      title: "Device Tracking",
      description:
        "Monitor clicks by device type - Desktop, Mobile, Tablet, and more.",
    },
    {
      icon: FiGlobe,
      title: "Traffic Source Detection",
      description:
        "Identify where your traffic comes from - WhatsApp, Instagram, Facebook, Google, and more.",
    },
    {
      icon: FiZap,
      title: "Instant Redirects",
      description:
        "Lightning-fast redirects with automatic click tracking on every visit.",
    },
    {
      icon: FiUsers,
      title: "User Dashboard",
      description:
        "Manage all your links in one place with detailed performance insights.",
    },
  ];

  const stats = [
    { label: "LINKS CREATED", value: "500+" },
    { label: "REAL-TIME ANALYTICS", value: "🔥" },
    { label: "TRACKED METRICS", value: "8+" },
  ];

  return (
    <div className="min-h-screen relative bg-ink">
      {/* Decorative glow */}
      <div
        className="absolute -top-20 left-1/2  -translate-x-1/2 w-[600px] h-[400px] pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--color-cyan) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-16 animate-fade-in">
          {/* Logo and Label */}
          <div className="flex items-center justify-center mb-8">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-2">
              <FiZap className="text-accent" size={16} />
              <span className="text-accent text-sm font-semibold">
                URL SHORTENER
              </span>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-4">
              About <span className="text-accent">Snip</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Snip is a modern URL shortener that combines powerful analytics,
              beautiful design, and user-friendly features to help you track,
              manage, and optimize your links.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-16 animate-fade-in">
          <div className="glass-card p-8 sm:p-12 border border-accent/20">
            <div className="text-accent text-sm font-bold uppercase tracking-widest mb-4">
              Our Purpose
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
              Our Mission
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                We believe URL management should be simple, secure, and
                insightful. Snip transforms ordinary links into powerful
                marketing tools by providing real-time analytics, intuitive
                dashboards, and reliable tracking — all in one place.
              </p>
              <p>
                Whether you're sharing content on social media, running a
                marketing campaign, or organizing your digital presence, Snip
                gives you the tools to succeed.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16 animate-fade-in">
          <div className="mb-10">
            <div className="text-accent text-sm font-bold uppercase tracking-widest mb-4">
              What We Offer
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-gray-400">
              Everything you need to shorten, share, and track your links in one
              elegant platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="glass-card p-8 border border-accent/20 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors flex items-center justify-center mb-4">
                    <Icon className="text-accent" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-16 animate-fade-in">
          <div className="glass-card p-12 sm:p-16 text-center border border-accent/20 bg-gradient-to-r from-accent/5 to-transparent">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
              Ready to Shorten Your Links?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg">
              Start creating short links and tracking analytics in seconds. No
              credit card required.
            </p>
            <a
              href="/shortener"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-black font-bold rounded-xl hover:bg-accent/90 transition-all transform hover:scale-105 text-lg"
            >
              Create Your First Link
              <FiArrowRight size={20} />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
