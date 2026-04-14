import React from 'react';
import { theme } from '../../theme';
import { AgentStatus } from '../../types/pipeline';
import { AgentPipeline } from '../pipeline/AgentPipeline';

interface PipelineViewProps {
  agents: AgentStatus[];
  isRunning: boolean;
  onRun: () => void;
  completedAt: number | null;
  startedAt: number | null;
}

export const PipelineView: React.FC<PipelineViewProps> = ({
  agents, isRunning, onRun, completedAt, startedAt,
}) => {
  const totalTime = completedAt && startedAt ? ((completedAt - startedAt) / 1000).toFixed(1) : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.sp(6) }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: theme.fontSize.xl, fontWeight: theme.fontWeight.bold, color: theme.text }}>
            3-Agent Pipeline
          </div>
          <div style={{ fontSize: theme.fontSize.sm, color: theme.textSecondary, marginTop: theme.sp(1) }}>
            Supply Baseline → Demand Forecast → Gaps & Actions
          </div>
        </div>
        <button
          onClick={onRun}
          disabled={isRunning}
          style={{
            background: isRunning ? theme.surfaceBorder : theme.primary,
            border: 'none',
            color: '#fff',
            padding: `${theme.sp(3)} ${theme.sp(6)}`,
            borderRadius: theme.radius,
            fontSize: theme.fontSize.base,
            fontWeight: theme.fontWeight.semibold,
            cursor: isRunning ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit',
            boxShadow: isRunning ? 'none' : theme.shadowGlow,
            transition: 'all 0.2s',
          }}
        >
          {isRunning ? 'Processing...' : 'Run Pipeline'}
        </button>
      </div>

      <AgentPipeline agents={agents} />

      {totalTime && !isRunning && (
        <div style={{
          textAlign: 'center',
          fontSize: theme.fontSize.sm,
          color: theme.green,
          fontFamily: theme.fontMono,
        }}>
          Pipeline completed in {totalTime}s
        </div>
      )}

      <div style={{ display: 'flex', gap: theme.sp(5), flexWrap: 'wrap' }}>
        {agents.map(agent => (
          <div key={agent.id} style={{
            background: theme.surface,
            border: `1px solid ${agent.status === 'complete' ? theme.green + '40' : agent.status === 'processing' ? theme.primary + '40' : theme.surfaceBorder}`,
            borderRadius: theme.radiusLg,
            padding: theme.sp(5),
            flex: '1 1 300px',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: theme.sp(3),
            }}>
              <div style={{
                fontSize: theme.fontSize.md, fontWeight: theme.fontWeight.bold, color: theme.text,
              }}>
                Agent {agent.id}: {agent.shortName}
              </div>
              <span style={{
                padding: `2px ${theme.sp(2)}`, borderRadius: theme.radiusSm,
                fontSize: theme.fontSize.xs, fontWeight: theme.fontWeight.semibold,
                background: agent.status === 'complete' ? theme.greenBg
                  : agent.status === 'processing' ? theme.primaryMuted
                  : `${theme.surfaceBorder}40`,
                color: agent.status === 'complete' ? theme.green
                  : agent.status === 'processing' ? theme.primaryLight
                  : theme.textMuted,
              }}>
                {agent.status.toUpperCase()}
              </span>
            </div>

            <div style={{
              fontSize: theme.fontSize.sm, color: theme.textSecondary,
              lineHeight: 1.6, marginBottom: theme.sp(4),
            }}>
              {agent.description}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: theme.sp(3) }}>
              <div>
                <div style={{ fontSize: theme.fontSize.xs, color: theme.textMuted, textTransform: 'uppercase', marginBottom: theme.sp(1) }}>
                  Inputs
                </div>
                {agent.inputs.map(inp => (
                  <div key={inp} style={{ fontSize: theme.fontSize.xs, color: theme.textSecondary, lineHeight: 1.8 }}>
                    → {inp}
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: theme.fontSize.xs, color: theme.textMuted, textTransform: 'uppercase', marginBottom: theme.sp(1) }}>
                  Outputs
                </div>
                {agent.outputs.map(out => (
                  <div key={out} style={{ fontSize: theme.fontSize.xs, color: theme.textSecondary, lineHeight: 1.8 }}>
                    ← {out}
                  </div>
                ))}
              </div>
            </div>

            {agent.status !== 'idle' && (
              <div style={{
                marginTop: theme.sp(3), paddingTop: theme.sp(3),
                borderTop: `1px solid ${theme.surfaceBorder}`,
                display: 'flex', justifyContent: 'space-between',
                fontSize: theme.fontSize.xs, fontFamily: theme.fontMono, color: theme.textMuted,
              }}>
                <span>In: {agent.inputCount.toLocaleString()} records</span>
                {agent.status === 'complete' && <span>Out: {agent.outputCount.toLocaleString()} records</span>}
                {agent.processingTime > 0 && <span>{agent.processingTime}s</span>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
