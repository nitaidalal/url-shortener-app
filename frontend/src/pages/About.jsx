import { FiLink2, FiBarChart2, FiShield, FiZap, FiUsers, FiTrendingUp, FiSmartphone, FiGlobe } from 'react-icons/fi';

export default function About() {
  const features = [
    {
      icon: FiLink2,
      title: 'URL Shortening',
      description: 'Create short, memorable links instantly with custom slugs or auto-generated codes.',
    },
    {
      icon: FiBarChart2,
      title: 'Real-time Analytics',
      description: 'Track every click with detailed statistics and performance metrics.',
    },
    {
      icon: FiSmartphone,
      title: 'Device Tracking',
      description: 'Monitor clicks by device type - Desktop, Mobile, Tablet, and more.',
    },
    {
      icon: FiGlobe,
      title: 'Traffic Source Detection',
      description: 'Identify where your traffic comes from - WhatsApp, Instagram, Facebook, Google, and more.',
    },
    {
      icon: FiZap,
      title: 'Instant Redirects',
      description: 'Lightning-fast redirects with automatic click tracking on every visit.',
    },
    {
      icon: FiUsers,
      title: 'User Dashboard',
      description: 'Manage all your links in one place with detailed performance insights.',
    },
  ];

  const analyticsMetrics = [
    {
      title: 'Total Clicks',
      description: 'Complete count of all clicks across your shortened links',
    },
    {
      title: 'Unique Visitors',
      description: 'Number of distinct visitors who clicked your links',
    },
    {
      title: 'Best Performing Link',
      description: 'Your most popular link with the highest click count',
    },
    {
      title: 'Click Growth',
      description: 'Track growth percentage compared to previous periods',
    },
    {
      title: 'Device Breakdown',
      description: 'Visual breakdown of clicks by device type (Mobile, Desktop, Tablet)',
    },
    {
      title: 'Traffic Sources',
      description: 'See which platforms are driving your traffic (Social media, Search, Direct)',
    },
    {
      title: 'Top 5 Links',
      description: 'Quick view of your best performing shortened links',
    },
    {
      title: 'Recent Activity',
      description: 'Latest clicks with timestamps and source information',
    },
  ];

  const timeRanges = [
    { label: '7 Days', description: 'Last week performance' },
    { label: '30 Days', description: 'Monthly insights' },
    { label: 'All Time', description: 'Complete statistics' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 flex justify-between items-center">
        <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-accent/20 to-transparent ">
          <img src="logo.png" alt="" />
        </div>
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4">
              About <span className="text-accent">Snip</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl">
              Snip is a modern URL shortener that combines powerful analytics, beautiful design, and user-friendly features to help you track, manage, and optimize your links.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 sm:py-16 mb-8">
        <div className="glass-card p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            We believe URL management should be simple, secure, and insightful. Snip transforms ordinary links into powerful marketing tools by providing real-time analytics, intuitive dashboards, and reliable tracking—all in one place.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Whether you're sharing content on social media, running a marketing campaign, or organizing your digital presence, Snip gives you the tools to succeed.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">Powerful Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="glass-card p-6 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors flex items-center justify-center mb-4">
                  <Icon className="text-accent" size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Analytics Section */}
      <section className="py-12 sm:py-16 mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">Comprehensive Analytics</h2>
        <p className="text-gray-300 mb-8 max-w-3xl">
          Our analytics dashboard provides deep insights into your link performance. Track metrics across multiple time ranges and understand your audience better.
        </p>

        {/* Time Range Options */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-white mb-4">Flexible Time Ranges</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {timeRanges.map((range, idx) => (
              <div key={idx} className="glass-card p-6 text-center">
                <h4 className="text-lg font-semibold text-accent mb-2">{range.label}</h4>
                <p className="text-gray-400 text-sm">{range.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Metrics Grid */}
        <h3 className="text-xl font-bold text-white mb-4">Tracked Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {analyticsMetrics.map((metric, idx) => (
            <div key={idx} className="glass-card p-6 border border-border hover:border-accent/50 transition">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white mb-1">{metric.title}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">{metric.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Security Section */}
      <section className="py-12 sm:py-16 mb-8">
        <div className="glass-card p-8 sm:p-12 border border-accent/20">
          <div className="flex gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
              <FiShield className="text-accent" size={24} />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Security & Privacy</h2>
            </div>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>
              <span className="font-semibold text-white">Secure Authentication:</span> Your account is protected with HTTP-only cookies and secure session management.
            </p>
            <p>
              <span className="font-semibold text-white">Privacy First:</span> Each user sees only their own links and analytics. Your data is never shared or sold.
            </p>
            <p>
              <span className="font-semibold text-white">Data Protection:</span> We collect only essential analytics data (device type, traffic source, timestamps) - never storing raw user agents or unnecessary information.
            </p>
            <p>
              <span className="font-semibold text-white">HTTPS Only:</span> All connections are encrypted and transmitted securely over HTTPS.
            </p>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-12 sm:py-16">
        <div className="glass-card p-12 text-center border border-accent/20 bg-gradient-to-r from-accent/5 to-transparent">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Shorten Your Links?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Start creating short links and tracking analytics in seconds. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/shortener"
              className="px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-light transition transform hover:scale-105"
            >
              Create Your First Link
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
