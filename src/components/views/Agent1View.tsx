import React, { useState } from 'react';
import { theme } from '../../theme';
import { AgentState, SubStep } from '../../types/ibm';
import { supplyEntries, supplySnapshot, utilizationTargets, geoSupplySummaries, benchAgingData, fundedVsSupervisoryData, attritionData, hiresYTDData } from '../../data/supplyData';
import { DataTable, Column } from '../shared/DataTable';
import { FilterBar } from '../shared/FilterBar';
import { SummaryBar } from '../shared/SummaryBar';
import { SubStepProgress } from '../shared/SubStepProgress';
import { StackedBarCard } from '../charts/StackedBarCard';
import { useFilters } from '../../hooks/useFilters';
import { formatNumber, formatPercent } from '../../utils/format';
import { HeadcountEntry, UtilizationTarget } from '../../types/ibm';

interface Agent1ViewProps {
  agentState: AgentState;
  onStateChange: (s: AgentState) => void;
}

const subSteps: SubStep[] = [
  { id: '1.1', label: 'Ingesting headcount data across all systems' },
  { id: '1.2', label: 'Applying attrition and leave adjustments' },
  { id: '1.3', label: 'Adding contractor and bench availability' },
  { id: '1.4', label: 'Generating supply baseline dashboard' },
];

export const Agent1View: React.FC<Agent1ViewProps> = ({ agentState, onStateChange }) => {
  const [subTab, setSubTab] = useState<'overview' | 'bench' | 'workforce'>('overview');
  const { filters, setGeo, setPractice, setJrs, reset, filterData } = useFilters();
  const filtered = filterData(supplyEntries, e => e.geo, e => e.practice, e => e.jrs);

  const columns: Column<HeadcountEntry>[] = [
    { key: 'geo', label: 'GEO', width: '100px' },
    { key: 'jrs', label: 'JRS', width: '250px' },
    { key: 'band', label: 'Band', width: '80px', align: 'center' },
    { key: 'laborPool', label: 'Labor Pool', width: '120px' },
    { key: 'active', label: 'Active', align: 'right', render: r => formatNumber(r.active), getValue: r => r.active },
    { key: 'bench', label: 'Bench', align: 'right', render: r => formatNumber(r.bench), getValue: r => r.bench },
    { key: 'contractor', label: 'Contractor', align: 'right', render: r => formatNumber(r.contractor), getValue: r => r.contractor },
    { key: 'total', label: 'Total', align: 'right', render: r => (
      <span style={{ fontWeight: theme.fontWeight.semibold }}>{formatNumber(r.total)}</span>
    ), getValue: r => r.total },
  ];

  const utilColumns: Column<UtilizationTarget>[] = [
    { key: 'geo', label: 'GEO', width: '120px' },
    { key: 'target', label: 'Target', align: 'right', render: r => formatPercent(r.target), getValue: r => r.target },
    { key: 'actual', label: 'Actual', align: 'right', render: r => formatPercent(r.actual), getValue: r => r.actual },
    { key: 'delta', label: 'Delta', align: 'right', render: r => (
      <span style={{
        color: r.delta >= 0 ? theme.green : r.delta > -1.5 ? theme.yellow : theme.red,
        fontWeight: theme.fontWeight.semibold,
      }}>
        {r.delta >= 0 ? '+' : ''}{formatPercent(r.delta)}
      </span>
    ), getValue: r => r.delta },
  ];

  const chartData = geoSupplySummaries.map(g => ({
    geo: g.geo, Active: g.active, Bench: g.bench, Contractor: g.contractor,
  }));

  const showResults = agentState === 'review' || agentState === 'approved';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.sp(4) }}>
      <SubStepProgress
        steps={subSteps}
        agentState={agentState === 'locked' ? 'ready' : agentState as any}
        onRun={() => onStateChange('running')}
        onAllAutoComplete={() => onStateChange('review')}
        onApprove={() => onStateChange('approved')}
        runLabel="Run Supply Baseline Agent"
        agentName="Supply Baseline Agent"
      />

      {showResults && (
        <>
          <SummaryBar metrics={[
            { label: 'Total HC', value: formatNumber(supplySnapshot.totalHC) },
            { label: 'Bench', value: `${formatPercent(supplySnapshot.benchPercent)} (${formatNumber(supplySnapshot.benchHC)})`, color: theme.yellow },
            { label: 'Utilization', value: formatPercent(supplySnapshot.avgUtilization), color: supplySnapshot.avgUtilization >= 87 ? theme.green : theme.yellow },
            { label: 'Contractors', value: formatNumber(supplySnapshot.contractorHC) },
          ]} />

          <div style={{ display: 'flex', gap: theme.sp(2) }}>
            {(['overview', 'bench', 'workforce'] as const).map(tab => (
              <button
                key={tab}
                style={{
                  background: subTab === tab ? theme.primary : theme.surface,
                  border: `1px solid ${subTab === tab ? theme.primary : theme.surfaceBorder}`,
                  color: subTab === tab ? '#fff' : theme.textSecondary,
                  padding: `0 ${theme.sp(4)}`, borderRadius: theme.radius,
                  fontSize: theme.fontSize.sm,
                  fontWeight: subTab === tab ? theme.fontWeight.semibold : theme.fontWeight.regular,
                  cursor: 'pointer', fontFamily: 'inherit', height: '32px',
                }}
                onClick={() => setSubTab(tab)}
              >
                {{ overview: 'Overview', bench: 'Bench Detail', workforce: 'Workforce' }[tab]}
              </button>
            ))}
          </div>

          <div style={{ fontSize: theme.fontSize.sm, color: theme.textMuted, fontStyle: 'italic' }}>
            {subTab === 'overview' && 'Headcount and utilization summary across all GEOs'}
            {subTab === 'bench' && 'How long people have been on the bench — longer tenures need action'}
            {subTab === 'workforce' && 'Headcount reconciliation, attrition tracking, and hiring pipeline'}
          </div>

          {subTab === 'overview' && (
            <>
              <FilterBar
                geoFilter={filters.geo} practiceFilter={filters.practice} jrsFilter={filters.jrs}
                onGeoChange={setGeo} onPracticeChange={setPractice} onJrsChange={setJrs} onReset={reset}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: theme.sp(5) }}>
                <StackedBarCard
                  title="Headcount by GEO"
                  data={chartData} xKey="geo"
                  segments={[
                    { dataKey: 'Active', color: theme.chart1, name: 'Active' },
                    { dataKey: 'Bench', color: theme.chart5, name: 'Bench' },
                    { dataKey: 'Contractor', color: theme.chart4, name: 'Contractor' },
                  ]}
                  height={260}
                />
                <div>
                  <div style={{ fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.semibold, color: theme.text, marginBottom: theme.sp(2) }}>
                    Utilization Targets by GEO
                  </div>
                  <DataTable columns={utilColumns} data={utilizationTargets} keyExtractor={r => r.geo} maxHeight="260px" />
                </div>
              </div>

              <DataTable columns={columns} data={filtered} keyExtractor={r => `${r.geo}-${r.jrs}-${r.band}-${r.laborPool}`} />
            </>
          )}

          {subTab === 'bench' && (
            <>
              <div style={{ fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.semibold, color: theme.text, marginBottom: theme.sp(2) }}>
                Bench Aging by Practice
              </div>
              <DataTable
                columns={[
                  { key: 'practice', label: 'Practice', width: '220px' },
                  { key: 'total', label: 'Total Bench', align: 'right' as const, render: (r: typeof benchAgingData[0]) => formatNumber(r.total), getValue: (r: typeof benchAgingData[0]) => r.total },
                  { key: 'd1_14', label: '1-14d', align: 'right' as const, render: (r: typeof benchAgingData[0]) => formatNumber(r.d1_14), getValue: (r: typeof benchAgingData[0]) => r.d1_14 },
                  { key: 'd15_30', label: '15-30d', align: 'right' as const, render: (r: typeof benchAgingData[0]) => formatNumber(r.d15_30), getValue: (r: typeof benchAgingData[0]) => r.d15_30 },
                  { key: 'd31_60', label: '31-60d', align: 'right' as const, render: (r: typeof benchAgingData[0]) => formatNumber(r.d31_60), getValue: (r: typeof benchAgingData[0]) => r.d31_60 },
                  { key: 'd61_90', label: '61-90d', align: 'right' as const, render: (r: typeof benchAgingData[0]) => formatNumber(r.d61_90), getValue: (r: typeof benchAgingData[0]) => r.d61_90 },
                  { key: 'd90plus', label: '90+', align: 'right' as const, render: (r: typeof benchAgingData[0]) => (
                    <span style={{
                      fontWeight: theme.fontWeight.semibold,
                      color: r.d90plus > 15 ? theme.red : r.d90plus > 10 ? theme.yellow : theme.text,
                    }}>
                      {formatNumber(r.d90plus)}
                    </span>
                  ), getValue: (r: typeof benchAgingData[0]) => r.d90plus },
                  { key: 'approachingBench', label: 'Approaching', align: 'right' as const, render: (r: typeof benchAgingData[0]) => formatNumber(r.approachingBench), getValue: (r: typeof benchAgingData[0]) => r.approachingBench },
                ]}
                data={benchAgingData}
                keyExtractor={r => r.practice}
              />
            </>
          )}

          {subTab === 'workforce' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: theme.sp(5) }}>
                <div>
                  <div style={{ fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.semibold, color: theme.text, marginBottom: theme.sp(1) }}>
                    Funded vs Supervisory HC
                  </div>
                  <div style={{ fontSize: theme.fontSize.xs, color: theme.textMuted, marginBottom: theme.sp(2) }}>
                    Where funded headcount differs from supervisory org — a common source of planning errors
                  </div>
                  <DataTable
                    columns={[
                      { key: 'practice', label: 'Practice', width: '200px' },
                      { key: 'funded', label: 'Funded', align: 'right' as const, render: (r: typeof fundedVsSupervisoryData[0]) => formatNumber(r.funded), getValue: (r: typeof fundedVsSupervisoryData[0]) => r.funded },
                      { key: 'supervisory', label: 'Supervisory', align: 'right' as const, render: (r: typeof fundedVsSupervisoryData[0]) => formatNumber(r.supervisory), getValue: (r: typeof fundedVsSupervisoryData[0]) => r.supervisory },
                      { key: 'delta', label: 'Delta', align: 'right' as const, render: (r: typeof fundedVsSupervisoryData[0]) => (
                        <span style={{ color: r.delta < 0 ? theme.red : theme.green, fontWeight: theme.fontWeight.semibold }}>
                          {r.delta > 0 ? '+' : ''}{formatNumber(r.delta)}
                        </span>
                      ), getValue: (r: typeof fundedVsSupervisoryData[0]) => r.delta },
                      { key: 'note', label: 'Note', width: '280px', render: (r: typeof fundedVsSupervisoryData[0]) => (
                        <span style={{ fontSize: theme.fontSize.xs, color: theme.textSecondary }}>{r.note}</span>
                      ) },
                    ]}
                    data={fundedVsSupervisoryData}
                    keyExtractor={r => r.practice}
                  />
                </div>
                <div>
                  <div style={{ fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.semibold, color: theme.text, marginBottom: theme.sp(1) }}>
                    Attrition
                  </div>
                  <div style={{ fontSize: theme.fontSize.xs, color: theme.textMuted, marginBottom: theme.sp(2) }}>
                    Voluntary (EIS) and involuntary (MIS) attrition vs plan
                  </div>
                  <DataTable
                    columns={[
                      { key: 'geo', label: 'GEO', width: '90px' },
                      { key: 'misPlanned', label: 'MIS Plan', align: 'right' as const, render: (r: typeof attritionData[0]) => formatNumber(r.misPlanned), getValue: (r: typeof attritionData[0]) => r.misPlanned },
                      { key: 'misActual', label: 'MIS Actual', align: 'right' as const, render: (r: typeof attritionData[0]) => formatNumber(r.misActual), getValue: (r: typeof attritionData[0]) => r.misActual },
                      { key: 'eisPlanned', label: 'EIS Plan', align: 'right' as const, render: (r: typeof attritionData[0]) => formatNumber(r.eisPlanned), getValue: (r: typeof attritionData[0]) => r.eisPlanned },
                      { key: 'eisActual', label: 'EIS Actual', align: 'right' as const, render: (r: typeof attritionData[0]) => formatNumber(r.eisActual), getValue: (r: typeof attritionData[0]) => r.eisActual },
                      { key: 'totalPlanned', label: 'Total Plan', align: 'right' as const, render: (r: typeof attritionData[0]) => formatNumber(r.totalPlanned), getValue: (r: typeof attritionData[0]) => r.totalPlanned },
                      { key: 'totalActual', label: 'Total Actual', align: 'right' as const, render: (r: typeof attritionData[0]) => formatNumber(r.totalActual), getValue: (r: typeof attritionData[0]) => r.totalActual },
                    ]}
                    data={attritionData}
                    keyExtractor={r => r.geo}
                  />
                </div>
              </div>

              <div style={{ fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.semibold, color: theme.text, marginBottom: theme.sp(1) }}>
                Hires YTD
              </div>
              <div style={{ fontSize: theme.fontSize.xs, color: theme.textMuted, marginBottom: theme.sp(2) }}>
                Hiring pipeline status by GEO
              </div>
              <DataTable
                columns={[
                  { key: 'geo', label: 'GEO', width: '90px' },
                  { key: 'onboarded', label: 'Onboarded', align: 'right' as const, render: (r: typeof hiresYTDData[0]) => formatNumber(r.onboarded), getValue: (r: typeof hiresYTDData[0]) => r.onboarded },
                  { key: 'anob', label: 'ANOB', align: 'right' as const, render: (r: typeof hiresYTDData[0]) => formatNumber(r.anob), getValue: (r: typeof hiresYTDData[0]) => r.anob },
                  { key: 'offersOut', label: 'Offers Out', align: 'right' as const, render: (r: typeof hiresYTDData[0]) => formatNumber(r.offersOut), getValue: (r: typeof hiresYTDData[0]) => r.offersOut },
                  { key: 'openReqs', label: 'Open REQs', align: 'right' as const, render: (r: typeof hiresYTDData[0]) => formatNumber(r.openReqs), getValue: (r: typeof hiresYTDData[0]) => r.openReqs },
                ]}
                data={hiresYTDData}
                keyExtractor={r => r.geo}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};
