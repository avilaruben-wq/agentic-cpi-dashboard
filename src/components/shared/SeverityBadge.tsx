import React from 'react';
import { theme } from '../../theme';

interface SeverityBadgeProps {
  level: 'critical' | 'high' | 'medium' | 'low';
  label?: string;
}

const config = {
  critical: { bg: theme.redBg, color: theme.red, border: theme.red, text: 'CRITSIT' },
  high: { bg: theme.orangeBg, color: theme.orange, border: theme.orange, text: 'HIGH' },
  medium: { bg: theme.yellowBg, color: theme.yellow, border: theme.yellow, text: 'MEDIUM' },
  low: { bg: theme.greenBg, color: theme.green, border: theme.green, text: 'LOW' },
};

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({ level, label }) => {
  const c = config[level];
  return (
    <span style={{
      display: 'inline-block',
      padding: `2px ${theme.sp(2)}`,
      borderRadius: theme.radiusSm,
      background: c.bg,
      color: c.color,
      border: `1px solid ${c.border}40`,
      fontSize: theme.fontSize.xs,
      fontWeight: theme.fontWeight.semibold,
      letterSpacing: '0.5px',
      lineHeight: '16px',
    }}>
      {label || c.text}
    </span>
  );
};
