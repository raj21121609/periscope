import { Platform } from 'react-native';

const palette = {
  lavender: '#E6E6FA',
  pastelBlue: '#B0E0E6',
  softPink: '#FFB6C1',
  deepBlue: '#4c669f',
  white: '#FFFFFF',
  glassWhite: 'rgba(255, 255, 255, 0.7)',
  glassDark: 'rgba(20, 20, 40, 0.7)',
  textDark: '#2D3436',
  textLight: '#ECEDEE',
};

// Stress Colors
export const StressColors = {
  calm: '#00b894',    // Green
  normal: '#0984e3',  // Blue
  stressed: '#e17055',// Orange
  high: '#d63031',    // Red
};

export const Colors = {
  light: {
    text: palette.textDark,
    background: '#F0F4F8', // Very light grey/blue for main bg
    tint: palette.deepBlue,
    card: palette.glassWhite,
    icon: '#636e72',
    tabIconDefault: '#b2bec3',
    tabIconSelected: palette.deepBlue,
    primary: palette.deepBlue,
    accent: palette.softPink,
    lavender: palette.lavender,
    pastelBlue: palette.pastelBlue,
  },
  dark: {
    text: palette.textLight,
    background: '#151718',
    tint: palette.lavender,
    card: palette.glassDark,
    icon: '#b2bec3',
    tabIconDefault: '#636e72',
    tabIconSelected: palette.lavender,
    primary: palette.lavender,
    accent: palette.deepBlue,
    lavender: '#6c5ce7',
    pastelBlue: '#0984e3',
  },
};

export const Layout = {
  radius: 24,
  padding: 20,
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
