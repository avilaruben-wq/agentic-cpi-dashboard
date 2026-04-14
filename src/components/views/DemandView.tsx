import React, { useState } from 'react';
import { theme } from '../../theme';
import { dealDemands, revenueImpliedDemands, demandDeltas } from '../../data/demandData';
import { DataTable, Column } from '../shared/DataTable';
import { FilterBar } from '../shared/FilterBar';
import { SummaryBar } from '../shared/SummaryBar';
import { ViewHeader } from '../shared/ViewHeader';
import { RunButton } from '../shared/RunButton';
import { BarChartCard } from '../charts/BarChartCard';
import { DeltaChart } from '../charts/DeltaChart';
import { SeverityBadge } from '../shared/SeverityBadge';
import { useFilters } from '../../hooks/useFilters';
import { formatNumber, formatPercent, formatDeltaPercent } from '../../utils/format';
import { DealDemand, RevenueImpliedDemand, DemandDelta, DemandSubView } from '../../types/demand';

interface DemandViewProps {
  isCompleted: boolean;
  onComplete: () => void;
}

export const DemandView: React.FC<DemandViewProps> = ({ isCompleted, onComplete }) => {
  const [subView, setSubView] = useState<DemandSubView>('bottomsUp');
  const { filters, setGeo, setPractice, setJrs, reset, filterData } = useFilters();

  const filteredDeals = filterData(dealDemands, d => d.geo, d => d.practice, d => d.jrs);
  const filteredRevenue = filterData(revenueImpliedDemands, d => d.geo, d => d.practice, d => d.jrs);
  const filteredDeltas = filterData(demandDeltas, d => d.geo, d => d.practice, d => d.jrs);

  const totalWeighted = filteredDeals.reduce((s, d) => s + d.weightedDemand, 0);
  const totalRaw = filteredDeals.reduce((s, d) => s + d.rawDemand, 0);
  const avgWinProb = filteredDeals.length ? filteredDeals.reduce((s, d) => s + d.winProbability, 0) / filteredDeals.length : 0;
  const critDeltas = filteredDeltas.filter(d => d.severity === 'critical').length;

  const dealColumns: Column<DealDemand>[] = [
    { key: 'dealName', label: 'Deal', width: '200px' },
    { key: 'client', label: 'Client', width: '120px' },
    { key: 'geo', label: 'GEO', width: '80px' },
    { key: 'jrs', label: 'JRS', width: '200px' },
    { key: 'band', label: 'Band', width: '70px', align: 'center' },
    { key: 'rawDemand', label: 'Raw', align: 'right', render: r => formatNumber(r.rawDemand), getValue: r => r.rawDemand },
    { key: 'winProbability', label: 'Win %', align: 'right', render: r => formatPercent(r.winProbability * 100, 0), getValue: r => r.winProbability },
    { key: 'weightedDemand', label: 'Weighted', align: 'right', render: r => (
      <span style={{ fontWeight: theme.fontWeight.semibold, color: theme.primaryLight }}>{formatNumber(r.weightedDemand)}</span>
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
    { key: 'laborPool', label: 'Labor Pool', width: '120px' },
    { key: 'revenueCommit', label: 'Revenue Commit', align: 'right', render: r => `$${(r.revenueCommit / 1e6).toFixed(1)}M`, getValue: r => r.revenueCommit },
    { key: 'impliedHC', label: 'Implied HC', align: 'right', render: r => (
      <span style={{ fontWeight: theme.fontWeight.semibold }}>{formatNumber(r.impliedHC)}</span>
    ), getValue: r => r.impliedHC },
    { key: 'conversionRatio', label: 'HC/$M', align: 'right', render: r => r.conversionRatio.toFixed(2), getValue: r => r.conversionRatio },
  ];

  const deltaColumns: Column<DemandDelta>[] = [
    { key: 'geo', label: 'GEO', width: '90px' },
    { key: 'jrs', label: 'JRS', width: '220px' },
    { key: 'band', label: 'Band', width: '70px', align: 'center' },
    { key: 'bottomsUpDemand', label: 'Bottoms-Up', align: 'right', render: r => formatNumber(r.bottomsUpDemand), getValue: r => r.bottomsUpDemand },
    { key: 'topDownDemand', label: 'Top-Down', align: 'right', render: r => formatNumber(r.topDownDemand), getValue: r => r.topDownDemand },
    { key: 'delta', label: 'Delta', align: 'right', render: r => (
      <span style={{ color: r.delta < -15 ? theme.red : r.delta < -5 ? theme.orange : theme.yellow, fontWeight: theme.fontWeight.semibold }}>
        {formatNumber(r.delta)}
      </span>
    ), getValue: r => r.delta },
    { key: 'deltaPercent', label: 'Delta %', align: 'right', render: r => (
      <span style={{ color: r.severity === 'critical' ? theme.red : r.severity === 'high' ? theme.orange : theme.yellow }}>
        {formatDeltaPercent(r.deltaPercent)}
      </span>
    ), getValue: r => r.deltaPercent },
    { key: 'severity', label: 'Severity', align: 'center', render: r => <SeverityBadge level={r.severity} /> },
  ];

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
    transition: 'all 0.2s',
  });

  const jrsDemand = Object.entries(
    filteredDeals.reduce<Record<string, number>>((acc, d) => {
      acc[d.jrs] = (acc[d.jrs] || 0) + d.weightedDemand;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([jrs, demand]) => ({ jrs: jrs.replace(/^(App |Data |Quality |Solution |Site Reliability |Test |Project |Business |Cybersecurity )/, ''), demand }));

  const deltaChartData = filteredDeltas.map(d => ({
    name: `${d.geo} — ${d.jrs.split('-')[0]}`,
    delta: d.delta,
    severity: d.severity,
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.sp(4) }}>
      <ViewHeader
        title="Step 2: Demand Forecast"
        description="Ingest deal data, score by win/churn probability, and reconcile bottoms-up vs top-down demand."
        action={
          <RunButton
            label="Run Demand Agent"
            runningLabel="Analyzing deals..."
            completedLabel="Demand Complete"
            isCompleted={isCompleted}
            onRun={onComplete}
            duration={3000}
          />
        }
      />

      {isCompleted ? (
        <>
          <SummaryBar metrics={[
            { label: 'Raw demand', value: formatNumber(totalRaw) },
            { label: 'Weighted', value: formatNumber(totalWeighted), color: theme.primaryLight },
            { label: 'Avg win rate', value: formatPercent(avgWinProb * 100, 0) },
            { label: 'Signed', value: String(filteredDeals.filter(d => d.signed).length), color: theme.green },
            { label: 'Pipeline', value: String(filteredDeals.filter(d => !d.signed).length), color: theme.yellow },
            ...(critDeltas > 0 ? [{ label: 'Critical deltas', value: String(critDeltas), color: theme.red }] : []),
          ]} />

          <div style={{ display: 'flex', gap: theme.sp(2), alignItems: 'center' }}>
            <button style={btnStyle(subView === 'bottomsUp')} onClick={() => setSubView('bottomsUp')}>Bottoms-Up</button>
            <button style={btnStyle(subView === 'topDown')} onClick={() => setSubView('topDown')}>Top-Down</button>
            <button style={btnStyle(subView === 'delta')} onClick={() => setSubView('delta')}>
              Delta {critDeltas > 0 && '●'}
            </button>
          </div>

          <FilterBar
            geoFilter={filters.geo} practiceFilter={filters.practice} jrsFilter={filters.jrs}
            onGeoChange={setGeo} onPracticeChange={setPractice} onJrsChange={setJrs} onReset={reset}
          />

          {subView === 'bottomsUp' && (
            <>
              <BarChartCard
                title="Top JRS by Weighted Demand"
                subtitle="Deal-backed, scored by win probability"
                data={jrsDemand}
                xKey="jrs"
                bars={[{ dataKey: 'demand', color: theme.chart1, name: 'Weighted HC' }]}
                height={260}
              />
              <DataTable columns={dealColumns} data={filteredDeals} keyExtractor={r => r.id} />
            </>
          )}

          {subView === 'topDown' && (
            <DataTable columns={revenueColumns} data={filteredRevenue} keyExtractor={r => `${r.geo}-${r.jrs}-${r.band}`} />
          )}

          {subView === 'delta' && (
            <>
              <DeltaChart title="Demand Delta — Bottoms-Up vs Top-Down" data={deltaChartData} />
              <DataTable
                columns={deltaColumns}
                data={filteredDeltas}
                keyExtractor={r => `${r.geo}-${r.jrs}-${r.band}`}
                expandable
                renderExpanded={r => (
                  <div style={{ padding: theme.sp(2), color: theme.textSecondary, fontSize: theme.fontSize.sm }}>
                    <strong style={{ color: theme.text }}>Analysis: </strong>{r.note}
                  </div>
                )}
              />
            </>
          )}
        </>
      ) : (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: theme.sp(16), color: theme.textMuted, fontSize: theme.fontSize.md,
          border: `1px dashed ${theme.surfaceBorder}`, borderRadius: theme.radiusLg,
        }}>
          Click "Run Demand Agent" to analyze deal pipeline and revenue forecasts
        </div>
      )}
    </div>
  );
};
