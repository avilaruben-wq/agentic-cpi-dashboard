import React from 'react';
import { theme } from '../../theme';
import { PlanningMode } from '../../types/ibm';

interface ModeSelectorProps {
  onSelect: (mode: PlanningMode) => void;
}

const cards: { mode: PlanningMode; title: string; horizon: string; output: string; cadence: string; buttonLabel: string; description: string }[] = [
  {
    mode: '90day',
    title: '90-Day Talent Report',
    horizon: 'Next 90 days',
    output: 'Resourcing recommendations by band, JRS, and GEO',
    cadence: 'Monthly (Talent Interlock)',
    buttonLabel: 'Start 90-Day Report',
    description: 'A focused view of near-term staffing needs and gap resolution — ideal for monthly planning cycles.',
  },
  {
    mode: 'quarterly',
    title: 'Quarterly Demand Interlock',
    horizon: 'Current quarter + next quarter',
    output: 'Full capacity plan, scenario models, DI authorization letter',
    cadence: 'Quarterly (Demand Interlock)',
    buttonLabel: 'Start Quarterly DI',
    description: 'The comprehensive capacity planning output with scenario modeling, fulfillment plans, and executive approval.',
  },
];

export const ModeSelector: React.FC<ModeSelectorProps> = ({ onSelect }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.sp(10)} ${theme.sp(6)}`,
    maxWidth: '800px',
    margin: '0 auto',
  }}>
    <h1 style={{
      fontSize: theme.fontSize.xl,
      fontWeight: theme.fontWeight.semibold,
      color: theme.text,
      margin: `0 0 ${theme.sp(1)}`,
    }}>
      Capacity Planning Intelligence
    </h1>
    <p style={{
      fontSize: theme.fontSize.sm,
      color: theme.textMuted,
      margin: `0 0 ${theme.sp(6)}`,
    }}>
      Select the type of planning output to generate.
    </p>

    <div style={{ display: 'flex', gap: theme.sp(4), width: '100%' }}>
      {cards.map(card => (
        <div
          key={card.mode}
          style={{
            flex: 1,
            background: theme.surface,
            border: `1px solid ${theme.surfaceBorder}`,
            borderRadius: theme.radius,
            padding: theme.sp(5),
            display: 'flex',
            flexDirection: 'column',
            transition: 'border-color 0.15s, box-shadow 0.15s',
            cursor: 'pointer',
          }}
          onClick={() => onSelect(card.mode)}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.borderColor = theme.primary;
            (e.currentTarget as HTMLElement).style.boxShadow = theme.shadowGlow;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.borderColor = theme.surfaceBorder;
            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
          }}
        >
          <div style={{
            fontSize: theme.fontSize.md,
            fontWeight: theme.fontWeight.semibold,
            color: theme.text,
            marginBottom: theme.sp(2),
          }}>
            {card.title}
          </div>

          <p style={{
            fontSize: theme.fontSize.sm,
            color: theme.textMuted,
            lineHeight: 1.6,
            margin: `0 0 ${theme.sp(4)}`,
            flex: 1,
          }}>
            {card.description}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.sp(2), marginBottom: theme.sp(4) }}>
            {[
              { label: 'Time horizon', value: card.horizon },
              { label: 'Output', value: card.output },
              { label: 'Cadence', value: card.cadence },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', gap: theme.sp(2) }}>
                <span style={{ fontSize: theme.fontSize.xs, color: theme.textMuted }}>{item.label}</span>
                <span style={{ fontSize: theme.fontSize.xs, color: theme.text, fontWeight: theme.fontWeight.medium, textAlign: 'right' }}>{item.value}</span>
              </div>
            ))}
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); onSelect(card.mode); }}
            style={{
              background: card.mode === 'quarterly' ? theme.primary : theme.surface,
              border: `1px solid ${card.mode === 'quarterly' ? theme.primary : theme.surfaceBorder}`,
              color: card.mode === 'quarterly' ? '#fff' : theme.text,
              padding: `${theme.sp(2)} ${theme.sp(4)}`,
              borderRadius: theme.radius,
              fontSize: theme.fontSize.sm,
              fontWeight: theme.fontWeight.medium,
              cursor: 'pointer',
              fontFamily: 'inherit',
              width: '100%',
            }}
          >
            {card.buttonLabel}
          </button>
        </div>
      ))}
    </div>
  </div>
);
