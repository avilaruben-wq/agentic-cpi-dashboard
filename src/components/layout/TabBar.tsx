import React from 'react';
import { theme } from '../../theme';
import { TabId } from '../../types/ibm';

interface TabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: 'supply', label: 'Supply', icon: '◆' },
  { id: 'demand', label: 'Demand', icon: '◇' },
  { id: 'gaps', label: 'Gaps', icon: '⚠' },
  { id: 'scenarios', label: 'Scenarios', icon: '◎' },
  { id: 'output', label: 'Output', icon: '◉' },
];

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => (
  <nav style={{
    display: 'flex',
    gap: theme.sp(1),
    padding: `0 ${theme.sp(6)}`,
    borderBottom: `1px solid ${theme.surfaceBorder}`,
    background: theme.bg,
  }}>
    {tabs.map(tab => {
      const isActive = activeTab === tab.id;
      return (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          style={{
            background: 'transparent',
            border: 'none',
            borderBottom: `2px solid ${isActive ? theme.primary : 'transparent'}`,
            color: isActive ? theme.text : theme.textMuted,
            padding: `${theme.sp(3)} ${theme.sp(4)}`,
            fontSize: theme.fontSize.sm,
            fontWeight: isActive ? theme.fontWeight.semibold : theme.fontWeight.regular,
            cursor: 'pointer',
            fontFamily: 'inherit',
            display: 'flex',
            alignItems: 'center',
            gap: theme.sp(1),
            transition: 'all 0.2s',
          }}
        >
          <span style={{ fontSize: '10px' }}>{tab.icon}</span>
          {tab.label}
        </button>
      );
    })}
  </nav>
);
