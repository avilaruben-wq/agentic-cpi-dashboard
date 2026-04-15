import type { GEO, BandGroup, LaborPool } from './ibm';

export interface DealDemand {
  id: string;
  dealName: string;
  client: string;
  geo: GEO;
  jrs: string;
  practice: string;
  band: BandGroup;
  laborPool: LaborPool;
  rawDemand: number;
  winProbability: number;
  churnProbability: number;
  weightedDemand: number;
  trAge: number;
  signed: boolean;
}

export interface RevenueImpliedDemand {
  geo: GEO;
  jrs: string;
  practice: string;
  band: BandGroup;
  laborPool: LaborPool;
  revenueCommit: number;
  impliedHC: number;
  conversionRatio: number;
}

export interface DemandDelta {
  geo: GEO;
  jrs: string;
  practice: string;
  band: BandGroup;
  bottomsUpDemand: number;
  topDownDemand: number;
  delta: number;
  deltaPercent: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  note: string;
}

export type DemandSubView = 'bottomsUp' | 'topDown' | 'delta' | 'demandVsBench';
