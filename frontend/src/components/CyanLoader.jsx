export default function CyanLoader({ size = 'md', label = '', className = '', tone = 'cyan' }) {
  const sizeMap = {
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  const dotSizeMap = {
    sm: 'h-1.5 w-1.5',
    md: 'h-2 w-2',
    lg: 'h-2.5 w-2.5',
    xl: 'h-3 w-3',
  };

  const toneVars = {
    cyan: {
      '--loader-color': 'var(--color-cyan)',
      '--loader-track': 'rgba(0, 229, 255, 0.14)',
      '--loader-orbit': 'rgba(0, 229, 255, 0.16)',
      '--loader-glow': 'rgba(0, 229, 255, 0.2)',
      '--loader-core-glow': 'rgba(0, 229, 255, 0.8)',
      '--loader-label': '#9ca3af',
    },
    dark: {
      '--loader-color': '#06171c',
      '--loader-track': 'rgba(6, 23, 28, 0.26)',
      '--loader-orbit': 'rgba(6, 23, 28, 0.22)',
      '--loader-glow': 'rgba(6, 23, 28, 0.24)',
      '--loader-core-glow': 'rgba(6, 23, 28, 0.5)',
      '--loader-label': '#06171c',
    },
    light: {
      '--loader-color': '#f8fcff',
      '--loader-track': 'rgba(248, 252, 255, 0.3)',
      '--loader-orbit': 'rgba(248, 252, 255, 0.3)',
      '--loader-glow': 'rgba(248, 252, 255, 0.3)',
      '--loader-core-glow': 'rgba(248, 252, 255, 0.7)',
      '--loader-label': '#f8fcff',
    },
  };

  const style = toneVars[tone] || toneVars.cyan;

  return (
    <div
      className={`cyan-loader ${className}`}
      style={style}
      role="status"
      aria-live="polite"
      aria-label={label || 'Loading'}
    >
      <div className={`relative ${sizeMap[size] || sizeMap.md} flex items-center justify-center`}>
        <span className={`absolute ${sizeMap[size] || sizeMap.md} cyan-loader-ring`} />
        <span className={`absolute ${dotSizeMap[size] || dotSizeMap.md} cyan-loader-core`} />
        <span className={`absolute ${sizeMap[size] || sizeMap.md} cyan-loader-orbit`} />
      </div>

      {label ? (
        <span className="ml-3 text-sm font-medium" style={{ color: 'var(--loader-label)' }}>
          {label}
        </span>
      ) : null}
    </div>
  );
}