import React from 'react';
import { theme } from '../../theme';

interface DataFlowArrowProps {
  active: boolean;
  label?: string;
  compact?: boolean;
}

export const DataFlowArrow: React.FC<DataFlowArrowProps> = ({ active, label, compact }) => {
  const width = compact ? 40 : 80;
  const height = compact ? 24 : 32;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2px',
    }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={active ? theme.pipelineActive : theme.pipelineIdle} />
          </marker>
        </defs>
        <line
          x1="0" y1={height / 2} x2={width - 10} y2={height / 2}
          stroke={active ? theme.pipelineActive : theme.pipelineIdle}
          strokeWidth="2"
          strokeDasharray={active ? '6 4' : 'none'}
          markerEnd="url(#arrowhead)"
          style={active ? {
            animation: 'flow 1s linear infinite',
          } : undefined}
        />
      </svg>
      {label && !compact && (
        <div style={{
          fontSize: theme.fontSize.xs,
          color: theme.textMuted,
          fontFamily: theme.fontMono,
          whiteSpace: 'nowrap',
        }}>
          {label}
        </div>
      )}
    </div>
  );
};
