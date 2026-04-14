import type { GEO, BandGroup } from './ibm';

export type FulfillmentStep = 'bench' | 'rotation' | 'reskill_anob' | 'hire' | 'subk' | 'hcam_fth';

export interface FulfillmentAction {
  step: FulfillmentStep;
  label: string;
  headcount: number;
  costPerHead: number;
  totalCost: number;
  leadTimeDays: number;
  feasibility: 'high' | 'medium' | 'low';
}

export interface SeverityScore {
  revenueRisk: number;
  fillDifficulty: number;
  leadTime: number;
  cgpImpact: number;
  composite: number;
}

export interface GapEntry {
  id: string;
  geo: GEO;
  jrs: string;
  practice: string;
  band: BandGroup;
  gapCount: number;
  severity: SeverityScore;
  isCritSit: boolean;
  fulfillmentPlan: FulfillmentAction[];
  recommendedAction: string;
  revenueAtRisk: number;
}
