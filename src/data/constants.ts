import { GEO, BandGroup, LaborPool, JRS } from '../types/ibm';

export const GEOS: GEO[] = ['Americas', 'EMEA', 'APAC', 'Japan', 'UKI'];

export const BAND_GROUPS: BandGroup[] = ['B1-5', 'B6', 'B7-8', 'B9-10'];

export const LABOR_POOLS: LaborPool[] = ['Mainline', 'FNC Global', 'FNC Domestic'];

export const JRS_CATALOG: JRS[] = [
  { id: 'qe-auto', name: 'Quality Engineer-Automation', practice: 'Quality Engineering', category: 'Engineering' },
  { id: 'ad-sap', name: 'App Developer-SAP ABAP HANA', practice: 'SAP Application Ops', category: 'Engineering' },
  { id: 'ba-adm', name: 'Business Analyst-ADM', practice: 'Custom Application Ops', category: 'Advisory' },
  { id: 'ad-os', name: 'App Developer-Open Source', practice: 'Custom Application Ops', category: 'Engineering' },
  { id: 'de-plat', name: 'Data Engineer-Data Platforms', practice: 'Data Services', category: 'Data & AI' },
  { id: 'ad-fe', name: 'App Developer-Experience Front End', practice: 'Digital Product Engineering iX', category: 'Engineering' },
  { id: 'de-int', name: 'Data Engineer-Data Integration', practice: 'Data Services', category: 'Data & AI' },
  { id: 'ds-ai', name: 'Data Scientist-AI', practice: 'AI & Analytics', category: 'Data & AI' },
  { id: 'pm-adm', name: 'Project Manager-ADM', practice: 'Custom Application Ops', category: 'Management' },
  { id: 'aa-java', name: 'App Architect-Java & Web', practice: 'Custom Application Ops', category: 'Architecture' },
  { id: 'sc-cloud', name: 'Solution Consultant-Cloud', practice: 'Cloud Platform Services', category: 'Advisory' },
  { id: 'se-devops', name: 'Site Reliability Engineer-DevOps', practice: 'Cloud Platform Services', category: 'Engineering' },
  { id: 'cs-cyber', name: 'Cybersecurity Analyst', practice: 'Security Services', category: 'Security' },
  { id: 'ad-mobile', name: 'App Developer-Mobile', practice: 'Digital Product Engineering iX', category: 'Engineering' },
  { id: 'ta-rpa', name: 'Test Analyst-RPA', practice: 'Intelligent Automation', category: 'Engineering' },
];

export const PRACTICES = [...new Set(JRS_CATALOG.map(j => j.practice))];

export const HIRING_COSTS: Record<BandGroup, number> = {
  'B1-5': 2973,
  'B6': 2973,
  'B7-8': 3602,
  'B9-10': 8144,
};

export const UTIL_POINT_VALUE = 40_000_000;

export const GEO_WEIGHTS: Record<GEO, number> = {
  Americas: 0.40,
  EMEA: 0.25,
  APAC: 0.20,
  Japan: 0.08,
  UKI: 0.07,
};

export const FULFILLMENT_STEP_LABELS: Record<string, string> = {
  bench: 'Bench Redeployment',
  rotation: 'Internal Rotation',
  reskill_anob: 'Reskill / ANOB',
  hire: 'External Hire',
  subk: 'Sub-K Contractor',
  hcam_fth: 'HCAM / FTH',
};
