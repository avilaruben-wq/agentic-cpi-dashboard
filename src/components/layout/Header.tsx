import React from 'react';
import { theme } from '../../theme';
import { PulseDot } from '../shared/PulseDot';

export const Header: React.FC = () => (
  <header style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${theme.sp(4)} ${theme.sp(6)}`,
    borderBottom: `1px solid ${theme.surfaceBorder}`,
    background: theme.surface,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: theme.sp(3) }}>
      <div style={{
        width: 36, height: 36, borderRadius: theme.radius,
        background: theme.primary, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        fontSize: theme.fontSize.md, fontWeight: theme.fontWeight.bold,
        color: '#fff',
      }}>
        CPI
      </div>
      <div>
        <div style={{
          fontSize: theme.fontSize.lg,
          fontWeight: theme.fontWeight.bold,
          color: theme.text,
          letterSpacing: '-0.3px',
        }}>
          Agentic CPI
        </div>
        <div style={{
          fontSize: theme.fontSize.xs,
          color: theme.textMuted,
          letterSpacing: '0.3px',
        }}>
          Capacity Planning Intelligence — IBM Consulting
        </div>
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: theme.sp(4) }}>
      <PulseDot color={theme.green} label="Live — Continuous Refresh" />
      <div style={{
        fontSize: theme.fontSize.xs,
        color: theme.textMuted,
        fontFamily: theme.fontMono,
      }}>
        Q3 2026
      </div>
    </div>
  </header>
);
