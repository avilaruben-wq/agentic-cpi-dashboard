import React from 'react';
import { theme } from '../../theme';
import { AgentStatus } from '../../types/pipeline';
import { AgentNode } from './AgentNode';
import { DataFlowArrow } from './DataFlowArrow';

interface AgentPipelineProps {
  agents: AgentStatus[];
  compact?: boolean;
  onClick?: () => void;
}

export const AgentPipeline: React.FC<AgentPipelineProps> = ({ agents, compact, onClick }) => {
  if (compact) {
    return (
      <div
        onClick={onClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.sp(2),
          cursor: onClick ? 'pointer' : 'default',
          padding: `${theme.sp(1)} 0`,
        }}
      >
        {agents.map((agent, idx) => (
          <React.Fragment key={agent.id}>
            <AgentNode
              name={agent.name}
              shortName={agent.shortName}
              status={agent.status}
              inputCount={agent.inputCount}
              outputCount={agent.outputCount}
              processingTime={agent.processingTime}
              compact
            />
            {idx < agents.length - 1 && (
              <span style={{ color: theme.textMuted, fontSize: '8px' }}>→</span>
            )}
          </React.Fragment>
        ))}
        <span style={{
          fontSize: theme.fontSize.xs,
          color: theme.textMuted,
          marginLeft: theme.sp(1),
          opacity: 0.6,
        }}>
          View pipeline →
        </span>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.sp(3),
        padding: theme.sp(4),
        background: theme.surface,
        border: `1px solid ${theme.surfaceBorder}`,
        borderRadius: theme.radiusLg,
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      {agents.map((agent, idx) => (
        <React.Fragment key={agent.id}>
          <AgentNode
            name={agent.name}
            shortName={agent.shortName}
            status={agent.status}
            inputCount={agent.inputCount}
            outputCount={agent.outputCount}
            processingTime={agent.processingTime}
          />
          {idx < agents.length - 1 && (
            <DataFlowArrow
              active={agents[idx + 1].status === 'processing' || agents[idx + 1].status === 'complete'}
              label={agent.outputCount > 0 ? `${agent.outputCount.toLocaleString()}` : undefined}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
