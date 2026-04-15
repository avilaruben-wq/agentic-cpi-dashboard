import { DealDemand, RevenueImpliedDemand, DemandDelta } from '../types/demand';
import { GEO, BandGroup, LaborPool } from '../types/ibm';

let dealId = 0;
function deal(
  dealName: string, client: string, geo: GEO, jrs: string, practice: string,
  band: BandGroup, laborPool: LaborPool, rawDemand: number,
  winProb: number, churnProb: number, trAge: number, signed: boolean
): DealDemand {
  return {
    id: `D-${++dealId}`,
    dealName, client, geo, jrs, practice, band, laborPool,
    rawDemand, winProbability: winProb, churnProbability: churnProb,
    weightedDemand: Math.round(rawDemand * winProb * (1 - churnProb)),
    trAge, signed,
  };
}

export const dealDemands: DealDemand[] = [
  // Americas deals
  deal('Acme Cloud Migration', 'Acme Corp', 'Americas', 'Quality Engineer-Automation', 'Quality Engineering', 'B7-8', 'FNC Global', 45, 0.85, 0.10, 22, true),
  deal('Acme SAP S/4 Rollout', 'Acme Corp', 'Americas', 'App Developer-SAP ABAP HANA', 'SAP Application Ops', 'B7-8', 'Mainline', 32, 0.90, 0.08, 15, true),
  deal('TechVista AI Platform', 'TechVista Inc', 'Americas', 'Data Scientist-AI', 'AI & Analytics', 'B7-8', 'Mainline', 28, 0.75, 0.12, 35, false),
  deal('GlobalBank Core Modernization', 'GlobalBank', 'Americas', 'App Developer-Open Source', 'Custom Application Ops', 'B7-8', 'FNC Global', 55, 0.80, 0.15, 18, true),
  deal('GlobalBank Testing', 'GlobalBank', 'Americas', 'Quality Engineer-Automation', 'Quality Engineering', 'B6', 'FNC Global', 38, 0.80, 0.10, 18, true),
  deal('PharmaGen Data Lake', 'PharmaGen', 'Americas', 'Data Engineer-Data Platforms', 'Data Services', 'B7-8', 'Mainline', 22, 0.70, 0.18, 42, false),
  deal('RetailMax Digital', 'RetailMax', 'Americas', 'App Developer-Experience Front End', 'Digital Product Engineering iX', 'B7-8', 'FNC Domestic', 35, 0.65, 0.20, 50, false),
  deal('EnergyOne DevOps', 'EnergyOne', 'Americas', 'Site Reliability Engineer-DevOps', 'Cloud Platform Services', 'B7-8', 'FNC Global', 18, 0.88, 0.08, 12, true),
  deal('Meridian PM Office', 'Meridian Corp', 'Americas', 'Project Manager-ADM', 'Custom Application Ops', 'B9-10', 'Mainline', 12, 0.92, 0.05, 8, true),
  deal('AutoDrive Mobile App', 'AutoDrive', 'Americas', 'App Developer-Mobile', 'Digital Product Engineering iX', 'B7-8', 'FNC Domestic', 20, 0.60, 0.15, 55, false),

  // EMEA deals
  deal('EuroTel 5G Transformation', 'EuroTel', 'EMEA', 'App Developer-SAP ABAP HANA', 'SAP Application Ops', 'B7-8', 'Mainline', 40, 0.82, 0.12, 20, true),
  deal('NordicBank Security', 'NordicBank', 'EMEA', 'Cybersecurity Analyst', 'Security Services', 'B7-8', 'Mainline', 15, 0.90, 0.06, 10, true),
  deal('AeroSpace Data Integ', 'AeroSpace EU', 'EMEA', 'Data Engineer-Data Integration', 'Data Services', 'B7-8', 'FNC Global', 25, 0.72, 0.14, 38, false),
  deal('SwissInsure Digital', 'SwissInsure', 'EMEA', 'App Developer-Experience Front End', 'Digital Product Engineering iX', 'B7-8', 'FNC Domestic', 30, 0.68, 0.16, 45, false),
  deal('Deutsche Auto QE', 'Deutsche Auto', 'EMEA', 'Quality Engineer-Automation', 'Quality Engineering', 'B7-8', 'FNC Global', 48, 0.78, 0.10, 25, true),
  deal('MedTech Cloud Advisory', 'MedTech EU', 'EMEA', 'Solution Consultant-Cloud', 'Cloud Platform Services', 'B7-8', 'Mainline', 14, 0.85, 0.08, 14, true),
  deal('FranceGov RPA', 'FranceGov', 'EMEA', 'Test Analyst-RPA', 'Intelligent Automation', 'B6', 'FNC Global', 22, 0.55, 0.20, 60, false),

  // APAC deals
  deal('SingTech Platform', 'SingTech', 'APAC', 'App Developer-Open Source', 'Custom Application Ops', 'B7-8', 'FNC Global', 35, 0.78, 0.12, 28, true),
  deal('IndiaBank Analytics', 'IndiaBank', 'APAC', 'Data Scientist-AI', 'AI & Analytics', 'B7-8', 'FNC Global', 42, 0.72, 0.14, 32, false),
  deal('AusTelco Modernization', 'AusTelco', 'APAC', 'Quality Engineer-Automation', 'Quality Engineering', 'B7-8', 'FNC Global', 28, 0.82, 0.10, 18, true),
  deal('KoreaChem SAP', 'KoreaChem', 'APAC', 'App Developer-SAP ABAP HANA', 'SAP Application Ops', 'B7-8', 'FNC Global', 24, 0.70, 0.15, 40, false),
  deal('ASEAN Gov Cloud', 'ASEAN Gov', 'APAC', 'Solution Consultant-Cloud', 'Cloud Platform Services', 'B7-8', 'FNC Global', 16, 0.65, 0.18, 48, false),

  // Japan deals
  deal('NipponAuto IoT', 'NipponAuto', 'Japan', 'Data Engineer-Data Platforms', 'Data Services', 'B7-8', 'Mainline', 18, 0.88, 0.06, 14, true),
  deal('TokyoBank Core', 'TokyoBank', 'Japan', 'App Developer-SAP ABAP HANA', 'SAP Application Ops', 'B7-8', 'Mainline', 22, 0.85, 0.08, 16, true),
  deal('JapanGov Cyber', 'JapanGov', 'Japan', 'Cybersecurity Analyst', 'Security Services', 'B7-8', 'Mainline', 10, 0.90, 0.05, 10, true),

  // UKI deals
  deal('LondonFS Migration', 'LondonFS', 'UKI', 'Quality Engineer-Automation', 'Quality Engineering', 'B7-8', 'Mainline', 32, 0.80, 0.12, 22, true),
  deal('UKGov Digital Service', 'UKGov', 'UKI', 'App Developer-Experience Front End', 'Digital Product Engineering iX', 'B7-8', 'FNC Domestic', 20, 0.72, 0.14, 35, false),
  deal('IrishPharma Data', 'IrishPharma', 'UKI', 'Data Engineer-Data Integration', 'Data Services', 'B7-8', 'Mainline', 14, 0.68, 0.16, 42, false),
  deal('ScotEnergy DevOps', 'ScotEnergy', 'UKI', 'Site Reliability Engineer-DevOps', 'Cloud Platform Services', 'B7-8', 'Mainline', 12, 0.82, 0.10, 18, true),
];

export const revenueImpliedDemands: RevenueImpliedDemand[] = [
  { geo: 'Americas', jrs: 'Quality Engineer-Automation', practice: 'Quality Engineering', band: 'B7-8', laborPool: 'FNC Global', revenueCommit: 42000000, impliedHC: 95, conversionRatio: 2.26 },
  { geo: 'Americas', jrs: 'App Developer-SAP ABAP HANA', practice: 'SAP Application Ops', band: 'B7-8', laborPool: 'Mainline', revenueCommit: 28000000, impliedHC: 48, conversionRatio: 1.71 },
  { geo: 'Americas', jrs: 'Data Scientist-AI', practice: 'AI & Analytics', band: 'B7-8', laborPool: 'Mainline', revenueCommit: 22000000, impliedHC: 35, conversionRatio: 1.59 },
  { geo: 'Americas', jrs: 'App Developer-Open Source', practice: 'Custom Application Ops', band: 'B7-8', laborPool: 'FNC Global', revenueCommit: 35000000, impliedHC: 68, conversionRatio: 1.94 },
  { geo: 'Americas', jrs: 'Data Engineer-Data Platforms', practice: 'Data Services', band: 'B7-8', laborPool: 'Mainline', revenueCommit: 18000000, impliedHC: 30, conversionRatio: 1.67 },
  { geo: 'Americas', jrs: 'App Developer-Experience Front End', practice: 'Digital Product Engineering iX', band: 'B7-8', laborPool: 'FNC Domestic', revenueCommit: 25000000, impliedHC: 45, conversionRatio: 1.80 },
  { geo: 'EMEA', jrs: 'App Developer-SAP ABAP HANA', practice: 'SAP Application Ops', band: 'B7-8', laborPool: 'Mainline', revenueCommit: 32000000, impliedHC: 55, conversionRatio: 1.72 },
  { geo: 'EMEA', jrs: 'Quality Engineer-Automation', practice: 'Quality Engineering', band: 'B7-8', laborPool: 'FNC Global', revenueCommit: 28000000, impliedHC: 62, conversionRatio: 2.21 },
  { geo: 'EMEA', jrs: 'Data Engineer-Data Integration', practice: 'Data Services', band: 'B7-8', laborPool: 'FNC Global', revenueCommit: 15000000, impliedHC: 28, conversionRatio: 1.87 },
  { geo: 'APAC', jrs: 'Quality Engineer-Automation', practice: 'Quality Engineering', band: 'B7-8', laborPool: 'FNC Global', revenueCommit: 22000000, impliedHC: 50, conversionRatio: 2.27 },
  { geo: 'APAC', jrs: 'Data Scientist-AI', practice: 'AI & Analytics', band: 'B7-8', laborPool: 'FNC Global', revenueCommit: 20000000, impliedHC: 38, conversionRatio: 1.90 },
  { geo: 'APAC', jrs: 'App Developer-SAP ABAP HANA', practice: 'SAP Application Ops', band: 'B7-8', laborPool: 'FNC Global', revenueCommit: 16000000, impliedHC: 30, conversionRatio: 1.88 },
  { geo: 'Japan', jrs: 'App Developer-SAP ABAP HANA', practice: 'SAP Application Ops', band: 'B7-8', laborPool: 'Mainline', revenueCommit: 18000000, impliedHC: 28, conversionRatio: 1.56 },
  { geo: 'Japan', jrs: 'Data Engineer-Data Platforms', practice: 'Data Services', band: 'B7-8', laborPool: 'Mainline', revenueCommit: 12000000, impliedHC: 20, conversionRatio: 1.67 },
  { geo: 'UKI', jrs: 'Quality Engineer-Automation', practice: 'Quality Engineering', band: 'B7-8', laborPool: 'Mainline', revenueCommit: 16000000, impliedHC: 38, conversionRatio: 2.38 },
  { geo: 'UKI', jrs: 'App Developer-Experience Front End', practice: 'Digital Product Engineering iX', band: 'B7-8', laborPool: 'FNC Domestic', revenueCommit: 10000000, impliedHC: 22, conversionRatio: 2.20 },
];

export const demandDeltas: DemandDelta[] = [
  { geo: 'Americas', jrs: 'Quality Engineer-Automation', practice: 'Quality Engineering', band: 'B7-8', bottomsUpDemand: 83, topDownDemand: 95, delta: -12, deltaPercent: -12.6, severity: 'medium', note: 'Pipeline deals may not convert to signed demand at revenue-implied rates' },
  { geo: 'Americas', jrs: 'App Developer-Open Source', practice: 'Custom Application Ops', band: 'B7-8', bottomsUpDemand: 47, topDownDemand: 68, delta: -21, deltaPercent: -30.9, severity: 'critical', note: 'Significant gap — revenue forecast assumes deals not yet in pipeline' },
  { geo: 'Americas', jrs: 'App Developer-Experience Front End', practice: 'Digital Product Engineering iX', band: 'B7-8', bottomsUpDemand: 23, topDownDemand: 45, delta: -22, deltaPercent: -48.9, severity: 'critical', note: 'Revenue commit far exceeds visible deal pipeline — validate with Finance' },
  { geo: 'Americas', jrs: 'Data Scientist-AI', practice: 'AI & Analytics', band: 'B7-8', bottomsUpDemand: 21, topDownDemand: 35, delta: -14, deltaPercent: -40.0, severity: 'high', note: 'AI practice growing faster than deal pipeline — check unsigned opportunities' },
  { geo: 'Americas', jrs: 'App Developer-SAP ABAP HANA', practice: 'SAP Application Ops', band: 'B7-8', bottomsUpDemand: 29, topDownDemand: 48, delta: -19, deltaPercent: -39.6, severity: 'high', note: 'SAP S/4 wave expected Q3 — not yet reflected in TRs' },
  { geo: 'EMEA', jrs: 'App Developer-SAP ABAP HANA', practice: 'SAP Application Ops', band: 'B7-8', bottomsUpDemand: 33, topDownDemand: 55, delta: -22, deltaPercent: -40.0, severity: 'critical', note: 'EMEA SAP revenue forecast significantly above deal-backed demand' },
  { geo: 'EMEA', jrs: 'Quality Engineer-Automation', practice: 'Quality Engineering', band: 'B7-8', bottomsUpDemand: 37, topDownDemand: 62, delta: -25, deltaPercent: -40.3, severity: 'critical', note: 'QE demand underrepresented in current pipeline vs financial targets' },
  { geo: 'EMEA', jrs: 'Data Engineer-Data Integration', practice: 'Data Services', band: 'B7-8', bottomsUpDemand: 18, topDownDemand: 28, delta: -10, deltaPercent: -35.7, severity: 'high', note: 'Data integration demand growing — pipeline catching up' },
  { geo: 'APAC', jrs: 'Data Scientist-AI', practice: 'AI & Analytics', band: 'B7-8', bottomsUpDemand: 30, topDownDemand: 38, delta: -8, deltaPercent: -21.1, severity: 'medium', note: 'Moderate gap — new IndiaBank deal may close gap when signed' },
  { geo: 'APAC', jrs: 'Quality Engineer-Automation', practice: 'Quality Engineering', band: 'B7-8', bottomsUpDemand: 23, topDownDemand: 50, delta: -27, deltaPercent: -54.0, severity: 'critical', note: 'Major divergence — APAC revenue expectations exceed visible QE deals' },
  { geo: 'Japan', jrs: 'App Developer-SAP ABAP HANA', practice: 'SAP Application Ops', band: 'B7-8', bottomsUpDemand: 19, topDownDemand: 28, delta: -9, deltaPercent: -32.1, severity: 'high', note: 'Japan SAP pipeline below financial assumptions' },
  { geo: 'UKI', jrs: 'Quality Engineer-Automation', practice: 'Quality Engineering', band: 'B7-8', bottomsUpDemand: 26, topDownDemand: 38, delta: -12, deltaPercent: -31.6, severity: 'high', note: 'UKI QE pipeline gap — potential LondonFS expansion not yet captured' },
];

// Demand vs Bench Gap — the primary working view per the spec
export const demandVsBenchGaps = [
  { practice: 'Quality Engineering', demandTotal: 318, currentBench: 215, gap: -103, openReqs: 45, hiresInProgress: 28, attritionExpected: 35, isGrowthPractice: true },
  { practice: 'SAP Application Ops', demandTotal: 272, currentBench: 125, gap: -147, openReqs: 52, hiresInProgress: 18, attritionExpected: 22, isGrowthPractice: true },
  { practice: 'Custom Application Ops', demandTotal: 198, currentBench: 98, gap: -100, openReqs: 30, hiresInProgress: 15, attritionExpected: 18, isGrowthPractice: false },
  { practice: 'Data Services', demandTotal: 162, currentBench: 82, gap: -80, openReqs: 25, hiresInProgress: 12, attritionExpected: 14, isGrowthPractice: true },
  { practice: 'AI & Analytics', demandTotal: 185, currentBench: 78, gap: -107, openReqs: 35, hiresInProgress: 22, attritionExpected: 12, isGrowthPractice: true },
  { practice: 'Digital Product Engineering iX', demandTotal: 176, currentBench: 95, gap: -81, openReqs: 28, hiresInProgress: 14, attritionExpected: 16, isGrowthPractice: true },
  { practice: 'Cloud Platform Services', demandTotal: 124, currentBench: 68, gap: -56, openReqs: 18, hiresInProgress: 10, attritionExpected: 10, isGrowthPractice: false },
  { practice: 'Security Services', demandTotal: 88, currentBench: 43, gap: -45, openReqs: 15, hiresInProgress: 8, attritionExpected: 8, isGrowthPractice: false },
  { practice: 'Intelligent Automation', demandTotal: 52, currentBench: 28, gap: -24, openReqs: 8, hiresInProgress: 5, attritionExpected: 5, isGrowthPractice: false },
];

// Demand Churn — how much demand withdrawn/deferred
export const demandChurnData = [
  { period: 'Last 30 days', withdrawn: 142, deferred: 88, changed: 65, total: 295, churnRate: 6.3 },
  { period: 'Last 60 days', withdrawn: 268, deferred: 155, changed: 112, total: 535, churnRate: 11.4 },
  { period: 'Last 90 days', withdrawn: 385, deferred: 220, changed: 168, total: 773, churnRate: 16.5 },
];
