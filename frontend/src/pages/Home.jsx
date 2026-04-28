import { Link } from 'react-router-dom';
import { authService } from '../services/api';
import {
  FiLink2,
  FiTrendingUp,
  FiLock,
  FiZap,
  FiShare2,
  FiCheckCircle,
  FiArrowRight,
} from 'react-icons/fi';

export default function Home() {
  const isAuthenticated = authService.isAuthenticated();

  const features = [
    {
      icon: FiLink2,
      title: 'Instant Shortening',
      description: 'Convert long URLs into short, memorable links in seconds',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: FiTrendingUp,
      title: 'Analytics Dashboard',
      description: 'Track clicks, sources, and engagement with detailed insights',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: FiLock,
      title: 'Secure & Private',
      description: 'Your data is encrypted and protected with industry standards',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: FiShare2,
      title: 'Easy Sharing',
      description: 'Share links across social media and messaging platforms',
      color: 'from-pink-500 to-pink-600',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Paste Your URL',
      description: 'Enter any long URL that you want to shorten',
    },
    {
      number: '02',
      title: 'Customize (Optional)',
      description: 'Add a custom alias or set an expiration date',
    },
    {
      number: '03',
      title: 'Share',
      description: 'Copy your short link and share it anywhere',
    },
    {
      number: '04',
      title: 'Track',
      description: 'Monitor clicks and analytics from your dashboard',
    },
  ];

  const stats = [
    { value: '500+', label: 'URLs Shortened' },
    { value: '2K+', label: 'Total Clicks' },
    { value: '99.9%', label: 'Uptime' },
    { value: '24/7', label: 'Support' },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-30"
            style={{
              background:
                'radial-gradient(ellipse at center, #6c63ff 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-20"
            style={{
              background:
                'radial-gradient(ellipse at center, #6c63ff 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 border border-accent/20">
            <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-accent">
              Cutting Edge URL Management
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Short links, <br />
            <span className="bg-gradient-to-r from-accent to-violet-400 bg-clip-text text-transparent">
              cleaner sharing
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Transform long URLs into short, memorable links. Track analytics, customize aliases,
            and manage your digital presence with our powerful URL shortening platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={isAuthenticated ? '/shortener' : '/login'}
              className="group relative px-8 py-3 rounded-xl bg-accent font-semibold text-black overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent/50 flex items-center gap-2"
            >
              <span>Get Started</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/about"
              className="px-8 py-3 rounded-xl border border-accent/30 font-semibold text-gray-100 transition-all duration-300 hover:bg-accent/5 hover:border-accent/50"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-gray-400 text-lg">
              Everything you need to shorten, share, and track your URLs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="glass-card p-8 hover:border-accent/50 transition-all duration-300 group"
                >
                  <div
                    className={`w-14 h-14 rounded-lg bg-gradient-to-br ${feature.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Simple 4-Step Process
            </h2>
            <p className="text-gray-400 text-lg">
              Get started in minutes with our intuitive workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="glass-card p-6 h-full">
                  <div className="text-5xl font-bold bg-gradient-to-br from-accent to-violet-400 bg-clip-text text-transparent mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 -right-4 translate-x-1/2 text-gray-600">
                    <FiArrowRight size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-accent to-violet-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-400 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="mx-auto max-w-3xl">
          <div className="glass-card p-8 sm:p-12 text-center border-accent/30 bg-gradient-to-br from-accent/5 to-violet-400/5">
            <div className="mb-6 flex justify-center">
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <FiCheckCircle
                    key={i}
                    size={20}
                    className="text-accent"
                  />
                ))}
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Join thousands of users who are already shortening and tracking their URLs.
              Start for free today!
            </p>
            <Link
              to={isAuthenticated ? '/shortener' : '/register'}
              className="group inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-accent font-semibold text-black hover:shadow-lg hover:shadow-accent/50 transition-all duration-300"
            >
              <span>Create Your First Short Link</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
