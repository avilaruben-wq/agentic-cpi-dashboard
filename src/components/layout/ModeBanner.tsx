import React from 'react';
import { theme } from '../../theme';
import { PlanningMode } from '../../types/ibm';

export type AppView = 'pipeline' | 'dashboard';

interface ModeBannerProps {
  mode: PlanningMode;
  appView: AppView;
  onAppViewChange: (v: AppView) => void;
  onReset: () => void;
}

export const ModeBanner: React.FC<ModeBannerProps> = ({ mode, appView, onAppViewChange, onReset }) => {
  const label = mode === 'quarterly'
    ? 'Quarterly Demand Interlock — Q3 2026 + Q4 2026'
    : '90-Day Talent Report — Apr 14 – Jul 13, 2026';

  const toggleStyle = (active: boolean): React.CSSProperties => ({
    background: active ? theme.text : 'transparent',
    color: active ? theme.surface : theme.textMuted,
    border: `1px solid ${active ? theme.text : theme.surfaceBorder}`,
    borderRadius: theme.radiusSm,
    padding: '0 10px',
    height: '24px',
    fontSize: theme.fontSize.xs,
    fontWeight: active ? theme.fontWeight.semibold : theme.fontWeight.regular,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.15s',
  });

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

      <div style={{ display: 'flex', alignItems: 'center', gap: theme.sp(2) }}>
        <div style={{ display: 'flex', gap: '2px' }}>
          <button style={toggleStyle(appView === 'pipeline')} onClick={() => onAppViewChange('pipeline')}>Run Agents</button>
          <button style={toggleStyle(appView === 'dashboard')} onClick={() => onAppViewChange('dashboard')}>Overview</button>
        </div>
        <span style={{ color: theme.surfaceBorder }}>|</span>
        <button
          onClick={onReset}
          style={{
            background: 'transparent', border: 'none',
            color: theme.primary, fontSize: theme.fontSize.xs,
            cursor: 'pointer', fontFamily: 'inherit', fontWeight: theme.fontWeight.medium,
          }}
        >
          Change mode
        </button>
      </div>
    </div>
  );
};
