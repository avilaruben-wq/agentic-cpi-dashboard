export type GEO = 'Americas' | 'EMEA' | 'APAC' | 'Japan' | 'UKI';

export type Band = 'B1' | 'B2' | 'B3' | 'B4' | 'B5' | 'B6' | 'B7' | 'B8' | 'B9' | 'B10';

export type BandGroup = 'B1-5' | 'B6' | 'B7-8' | 'B9-10';

export type LaborPool = 'Mainline' | 'FNC Global' | 'FNC Domestic';

export interface JRS {
  id: string;
  name: string;
  practice: string;
  category: string;
}

export interface HeadcountEntry {
  geo: GEO;
  jrs: string;
  practice: string;
  band: BandGroup;
  laborPool: LaborPool;
  active: number;
  bench: number;
  contractor: number;
  total: number;
}

export interface UtilizationTarget {
  geo: GEO;
  target: number;
  actual: number;
  delta: number;
}

export type TabId = 'agent1' | 'agent2' | 'agent3' | 'approve';

export type AgentState = 'locked' | 'ready' | 'running' | 'review' | 'approved';

export interface SubStep {
  id: string;
  label: string;
  isHumanReview?: boolean;
}
