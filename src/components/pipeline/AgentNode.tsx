import React from 'react';
import { theme } from '../../theme';
import { AgentStatusType } from '../../types/pipeline';

interface AgentNodeProps {
  name: string;
  shortName: string;
  status: AgentStatusType;
  inputCount: number;
  outputCount: number;
  processingTime: number;
  compact?: boolean;
}

export const AgentNode: React.FC<AgentNodeProps> = ({
  name, shortName, status, inputCount, outputCount, processingTime, compact,
}) => {
  const borderColor = status === 'complete' ? theme.pipelineComplete
    : status === 'processing' ? theme.pipelineActive
    : theme.pipelineIdle;
  const bgColor = status === 'complete' ? `${theme.pipelineComplete}20`
    : status === 'processing' ? `${theme.pipelineActive}20`
    : 'transparent';

  // Ultra-compact: just a dot
  if (compact) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: theme.sp(1) }}>
        <div style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: status === 'complete' ? theme.pipelineComplete
            : status === 'processing' ? theme.pipelineActive
            : theme.pipelineIdle,
          boxShadow: status === 'processing' ? `0 0 8px ${theme.pipelineGlow}` : 'none',
          animation: status === 'processing' ? 'glow 1.5s ease-in-out infinite' : 'none',
          transition: 'all 0.3s ease',
        }} />
        <span style={{
          fontSize: theme.fontSize.xs,
          color: status === 'idle' ? theme.textMuted : theme.textSecondary,
          fontWeight: status === 'complete' ? theme.fontWeight.medium : theme.fontWeight.regular,
        }}>
          {shortName}
        </span>
      </div>
    );
  }

  // Full size for pipeline tab
  const size = 80;
  const icon = status === 'complete' ? '✓' : status === 'processing' ? '⟳' : '●';

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: theme.sp(2),
    }}>
      <div style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: `3px solid ${borderColor}`,
        background: bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: theme.fontSize.xl,
        color: borderColor,
        boxShadow: status === 'processing' ? `0 0 20px ${theme.pipelineGlow}` : 'none',
        animation: status === 'processing' ? 'glow 1.5s ease-in-out infinite' : 'none',
        transition: 'all 0.5s ease',
      }}>
        {icon}
      </div>
      <div style={{ textAlign: 'center', maxWidth: '140px' }}>
        <div style={{
          fontSize: theme.fontSize.sm,
          fontWeight: theme.fontWeight.semibold,
          color: theme.text,
        }}>
          {name}
        </div>
        {status !== 'idle' && (
          <div style={{
            fontSize: theme.fontSize.xs,
            color: theme.textMuted,
            marginTop: theme.sp(1),
            fontFamily: theme.fontMono,
          }}>
            {status === 'processing' ? `${inputCount.toLocaleString()} records...` : `${processingTime}s → ${outputCount.toLocaleString()}`}
          </div>
        )}
      </div>
    </div>
  );
};
