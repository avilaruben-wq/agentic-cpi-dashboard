import React from 'react';
import { theme } from '../../theme';
import { PlanningMode } from '../../types/ibm';

interface ModeBannerProps {
  mode: PlanningMode;
  onReset: () => void;
}

export const ModeBanner: React.FC<ModeBannerProps> = ({ mode, onReset }) => {
  const label = mode === 'quarterly'
    ? 'Quarterly Demand Interlock — Q3 2026 + Q4 2026'
    : '90-Day Talent Report — Apr 14 – Jul 13, 2026';

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: `0 ${theme.sp(4)}`,
      height: '36px',
      background: theme.surface,
      borderBottom: `1px solid ${theme.surfaceBorder}`,
      fontSize: theme.fontSize.sm,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: theme.sp(2) }}>
        <span style={{
          background: mode === 'quarterly' ? theme.primary : '#6929c4',
          color: '#fff',
          padding: '1px 8px',
          borderRadius: theme.radiusSm,
          fontSize: theme.fontSize.xs,
          fontWeight: theme.fontWeight.semibold,
        }}>
          {mode === 'quarterly' ? 'DI' : 'TI'}
        </span>
        <span style={{ color: theme.text, fontWeight: theme.fontWeight.medium }}>
          {label}
        </span>
      </div>
      <button
        onClick={onReset}
        style={{
          background: 'transparent',
          border: 'none',
          color: theme.primary,
          fontSize: theme.fontSize.xs,
          cursor: 'pointer',
          fontFamily: 'inherit',
          fontWeight: theme.fontWeight.medium,
          padding: `${theme.sp(1)} ${theme.sp(2)}`,
        }}
      >
        Change
      </button>
    </div>
  );
};
