import React from 'react';
import { theme } from '../../theme';

interface SeverityBadgeProps {
  level: 'critical' | 'high' | 'medium' | 'low';
  label?: string;
}

const config = {
  critical: { bg: theme.redBg, color: theme.red, text: 'CRITSIT' },
  high: { bg: theme.orangeBg, color: theme.orange, text: 'HIGH' },
  medium: { bg: theme.yellowBg, color: theme.yellow, text: 'MEDIUM' },
  low: { bg: theme.greenBg, color: theme.green, text: 'LOW' },
};

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({ level, label }) => {
  const c = config[level];
  return (
    <span style={{
      display: 'inline-block',
      padding: `1px ${theme.sp(2)}`,
      borderRadius: theme.radiusSm,
      background: c.bg,
      color: c.color,
      fontSize: theme.fontSize.xs,
      fontWeight: theme.fontWeight.medium,
      letterSpacing: '0.32px',
    }}>
      {label || c.text}
    </span>
  );
};
