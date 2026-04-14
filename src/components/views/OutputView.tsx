import React, { useState } from 'react';
import { theme } from '../../theme';
import { diAuthorizationLetter, scorePlanSummary } from '../../data/outputData';
import { ViewHeader } from '../shared/ViewHeader';
import { RunButton } from '../shared/RunButton';

type OutputTab = 'di' | 'score';

interface OutputViewProps {
  isCompleted: boolean;
  onComplete: () => void;
}

export const OutputView: React.FC<OutputViewProps> = ({ isCompleted, onComplete }) => {
  const [tab, setTab] = useState<OutputTab>('di');

  const btnStyle = (active: boolean): React.CSSProperties => ({
    background: active ? theme.primary : 'transparent',
    border: `1px solid ${active ? theme.primary : theme.surfaceBorder}`,
    color: active ? '#fff' : theme.textSecondary,
    padding: `${theme.sp(2)} ${theme.sp(4)}`,
    borderRadius: theme.radiusSm,
    fontSize: theme.fontSize.sm,
    fontWeight: active ? theme.fontWeight.semibold : theme.fontWeight.regular,
    cursor: 'pointer',
    fontFamily: 'inherit',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.sp(5) }}>
      <ViewHeader
        title="Step 5: Output"
        description="Generate the DI Authorization Letter and SCORE plan for approval routing."
        action={
          <RunButton
            label="Generate Output"
            runningLabel="Generating documents..."
            completedLabel="Output Ready"
            isCompleted={isCompleted}
            onRun={onComplete}
            duration={1500}
          />
        }
      />

      {isCompleted ? (
        <>
          <div style={{ display: 'flex', gap: theme.sp(2) }}>
            <button style={btnStyle(tab === 'di')} onClick={() => setTab('di')}>DI Authorization Letter</button>
            <button style={btnStyle(tab === 'score')} onClick={() => setTab('score')}>SCORE Plan Summary</button>
          </div>

          <div style={{
            background: '#FAFAFA',
            border: `1px solid ${theme.surfaceBorder}`,
            borderRadius: theme.radiusLg,
            padding: `${theme.sp(8)} ${theme.sp(10)}`,
            maxWidth: '900px',
            boxShadow: theme.shadowLg,
          }}>
            <pre style={{
              fontFamily: theme.fontMono,
              fontSize: theme.fontSize.sm,
              color: '#1A1A1A',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              lineHeight: 1.7,
              margin: 0,
            }}>
              {tab === 'di' ? diAuthorizationLetter : scorePlanSummary}
            </pre>
          </div>

          <div style={{
            display: 'flex', gap: theme.sp(3), alignItems: 'center',
            padding: theme.sp(3),
            background: theme.surface,
            border: `1px solid ${theme.surfaceBorder}`,
            borderRadius: theme.radius,
          }}>
            <span style={{ fontSize: theme.fontSize.xs, color: theme.textMuted }}>
              Auto-populated into SCORE upon final approval — TRAM authorization letters generated for all ANOB actions
            </span>
          </div>
        </>
      ) : (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: theme.sp(16), color: theme.textMuted, fontSize: theme.fontSize.md,
          border: `1px dashed ${theme.surfaceBorder}`, borderRadius: theme.radiusLg,
        }}>
          Click "Generate Output" to create the DI Authorization Letter and SCORE plan
        </div>
      )}
    </div>
  );
};
