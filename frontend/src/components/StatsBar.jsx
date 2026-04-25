import { FiLink, FiActivity, FiClock } from 'react-icons/fi';

export default function StatsBar({ urls }) {
  const totalClicks = urls.reduce((sum, u) => sum + u.clicks, 0);
  const active = urls.filter((u) => !u.expiresAt || new Date(u.expiresAt) > new Date()).length;

  const stats = [
    { label: 'Total Links', value: urls.length, icon: FiLink, iconColor: 'text-accent', bgColor: 'bg-accent/20', borderColor: 'border-accent/30', gradientColor: 'via-accent/30' },
    { label: 'Total Clicks', value: totalClicks, icon: FiActivity, iconColor: 'text-emerald-400', bgColor: 'bg-emerald-500/20', borderColor: 'border-emerald-500/30', gradientColor: 'via-emerald-500/30' },
    { label: 'Active Links', value: active, icon: FiClock, iconColor: 'text-amber-400', bgColor: 'bg-amber-400/20', borderColor: 'border-amber-400/30', gradientColor: 'via-yellow-500/30' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map(({ label, value, icon: Icon, iconColor, bgColor, borderColor, gradientColor }) => (
        <div key={label} className={`glass-card px-5 py-6 border ${borderColor} hover:border-opacity-60 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 group`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-muted text-sm font-medium uppercase tracking-wider mb-2">{label}</p>
              <p className={`text-white  font-bold text-3xl leading-none group-hover:${iconColor} transition-colors duration-300`}>{value.toLocaleString()}</p>
            </div>
            <div className={`shrink-0 rounded-2xl p-4 ${bgColor} group-hover:scale-110 transition-transform duration-300`}>
              <Icon className={`${iconColor}`} size={24} />
            </div>
          </div>
          <div className={`mt-4 h-1 bg-gradient-to-r from-transparent ${gradientColor} to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        </div>
      ))}
    </div>
  );
}
