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

export const AgentPipeline: React.FC<AgentPipelineProps> = ({ agents, compact, onClick }) => (
  <div
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: compact ? theme.sp(1) : theme.sp(3),
      padding: compact ? `${theme.sp(2)} ${theme.sp(3)}` : theme.sp(4),
      background: compact ? 'transparent' : theme.surface,
      border: compact ? 'none' : `1px solid ${theme.surfaceBorder}`,
      borderRadius: compact ? '0' : theme.radiusLg,
      cursor: onClick ? 'pointer' : 'default',
      transition: 'background 0.2s',
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
          compact={compact}
        />
        {idx < agents.length - 1 && (
          <DataFlowArrow
            active={agents[idx + 1].status === 'processing' || agents[idx + 1].status === 'complete'}
            label={agent.outputCount > 0 ? `${agent.outputCount.toLocaleString()}` : undefined}
            compact={compact}
          />
        )}
      </React.Fragment>
    ))}
  </div>
);
