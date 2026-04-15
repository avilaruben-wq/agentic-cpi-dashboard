import { GapEntry, FulfillmentAction, SeverityScore } from '../types/gap';
import { GEO, BandGroup } from '../types/ibm';
import { computeCompositeSeverity } from '../utils/calculations';
import { HIRING_COSTS } from './constants';

function sev(rr: number, fd: number, lt: number, cg: number): SeverityScore {
  const base = { revenueRisk: rr, fillDifficulty: fd, leadTime: lt, cgpImpact: cg };
  return { ...base, composite: computeCompositeSeverity(base) };
}

function plan(gapCount: number, band: BandGroup): FulfillmentAction[] {
  const hireCost = HIRING_COSTS[band];
  const benchAlloc = Math.round(gapCount * 0.20);
  const rotateAlloc = Math.round(gapCount * 0.10);
  const reskillAlloc = Math.round(gapCount * 0.15);
  const hireAlloc = Math.round(gapCount * 0.30);
  const subkAlloc = Math.round(gapCount * 0.18);
  const hcamAlloc = gapCount - benchAlloc - rotateAlloc - reskillAlloc - hireAlloc - subkAlloc;

  return [
    { step: 'bench', label: 'Bench Redeployment', headcount: benchAlloc, costPerHead: 0, totalCost: 0, leadTimeDays: 7, feasibility: 'high' },
    { step: 'rotation', label: 'Internal Rotation', headcount: rotateAlloc, costPerHead: 500, totalCost: rotateAlloc * 500, leadTimeDays: 21, feasibility: 'high' },
    { step: 'reskill_anob', label: 'Reskill / ANOB', headcount: reskillAlloc, costPerHead: 2200, totalCost: reskillAlloc * 2200, leadTimeDays: 45, feasibility: 'medium' },
    { step: 'hire', label: 'External Hire', headcount: hireAlloc, costPerHead: hireCost, totalCost: hireAlloc * hireCost, leadTimeDays: 60, feasibility: 'medium' },
    { step: 'subk', label: 'Sub-K Contractor', headcount: subkAlloc, costPerHead: hireCost * 1.8, totalCost: Math.round(subkAlloc * hireCost * 1.8), leadTimeDays: 14, feasibility: 'high' },
    { step: 'hcam_fth', label: 'HCAM / FTH', headcount: hcamAlloc, costPerHead: hireCost * 0.7, totalCost: Math.round(hcamAlloc * hireCost * 0.7), leadTimeDays: 30, feasibility: 'medium' },
  ];
}

let gapId = 0;
function gap(
  geo: GEO, jrs: string, practice: string, band: BandGroup,
  gapCount: number, severity: SeverityScore, isCritSit: boolean,
  recommendedAction: string, revenueAtRisk: number
): GapEntry {
  return {
    id: `G-${++gapId}`,
    geo, jrs, practice, band, gapCount, severity, isCritSit,
    fulfillmentPlan: plan(gapCount, band),
    recommendedAction, revenueAtRisk,
  };
}

export const gapEntries: GapEntry[] = [
  // Americas gaps — largest region
  gap('Americas', 'Quality Engineer-Automation', 'Quality Engineering', 'B7-8', 185,
    sev(4, 3, 3, 4), true, 'Prioritize bench redeployment from APAC bench pool; authorize 55 ANOB hires', 12400000),
  gap('Americas', 'Quality Engineer-Automation', 'Quality Engineering', 'B6', 78,
    sev(3, 2, 2, 3), false, 'Accelerate EPH pipeline; redeploy 15 from bench', 4200000),
  gap('Americas', 'App Developer-SAP ABAP HANA', 'SAP Application Ops', 'B7-8', 120,
    sev(5, 4, 4, 5), true, 'CritSit: SAP skills shortage. Engage SubK for 40 seats; fast-track 30 ANOB', 18500000),
  gap('Americas', 'App Developer-Open Source', 'Custom Application Ops', 'B7-8', 95,
    sev(3, 3, 3, 3), false, 'Rotation from Java pool; reskill 20 from legacy platforms', 8200000),
  gap('Americas', 'Data Scientist-AI', 'AI & Analytics', 'B7-8', 68,
    sev(4, 5, 3, 4), true, 'CritSit: AI talent scarcity. Premium SubK + university pipeline acceleration', 14200000),
  gap('Americas', 'App Developer-Experience Front End', 'Digital Product Engineering iX', 'B7-8', 82,
    sev(3, 3, 2, 3), false, 'FNC Domestic ramp; 25 reskill from backend pool', 6800000),
  gap('Americas', 'Data Engineer-Data Platforms', 'Data Services', 'B7-8', 55,
    sev(3, 3, 3, 3), false, 'Internal rotation from Data Integration pool; 15 new hires', 5400000),
  gap('Americas', 'Site Reliability Engineer-DevOps', 'Cloud Platform Services', 'B7-8', 42,
    sev(3, 4, 2, 3), false, 'Reskill cloud engineers; 12 SubK for immediate coverage', 4100000),
  gap('Americas', 'Project Manager-ADM', 'Custom Application Ops', 'B9-10', 35,
    sev(2, 2, 2, 2), false, 'Promote B7-8 leads; limited external hiring needed', 3800000),

  // EMEA gaps
  gap('EMEA', 'App Developer-SAP ABAP HANA', 'SAP Application Ops', 'B7-8', 110,
    sev(5, 4, 4, 4), true, 'CritSit: EMEA SAP crisis. SubK bridge + aggressive ANOB pipeline', 16800000),
  gap('EMEA', 'Quality Engineer-Automation', 'Quality Engineering', 'B7-8', 145,
    sev(4, 3, 3, 4), true, 'Cross-geo bench pull from APAC; accelerate FNC Global QE factory', 10200000),
  gap('EMEA', 'Data Engineer-Data Integration', 'Data Services', 'B7-8', 65,
    sev(3, 3, 3, 3), false, 'Reskill ETL specialists; 20 FNC Global hires', 5100000),
  gap('EMEA', 'Cybersecurity Analyst', 'Security Services', 'B7-8', 38,
    sev(4, 5, 3, 3), false, 'Premium talent market — SubK + certification fast-track program', 5800000),
  gap('EMEA', 'Solution Consultant-Cloud', 'Cloud Platform Services', 'B7-8', 28,
    sev(2, 3, 2, 2), false, 'Internal upskill from infrastructure consultants', 2800000),

  // APAC gaps
  gap('APAC', 'Quality Engineer-Automation', 'Quality Engineering', 'B7-8', 125,
    sev(4, 3, 3, 4), true, 'CritSit: APAC QE surge. Fast-track FNC Global hiring + bench optimization', 9500000),
  gap('APAC', 'Data Scientist-AI', 'AI & Analytics', 'B7-8', 72,
    sev(4, 5, 3, 4), true, 'CritSit: AI talent premium in APAC. University partnerships + SubK bridge', 11500000),
  gap('APAC', 'App Developer-SAP ABAP HANA', 'SAP Application Ops', 'B7-8', 58,
    sev(3, 3, 3, 3), false, 'FNC Global SAP academy graduates; 15 SubK interim', 6200000),
  gap('APAC', 'App Developer-Open Source', 'Custom Application Ops', 'B7-8', 40,
    sev(2, 2, 2, 2), false, 'Standard hiring pipeline; bench redeployment covers 40%', 3200000),

  // Japan gaps
  gap('Japan', 'App Developer-SAP ABAP HANA', 'SAP Application Ops', 'B7-8', 42,
    sev(4, 4, 4, 4), true, 'CritSit: Japan SAP specialist scarcity. Cross-geo support + premium SubK', 8200000),
  gap('Japan', 'Data Engineer-Data Platforms', 'Data Services', 'B7-8', 30,
    sev(3, 3, 3, 3), false, 'Reskill + 10 new hires; Japan-specific language requirement extends lead time', 4100000),
  gap('Japan', 'Cybersecurity Analyst', 'Security Services', 'B7-8', 18,
    sev(3, 4, 3, 3), false, 'Bilingual requirement limits pool; partner with local SubK firms', 2800000),

  // UKI gaps
  gap('UKI', 'Quality Engineer-Automation', 'Quality Engineering', 'B7-8', 85,
    sev(4, 3, 3, 3), false, 'FNC Domestic ramp + bench pull from EMEA pool', 6400000),
  gap('UKI', 'App Developer-Experience Front End', 'Digital Product Engineering iX', 'B7-8', 48,
    sev(3, 3, 2, 3), false, 'Standard pipeline; 15 reskill from backend developers', 3600000),
  gap('UKI', 'Data Engineer-Data Integration', 'Data Services', 'B7-8', 32,
    sev(2, 3, 2, 2), false, 'Moderate gap — FNC Global scaling addresses 60%', 2400000),
  gap('UKI', 'Site Reliability Engineer-DevOps', 'Cloud Platform Services', 'B7-8', 24,
    sev(2, 3, 2, 2), false, 'Internal rotation + 8 new hires', 2200000),
];

// Verify total gap is approximately 2,931
export const totalGapCount = gapEntries.reduce((s, g) => s + g.gapCount, 0);
export const totalRevenueAtRisk = gapEntries.reduce((s, g) => s + g.revenueAtRisk, 0);
export const critSitCount = gapEntries.filter(g => g.isCritSit).length;

// Cross-GEO Conflicts — same scarce skill demanded by multiple GEOs
export const crossGeoConflicts = [
  { jrs: 'App Developer-SAP ABAP HANA', band: 'B7-8', competingGeos: ['Americas', 'EMEA', 'Japan'], totalDemand: 272, availableGlobal: 85, severity: 'critical' as const, note: 'All 3 GEOs requesting from same FNC Global SAP pool — insufficient capacity' },
  { jrs: 'Data Scientist-AI', band: 'B7-8', competingGeos: ['Americas', 'APAC'], totalDemand: 140, availableGlobal: 48, severity: 'high' as const, note: 'AI talent pool cannot satisfy both regions simultaneously' },
  { jrs: 'Quality Engineer-Automation', band: 'B7-8', competingGeos: ['EMEA', 'APAC', 'UKI'], totalDemand: 355, availableGlobal: 118, severity: 'critical' as const, note: 'QE automation skills critical across 3 GEOs — FNC ramp is the bottleneck' },
  { jrs: 'Cybersecurity Analyst', band: 'B7-8', competingGeos: ['EMEA', 'Japan'], totalDemand: 53, availableGlobal: 22, severity: 'medium' as const, note: 'Bilingual requirement in Japan limits cross-GEO sharing' },
];

// Auto-generated narrative per scenario
export const scenarioNarratives: Record<string, string> = {
  conservative: 'Under the conservative scenario, IBM Consulting addresses 1,973 of 2,931 identified gaps, prioritizing CritSit resolution and bench redeployment while limiting external hiring and SubK spend. This leaves approximately $94M in revenue at risk but keeps fulfillment costs contained at $30.5M. Recommended for environments with uncertain pipeline visibility.',
  base: 'The base scenario activates all fulfillment levers to address the full 2,931 gap. The 6-step hierarchy is applied per gap, with bench and rotation covering 30% of needs, reskilling and ANOB addressing 15%, and external hiring plus SubK filling the remainder. Total investment: $50.0M. This is the recommended path given current pipeline confidence levels and the 8 CritSit gaps requiring immediate action.',
  flex: 'The flex scenario positions IBM Consulting for growth by proactively addressing 3,580 projected gaps including high-probability unsigned pipeline. This requires $73M in fulfillment investment but captures an estimated $45-65M in additional cGP if demand materializes. Recommended only if Q3 signed pipeline exceeds 80% of forecast by the 30-day gate review.',
};
