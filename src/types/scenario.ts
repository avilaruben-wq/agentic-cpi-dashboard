export type ScenarioType = 'conservative' | 'base' | 'flex';

export interface Scenario {
  type: ScenarioType;
  label: string;
  description: string;
  totalDemand: number;
  totalSupply: number;
  totalGap: number;
  cgpImpact: number;
  utilizationDelta: number;
  hiringBudget: number;
  subkBudget: number;
  fillRate: number;
  assumptions: string[];
}
