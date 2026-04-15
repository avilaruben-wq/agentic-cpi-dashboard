import React, { useState } from 'react';
import { theme } from '../../theme';
import { AgentState, SubStep } from '../../types/ibm';
import { gapEntries, totalGapCount, totalRevenueAtRisk, critSitCount } from '../../data/gapData';
import { scenarios } from '../../data/scenarioData';
import { DataTable, Column } from '../shared/DataTable';
import { FilterBar } from '../shared/FilterBar';
import { SummaryBar } from '../shared/SummaryBar';
import { SubStepProgress } from '../shared/SubStepProgress';
import { SeverityBadge } from '../shared/SeverityBadge';
import { HeatmapTable } from '../charts/HeatmapTable';
import { BarChartCard } from '../charts/BarChartCard';
import { useFilters } from '../../hooks/useFilters';
import { formatNumber, formatCurrency, formatPercent } from '../../utils/format';
import { severityLabel } from '../../utils/calculations';
import { GapEntry, FulfillmentAction } from '../../types/gap';
import { Scenario, ScenarioType } from '../../types/scenario';
import { FULFILLMENT_STEP_LABELS } from '../../data/constants';

interface Agent3ViewProps {
  agentState: AgentState;
  onStateChange: (s: AgentState) => void;
}

const subSteps: SubStep[] = [
  { id: '3.1', label: 'Identifying supply-demand gaps' },
  { id: '3.2', label: 'Running fulfillment hierarchy per gap' },
  { id: '3.3', label: 'Modeling scenarios and cost impact' },
  { id: '3.4', label: 'Generating gap register and recommendations' },
];

type Section = 'gaps' | 'scenarios';

const stepColors: Record<string, string> = {
  bench: theme.green, rotation: theme.chart6, reskill_anob: theme.chart3,
  hire: theme.chart1, subk: theme.orange, hcam_fth: theme.yellow,
};

const FulfillmentHierarchy: React.FC<{ plan: FulfillmentAction[] }> = ({ plan }) => (
  <div>
    <div style={{ fontSize: theme.fontSize.sm, fontWeight: theme.fontWeight.semibold, color: theme.text, marginBottom: theme.sp(2) }}>
      6-Step Fulfillment Hierarchy
    </div>
    <div style={{ display: 'flex', gap: theme.sp(2), flexWrap: 'wrap' }}>
      {plan.map((step, idx) => (
        <div key={step.step} style={{
          background: theme.bg, border: `1px solid ${theme.surfaceBorder}`,
          borderTop: `3px solid ${stepColors[step.step] || theme.textMuted}`,
          borderRadius: theme.radius, padding: theme.sp(3), minWidth: '130px', flex: '1 1 130px',
        }}>
          <div style={{ fontSize: theme.fontSize.xs, color: theme.textMuted, textTransform: 'uppercase' }}>Step {idx + 1}</div>
          <div style={{ fontSize: theme.fontSize.sm, fontWeight: theme.fontWeight.semibold, color: theme.text, marginTop: '2px' }}>
            {FULFILLMENT_STEP_LABELS[step.step] || step.label}
          </div>
          <div style={{ marginTop: theme.sp(1), fontSize: theme.fontSize.xs, color: theme.textSecondary }}>
            <div><span style={{ fontFamily: theme.fontMono, color: theme.text }}>{step.headcount}</span> HC</div>
            <div><span style={{ fontFamily: theme.fontMono, color: theme.text }}>{formatCurrency(step.totalCost)}</span></div>
            <div><span style={{ fontFamily: theme.fontMono, color: theme.text }}>{step.leadTimeDays}d</span> lead</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ScenarioCard: React.FC<{
  scenario: Scenario; isBase?: boolean; isSelected: boolean; onSelect: () => void;
}> = ({ scenario, isBase, isSelected, onSelect }) => (
  <div
    onClick={onSelect}
    style={{
      background: theme.surface,
      border: `2px solid ${isSelected ? '#198038' : isBase ? theme.primary : theme.surfaceBorder}`,
      borderRadius: theme.radius, padding: theme.sp(4), flex: '1 1 250px',
      boxShadow: isSelected ? '0 0 0 3px rgba(25,128,56,0.15)' : isBase ? theme.shadowGlow : 'none',
      position: 'relative', cursor: 'pointer', transition: 'all 0.15s',
    }}
  >
    <div style={{ display: 'flex', gap: theme.sp(1), position: 'absolute', top: theme.sp(2), right: theme.sp(2) }}>
      {isBase && !isSelected && (
        <span style={{
          background: theme.primary, color: '#fff', padding: '2px 8px',
          borderRadius: theme.radiusSm, fontSize: '10px', fontWeight: 600,
        }}>RECOMMENDED</span>
      )}
      {isSelected && (
        <span style={{
          background: '#198038', color: '#fff', padding: '2px 8px',
          borderRadius: theme.radiusSm, fontSize: '10px', fontWeight: 600,
        }}>✓ SELECTED</span>
      )}
    </div>
    <div style={{ fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.semibold, color: theme.text }}>{scenario.label}</div>
    <div style={{ fontSize: theme.fontSize.xs, color: theme.textMuted, margin: `${theme.sp(1)} 0 ${theme.sp(3)}`, lineHeight: 1.5 }}>{scenario.description}</div>
    {[
      { l: 'Gap', v: formatNumber(scenario.totalGap), c: theme.red },
      { l: 'cGP Impact', v: formatCurrency(scenario.cgpImpact * 1e6), c: theme.orange },
      { l: 'Fill Rate', v: formatPercent(scenario.fillRate), c: scenario.fillRate > 85 ? theme.green : theme.yellow },
      { l: 'Hiring', v: formatCurrency(scenario.hiringBudget) },
      { l: 'SubK', v: formatCurrency(scenario.subkBudget) },
    ].map(item => (
      <div key={item.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', fontSize: theme.fontSize.sm }}>
        <span style={{ color: theme.textSecondary }}>{item.l}</span>
        <span style={{ fontFamily: theme.fontMono, fontWeight: theme.fontWeight.medium, color: item.c || theme.text }}>{item.v}</span>
      </div>
    ))}
    {!isSelected && (
      <div style={{ marginTop: theme.sp(3), textAlign: 'center' }}>
        <span style={{ fontSize: theme.fontSize.xs, color: theme.primary, fontWeight: theme.fontWeight.medium }}>
          Click to select this scenario
        </span>
      </div>
    )}
  </div>
);

export const Agent3View: React.FC<Agent3ViewProps> = ({ agentState, onStateChange }) => {
  const [section, setSection] = useState<Section>('gaps');
  const [selectedScenario, setSelectedScenario] = useState<ScenarioType | null>(null);
  const { filters, setGeo, setPractice, setJrs, reset, filterData } = useFilters();
  const filtered = filterData(gapEntries, g => g.geo, g => g.practice, g => g.jrs);

  const showResults = agentState === 'review' || agentState === 'approved';

  const jrsNames = [...new Set(filtered.map(g => g.jrs))];
  const bandGroups = ['B1-5', 'B6', 'B7-8', 'B9-10'];
  const heatData = jrsNames.map(jrs => bandGroups.map(band => {
    const entry = filtered.find(g => g.jrs === jrs && g.band === band);
    return entry ? entry.gapCount : 0;
  }));

  const gapColumns: Column<GapEntry>[] = [
    { key: 'isCritSit', label: '', width: '28px', render: r => r.isCritSit ? <span style={{ color: theme.red, fontSize: '12px' }}>●</span> : null },
    { key: 'geo', label: 'GEO', width: '90px' },
    { key: 'jrs', label: 'JRS', width: '220px' },
    { key: 'band', label: 'Band', width: '60px', align: 'center' },
    { key: 'gapCount', label: 'Gap', align: 'right', render: r => (
      <span style={{ fontWeight: theme.fontWeight.bold, fontFamily: theme.fontMono }}>{formatNumber(r.gapCount)}</span>
    ), getValue: r => r.gapCount },
    { key: 'severity', label: 'Severity', align: 'center', render: r => <SeverityBadge level={severityLabel(r.severity.composite)} />, getValue: r => r.severity.composite },
    { key: 'revenueAtRisk', label: 'Rev at Risk', align: 'right', render: r => formatCurrency(r.revenueAtRisk), getValue: r => r.revenueAtRisk },
    { key: 'recommendedAction', label: 'Recommended Action', width: '280px', render: r => (
      <span style={{ fontSize: theme.fontSize.xs, color: theme.textSecondary }}>{r.recommendedAction}</span>
    ) },
  ];

  const budgetData = scenarios.map(s => ({
    name: s.label, Hiring: Math.round(s.hiringBudget / 1e6), SubK: Math.round(s.subkBudget / 1e6),
  }));

  const btnStyle = (active: boolean): React.CSSProperties => ({
    background: active ? theme.primary : theme.surface,
    border: `1px solid ${active ? theme.primary : theme.surfaceBorder}`,
    color: active ? '#fff' : theme.textSecondary,
    padding: `0 ${theme.sp(4)}`, borderRadius: theme.radius,
    fontSize: theme.fontSize.sm, fontWeight: active ? theme.fontWeight.semibold : theme.fontWeight.regular,
    cursor: 'pointer', fontFamily: 'inherit', height: '32px',
  });

  if (agentState === 'locked') {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: theme.sp(16),
        color: theme.textMuted, fontSize: theme.fontSize.md, background: theme.surface,
        border: `1px dashed ${theme.surfaceBorder}`, borderRadius: theme.radius,
      }}>
        🔒 Complete and approve the Demand Forecast Agent first
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.sp(4) }}>
      <SubStepProgress
        steps={subSteps}
        agentState={agentState as any}
        onRun={() => onStateChange('running')}
        onAllAutoComplete={() => onStateChange('review')}
        onApprove={() => onStateChange('approved')}
        runLabel="Run Gaps & Actions Agent"
        agentName="Gaps & Actions Agent"
      />

      {showResults && (
        <>
          {critSitCount > 0 && (
            <div style={{
              background: theme.redBg, border: `1px solid ${theme.red}30`, borderRadius: theme.radius,
              padding: `${theme.sp(2)} ${theme.sp(3)}`, display: 'flex', alignItems: 'center', gap: theme.sp(2),
            }}>
              <span style={{ color: theme.red }}>⚠</span>
              <span style={{ color: theme.red, fontWeight: theme.fontWeight.semibold, fontSize: theme.fontSize.sm }}>
                {critSitCount} CritSit gaps require immediate executive attention
              </span>
            </div>
          )}

          <SummaryBar metrics={[
            { label: 'Total gaps', value: formatNumber(totalGapCount), color: theme.red },
            { label: 'Revenue at risk', value: formatCurrency(totalRevenueAtRisk), color: theme.orange },
            { label: 'CritSits', value: String(critSitCount), color: theme.red },
            { label: 'Base cGP impact', value: '-$120M', color: theme.orange },
          ]} />

          <div style={{ display: 'flex', gap: theme.sp(2) }}>
            <button style={btnStyle(section === 'gaps')} onClick={() => setSection('gaps')}>Gap Register</button>
            <button style={btnStyle(section === 'scenarios')} onClick={() => setSection('scenarios')}>Scenario Comparison</button>
          </div>

          {section === 'gaps' && (
            <>
              <FilterBar geoFilter={filters.geo} practiceFilter={filters.practice} jrsFilter={filters.jrs}
                onGeoChange={setGeo} onPracticeChange={setPractice} onJrsChange={setJrs} onReset={reset} />

              {jrsNames.length > 0 && (
                <HeatmapTable title="Gap Heatmap — JRS x Band" rows={jrsNames} columns={bandGroups} data={heatData} rowLabel="JRS" />
              )}

              <DataTable columns={gapColumns} data={filtered} keyExtractor={r => r.id}
                expandable renderExpanded={r => <FulfillmentHierarchy plan={r.fulfillmentPlan} />} />
            </>
          )}

          {section === 'scenarios' && (
            <>
              <div style={{ fontSize: theme.fontSize.sm, color: theme.textSecondary, marginBottom: theme.sp(1) }}>
                Select a scenario to proceed with. Click a card to choose.
              </div>
              <div style={{ display: 'flex', gap: theme.sp(4), flexWrap: 'wrap' }}>
                {scenarios.map(s => (
                  <ScenarioCard
                    key={s.type}
                    scenario={s}
                    isBase={s.type === 'base'}
                    isSelected={selectedScenario === s.type}
                    onSelect={() => setSelectedScenario(s.type)}
                  />
                ))}
              </div>

              {selectedScenario && (
                <div style={{
                  padding: theme.sp(3), background: '#defbe6', border: '1px solid #19803830',
                  borderRadius: theme.radius, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <span style={{ fontSize: theme.fontSize.sm, color: '#198038', fontWeight: theme.fontWeight.medium }}>
                    ✓ <strong>{scenarios.find(s => s.type === selectedScenario)?.label}</strong> scenario selected — this will be used for the DI Authorization Letter and SCORE plan
                  </span>
                </div>
              )}

              <BarChartCard title="Budget Allocation ($M)" data={budgetData} xKey="name"
                bars={[
                  { dataKey: 'Hiring', color: theme.chart1, name: 'Hiring ($M)' },
                  { dataKey: 'SubK', color: theme.chart4, name: 'SubK ($M)' },
                ]} height={250} stacked />
            </>
          )}
        </>
      )}
    </div>
  );
};
