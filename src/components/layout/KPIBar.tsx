import React from 'react';
import { theme } from '../../theme';
import { KPICard } from '../shared/KPICard';
import { supplySnapshot } from '../../data/supplyData';
import { totalGapCount, totalRevenueAtRisk, critSitCount } from '../../data/gapData';
import { formatNumber, formatCurrency, formatPercent } from '../../utils/format';

export const KPIBar: React.FC = () => (
  <div style={{
    display: 'flex',
    gap: theme.sp(4),
    padding: `${theme.sp(4)} ${theme.sp(6)}`,
    flexWrap: 'wrap',
  }}>
    <KPICard
      label="Total Headcount"
      value={formatNumber(supplySnapshot.totalHC)}
      delta={`${formatNumber(supplySnapshot.activeHC)} active`}
      deltaDirection="neutral"
      accent={theme.primary}
    />
    <KPICard
      label="Open Demands"
      value={formatNumber(4689)}
      delta="25% of outstanding"
      deltaDirection="neutral"
      accent={theme.yellow}
    />
    <KPICard
      label="Total Gap"
      value={formatNumber(totalGapCount)}
      delta={`${critSitCount} CritSits`}
      deltaDirection="down"
      accent={theme.red}
    />
    <KPICard
      label="Revenue at Risk"
      value={formatCurrency(totalRevenueAtRisk)}
      delta={`${formatPercent(supplySnapshot.avgUtilization)} utilization`}
      deltaDirection="neutral"
      accent={theme.orange}
    />
  </div>
);
