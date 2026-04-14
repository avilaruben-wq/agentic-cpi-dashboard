import React from 'react';
import { theme } from '../../theme';
import { supplyEntries, supplySnapshot, utilizationTargets, geoSupplySummaries } from '../../data/supplyData';
import { DataTable, Column } from '../shared/DataTable';
import { FilterBar } from '../shared/FilterBar';
import { SummaryBar } from '../shared/SummaryBar';
import { ViewHeader } from '../shared/ViewHeader';
import { RunButton } from '../shared/RunButton';
import { StackedBarCard } from '../charts/StackedBarCard';
import { useFilters } from '../../hooks/useFilters';
import { formatNumber, formatPercent } from '../../utils/format';
import { HeadcountEntry, UtilizationTarget } from '../../types/ibm';

interface SupplyViewProps {
  isCompleted: boolean;
  onComplete: () => void;
}

export const SupplyView: React.FC<SupplyViewProps> = ({ isCompleted, onComplete }) => {
  const { filters, setGeo, setPractice, setJrs, reset, filterData } = useFilters();

  const filtered = filterData(
    supplyEntries,
    e => e.geo, e => e.practice, e => e.jrs,
  );

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
    geo: g.geo,
    Active: g.active,
    Bench: g.bench,
    Contractor: g.contractor,
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.sp(4) }}>
      <ViewHeader
        title="Step 1: Supply Baseline"
        description="Ingest and reconcile headcount from WF360, SCORE, and SAP Fieldglass. Click Run to generate the supply baseline."
        action={
          <RunButton
            label="Run Supply Agent"
            runningLabel="Ingesting data..."
            completedLabel="Supply Complete"
            isCompleted={isCompleted}
            onRun={onComplete}
            duration={2000}
          />
        }
      />

      {isCompleted ? (
        <>
          <SummaryBar metrics={[
            { label: 'Total HC', value: formatNumber(supplySnapshot.totalHC) },
            { label: 'Bench', value: `${formatPercent(supplySnapshot.benchPercent)} (${formatNumber(supplySnapshot.benchHC)})`, color: theme.yellow },
            { label: 'Utilization', value: formatPercent(supplySnapshot.avgUtilization), color: supplySnapshot.avgUtilization >= 87 ? theme.green : theme.yellow },
            { label: 'Contractors', value: formatNumber(supplySnapshot.contractorHC) },
          ]} />

          <FilterBar
            geoFilter={filters.geo} practiceFilter={filters.practice} jrsFilter={filters.jrs}
            onGeoChange={setGeo} onPracticeChange={setPractice} onJrsChange={setJrs} onReset={reset}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: theme.sp(5) }}>
            <StackedBarCard
              title="Headcount by GEO"
              data={chartData}
              xKey="geo"
              segments={[
                { dataKey: 'Active', color: theme.chart1, name: 'Active' },
                { dataKey: 'Bench', color: theme.chart5, name: 'Bench' },
                { dataKey: 'Contractor', color: theme.chart4, name: 'Contractor' },
              ]}
              height={280}
            />
            <div>
              <div style={{
                fontSize: theme.fontSize.md, fontWeight: theme.fontWeight.semibold,
                color: theme.text, marginBottom: theme.sp(3),
              }}>
                Utilization Targets by GEO
              </div>
              <DataTable columns={utilColumns} data={utilizationTargets} keyExtractor={r => r.geo} maxHeight="280px" />
            </div>
          </div>

          <DataTable columns={columns} data={filtered} keyExtractor={r => `${r.geo}-${r.jrs}-${r.band}-${r.laborPool}`} />
        </>
      ) : (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: theme.sp(16), color: theme.textMuted, fontSize: theme.fontSize.md,
          border: `1px dashed ${theme.surfaceBorder}`, borderRadius: theme.radiusLg,
        }}>
          Click "Run Supply Agent" to ingest and reconcile headcount data
        </div>
      )}
    </div>
  );
};
