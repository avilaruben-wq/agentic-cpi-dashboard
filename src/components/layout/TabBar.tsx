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
    padding: `0 ${theme.sp(6)}`,
    background: theme.bg,
    gap: 0,
    borderBottom: `1px solid ${theme.surfaceBorder}`,
  }}>
    {tabs.map((tab, idx) => {
      const isActive = activeTab === tab.id;
      const isCompleted = completedTabs.has(tab.id);
      const isLast = idx === tabs.length - 1;

      const bg = isActive ? theme.primary
        : isCompleted ? `${theme.green}18`
        : 'transparent';
      const textColor = isActive ? '#fff'
        : isCompleted ? theme.green
        : theme.textMuted;
      const numberBg = isActive ? 'rgba(255,255,255,0.2)'
        : isCompleted ? `${theme.green}30`
        : theme.surfaceBorder;
      const numberColor = isActive ? '#fff'
        : isCompleted ? theme.green
        : theme.textMuted;

      return (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          style={{
            background: bg,
            border: 'none',
            borderBottom: isActive ? `2px solid ${theme.primary}` : '2px solid transparent',
            color: textColor,
            padding: `${theme.sp(3)} ${theme.sp(5)}`,
            paddingRight: isLast ? theme.sp(5) : theme.sp(7),
            fontSize: theme.fontSize.base,
            fontWeight: isActive ? theme.fontWeight.semibold : theme.fontWeight.medium,
            cursor: 'pointer',
            fontFamily: 'inherit',
            display: 'flex',
            alignItems: 'center',
            gap: theme.sp(2),
            transition: 'all 0.2s',
            position: 'relative',
          }}
        >
          {/* Step number circle */}
          <span style={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: numberBg,
            color: numberColor,
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

          {/* Chevron arrow */}
          {!isLast && (
            <span style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              color: isActive ? theme.primaryLight : theme.surfaceBorder,
              fontSize: theme.fontSize.md,
              lineHeight: 1,
              pointerEvents: 'none',
            }}>
              ›
            </span>
          )}
        </button>
      );
    })}
  </nav>
);
