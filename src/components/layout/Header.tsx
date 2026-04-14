import React from 'react';
import { theme } from '../../theme';

export const Header: React.FC = () => (
  <header style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `0 ${theme.sp(4)}`,
    height: '48px',
    background: theme.headerBg,
    color: theme.headerText,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: theme.sp(3), height: '100%' }}>
      <div style={{
        fontSize: theme.fontSize.base,
        fontWeight: theme.fontWeight.semibold,
        letterSpacing: '0.1px',
        display: 'flex',
        alignItems: 'center',
        gap: theme.sp(2),
      }}>
        <span style={{ opacity: 0.7 }}>IBM</span>
        <span style={{ fontWeight: theme.fontWeight.regular }}>watsonx Orchestrate</span>
        <span style={{ color: '#6f6f6f', margin: `0 ${theme.sp(1)}` }}>|</span>
        <span style={{ fontWeight: theme.fontWeight.semibold }}>Agentic CPI</span>
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: theme.sp(4) }}>
      <span style={{
        fontSize: theme.fontSize.sm,
        color: '#c6c6c6',
        fontFamily: theme.fontMono,
      }}>
        Q3 2026
      </span>
    </div>
  </header>
);
