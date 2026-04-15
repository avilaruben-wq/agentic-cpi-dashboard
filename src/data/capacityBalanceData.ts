// Executive Capacity Balance Dashboard — traffic-light metrics

export type TrafficLight = 'green' | 'amber' | 'red';

export interface BalanceMetric {
  label: string;
  category: string;
  actual: string;
  target: string;
  variance: string;
  status: TrafficLight;
  trend: 'improving' | 'stable' | 'declining';
}

export const balanceMetrics: BalanceMetric[] = [
  // HC Dynamics
  { label: 'Total Headcount', category: 'HC Dynamics', actual: '14,227', target: '14,800', variance: '-573', status: 'amber', trend: 'stable' },
  { label: 'Hires YTD', category: 'HC Dynamics', actual: '4,060', target: '4,500', variance: '-440', status: 'amber', trend: 'improving' },
  { label: 'Attrition Rate', category: 'HC Dynamics', actual: '11.2%', target: '10.5%', variance: '+0.7pp', status: 'amber', trend: 'declining' },
  { label: 'Net HC Change (QoQ)', category: 'HC Dynamics', actual: '+180', target: '+350', variance: '-170', status: 'red', trend: 'declining' },

  // Utilization
  { label: 'Productive Utilization', category: 'Utilization', actual: '86.4%', target: '87.0%', variance: '-0.6pp', status: 'amber', trend: 'stable' },
  { label: 'Chargeable Utilization', category: 'Utilization', actual: '82.1%', target: '83.0%', variance: '-0.9pp', status: 'amber', trend: 'improving' },
  { label: 'Util excl. Partners', category: 'Utilization', actual: '84.8%', target: '85.0%', variance: '-0.2pp', status: 'green', trend: 'improving' },

  // Bench
  { label: 'Bench Rate', category: 'Bench & Availability', actual: '11.2%', target: '5.0%', variance: '+6.2pp', status: 'red', trend: 'declining' },
  { label: 'Bench 90+ Days', category: 'Bench & Availability', actual: '96', target: '< 50', variance: '+46', status: 'red', trend: 'declining' },
  { label: 'Approaching Bench', category: 'Bench & Availability', actual: '156', target: '—', variance: '—', status: 'amber', trend: 'stable' },

  // Mix
  { label: 'GIC/FNC Mix', category: 'Workforce Mix', actual: '38%', target: '42%', variance: '-4pp', status: 'amber', trend: 'improving' },
  { label: 'Average Band', category: 'Workforce Mix', actual: '7.2', target: '7.0', variance: '+0.2', status: 'amber', trend: 'stable' },
  { label: 'Sub-K %', category: 'Workforce Mix', actual: '5.1%', target: '< 8%', variance: 'Within', status: 'green', trend: 'stable' },

  // Demand & Fulfillment
  { label: 'Open Demands', category: 'Demand & Fulfillment', actual: '4,689', target: '—', variance: '—', status: 'amber', trend: 'stable' },
  { label: 'Demand Churn (30d)', category: 'Demand & Fulfillment', actual: '6.3%', target: '< 5%', variance: '+1.3pp', status: 'amber', trend: 'declining' },
  { label: 'On-Time Fill Rate', category: 'Demand & Fulfillment', actual: '72%', target: '85%', variance: '-13pp', status: 'red', trend: 'improving' },
  { label: 'Sub-K Spend vs Budget', category: 'Demand & Fulfillment', actual: '$18.2M', target: '$22.0M', variance: '-$3.8M', status: 'green', trend: 'stable' },
];

// HC Waterfall
export const hcWaterfall = [
  { label: 'Starting HC (Q2)', value: 14047 },
  { label: '+ Hires', value: 1280 },
  { label: '+ Associates', value: 320 },
  { label: '+ Transfers In', value: 145 },
  { label: '− Attrition', value: -1195 },
  { label: '− Transfers Out', value: -170 },
  { label: '= Ending HC (Q3)', value: 14427 },
];
