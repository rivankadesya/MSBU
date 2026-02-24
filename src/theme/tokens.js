export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 9999,
};

export const lightColors = {
  primary: '#2563eb',
  primaryDark: '#1d4ed8',
  background: '#f8fafc',
  surface: '#ffffff',
  text: '#0f172a',
  textSecondary: '#64748b',
  border: '#e2e8f0',
  error: '#dc2626',
  success: '#16a34a',
  muted: '#94a3b8',
  shadow: '#0f172a',
};

export const darkColors = {
  primary: '#60a5fa',
  primaryDark: '#3b82f6',
  background: '#0b1220',
  surface: '#0f172a',
  text: '#e5e7eb',
  textSecondary: '#94a3b8',
  border: '#1f2a44',
  error: '#f87171',
  success: '#22c55e',
  muted: '#64748b',
  shadow: '#000000',
};

export function getColors(mode) {
  return mode === 'dark' ? darkColors : lightColors;
}

export function shadow(level = 1, colors) {
  const c = colors?.shadow || '#000';
  const opacity = level === 1 ? 0.08 : 0.14;
  const radius = level === 1 ? 10 : 14;
  const height = level === 1 ? 6 : 10;
  return {
    shadowColor: c,
    shadowOpacity: opacity,
    shadowRadius: radius,
    shadowOffset: { width: 0, height },
    elevation: level === 1 ? 2 : 4,
  };
}

