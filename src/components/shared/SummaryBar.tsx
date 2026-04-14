import React from 'react';
import { theme } from '../../theme';

export interface SummaryMetric {
  label: string;
  value: string;
  color?: string;
}

interface SummaryBarProps {
  metrics: SummaryMetric[];
}

export const SummaryBar: React.FC<SummaryBarProps> = ({ metrics }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: theme.sp(2),
    padding: `${theme.sp(2)} ${theme.sp(4)}`,
    background: theme.surface,
    border: `1px solid ${theme.surfaceBorder}`,
    borderRadius: theme.radius,
    flexWrap: 'wrap',
  }}>
    {metrics.map((m, idx) => (
      <React.Fragment key={m.label}>
        {idx > 0 && (
          <span style={{ color: theme.surfaceBorder, fontSize: theme.fontSize.sm, userSelect: 'none' }}>·</span>
        )}
        <span style={{ fontSize: theme.fontSize.sm, color: theme.textSecondary }}>
          {m.label}:{' '}
          <span style={{
            color: m.color || theme.text,
            fontWeight: theme.fontWeight.semibold,
            fontFamily: theme.fontMono,
          }}>
            {m.value}
          </span>
        </span>
      </React.Fragment>
    ))}
  </div>
);
