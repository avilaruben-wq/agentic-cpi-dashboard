import React, { useState } from 'react';
import { theme } from '../../theme';
import { AgentState, SubStep } from '../../types/ibm';
import { dealDemands, revenueImpliedDemands, demandDeltas, demandDeltasWithRevenue, geoRevenuRiskSummary, demandVsBenchGaps, demandChurnData } from '../../data/demandData';
import { DataTable, Column } from '../shared/DataTable';
import { FilterBar } from '../shared/FilterBar';
import { SummaryBar } from '../shared/SummaryBar';
import { SubStepProgress } from '../shared/SubStepProgress';
import { BarChartCard } from '../charts/BarChartCard';
import { SeverityBadge } from '../shared/SeverityBadge';
import { useFilters } from '../../hooks/useFilters';
import { formatNumber, formatPercent, formatCurrency } from '../../utils/format';
import { DealDemand, RevenueImpliedDemand, DemandSubView } from '../../types/demand';

interface Agent2ViewProps {
  agentState: AgentState;
  onStateChange: (s: AgentState) => void;
}

const subSteps: SubStep[] = [
  { id: '2.1', label: 'Ingesting deal pipeline and revenue data' },
  { id: '2.2', label: 'Scoring deals by win probability' },
  { id: '2.3', label: 'Building bottoms-up demand view' },
  { id: '2.4', label: 'Building top-down revenue-implied view' },
  { id: '2.5', label: 'Reconciling and surfacing the delta' },
  { id: '2.6', label: 'Generating demand forecast report' },
];

export const Agent2View: React.FC<Agent2ViewProps> = ({ agentState, onStateChange }) => {
  const [subView, setSubView] = useState<DemandSubView>('bottomsUp');
  const { filters, setGeo, setPractice, setJrs, reset, filterData } = useFilters();

  const filteredDeals = filterData(dealDemands, d => d.geo, d => d.practice, d => d.jrs);
  const filteredRevenue = filterData(revenueImpliedDemands, d => d.geo, d => d.practice, d => d.jrs);
  const filteredDeltas = filterData(demandDeltas, d => d.geo, d => d.practice, d => d.jrs);

  const totalWeighted = filteredDeals.reduce((s, d) => s + d.weightedDemand, 0);
  const totalRaw = filteredDeals.reduce((s, d) => s + d.rawDemand, 0);
  const avgWinProb = filteredDeals.length ? filteredDeals.reduce((s, d) => s + d.winProbability, 0) / filteredDeals.length : 0;
  const critDeltas = filteredDeltas.filter(d => d.severity === 'critical').length;

  const showResults = agentState === 'review' || agentState === 'approved';

  const dealColumns: Column<DealDemand>[] = [
    { key: 'dealName', label: 'Deal', width: '200px' },
    { key: 'client', label: 'Client', width: '120px' },
    { key: 'geo', label: 'GEO', width: '80px' },
    { key: 'jrs', label: 'JRS', width: '200px' },
    { key: 'band', label: 'Band', width: '70px', align: 'center' },
    { key: 'rawDemand', label: 'Raw', align: 'right', render: r => formatNumber(r.rawDemand), getValue: r => r.rawDemand },
    { key: 'winProbability', label: 'Win %', align: 'right', render: r => formatPercent(r.winProbability * 100, 0), getValue: r => r.winProbability },
    { key: 'weightedDemand', label: 'Weighted', align: 'right', render: r => (
      <span style={{ fontWeight: theme.fontWeight.semibold, color: theme.primary }}>{formatNumber(r.weightedDemand)}</span>
    ), getValue: r => r.weightedDemand },
    { key: 'signed', label: 'Status', align: 'center', render: r => (
      <span style={{
        padding: '2px 8px', borderRadius: theme.radiusSm,
        background: r.signed ? theme.greenBg : theme.yellowBg,
        color: r.signed ? theme.green : theme.yellow,
        fontSize: theme.fontSize.xs, fontWeight: theme.fontWeight.medium,
      }}>
        {r.signed ? 'Signed' : 'Pipeline'}
      </span>
    ) },
  ];

  const revenueColumns: Column<RevenueImpliedDemand>[] = [
    { key: 'geo', label: 'GEO', width: '90px' },
    { key: 'jrs', label: 'JRS', width: '250px' },
    { key: 'band', label: 'Band', width: '70px', align: 'center' },
    { key: 'revenueCommit', label: 'Revenue Commit', align: 'right', render: r => `$${(r.revenueCommit / 1e6).toFixed(1)}M`, getValue: r => r.revenueCommit },
    { key: 'impliedHC', label: 'Implied HC', align: 'right', render: r => (
      <span style={{ fontWeight: theme.fontWeight.semibold }}>{formatNumber(r.impliedHC)}</span>
    ), getValue: r => r.impliedHC },
    { key: 'conversionRatio', label: 'HC/$M', align: 'right', render: r => r.conversionRatio.toFixed(2), getValue: r => r.conversionRatio },
  ];

  const btnStyle = (active: boolean): React.CSSProperties => ({
    background: active ? theme.primary : theme.surface,
    border: `1px solid ${active ? theme.primary : theme.surfaceBorder}`,
    color: active ? '#fff' : theme.textSecondary,
    padding: `0 ${theme.sp(4)}`, borderRadius: theme.radius,
    fontSize: theme.fontSize.sm, fontWeight: active ? theme.fontWeight.semibold : theme.fontWeight.regular,
    cursor: 'pointer', fontFamily: 'inherit', height: '32px',
  });

  const jrsDemand = Object.entries(
    filteredDeals.reduce<Record<string, number>>((acc, d) => { acc[d.jrs] = (acc[d.jrs] || 0) + d.weightedDemand; return acc; }, {})
  ).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([jrs, demand]) => ({
    jrs: jrs.replace(/^(App |Data |Quality |Solution |Site Reliability |Test |Project |Business |Cybersecurity )/, ''), demand,
  }));

  const filteredDeltasWithRev = filterData(demandDeltasWithRevenue, d => d.geo, d => d.practice, d => d.jrs);

  if (agentState === 'locked') {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: theme.sp(16),
        color: theme.textMuted, fontSize: theme.fontSize.md, background: theme.surface,
        border: `1px dashed ${theme.surfaceBorder}`, borderRadius: theme.radius,
      }}>
        This step requires the Supply Baseline to complete first. Go to Step 1 to begin.
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
        runLabel="Run Demand Forecast Agent"
        agentName="Demand Forecast Agent"
      />

      {showResults && (
        <>
          <SummaryBar metrics={[
            { label: 'Raw demand', value: formatNumber(totalRaw) },
            { label: 'Weighted', value: formatNumber(totalWeighted), color: theme.primary },
            { label: 'Avg win rate', value: formatPercent(avgWinProb * 100, 0) },
            { label: 'Signed', value: String(filteredDeals.filter(d => d.signed).length), color: theme.green },
            ...(critDeltas > 0 ? [{ label: 'Critical deltas', value: String(critDeltas), color: theme.red }] : []),
          ]} />

          <div style={{ display: 'flex', gap: theme.sp(2) }}>
            <button style={btnStyle(subView === 'bottomsUp')} onClick={() => setSubView('bottomsUp')}>Deal Pipeline</button>
            <button style={btnStyle(subView === 'topDown')} onClick={() => setSubView('topDown')}>Revenue Targets</button>
            <button style={btnStyle(subView === 'delta')} onClick={() => setSubView('delta')}>Revenue Risk {critDeltas > 0 && '●'}</button>
            <button style={btnStyle(subView === 'demandVsBench')} onClick={() => setSubView('demandVsBench')}>Demand vs Bench</button>
          </div>

          <div style={{ fontSize: theme.fontSize.sm, color: theme.textMuted, fontStyle: 'italic' }}>
            {subView === 'bottomsUp' && 'Demand from signed deals and pipeline, scored by win probability'}
            {subView === 'topDown' && 'Demand implied by revenue targets — what finance expects us to deliver'}
            {subView === 'delta' && 'Where the deal pipeline falls short of revenue targets — GEO leads need to close this gap through new sales, not staffing'}
            {subView === 'demandVsBench' && 'Can current bench fill the demand? The gap drives hiring and fulfillment actions'}
          </div>

          <FilterBar geoFilter={filters.geo} practiceFilter={filters.practice} jrsFilter={filters.jrs}
            onGeoChange={setGeo} onPracticeChange={setPractice} onJrsChange={setJrs} onReset={reset} />

          {subView === 'bottomsUp' && (
            <>
              <BarChartCard title="Top JRS by Weighted Demand" subtitle="Deal-backed, scored by win probability"
                data={jrsDemand} xKey="jrs" bars={[{ dataKey: 'demand', color: theme.chart1, name: 'Weighted HC' }]} height={260} />
              <DataTable columns={dealColumns} data={filteredDeals} keyExtractor={r => r.id} />
            </>
          )}
          {subView === 'topDown' && (
            <DataTable columns={revenueColumns} data={filteredRevenue} keyExtractor={r => `${r.geo}-${r.jrs}-${r.band}`} />
          )}
          {subView === 'delta' && (
            <>
              <div style={{
                background: theme.primaryMuted,
                border: `1px solid ${theme.primary}30`,
                borderLeft: `3px solid ${theme.primary}`,
                borderRadius: theme.radius,
                padding: `${theme.sp(3)} ${theme.sp(4)}`,
              }}>
                <div style={{ fontSize: theme.fontSize.sm, fontWeight: theme.fontWeight.semibold, color: theme.text, marginBottom: theme.sp(1) }}>
                  What this means
                </div>
                <div style={{ fontSize: theme.fontSize.sm, color: theme.textSecondary, lineHeight: 1.6 }}>
                  A negative HC delta means the deal pipeline doesn't support the revenue target for that GEO/skill. The revenue at risk column shows the dollar impact. <strong style={{ color: theme.text }}>This is a signal to sell more work — not to staff up.</strong> Share with GEO leads to drive pipeline actions.
                </div>
              </div>

              <div style={{ fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.semibold, color: theme.text, marginTop: theme.sp(2) }}>
                Revenue Risk by GEO
              </div>
              <div style={{ fontSize: theme.fontSize.sm, color: theme.textMuted, fontStyle: 'italic', marginBottom: theme.sp(2) }}>
                Aggregated pipeline shortfall per GEO — total revenue at risk if pipeline gaps are not closed
              </div>
              <DataTable
                columns={[
                  { key: 'geo', label: 'GEO', width: '120px' },
                  { key: 'shortfallCount', label: 'Skill Gaps', align: 'right' as const, getValue: (r: typeof geoRevenuRiskSummary[0]) => r.shortfallCount },
                  { key: 'totalDelta', label: 'HC Shortfall', align: 'right' as const, render: (r: typeof geoRevenuRiskSummary[0]) => (
                    <span style={{ color: theme.red, fontWeight: theme.fontWeight.semibold, fontFamily: theme.fontMono }}>
                      {formatNumber(r.totalDelta)}
                    </span>
                  ), getValue: (r: typeof geoRevenuRiskSummary[0]) => r.totalDelta },
                  { key: 'totalRevenueAtRisk', label: 'Revenue at Risk', align: 'right' as const, render: (r: typeof geoRevenuRiskSummary[0]) => (
                    <span style={{ color: theme.red, fontWeight: theme.fontWeight.bold, fontFamily: theme.fontMono }}>
                      {formatCurrency(r.totalRevenueAtRisk)}
                    </span>
                  ), getValue: (r: typeof geoRevenuRiskSummary[0]) => r.totalRevenueAtRisk },
                  { key: 'worstSeverity', label: 'Worst Severity', align: 'center' as const, render: (r: typeof geoRevenuRiskSummary[0]) => (
                    <SeverityBadge level={r.worstSeverity as 'critical' | 'high' | 'medium' | 'low'} />
                  ) },
                ]}
                data={geoRevenuRiskSummary}
                keyExtractor={r => r.geo}
              />

              <div style={{ fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.semibold, color: theme.text, marginTop: theme.sp(4) }}>
                Revenue Risk Detail — by GEO, JRS, and Band
              </div>
              <div style={{ fontSize: theme.fontSize.sm, color: theme.textMuted, fontStyle: 'italic', marginBottom: theme.sp(2) }}>
                Expand any row to see the recommended action for that pipeline gap
              </div>
              <DataTable
                columns={[
                  { key: 'geo', label: 'GEO', width: '90px' },
                  { key: 'jrs', label: 'JRS', width: '200px' },
                  { key: 'band', label: 'Band', width: '70px', align: 'center' as const },
                  { key: 'bottomsUpDemand', label: 'Pipeline HC', align: 'right' as const, render: (r: typeof filteredDeltasWithRev[0]) => formatNumber(r.bottomsUpDemand), getValue: (r: typeof filteredDeltasWithRev[0]) => r.bottomsUpDemand },
                  { key: 'topDownDemand', label: 'Target HC', align: 'right' as const, render: (r: typeof filteredDeltasWithRev[0]) => formatNumber(r.topDownDemand), getValue: (r: typeof filteredDeltasWithRev[0]) => r.topDownDemand },
                  { key: 'delta', label: 'HC Delta', align: 'right' as const, render: (r: typeof filteredDeltasWithRev[0]) => (
                    <span style={{ color: r.delta < -15 ? theme.red : r.delta < -5 ? theme.orange : theme.yellow, fontWeight: theme.fontWeight.semibold, fontFamily: theme.fontMono }}>
                      {formatNumber(r.delta)}
                    </span>
                  ), getValue: (r: typeof filteredDeltasWithRev[0]) => r.delta },
                  { key: 'revenueAtRisk', label: 'Revenue at Risk', align: 'right' as const, render: (r: typeof filteredDeltasWithRev[0]) => (
                    <span style={{ color: theme.red, fontWeight: theme.fontWeight.semibold, fontFamily: theme.fontMono }}>
                      {formatCurrency(r.revenueAtRisk)}
                    </span>
                  ), getValue: (r: typeof filteredDeltasWithRev[0]) => r.revenueAtRisk },
                  { key: 'severity', label: 'Severity', align: 'center' as const, render: (r: typeof filteredDeltasWithRev[0]) => <SeverityBadge level={r.severity} /> },
                ]}
                data={filteredDeltasWithRev}
                keyExtractor={r => `${r.geo}-${r.jrs}-${r.band}`}
                expandable
                renderExpanded={r => (
                  <div style={{ padding: theme.sp(2), color: theme.textSecondary, fontSize: theme.fontSize.sm }}>
                    <strong style={{ color: theme.text }}>Action needed: </strong>{r.note}
                  </div>
                )}
              />
            </>
          )}
          {subView === 'demandVsBench' && (
            <>
              <DataTable
                columns={[
                  { key: 'practice', label: 'Practice', width: '220px' },
                  { key: 'demandTotal', label: 'Demand', align: 'right' as const, render: (r: typeof demandVsBenchGaps[0]) => formatNumber(r.demandTotal), getValue: (r: typeof demandVsBenchGaps[0]) => r.demandTotal },
                  { key: 'currentBench', label: 'Bench', align: 'right' as const, render: (r: typeof demandVsBenchGaps[0]) => formatNumber(r.currentBench), getValue: (r: typeof demandVsBenchGaps[0]) => r.currentBench },
                  { key: 'gap', label: 'Gap', align: 'right' as const, render: (r: typeof demandVsBenchGaps[0]) => (
                    <span style={{ color: r.gap < 0 ? theme.red : theme.green, fontWeight: theme.fontWeight.semibold }}>
                      {formatNumber(r.gap)}
                    </span>
                  ), getValue: (r: typeof demandVsBenchGaps[0]) => r.gap },
                  { key: 'openReqs', label: 'Open REQs', align: 'right' as const, render: (r: typeof demandVsBenchGaps[0]) => formatNumber(r.openReqs), getValue: (r: typeof demandVsBenchGaps[0]) => r.openReqs },
                  { key: 'hiresInProgress', label: 'Hires in Progress', align: 'right' as const, render: (r: typeof demandVsBenchGaps[0]) => formatNumber(r.hiresInProgress), getValue: (r: typeof demandVsBenchGaps[0]) => r.hiresInProgress },
                  { key: 'attritionExpected', label: 'Attrition', align: 'right' as const, render: (r: typeof demandVsBenchGaps[0]) => formatNumber(r.attritionExpected), getValue: (r: typeof demandVsBenchGaps[0]) => r.attritionExpected },
                  { key: 'isGrowthPractice', label: 'Growth Practice', align: 'center' as const, render: (r: typeof demandVsBenchGaps[0]) => (
                    <span style={{
                      padding: '2px 8px', borderRadius: theme.radiusSm,
                      background: r.isGrowthPractice ? theme.greenBg : theme.surfaceRaised,
                      color: r.isGrowthPractice ? theme.green : theme.textMuted,
                      fontSize: theme.fontSize.xs, fontWeight: theme.fontWeight.medium,
                    }}>
                      {r.isGrowthPractice ? 'Y' : 'N'}
                    </span>
                  ) },
                ]}
                data={demandVsBenchGaps}
                keyExtractor={r => r.practice}
              />

              <div style={{ marginTop: theme.sp(2) }}>
                <div style={{ fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.semibold, color: theme.text, marginBottom: theme.sp(2) }}>
                  Demand Churn
                </div>
                <DataTable
                  columns={[
                    { key: 'period', label: 'Period', width: '140px' },
                    { key: 'withdrawn', label: 'Withdrawn', align: 'right' as const, render: (r: typeof demandChurnData[0]) => formatNumber(r.withdrawn), getValue: (r: typeof demandChurnData[0]) => r.withdrawn },
                    { key: 'deferred', label: 'Deferred', align: 'right' as const, render: (r: typeof demandChurnData[0]) => formatNumber(r.deferred), getValue: (r: typeof demandChurnData[0]) => r.deferred },
                    { key: 'changed', label: 'Changed', align: 'right' as const, render: (r: typeof demandChurnData[0]) => formatNumber(r.changed), getValue: (r: typeof demandChurnData[0]) => r.changed },
                    { key: 'total', label: 'Total', align: 'right' as const, render: (r: typeof demandChurnData[0]) => (
                      <span style={{ fontWeight: theme.fontWeight.semibold }}>{formatNumber(r.total)}</span>
                    ), getValue: (r: typeof demandChurnData[0]) => r.total },
                    { key: 'churnRate', label: 'Churn Rate', align: 'right' as const, render: (r: typeof demandChurnData[0]) => (
                      <span style={{ color: r.churnRate > 10 ? theme.red : r.churnRate > 5 ? theme.yellow : theme.green, fontWeight: theme.fontWeight.medium }}>
                        {r.churnRate.toFixed(1)}%
                      </span>
                    ), getValue: (r: typeof demandChurnData[0]) => r.churnRate },
                  ]}
                  data={demandChurnData}
                  keyExtractor={r => r.period}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
