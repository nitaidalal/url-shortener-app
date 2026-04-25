import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, api } from '../services/api';
import {
  FiTrendingUp,
  FiUsers,
  FiLink2,
  FiZap,
  FiCalendar,
  FiArrowRight,
} from 'react-icons/fi';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

//import social media icons
import { FaWhatsapp, FaInstagram, FaFacebook, FaGoogle } from 'react-icons/fa';

const WhatsApp = () => <FaWhatsapp size={30} color="#25D366" />;
const Instagram = () => <FaInstagram size={30} color="#E4405F" />;
const Facebook = () => <FaFacebook size={30} color="#1877F2" />;
const Google = () => <FaGoogle size={30} color="#4285F4" />;
const Analytics = () => {
  const [user, setUser] = useState(null);
  const [timeRange, setTimeRange] = useState('7d');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch analytics when component mounts or timeRange changes
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser);
  }, [navigate]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await api.get('/analytics', {
          params: { timeRange: timeRange },
        });
        console.log('Analytics API response:', response.data);
        setAnalyticsData(response.data);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
        setAnalyticsData(null);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchAnalytics();
    }
  }, [timeRange, user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-border border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  // Empty State - if no analytics data
  if (!analyticsData || analyticsData.stats.totalClicks === 0) {
    return (
      <div className="min-h-screen bg-ink">
        {/* Decorative glow */}
        <div
          className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none opacity-20"
          style={{
            background:
              'radial-gradient(ellipse at center, #6c63ff 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
          <div className="glass-card p-16 text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FiArrowRight className="text-accent" size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              No traffic data yet
            </h3>
            <p className="text-muted max-w-md mx-auto">
              Share your links to start tracking analytics. Clicks, visitors, and
              traffic sources will appear here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Extract data from API response
  const { stats, clicksOverTime, topLinks, deviceBreakdown, sourceBreakdown, recentActivity } = analyticsData;

  // Format device breakdown for pie chart
  const deviceChartData = [
    { name: 'Mobile', value: deviceBreakdown.Mobile, color: '#6c63ff' },
    { name: 'Desktop', value: deviceBreakdown.Desktop, color: '#8b85ff' },
    { name: 'Tablet', value: deviceBreakdown.Tablet, color: '#a59fff' },
  ].filter(item => item.value > 0);

  // Format traffic sources for cards
  const trafficSourcesCards = [
    { name: 'WhatsApp', value: sourceBreakdown.WhatsApp, icon: WhatsApp, color: '' },
    { name: 'Instagram', value: sourceBreakdown.Instagram, icon: Instagram, color: '' },
    { name: 'Facebook', value: sourceBreakdown.Facebook, icon: Facebook, color: '' },
    { name: 'Direct', value: sourceBreakdown.Direct, icon: '🔗', color: 'from-purple-600 to-purple-400' },
    { name: 'Google', value: sourceBreakdown.Google, icon: Google, color: '' },
  ];

  // Format stats cards
  const statsCards = [
    {
      title: 'Total Clicks',
      value: stats.totalClicks.toLocaleString(),
      change: stats.growth >= 0 ? `+${stats.growth}%` : `${stats.growth}%`,
      icon: FiZap,
      color: 'from-orange-600 to-yellow-400',
    },
    {
      title: 'Unique Visitors',
      value: stats.uniqueVisitors.toLocaleString(),
      change: '+5.2%',
      icon: FiUsers,
      color: 'from-blue-600 to-blue-400',
    },
    {
      title: 'Best Link',
      value: stats.bestLink,
      change: `${topLinks[0]?.clicks || 0} clicks`,
      icon: FiLink2,
      color: 'from-pink-600 to-pink-400',
    },
    {
      title: 'Growth',
      value: `${stats.growth}%`,
      change: 'vs last period',
      icon: FiTrendingUp,
      color: 'from-green-600 to-green-400',
    },
  ];

  return (
    <div className="min-h-screen bg-ink">
      {/* Decorative glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none opacity-20"
        style={{
          background:
            'radial-gradient(ellipse at center, #6c63ff 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-10 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-6">
            <div className="flex-1">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-2">
                Analytics <span className="text-accent">Overview</span>
              </h1>
              <p className="text-gray-400 text-base">
                Track clicks, traffic sources, and link performance
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 flex-wrap">
              {[
                { label: '7D', value: '7d' },
                { label: '30D', value: '30d' },
                { label: 'All Time', value: 'all' },
              ].map((btn) => (
                <button
                  key={btn.value}
                  onClick={() => setTimeRange(btn.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                    timeRange === btn.value
                      ? 'bg-accent text-white'
                      : 'bg-card border border-border text-muted hover:text-white hover:border-accent'
                  }`}
                >
                  <FiCalendar size={16} />
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fade-in">
          {statsCards.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="glass-card p-6 group hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} opacity-70 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center`}
                  >
                    <Icon className="text-white" size={24} />
                  </div>
                  <span className="text-success text-sm font-semibold">
                    {stat.change}
                  </span>
                </div>
                <p className="text-muted text-sm mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 animate-fade-in">
          {/* Line Chart - Clicks Trend */}
          <div className="lg:col-span-2 glass-card p-6">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-white">Clicks Over Time</h2>
              <p className="text-muted text-sm">Daily click trends</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <LineChart data={clicksOverTime} margin={{ bottom: 20, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#252535" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#6b6b88" 
                    angle={(timeRange === '30d' || timeRange === 'all') ? -45 : 0}
                    textAnchor={(timeRange === '30d' || timeRange === 'all') ? "end" : "middle"}
                    height={(timeRange === '30d' || timeRange === 'all') ? 80 : 30}
                    tick={{ fontSize: 12 }}
                    interval={
                      timeRange === 'all' 
                        ? Math.max(Math.ceil(clicksOverTime.length / 12) - 1, 0)
                        : (timeRange === '30d' ? 4 : 0)
                    }
                  />
                  <YAxis stroke="#6b6b88" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#16161f',
                      border: '1px solid #252535',
                      borderRadius: '8px',
                      color: '#e8e8f0',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="clicks"
                    stroke="#6c63ff"
                    strokeWidth={3}
                    dot={{ fill: '#6c63ff', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart - Device Usage */}
          <div className="glass-card p-6">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-white">Device Usage</h2>
              <p className="text-muted text-sm">Traffic breakdown</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <PieChart>
                  <Pie
                    data={deviceChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {deviceChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#16161f',
                      border: '1px solid #252535',
                      borderRadius: '8px',
                      color: '#e8e8f0',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {deviceChartData.map((device, idx) => {
                const total = deviceChartData.reduce((sum, d) => sum + d.value, 0);
                const percentage = total > 0 ? Math.round((device.value / total) * 100) : 0;
                return (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: device.color }}
                      />
                      <span className="text-muted">{device.name}</span>
                    </div>
                    <span className="text-white font-semibold">{percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bar Chart - Top Links */}
        <div className="glass-card p-6 mb-8 animate-fade-in">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-white">Top 5 Performing Links</h2>
            <p className="text-muted text-sm">Most clicked links</p>
          </div>
          <div className="h-64">
            {topLinks.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <BarChart data={topLinks}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#252535" />
                  <XAxis dataKey="name" stroke="#6b6b88" />
                  <YAxis stroke="#6b6b88" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#16161f',
                      border: '1px solid #252535',
                      borderRadius: '8px',
                      color: '#e8e8f0',
                    }}
                  />
                  <Bar dataKey="clicks" fill="#6c63ff" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted">
                No data available
              </div>
            )}
          </div>
        </div>

        {/* Traffic Sources Section */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-lg font-bold text-white mb-4">Traffic Sources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {trafficSourcesCards.map((source, idx) => (
              <div
                key={idx}
                className="glass-card p-4 hover:border-accent/50 transition-all duration-300 group cursor-pointer"
              >
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${source.color} opacity-70 group-hover:opacity-90 flex items-center justify-center mb-3 transition-all`}
                >
                  <span className="text-lg">{ typeof source.icon === 'function' ?<source.icon /> : source.icon}</span>
                </div>
                <p className="text-muted text-sm mb-1">{source.name}</p>
                <p className="text-2xl font-bold text-white">{source.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="glass-card p-6 animate-fade-in">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-white">Recent Activity</h2>
            <p className="text-muted text-sm">Latest clicks on your links</p>
          </div>

          {recentActivity.length > 0 ? (
            <>
              {/* Table - Desktop */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-muted text-sm font-semibold">
                        Short Link
                      </th>
                      <th className="text-left py-3 px-4 text-muted text-sm font-semibold">
                        Clicked From
                      </th>
                      <th className="text-left py-3 px-4 text-muted text-sm font-semibold">
                        Device
                      </th>
                      <th className="text-left py-3 px-4 text-muted text-sm font-semibold">
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivity.map((activity, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-border/50 hover:bg-surface/50 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <code className="text-accent font-mono text-sm">
                            {activity.shortLink}
                          </code>
                        </td>
                        <td className="py-3 px-4 text-white text-sm">
                          {activity.source}
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-3 py-1 bg-accent/10 text-accent rounded-lg text-xs font-medium">
                            {activity.device}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-muted text-sm">{activity.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-3">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="border border-border rounded-lg p-4 bg-surface/30">
                    <div className="flex items-start justify-between mb-2">
                      <code className="text-accent font-mono text-sm">
                        {activity.shortLink}
                      </code>
                      <span className="text-muted text-xs">{activity.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm">{activity.source}</span>
                      <span className="px-2 py-1 bg-accent/10 text-accent rounded text-xs font-medium">
                        {activity.device}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-muted">
              No recent activity yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
