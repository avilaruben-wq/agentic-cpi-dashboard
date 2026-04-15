// Monthly Talent Interlock (TI) specific data — 90-day mode

export interface TIDemandByPool {
  laborPool: string;
  month1: number;
  month2: number;
  month3: number;
  total: number;
  momChange: number;
  momChangePercent: number;
}

export const tiDemandByPool: TIDemandByPool[] = [
  { laborPool: 'Domestic Mainline', month1: 1240, month2: 1180, month3: 1050, total: 3470, momChange: -85, momChangePercent: -2.4 },
  { laborPool: 'Domestic FNC', month1: 420, month2: 395, month3: 370, total: 1185, momChange: -30, momChangePercent: -2.5 },
  { laborPool: 'CIC Nearshore', month1: 280, month2: 310, month3: 345, total: 935, momChange: 45, momChangePercent: 5.1 },
  { laborPool: 'CIC Global Delivery', month1: 680, month2: 720, month3: 755, total: 2155, momChange: 65, momChangePercent: 3.1 },
  { laborPool: 'Sub-K', month1: 195, month2: 180, month3: 165, total: 540, momChange: -20, momChangePercent: -3.6 },
  { laborPool: 'HCAM / Imports', month1: 85, month2: 90, month3: 95, total: 270, momChange: 8, momChangePercent: 3.1 },
];

export interface TIFulfillmentAction {
  action: string;
  month1: number;
  month2: number;
  month3: number;
  total: number;
  status: 'on-track' | 'at-risk' | 'behind';
}

export const tiFulfillmentActions: TIFulfillmentAction[] = [
  { action: 'Bench Redeployment', month1: 185, month2: 160, month3: 140, total: 485, status: 'on-track' },
  { action: 'Internal Rotation', month1: 65, month2: 55, month3: 50, total: 170, status: 'on-track' },
  { action: 'Reskilling (FutureSkilling)', month1: 45, month2: 55, month3: 60, total: 160, status: 'at-risk' },
  { action: 'Hiring (ANOB pipeline)', month1: 120, month2: 135, month3: 145, total: 400, status: 'at-risk' },
  { action: 'Promotions / Band moves', month1: 30, month2: 25, month3: 20, total: 75, status: 'on-track' },
  { action: 'External Contractor', month1: 80, month2: 70, month3: 55, total: 205, status: 'behind' },
];

export const tiMomMovement = [
  { category: 'New demand raised', count: 420, direction: 'up' as const },
  { category: 'Demand withdrawn', count: -142, direction: 'down' as const },
  { category: 'Demand deferred', count: -88, direction: 'down' as const },
  { category: 'Demand changed (JRS/band)', count: 65, direction: 'up' as const },
  { category: 'Net demand movement', count: 255, direction: 'up' as const },
];
