import React from 'react';
import { theme } from '../../theme';
import { balanceMetrics, hcWaterfall, TrafficLight, BalanceMetric } from '../../data/capacityBalanceData';

const statusColor: Record<TrafficLight, string> = {
  green: '#198038',
  amber: '#b28600',
  red: '#da1e28',
};

const trendArrow = (trend: BalanceMetric['trend']) => {
  switch (trend) {
    case 'improving': return <span style={{ color: '#198038' }}>&#8593;</span>;
    case 'stable': return <span style={{ color: theme.textMuted }}>&rarr;</span>;
    case 'declining': return <span style={{ color: '#da1e28' }}>&#8595;</span>;
  }
};

export const CapacityBalanceView: React.FC = () => {
  const categories = [...new Set(balanceMetrics.map(m => m.category))];
  const grouped = categories.map(cat => ({
    category: cat,
    metrics: balanceMetrics.filter(m => m.category === cat),
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.sp(5) }}>
      {/* Title */}
      <div>
        <div style={{ fontSize: theme.fontSize.xl, fontWeight: theme.fontWeight.semibold, color: theme.text }}>
          Capacity Balance Dashboard
        </div>
        <div style={{ fontSize: theme.fontSize.sm, color: theme.textSecondary, marginTop: theme.sp(1) }}>
          Executive overview — all levers at a glance
        </div>
      </div>

      {/* Metric cards by category */}
      {grouped.map(group => (
        <div
          key={group.category}
          style={{
            background: theme.surface,
            border: `1px solid ${theme.surfaceBorder}`,
            borderRadius: theme.radius,
            overflow: 'hidden',
          }}
        >
          <div style={{
            padding: `${theme.sp(3)} ${theme.sp(4)}`,
            borderBottom: `1px solid ${theme.surfaceBorder}`,
            fontSize: theme.fontSize.base,
            fontWeight: theme.fontWeight.semibold,
            color: theme.text,
            background: theme.surfaceRaised,
          }}>
            {group.category}
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Metric', 'Actual', 'Target', 'Variance', 'Status', 'Trend'].map(h => (
                  <th key={h} style={{
                    padding: `${theme.sp(2)} ${theme.sp(4)}`,
                    fontSize: theme.fontSize.xs,
                    fontWeight: theme.fontWeight.semibold,
                    color: theme.textSecondary,
                    textTransform: 'uppercase',
                    letterSpacing: '0.32px',
                    borderBottom: `1px solid ${theme.surfaceBorder}`,
                    textAlign: h === 'Metric' ? 'left' : 'center',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {group.metrics.map((m, idx) => (
                <tr
                  key={m.label}
                  style={{ background: idx % 2 === 0 ? theme.surface : theme.surfaceRaised }}
                >
                  <td style={{
                    padding: `${theme.sp(2)} ${theme.sp(4)}`,
                    fontSize: theme.fontSize.sm,
                    color: theme.text,
                    borderBottom: `1px solid ${theme.surfaceBorder}`,
                  }}>
                    {m.label}
                  </td>
                  <td style={{
                    padding: `${theme.sp(2)} ${theme.sp(4)}`,
                    fontSize: theme.fontSize.sm,
                    fontFamily: theme.fontMono,
                    fontWeight: theme.fontWeight.medium,
                    color: theme.text,
                    textAlign: 'center',
                    borderBottom: `1px solid ${theme.surfaceBorder}`,
                  }}>
                    {m.actual}
                  </td>
                  <td style={{
                    padding: `${theme.sp(2)} ${theme.sp(4)}`,
                    fontSize: theme.fontSize.sm,
                    fontFamily: theme.fontMono,
                    color: theme.textSecondary,
                    textAlign: 'center',
                    borderBottom: `1px solid ${theme.surfaceBorder}`,
                  }}>
                    {m.target}
                  </td>
                  <td style={{
                    padding: `${theme.sp(2)} ${theme.sp(4)}`,
                    fontSize: theme.fontSize.sm,
                    fontFamily: theme.fontMono,
                    fontWeight: theme.fontWeight.medium,
                    color: statusColor[m.status],
                    textAlign: 'center',
                    borderBottom: `1px solid ${theme.surfaceBorder}`,
                  }}>
                    {m.variance}
                  </td>
                  <td style={{
                    padding: `${theme.sp(2)} ${theme.sp(4)}`,
                    textAlign: 'center',
                    borderBottom: `1px solid ${theme.surfaceBorder}`,
                  }}>
                    <span style={{
                      display: 'inline-block',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: statusColor[m.status],
                    }} />
                  </td>
                  <td style={{
                    padding: `${theme.sp(2)} ${theme.sp(4)}`,
                    fontSize: theme.fontSize.base,
                    textAlign: 'center',
                    borderBottom: `1px solid ${theme.surfaceBorder}`,
                  }}>
                    {trendArrow(m.trend)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {/* HC Waterfall */}
      <div style={{
        background: theme.surface,
        border: `1px solid ${theme.surfaceBorder}`,
        borderRadius: theme.radius,
        overflow: 'hidden',
      }}>
        <div style={{
          padding: `${theme.sp(3)} ${theme.sp(4)}`,
          borderBottom: `1px solid ${theme.surfaceBorder}`,
          fontSize: theme.fontSize.base,
          fontWeight: theme.fontWeight.semibold,
          color: theme.text,
          background: theme.surfaceRaised,
        }}>
          HC Waterfall
        </div>
        <div style={{ padding: theme.sp(4) }}>
          {hcWaterfall.map((step, idx) => {
            const isPositive = step.value > 0 && step.label.startsWith('+');
            const isNegative = step.label.startsWith('\u2212');
            const isTotal = step.label.startsWith('=');
            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: `${theme.sp(2)} ${theme.sp(3)}`,
                  borderBottom: idx < hcWaterfall.length - 1 ? `1px solid ${theme.surfaceBorder}` : 'none',
                  fontWeight: isTotal ? theme.fontWeight.semibold : theme.fontWeight.regular,
                }}
              >
                <span style={{ fontSize: theme.fontSize.sm, color: theme.text }}>
                  {step.label}
                </span>
                <span style={{
                  fontSize: theme.fontSize.sm,
                  fontFamily: theme.fontMono,
                  fontWeight: theme.fontWeight.medium,
                  color: isNegative ? theme.red : isPositive ? theme.green : theme.text,
                }}>
                  {step.value.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
