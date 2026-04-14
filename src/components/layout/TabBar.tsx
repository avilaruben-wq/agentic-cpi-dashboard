import React from 'react';
import { theme } from '../../theme';
import { TabId, AgentState } from '../../types/ibm';

interface TabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  agentStates: Record<TabId, AgentState>;
}

const tabs: { id: TabId; label: string; step: number; badge?: string }[] = [
  { id: 'agent1', label: 'Supply Baseline Agent', step: 1, badge: 'Agent 1' },
  { id: 'agent2', label: 'Demand Forecast Agent', step: 2, badge: 'Agent 2' },
  { id: 'agent3', label: 'Gaps & Actions Agent', step: 3, badge: 'Agent 3' },
  { id: 'approve', label: 'Review & Approve', step: 4 },
];

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange, agentStates }) => (
  <nav style={{
    display: 'flex',
    alignItems: 'stretch',
    background: theme.surface,
    borderBottom: `1px solid ${theme.surfaceBorder}`,
    padding: `0 ${theme.sp(4)}`,
  }}>
    {tabs.map((tab, idx) => {
      const isActive = activeTab === tab.id;
      const state = agentStates[tab.id];
      const isLocked = state === 'locked';
      const isApproved = state === 'approved';
      const isLast = idx === tabs.length - 1;

      const circBg = isActive ? theme.primary
        : isApproved ? '#198038'
        : isLocked ? theme.surfaceBorder
        : theme.surfaceBorder;
      const circColor = isActive || isApproved ? '#fff'
        : isLocked ? theme.textMuted
        : theme.textSecondary;

      return (
        <button
          key={tab.id}
          onClick={() => !isLocked && onTabChange(tab.id)}
          style={{
            background: isActive ? theme.primaryMuted : 'transparent',
            border: 'none',
            borderBottom: isActive ? `2px solid ${theme.primary}` : '2px solid transparent',
            color: isLocked ? theme.textMuted : isActive ? theme.primary : isApproved ? '#198038' : theme.textSecondary,
            padding: `${theme.sp(3)} ${theme.sp(4)}`,
            fontSize: theme.fontSize.sm,
            fontWeight: isActive ? theme.fontWeight.semibold : theme.fontWeight.regular,
            cursor: isLocked ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit',
            display: 'flex',
            alignItems: 'center',
            gap: theme.sp(2),
            transition: 'all 0.15s',
            opacity: isLocked ? 0.5 : 1,
          }}
        >
          <span style={{
            width: 22, height: 22, borderRadius: '50%',
            background: circBg, color: circColor,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontSize: theme.fontSize.xs, fontWeight: theme.fontWeight.bold, flexShrink: 0,
          }}>
            {isLocked ? '🔒' : isApproved ? '✓' : tab.step}
          </span>

          <span>{tab.label}</span>

          {!isLast && (
            <span style={{
              marginLeft: theme.sp(1), color: theme.surfaceBorder,
              fontSize: theme.fontSize.md, fontWeight: theme.fontWeight.light,
            }}>
              /
            </span>
          )}
        </button>
      );
    })}
  </nav>
);
