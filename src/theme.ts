export const theme = {
  // Backgrounds
  bg: '#0A1628',
  surface: '#152238',
  surfaceHover: '#1C2D45',
  surfaceBorder: '#2A3A52',
  surfaceRaised: '#1A2940',

  // IBM Blue
  primary: '#0F62FE',
  primaryHover: '#0353E9',
  primaryLight: '#A6C8FF',
  primaryMuted: '#0F62FE33',

  // Text
  text: '#F4F4F4',
  textSecondary: '#A8B4C4',
  textMuted: '#6B7A8D',
  textInverse: '#0A1628',

  // Status
  green: '#42BE65',
  greenBg: '#42BE6520',
  yellow: '#F1C21B',
  yellowBg: '#F1C21B20',
  red: '#DA1E28',
  redBg: '#DA1E2820',
  orange: '#FF832B',
  orangeBg: '#FF832B20',

  // Severity scale
  severityCritical: '#DA1E28',
  severityHigh: '#FF832B',
  severityMedium: '#F1C21B',
  severityLow: '#42BE65',

  // Chart palette
  chart1: '#0F62FE',
  chart2: '#42BE65',
  chart3: '#A56EFF',
  chart4: '#FF832B',
  chart5: '#F1C21B',
  chart6: '#08BDBA',

  // Pipeline
  pipelineIdle: '#3A4A62',
  pipelineActive: '#0F62FE',
  pipelineComplete: '#42BE65',
  pipelineGlow: '#0F62FE66',

  // Spacing
  sp: (n: number) => `${n * 4}px`,
  radius: '8px',
  radiusSm: '4px',
  radiusLg: '12px',
  radiusXl: '16px',

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

  // Shadows
  shadow: '0 2px 8px rgba(0,0,0,0.3)',
  shadowLg: '0 4px 16px rgba(0,0,0,0.4)',
  shadowGlow: '0 0 20px rgba(15,98,254,0.3)',
} as const;

export type Theme = typeof theme;
