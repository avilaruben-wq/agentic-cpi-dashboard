import React from 'react';
import { theme } from '../../theme';
import { scenarios } from '../../data/scenarioData';
import { BarChartCard } from '../charts/BarChartCard';
import { formatNumber, formatCurrency, formatPercent } from '../../utils/format';
import { Scenario } from '../../types/scenario';

const ScenarioCard: React.FC<{ scenario: Scenario; isBase?: boolean }> = ({ scenario, isBase }) => (
  <div style={{
    background: theme.surface,
    border: `1px solid ${isBase ? theme.primary : theme.surfaceBorder}`,
    borderRadius: theme.radiusLg,
    padding: theme.sp(5),
    flex: '1 1 300px',
    position: 'relative',
    boxShadow: isBase ? theme.shadowGlow : 'none',
  }}>
    {isBase && (
      <div style={{
        position: 'absolute', top: theme.sp(3), right: theme.sp(3),
        background: theme.primary, color: '#fff',
        padding: `2px ${theme.sp(2)}`, borderRadius: theme.radiusSm,
        fontSize: theme.fontSize.xs, fontWeight: theme.fontWeight.semibold,
      }}>
        RECOMMENDED
      </div>
    )}
    <div style={{
      fontSize: theme.fontSize.lg, fontWeight: theme.fontWeight.bold, color: theme.text,
      marginBottom: theme.sp(1),
    }}>
      {scenario.label}
    </div>
    <div style={{
      fontSize: theme.fontSize.sm, color: theme.textSecondary,
      marginBottom: theme.sp(4), lineHeight: 1.5,
    }}>
      {scenario.description}
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.sp(3) }}>
      {[
        { label: 'Total Demand', value: formatNumber(scenario.totalDemand) },
        { label: 'Total Supply', value: formatNumber(scenario.totalSupply) },
        { label: 'Gap', value: formatNumber(scenario.totalGap), color: theme.red },
        { label: 'cGP Impact', value: formatCurrency(scenario.cgpImpact * 1e6), color: theme.orange },
        { label: 'Utilization Delta', value: `${scenario.utilizationDelta}pp`, color: scenario.utilizationDelta > -1 ? theme.green : theme.yellow },
        { label: 'Hiring Budget', value: formatCurrency(scenario.hiringBudget) },
        { label: 'SubK Budget', value: formatCurrency(scenario.subkBudget) },
        { label: 'Fill Rate', value: formatPercent(scenario.fillRate), color: scenario.fillRate > 85 ? theme.green : theme.yellow },
      ].map(item => (
        <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: theme.fontSize.sm, color: theme.textSecondary }}>{item.label}</span>
          <span style={{
            fontSize: theme.fontSize.sm, fontWeight: theme.fontWeight.semibold,
            color: item.color || theme.text, fontFamily: theme.fontMono,
          }}>
            {item.value}
          </span>
        </div>
      ))}
    </div>

    <div style={{
      marginTop: theme.sp(4), paddingTop: theme.sp(3),
      borderTop: `1px solid ${theme.surfaceBorder}`,
    }}>
      <div style={{
        fontSize: theme.fontSize.xs, fontWeight: theme.fontWeight.semibold,
        color: theme.textMuted, textTransform: 'uppercase', marginBottom: theme.sp(2),
      }}>
        Key Assumptions
      </div>
      <ul style={{ margin: 0, paddingLeft: theme.sp(4) }}>
        {scenario.assumptions.map((a, i) => (
          <li key={i} style={{
            fontSize: theme.fontSize.xs, color: theme.textSecondary,
            lineHeight: 1.6,
          }}>
            {a}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export const ScenarioView: React.FC = () => {
  const comparisonData = scenarios.map(s => ({
    name: s.label,
    Gap: s.totalGap,
    'Fill Rate': s.fillRate,
  }));

  const budgetData = scenarios.map(s => ({
    name: s.label,
    Hiring: Math.round(s.hiringBudget / 1e6),
    SubK: Math.round(s.subkBudget / 1e6),
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.sp(5) }}>
      <div style={{
        fontSize: theme.fontSize.lg, fontWeight: theme.fontWeight.bold, color: theme.text,
      }}>
        Scenario Comparison — Conservative / Base / Flex
      </div>

      <div style={{ display: 'flex', gap: theme.sp(5), flexWrap: 'wrap' }}>
        {scenarios.map(s => (
          <ScenarioCard key={s.type} scenario={s} isBase={s.type === 'base'} />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: theme.sp(5) }}>
        <BarChartCard
          title="Gap Comparison by Scenario"
          data={comparisonData}
          xKey="name"
          bars={[{ dataKey: 'Gap', color: theme.red, name: 'Gap (HC)' }]}
          height={250}
        />
        <BarChartCard
          title="Budget Allocation ($M)"
          data={budgetData}
          xKey="name"
          bars={[
            { dataKey: 'Hiring', color: theme.chart1, name: 'Hiring ($M)' },
            { dataKey: 'SubK', color: theme.chart4, name: 'SubK ($M)' },
          ]}
          height={250}
          stacked
        />
      </div>
    </div>
  );
};
