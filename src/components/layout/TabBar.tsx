import React from 'react';
import { theme } from '../../theme';
import { TabId } from '../../types/ibm';

interface TabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  completedTabs: Set<TabId>;
}

const tabs: { id: TabId; label: string; step: number }[] = [
  { id: 'supply', label: 'Supply Baseline', step: 1 },
  { id: 'demand', label: 'Demand Forecast', step: 2 },
  { id: 'gaps', label: 'Gaps & Actions', step: 3 },
  { id: 'scenarios', label: 'Scenarios', step: 4 },
  { id: 'output', label: 'Output', step: 5 },
];

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange, completedTabs }) => (
  <nav style={{
    display: 'flex',
    alignItems: 'stretch',
    background: theme.surface,
    borderBottom: `1px solid ${theme.surfaceBorder}`,
    padding: `0 ${theme.sp(4)}`,
  }}>
    {tabs.map((tab, idx) => {
      const isActive = activeTab === tab.id;
      const isCompleted = completedTabs.has(tab.id);
      const isLast = idx === tabs.length - 1;

      return (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          style={{
            background: isActive ? theme.primaryMuted : 'transparent',
            border: 'none',
            borderBottom: isActive ? `2px solid ${theme.primary}` : '2px solid transparent',
            color: isActive ? theme.primary : isCompleted ? theme.green : theme.textSecondary,
            padding: `${theme.sp(3)} ${theme.sp(5)}`,
            fontSize: theme.fontSize.base,
            fontWeight: isActive ? theme.fontWeight.semibold : theme.fontWeight.regular,
            cursor: 'pointer',
            fontFamily: 'inherit',
            display: 'flex',
            alignItems: 'center',
            gap: theme.sp(2),
            transition: 'all 0.15s',
            position: 'relative',
          }}
        >
          <span style={{
            width: 22,
            height: 22,
            borderRadius: '50%',
            background: isActive ? theme.primary
              : isCompleted ? theme.green
              : theme.surfaceBorder,
            color: isActive || isCompleted ? '#fff' : theme.textMuted,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: theme.fontSize.xs,
            fontWeight: theme.fontWeight.bold,
            flexShrink: 0,
          }}>
            {isCompleted ? '✓' : tab.step}
          </span>

          {tab.label}

          {!isLast && (
            <span style={{
              marginLeft: theme.sp(2),
              color: theme.surfaceBorder,
              fontSize: theme.fontSize.md,
              fontWeight: theme.fontWeight.light,
            }}>
              /
            </span>
          )}
        </button>
      );
    })}
  </nav>
);
