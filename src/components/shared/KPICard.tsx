import React from 'react';
import { theme } from '../../theme';

interface KPICardProps {
  label: string;
  value: string;
  delta?: string;
  deltaDirection?: 'up' | 'down' | 'neutral';
  icon?: string;
  accent?: string;
}

export const KPICard: React.FC<KPICardProps> = ({ label, value, delta, deltaDirection, icon, accent }) => {
  const deltaColor = deltaDirection === 'up' ? theme.green
    : deltaDirection === 'down' ? theme.red
    : theme.textMuted;

  return (
    <div style={{
      background: theme.surface,
      border: `1px solid ${theme.surfaceBorder}`,
      borderRadius: theme.radius,
      padding: theme.sp(4),
      flex: '1 1 0',
      minWidth: '180px',
      position: 'relative',
    }}>
      {accent && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: accent,
        }} />
      )}
      <div style={{
        fontSize: theme.fontSize.xs,
        color: theme.textSecondary,
        fontWeight: theme.fontWeight.medium,
        textTransform: 'uppercase',
        letterSpacing: '0.32px',
        marginBottom: theme.sp(1),
      }}>
        {icon && <span style={{ marginRight: theme.sp(1) }}>{icon}</span>}
        {label}
      </div>
      <div style={{
        fontSize: theme.fontSize.xxl,
        fontWeight: theme.fontWeight.light,
        color: theme.text,
        lineHeight: 1.2,
        fontFamily: theme.fontMono,
      }}>
        {value}
      </div>
      {delta && (
        <div style={{
          fontSize: theme.fontSize.xs,
          color: deltaColor,
          marginTop: theme.sp(1),
          fontWeight: theme.fontWeight.regular,
        }}>
          {deltaDirection === 'up' ? '↑' : deltaDirection === 'down' ? '↓' : ''} {delta}
        </div>
      )}
    </div>
  );
};
