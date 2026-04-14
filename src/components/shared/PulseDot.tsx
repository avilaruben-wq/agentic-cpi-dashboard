import React from 'react';
import { theme } from '../../theme';

interface PulseDotProps {
  color?: string;
  size?: number;
  label?: string;
}

export const PulseDot: React.FC<PulseDotProps> = ({ color = theme.green, size = 8, label }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: theme.sp(1) }}>
    <span style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: color,
      display: 'inline-block',
      animation: 'pulse 2s ease-in-out infinite',
    }} />
    {label && (
      <span style={{ fontSize: theme.fontSize.xs, color: theme.textMuted }}>{label}</span>
    )}
  </span>
);
