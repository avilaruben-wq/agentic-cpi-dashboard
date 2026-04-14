// IBM Carbon Design System — Light Theme
export const theme = {
  // Backgrounds (Carbon Gray scale)
  bg: '#f4f4f4',
  surface: '#ffffff',
  surfaceHover: '#e8e8e8',
  surfaceBorder: '#e0e0e0',
  surfaceRaised: '#f4f4f4',

  // IBM Blue
  primary: '#0f62fe',
  primaryHover: '#0353E9',
  primaryLight: '#d0e2ff',
  primaryMuted: '#0f62fe15',

  // Text (Carbon)
  text: '#161616',
  textSecondary: '#525252',
  textMuted: '#8d8d8d',
  textInverse: '#ffffff',
  textOnColor: '#ffffff',

  // Status
  green: '#198038',
  greenBg: '#defbe6',
  yellow: '#b28600',
  yellowBg: '#fdf6dd',
  red: '#da1e28',
  redBg: '#fff1f1',
  orange: '#ba4e00',
  orangeBg: '#fff2e8',

  // Severity scale
  severityCritical: '#da1e28',
  severityHigh: '#ba4e00',
  severityMedium: '#b28600',
  severityLow: '#198038',

  // Chart palette (Carbon data viz)
  chart1: '#0f62fe',
  chart2: '#198038',
  chart3: '#8a3ffc',
  chart4: '#ba4e00',
  chart5: '#b28600',
  chart6: '#009d9a',

  // Pipeline
  pipelineIdle: '#c6c6c6',
  pipelineActive: '#0f62fe',
  pipelineComplete: '#198038',
  pipelineGlow: '#0f62fe40',

  // Spacing
  sp: (n: number) => `${n * 4}px`,
  radius: '4px',
  radiusSm: '2px',
  radiusLg: '8px',
  radiusXl: '12px',

  // Typography
  fontMono: "'IBM Plex Mono', monospace",
  fontSize: {
    xs: '11px',
    sm: '12px',
    base: '14px',
    md: '16px',
    lg: '20px',
    xl: '24px',
    xxl: '32px',
    hero: '48px',
  },
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Shadows (subtle for light theme)
  shadow: '0 1px 3px rgba(0,0,0,0.08)',
  shadowLg: '0 2px 6px rgba(0,0,0,0.1)',
  shadowGlow: '0 0 0 3px rgba(15,98,254,0.15)',

  // IBM-specific
  headerBg: '#161616',
  headerText: '#f4f4f4',
} as const;

export type Theme = typeof theme;
