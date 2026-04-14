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
  agentDescription: string;
}

export const SubStepProgress: React.FC<SubStepProgressProps> = ({
  steps, onAllAutoComplete, onApprove, agentState, onRun, runLabel, agentName, agentDescription,
}) => {
  const [activeStep, setActiveStep] = useState(-1);

  const autoSteps = steps.filter(s => !s.isHumanReview);
  const totalAutoSteps = autoSteps.length;

  useEffect(() => {
    if (agentState !== 'running') return;
    setActiveStep(0);
    const timers: number[] = [];
    const stepDuration = 1200;

    for (let i = 1; i <= totalAutoSteps; i++) {
      timers.push(window.setTimeout(() => {
        if (i < totalAutoSteps) {
          setActiveStep(i);
        } else {
          onAllAutoComplete();
        }
      }, stepDuration * i));
    }

    return () => timers.forEach(clearTimeout);
  }, [agentState, totalAutoSteps, onAllAutoComplete]);

  const getStepStatus = (step: SubStep): 'pending' | 'active' | 'done' | 'review' | 'approved' => {
    if (agentState === 'approved') return step.isHumanReview ? 'approved' : 'done';
    if (agentState === 'review') {
      if (step.isHumanReview) return 'review';
      return 'done';
    }
    if (agentState === 'running') {
      const autoIndex = autoSteps.indexOf(step);
      if (autoIndex < activeStep) return 'done';
      if (autoIndex === activeStep) return 'active';
      return 'pending';
    }
    return 'pending';
  };

  if (agentState === 'ready') {
    return (
      <div style={{
        background: theme.surface,
        border: `1px solid ${theme.surfaceBorder}`,
        borderRadius: theme.radius,
        padding: theme.sp(6),
        textAlign: 'center',
      }}>
        <div style={{ fontSize: theme.fontSize.lg, fontWeight: theme.fontWeight.semibold, color: theme.text, marginBottom: theme.sp(1) }}>
          {agentName}
        </div>
        <p style={{ fontSize: theme.fontSize.sm, color: theme.textMuted, marginBottom: theme.sp(4), maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>
          {agentDescription}
        </p>
        <div style={{ marginTop: theme.sp(4) }}>
          <button onClick={onRun} style={{
            background: theme.primary, border: 'none', color: '#fff',
            padding: `${theme.sp(2)} ${theme.sp(6)}`, borderRadius: theme.radius,
            fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.medium,
            cursor: 'pointer', fontFamily: 'inherit',
          }}>
            {runLabel}
          </button>
        </div>
        <div style={{ marginTop: theme.sp(5), textAlign: 'left', maxWidth: '520px', margin: `${theme.sp(5)} auto 0` }}>
          <div style={{ fontSize: theme.fontSize.xs, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '0.32px', marginBottom: theme.sp(2) }}>
            Steps this agent will perform
          </div>
          {steps.map((step) => (
            <div key={step.id} style={{
              display: 'flex', alignItems: 'flex-start', gap: theme.sp(2),
              padding: `${theme.sp(1)} 0`,
              fontSize: theme.fontSize.sm, color: theme.textMuted,
            }}>
              <span style={{ fontFamily: theme.fontMono, fontSize: theme.fontSize.xs, color: theme.textMuted, minWidth: '28px', flexShrink: 0 }}>
                {step.id}
              </span>
              <span>{step.label}{step.isHumanReview ? ' 👤' : ''}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: theme.surface,
      border: `1px solid ${theme.surfaceBorder}`,
      borderRadius: theme.radius,
      padding: theme.sp(4),
      marginBottom: theme.sp(4),
    }}>
      <div style={{ fontSize: theme.fontSize.sm, fontWeight: theme.fontWeight.semibold, color: theme.text, marginBottom: theme.sp(3) }}>
        {agentState === 'approved' ? `${agentName} — Complete` : agentState === 'review' ? `${agentName} — Awaiting Review` : `${agentName} — Processing...`}
      </div>
      {steps.map((step) => {
        const status = getStepStatus(step);
        const dotColor = status === 'done' || status === 'approved' ? theme.green
          : status === 'active' ? theme.primary
          : status === 'review' ? '#ba4e00'
          : theme.surfaceBorder;
        const textColor = status === 'pending' ? theme.textMuted
          : status === 'active' ? theme.primary
          : status === 'review' ? '#ba4e00'
          : theme.text;

        return (
          <div key={step.id} style={{
            display: 'flex', alignItems: 'center', gap: theme.sp(2),
            padding: `6px 0`,
            borderLeft: `2px solid ${status === 'done' || status === 'approved' ? theme.green : status === 'active' ? theme.primary : status === 'review' ? '#ba4e00' : theme.surfaceBorder}`,
            paddingLeft: theme.sp(3),
            marginLeft: theme.sp(1),
            transition: 'all 0.3s ease',
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%', background: dotColor,
              flexShrink: 0, transition: 'all 0.3s ease',
              boxShadow: status === 'active' ? `0 0 6px ${theme.primary}` : 'none',
              animation: status === 'active' ? 'pulse 1.5s ease-in-out infinite' : 'none',
            }} />
            <span style={{
              fontFamily: theme.fontMono, fontSize: theme.fontSize.xs,
              color: textColor, minWidth: '28px', flexShrink: 0,
              fontWeight: theme.fontWeight.medium,
            }}>
              {step.id}
            </span>
            <span style={{
              fontSize: theme.fontSize.sm, color: textColor,
              fontWeight: status === 'active' || status === 'review' ? theme.fontWeight.medium : theme.fontWeight.regular,
            }}>
              {step.label}
              {step.isHumanReview && (
                <span style={{
                  marginLeft: theme.sp(1),
                  fontSize: theme.fontSize.xs,
                  color: status === 'approved' ? theme.green : '#ba4e00',
                  fontWeight: theme.fontWeight.medium,
                }}>
                  {status === 'approved' ? '✓ Approved' : '👤 Human Review'}
                </span>
              )}
            </span>
            {status === 'done' && !step.isHumanReview && (
              <span style={{ color: theme.green, fontSize: '11px', marginLeft: 'auto' }}>✓</span>
            )}
          </div>
        );
      })}

      {agentState === 'review' && (
        <div style={{
          marginTop: theme.sp(4),
          padding: theme.sp(4),
          background: '#fff8f0',
          border: '1px solid #ba4e0030',
          borderRadius: theme.radius,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: theme.fontSize.sm, fontWeight: theme.fontWeight.semibold, color: '#ba4e00' }}>
              Review Required
            </div>
            <div style={{ fontSize: theme.fontSize.xs, color: theme.textSecondary, marginTop: '2px' }}>
              Review the results below, then approve to unlock the next agent.
            </div>
          </div>
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
