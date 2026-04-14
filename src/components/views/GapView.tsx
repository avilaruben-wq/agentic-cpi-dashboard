import React from 'react';
import { theme } from '../../theme';
import { gapEntries, totalGapCount, totalRevenueAtRisk, critSitCount } from '../../data/gapData';
import { DataTable, Column } from '../shared/DataTable';
import { FilterBar } from '../shared/FilterBar';
import { KPICard } from '../shared/KPICard';
import { SeverityBadge } from '../shared/SeverityBadge';
import { HeatmapTable } from '../charts/HeatmapTable';
import { useFilters } from '../../hooks/useFilters';
import { formatNumber, formatCurrency } from '../../utils/format';
import { severityLabel } from '../../utils/calculations';
import { GapEntry, FulfillmentAction } from '../../types/gap';
import { FULFILLMENT_STEP_LABELS } from '../../data/constants';

const stepColors: Record<string, string> = {
  bench: theme.green,
  rotation: theme.chart6,
  reskill_anob: theme.chart3,
  hire: theme.chart1,
  subk: theme.orange,
  hcam_fth: theme.yellow,
};

const FulfillmentHierarchy: React.FC<{ plan: FulfillmentAction[] }> = ({ plan }) => (
  <div>
    <div style={{
      fontSize: theme.fontSize.sm, fontWeight: theme.fontWeight.semibold,
      color: theme.text, marginBottom: theme.sp(3),
    }}>
      6-Step Fulfillment Hierarchy
    </div>
    <div style={{ display: 'flex', gap: theme.sp(2), flexWrap: 'wrap' }}>
      {plan.map((step, idx) => (
        <div key={step.step} style={{
          background: theme.bg,
          border: `1px solid ${theme.surfaceBorder}`,
          borderTop: `3px solid ${stepColors[step.step] || theme.textMuted}`,
          borderRadius: theme.radius,
          padding: theme.sp(3),
          minWidth: '140px',
          flex: '1 1 140px',
          position: 'relative',
        }}>
          <div style={{
            fontSize: theme.fontSize.xs, color: theme.textMuted,
            marginBottom: theme.sp(1), textTransform: 'uppercase',
          }}>
            Step {idx + 1}
          </div>
          <div style={{ fontSize: theme.fontSize.sm, fontWeight: theme.fontWeight.semibold, color: theme.text }}>
            {FULFILLMENT_STEP_LABELS[step.step] || step.label}
          </div>
          <div style={{ marginTop: theme.sp(2), fontSize: theme.fontSize.xs, color: theme.textSecondary }}>
            <div><span style={{ color: theme.text, fontFamily: theme.fontMono }}>{step.headcount}</span> HC</div>
            <div><span style={{ color: theme.text, fontFamily: theme.fontMono }}>{formatCurrency(step.totalCost)}</span></div>
            <div><span style={{ color: theme.text, fontFamily: theme.fontMono }}>{step.leadTimeDays}d</span> lead time</div>
          </div>
          <div style={{
            marginTop: theme.sp(2),
            padding: '2px 6px', borderRadius: theme.radiusSm,
            background: step.feasibility === 'high' ? theme.greenBg : step.feasibility === 'medium' ? theme.yellowBg : theme.redBg,
            color: step.feasibility === 'high' ? theme.green : step.feasibility === 'medium' ? theme.yellow : theme.red,
            fontSize: theme.fontSize.xs, display: 'inline-block',
          }}>
            {step.feasibility}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const GapView: React.FC = () => {
  const { filters, setGeo, setPractice, setJrs, reset, filterData } = useFilters();
  const filtered = filterData(gapEntries, g => g.geo, g => g.practice, g => g.jrs);

  const avgSeverity = filtered.length
    ? (filtered.reduce((s, g) => s + g.severity.composite, 0) / filtered.length).toFixed(1)
    : '0';

  const fillRate = filtered.length
    ? ((1 - filtered.reduce((s, g) => s + g.gapCount, 0) / 18916) * 100).toFixed(1)
    : '0';

  // Heatmap data
  const jrsNames = [...new Set(filtered.map(g => g.jrs))];
  const bandGroups = ['B1-5', 'B6', 'B7-8', 'B9-10'];
  const heatData = jrsNames.map(jrs =>
    bandGroups.map(band => {
      const entry = filtered.find(g => g.jrs === jrs && g.band === band);
      return entry ? entry.gapCount : 0;
    })
  );

  const columns: Column<GapEntry>[] = [
    { key: 'isCritSit', label: '', width: '30px', render: r => r.isCritSit ? (
      <span style={{ color: theme.red, fontSize: '14px' }}>●</span>
    ) : null },
    { key: 'geo', label: 'GEO', width: '90px' },
    { key: 'jrs', label: 'JRS', width: '230px' },
    { key: 'band', label: 'Band', width: '70px', align: 'center' },
    { key: 'gapCount', label: 'Gap', align: 'right', render: r => (
      <span style={{ fontWeight: theme.fontWeight.bold, color: theme.text, fontFamily: theme.fontMono }}>{formatNumber(r.gapCount)}</span>
    ), getValue: r => r.gapCount },
    { key: 'severity', label: 'Severity', align: 'center', render: r => (
      <SeverityBadge level={severityLabel(r.severity.composite)} />
    ), getValue: r => r.severity.composite },
    { key: 'revenueAtRisk', label: 'Rev at Risk', align: 'right', render: r => formatCurrency(r.revenueAtRisk), getValue: r => r.revenueAtRisk },
    { key: 'recommendedAction', label: 'Recommended Action', width: '300px', render: r => (
      <span style={{ fontSize: theme.fontSize.xs, color: theme.textSecondary }}>{r.recommendedAction}</span>
    ) },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.sp(5) }}>
      {critSitCount > 0 && (
        <div style={{
          background: theme.redBg, border: `1px solid ${theme.red}40`,
          borderRadius: theme.radius, padding: `${theme.sp(3)} ${theme.sp(4)}`,
          display: 'flex', alignItems: 'center', gap: theme.sp(2),
          animation: 'fadeIn 0.3s ease',
        }}>
          <span style={{ color: theme.red, fontSize: theme.fontSize.lg }}>⚠</span>
          <span style={{ color: theme.red, fontWeight: theme.fontWeight.semibold, fontSize: theme.fontSize.sm }}>
            {critSitCount} CritSit gaps require immediate executive attention
          </span>
        </div>
      )}

      <div style={{ display: 'flex', gap: theme.sp(4), flexWrap: 'wrap' }}>
        <KPICard label="Total Gaps" value={formatNumber(totalGapCount)} accent={theme.red} />
        <KPICard label="Revenue at Risk" value={formatCurrency(totalRevenueAtRisk)} accent={theme.orange} />
        <KPICard label="Avg Severity" value={avgSeverity} delta="1-5 composite scale" deltaDirection="neutral" accent={theme.yellow} />
        <KPICard label="Fill Rate" value={`${fillRate}%`} delta="Supply / Total Demand" deltaDirection="neutral" accent={theme.green} />
      </div>

      <FilterBar
        geoFilter={filters.geo} practiceFilter={filters.practice} jrsFilter={filters.jrs}
        onGeoChange={setGeo} onPracticeChange={setPractice} onJrsChange={setJrs} onReset={reset}
      />

      {jrsNames.length > 0 && heatData.length > 0 && (
        <HeatmapTable
          title="Gap Severity Heatmap — JRS x Band"
          rows={jrsNames}
          columns={bandGroups}
          data={heatData}
          rowLabel="JRS"
        />
      )}

      <div>
        <div style={{
          fontSize: theme.fontSize.md, fontWeight: theme.fontWeight.semibold,
          color: theme.text, marginBottom: theme.sp(3),
        }}>
          Gap Register — Click to expand fulfillment plan
        </div>
        <DataTable
          columns={columns}
          data={filtered}
          keyExtractor={r => r.id}
          expandable
          renderExpanded={r => (
            <div>
              <FulfillmentHierarchy plan={r.fulfillmentPlan} />
            </div>
          )}
        />
      </div>
    </div>
  );
};
