import { HeadcountEntry, UtilizationTarget, GEO, BandGroup, LaborPool } from '../types/ibm';
import { SupplySnapshot, GeoSupplySummary } from '../types/supply';
import { JRS_CATALOG, GEOS } from './constants';

function makeEntry(
  geo: GEO, jrsId: string, band: BandGroup, laborPool: LaborPool,
  active: number, bench: number, contractor: number
): HeadcountEntry {
  const jrs = JRS_CATALOG.find(j => j.id === jrsId)!;
  return {
    geo, jrs: jrs.name, practice: jrs.practice, band, laborPool,
    active, bench, contractor, total: active + bench + contractor,
  };
}

export const supplyEntries: HeadcountEntry[] = [
  // Americas — ~40% of total (~5,691)
  makeEntry('Americas', 'qe-auto', 'B6', 'FNC Global', 280, 42, 15),
  makeEntry('Americas', 'qe-auto', 'B7-8', 'FNC Global', 520, 65, 20),
  makeEntry('Americas', 'qe-auto', 'B1-5', 'FNC Global', 35, 8, 0),
  makeEntry('Americas', 'ad-sap', 'B6', 'Mainline', 120, 18, 10),
  makeEntry('Americas', 'ad-sap', 'B7-8', 'Mainline', 340, 40, 25),
  makeEntry('Americas', 'ad-sap', 'B9-10', 'Mainline', 85, 6, 5),
  makeEntry('Americas', 'ba-adm', 'B7-8', 'Mainline', 210, 30, 12),
  makeEntry('Americas', 'ba-adm', 'B9-10', 'Mainline', 95, 8, 4),
  makeEntry('Americas', 'ad-os', 'B6', 'FNC Global', 65, 12, 8),
  makeEntry('Americas', 'ad-os', 'B7-8', 'FNC Global', 230, 28, 15),
  makeEntry('Americas', 'de-plat', 'B7-8', 'Mainline', 165, 20, 10),
  makeEntry('Americas', 'de-plat', 'B6', 'FNC Global', 48, 10, 5),
  makeEntry('Americas', 'ad-fe', 'B6', 'FNC Domestic', 55, 14, 6),
  makeEntry('Americas', 'ad-fe', 'B7-8', 'FNC Domestic', 240, 32, 18),
  makeEntry('Americas', 'de-int', 'B7-8', 'FNC Global', 170, 22, 8),
  makeEntry('Americas', 'ds-ai', 'B7-8', 'Mainline', 185, 25, 12),
  makeEntry('Americas', 'ds-ai', 'B9-10', 'Mainline', 70, 5, 3),
  makeEntry('Americas', 'pm-adm', 'B7-8', 'Mainline', 110, 15, 6),
  makeEntry('Americas', 'pm-adm', 'B9-10', 'Mainline', 78, 4, 2),
  makeEntry('Americas', 'aa-java', 'B7-8', 'Mainline', 45, 8, 3),
  makeEntry('Americas', 'aa-java', 'B9-10', 'Mainline', 40, 3, 2),
  makeEntry('Americas', 'sc-cloud', 'B7-8', 'Mainline', 130, 18, 10),
  makeEntry('Americas', 'se-devops', 'B7-8', 'FNC Global', 155, 20, 12),
  makeEntry('Americas', 'cs-cyber', 'B7-8', 'Mainline', 95, 12, 8),
  makeEntry('Americas', 'ad-mobile', 'B7-8', 'FNC Domestic', 88, 14, 6),
  makeEntry('Americas', 'ta-rpa', 'B6', 'FNC Global', 72, 10, 4),

  // EMEA — ~25% (~3,557)
  makeEntry('EMEA', 'qe-auto', 'B6', 'FNC Global', 180, 28, 10),
  makeEntry('EMEA', 'qe-auto', 'B7-8', 'FNC Global', 340, 45, 15),
  makeEntry('EMEA', 'ad-sap', 'B7-8', 'Mainline', 220, 30, 18),
  makeEntry('EMEA', 'ad-sap', 'B6', 'Mainline', 85, 12, 6),
  makeEntry('EMEA', 'ba-adm', 'B7-8', 'Mainline', 145, 20, 8),
  makeEntry('EMEA', 'ba-adm', 'B9-10', 'Mainline', 60, 5, 3),
  makeEntry('EMEA', 'ad-os', 'B7-8', 'FNC Global', 160, 22, 10),
  makeEntry('EMEA', 'de-plat', 'B7-8', 'Mainline', 110, 15, 7),
  makeEntry('EMEA', 'ad-fe', 'B7-8', 'FNC Domestic', 155, 20, 12),
  makeEntry('EMEA', 'de-int', 'B7-8', 'FNC Global', 115, 18, 6),
  makeEntry('EMEA', 'ds-ai', 'B7-8', 'Mainline', 125, 18, 8),
  makeEntry('EMEA', 'pm-adm', 'B7-8', 'Mainline', 85, 10, 5),
  makeEntry('EMEA', 'pm-adm', 'B9-10', 'Mainline', 52, 4, 2),
  makeEntry('EMEA', 'sc-cloud', 'B7-8', 'Mainline', 90, 12, 6),
  makeEntry('EMEA', 'se-devops', 'B7-8', 'FNC Global', 105, 14, 8),
  makeEntry('EMEA', 'cs-cyber', 'B7-8', 'Mainline', 68, 10, 5),
  makeEntry('EMEA', 'ad-mobile', 'B7-8', 'FNC Domestic', 55, 8, 4),
  makeEntry('EMEA', 'ta-rpa', 'B6', 'FNC Global', 48, 8, 3),
  makeEntry('EMEA', 'aa-java', 'B9-10', 'Mainline', 30, 4, 2),

  // APAC — ~20% (~2,845)
  makeEntry('APAC', 'qe-auto', 'B6', 'FNC Global', 155, 24, 8),
  makeEntry('APAC', 'qe-auto', 'B7-8', 'FNC Global', 285, 38, 12),
  makeEntry('APAC', 'ad-sap', 'B7-8', 'FNC Global', 180, 25, 14),
  makeEntry('APAC', 'ad-sap', 'B6', 'FNC Global', 70, 10, 4),
  makeEntry('APAC', 'ba-adm', 'B7-8', 'FNC Global', 120, 16, 6),
  makeEntry('APAC', 'ad-os', 'B7-8', 'FNC Global', 135, 18, 8),
  makeEntry('APAC', 'de-plat', 'B7-8', 'FNC Global', 95, 12, 5),
  makeEntry('APAC', 'ad-fe', 'B7-8', 'FNC Global', 130, 18, 10),
  makeEntry('APAC', 'de-int', 'B7-8', 'FNC Global', 98, 14, 5),
  makeEntry('APAC', 'ds-ai', 'B7-8', 'FNC Global', 105, 15, 6),
  makeEntry('APAC', 'pm-adm', 'B7-8', 'FNC Global', 72, 10, 4),
  makeEntry('APAC', 'sc-cloud', 'B7-8', 'FNC Global', 65, 8, 4),
  makeEntry('APAC', 'se-devops', 'B7-8', 'FNC Global', 88, 12, 6),
  makeEntry('APAC', 'cs-cyber', 'B7-8', 'FNC Global', 50, 8, 3),
  makeEntry('APAC', 'ta-rpa', 'B6', 'FNC Global', 60, 10, 3),
  makeEntry('APAC', 'ad-mobile', 'B7-8', 'FNC Global', 45, 6, 3),

  // Japan — ~8% (~1,138)
  makeEntry('Japan', 'qe-auto', 'B7-8', 'Mainline', 145, 18, 8),
  makeEntry('Japan', 'ad-sap', 'B7-8', 'Mainline', 110, 14, 6),
  makeEntry('Japan', 'ba-adm', 'B7-8', 'Mainline', 72, 10, 4),
  makeEntry('Japan', 'ad-os', 'B7-8', 'Mainline', 65, 8, 4),
  makeEntry('Japan', 'de-plat', 'B7-8', 'Mainline', 55, 7, 3),
  makeEntry('Japan', 'ad-fe', 'B7-8', 'Mainline', 60, 8, 4),
  makeEntry('Japan', 'ds-ai', 'B7-8', 'Mainline', 58, 8, 3),
  makeEntry('Japan', 'pm-adm', 'B9-10', 'Mainline', 40, 4, 2),
  makeEntry('Japan', 'sc-cloud', 'B7-8', 'Mainline', 42, 5, 3),
  makeEntry('Japan', 'se-devops', 'B7-8', 'Mainline', 48, 6, 3),
  makeEntry('Japan', 'cs-cyber', 'B7-8', 'Mainline', 35, 5, 2),

  // UKI — ~7% (~996)
  makeEntry('UKI', 'qe-auto', 'B7-8', 'Mainline', 120, 15, 6),
  makeEntry('UKI', 'ad-sap', 'B7-8', 'Mainline', 95, 12, 8),
  makeEntry('UKI', 'ba-adm', 'B7-8', 'Mainline', 68, 10, 5),
  makeEntry('UKI', 'ad-os', 'B7-8', 'FNC Domestic', 55, 8, 4),
  makeEntry('UKI', 'de-plat', 'B7-8', 'Mainline', 48, 6, 3),
  makeEntry('UKI', 'ad-fe', 'B7-8', 'FNC Domestic', 52, 7, 4),
  makeEntry('UKI', 'ds-ai', 'B7-8', 'Mainline', 45, 6, 3),
  makeEntry('UKI', 'pm-adm', 'B7-8', 'Mainline', 38, 5, 3),
  makeEntry('UKI', 'pm-adm', 'B9-10', 'Mainline', 28, 3, 2),
  makeEntry('UKI', 'sc-cloud', 'B7-8', 'Mainline', 35, 5, 2),
  makeEntry('UKI', 'se-devops', 'B7-8', 'Mainline', 42, 6, 3),
  makeEntry('UKI', 'cs-cyber', 'B7-8', 'Mainline', 30, 4, 2),
];

// Computed summaries
const totalActive = supplyEntries.reduce((s, e) => s + e.active, 0);
const totalBench = supplyEntries.reduce((s, e) => s + e.bench, 0);
const totalContractor = supplyEntries.reduce((s, e) => s + e.contractor, 0);
const totalHC = totalActive + totalBench + totalContractor;

export const supplySnapshot: SupplySnapshot = {
  totalHC,
  activeHC: totalActive,
  benchHC: totalBench,
  contractorHC: totalContractor,
  benchPercent: Math.round((totalBench / totalHC) * 1000) / 10,
  contractorPercent: Math.round((totalContractor / totalHC) * 1000) / 10,
  avgUtilization: 86.4,
  lastRefreshed: new Date().toISOString(),
};

export const utilizationTargets: UtilizationTarget[] = [
  { geo: 'Americas', target: 88.0, actual: 87.2, delta: -0.8 },
  { geo: 'EMEA', target: 85.0, actual: 84.1, delta: -0.9 },
  { geo: 'APAC', target: 87.0, actual: 88.5, delta: 1.5 },
  { geo: 'Japan', target: 90.0, actual: 89.3, delta: -0.7 },
  { geo: 'UKI', target: 86.0, actual: 83.8, delta: -2.2 },
];

export const geoSupplySummaries: GeoSupplySummary[] = GEOS.map(geo => {
  const entries = supplyEntries.filter(e => e.geo === geo);
  const active = entries.reduce((s, e) => s + e.active, 0);
  const bench = entries.reduce((s, e) => s + e.bench, 0);
  const contractor = entries.reduce((s, e) => s + e.contractor, 0);
  const util = utilizationTargets.find(u => u.geo === geo)!;
  return {
    geo, active, bench, contractor, total: active + bench + contractor,
    utilTarget: util.target, utilActual: util.actual,
  };
});
