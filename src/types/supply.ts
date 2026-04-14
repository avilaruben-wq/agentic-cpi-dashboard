import type { GEO, BandGroup } from './ibm';

export interface SupplySnapshot {
  totalHC: number;
  activeHC: number;
  benchHC: number;
  contractorHC: number;
  benchPercent: number;
  contractorPercent: number;
  avgUtilization: number;
  lastRefreshed: string;
}

export interface GeoSupplySummary {
  geo: GEO;
  active: number;
  bench: number;
  contractor: number;
  total: number;
  utilTarget: number;
  utilActual: number;
}

export interface BenchBreakdown {
  jrs: string;
  practice: string;
  band: BandGroup;
  benchCount: number;
  avgDaysOnBench: number;
  reskillEligible: number;
}
