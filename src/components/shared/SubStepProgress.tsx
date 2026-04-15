import React, { useState, useEffect } from 'react';
import { theme } from '../../theme';
import { SubStep } from '../../types/ibm';

interface SubStepProgressProps {
  steps: SubStep[];
  onAllAutoComplete: () => void;
  onApprove: () => void;
  agentState: 'ready' | 'running' | 'review' | 'approved';
  onRun: () => void;
  runLabel: string;
  agentName: string;
}

export const SubStepProgress: React.FC<SubStepProgressProps> = ({
  steps, onAllAutoComplete, onApprove, agentState, onRun, runLabel, agentName,
}) => {
  const [activeStep, setActiveStep] = useState(-1);
  const totalSteps = steps.length;

  useEffect(() => {
    if (agentState !== 'running') return;
    setActiveStep(0);
    const timers: number[] = [];
    const stepDuration = 1200;

    for (let i = 1; i <= totalSteps; i++) {
      timers.push(window.setTimeout(() => {
        if (i < totalSteps) {
          setActiveStep(i);
        } else {
          onAllAutoComplete();
        }
      }, stepDuration * i));
    }

    return () => timers.forEach(clearTimeout);
  }, [agentState, totalSteps, onAllAutoComplete]);

  const getStepStatus = (idx: number): 'pending' | 'active' | 'done' => {
    if (agentState === 'approved' || agentState === 'review') return 'done';
    if (agentState === 'running') {
      if (idx < activeStep) return 'done';
      if (idx === activeStep) return 'active';
      return 'pending';
    }
    return 'pending';
  };

  // Ready state: just the run button, clean and simple
  if (agentState === 'ready') {
    return (
      <div style={{
        background: theme.surface,
        border: `1px solid ${theme.surfaceBorder}`,
        borderRadius: theme.radius,
        padding: `${theme.sp(5)} ${theme.sp(6)}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ fontSize: theme.fontSize.md, fontWeight: theme.fontWeight.semibold, color: theme.text }}>
          {agentName}
        </div>
        <button onClick={onRun} style={{
          background: theme.primary, border: 'none', color: '#fff',
          padding: `${theme.sp(2)} ${theme.sp(5)}`, borderRadius: theme.radius,
          fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.medium,
          cursor: 'pointer', fontFamily: 'inherit',
        }}>
          {runLabel}
        </button>
      </div>
    );
  }

  return (
    <div style={{
      background: theme.surface,
      border: `1px solid ${theme.surfaceBorder}`,
      borderRadius: theme.radius,
      padding: theme.sp(4),
      marginBottom: theme.sp(2),
    }}>
      <div style={{ fontSize: theme.fontSize.sm, fontWeight: theme.fontWeight.semibold, color: theme.text, marginBottom: theme.sp(3) }}>
        {agentState === 'approved' ? `${agentName} — Complete` : agentState === 'review' ? `${agentName} — Review results below` : `${agentName} — Processing...`}
      </div>
      {steps.map((step, idx) => {
        const status = getStepStatus(idx);
        const dotColor = status === 'done' ? theme.green
          : status === 'active' ? theme.primary
          : theme.surfaceBorder;
        const textColor = status === 'pending' ? theme.textMuted
          : status === 'active' ? theme.primary
          : theme.text;

        return (
          <div key={step.id} style={{
            display: 'flex', alignItems: 'center', gap: theme.sp(2),
            padding: '5px 0',
            borderLeft: `2px solid ${dotColor}`,
            paddingLeft: theme.sp(3),
            marginLeft: theme.sp(1),
            transition: 'all 0.3s ease',
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%', background: dotColor,
              flexShrink: 0, transition: 'all 0.3s ease',
              boxShadow: status === 'active' ? `0 0 6px ${theme.primary}` : 'none',
              animation: status === 'active' ? 'pulse 1.5s ease-in-out infinite' : 'none',
            }} />
            <span style={{
              fontSize: theme.fontSize.sm, color: textColor,
              fontWeight: status === 'active' ? theme.fontWeight.medium : theme.fontWeight.regular,
            }}>
              {step.label}
            </span>
            {status === 'done' && (
              <span style={{ color: theme.green, fontSize: '11px', marginLeft: 'auto' }}>✓</span>
            )}
          </div>
        );
      })}

      {agentState === 'review' && (
        <div style={{
          marginTop: theme.sp(3),
          padding: theme.sp(3),
          background: theme.surfaceRaised,
          border: `1px solid ${theme.surfaceBorder}`,
          borderRadius: theme.radius,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{ fontSize: theme.fontSize.sm, color: theme.textSecondary }}>
            Review the results below, then approve to continue.
          </span>
          <button onClick={onApprove} style={{
            background: '#198038', border: 'none', color: '#fff',
            padding: `${theme.sp(2)} ${theme.sp(5)}`, borderRadius: theme.radius,
            fontSize: theme.fontSize.sm, fontWeight: theme.fontWeight.medium,
            cursor: 'pointer', fontFamily: 'inherit',
          }}>
            Approve & Continue
          </button>
        </div>
      )}
    </div>
  );
};
