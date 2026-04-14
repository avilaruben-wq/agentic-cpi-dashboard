import type { SeverityScore } from '../types/gap';

export function computeCompositeSeverity(s: Omit<SeverityScore, 'composite'>): number {
  return Math.round((s.revenueRisk * 0.35 + s.fillDifficulty * 0.25 + s.leadTime * 0.2 + s.cgpImpact * 0.2) * 10) / 10;
}

export function severityLabel(composite: number): 'critical' | 'high' | 'medium' | 'low' {
  if (composite >= 4) return 'critical';
  if (composite >= 3) return 'high';
  if (composite >= 2) return 'medium';
  return 'low';
}

export function interpolateColor(value: number, min: number, max: number, lowColor: string, highColor: string): string {
  const t = max === min ? 0 : (value - min) / (max - min);
  const low = hexToRgb(lowColor);
  const high = hexToRgb(highColor);
  const r = Math.round(low.r + (high.r - low.r) * t);
  const g = Math.round(low.g + (high.g - low.g) * t);
  const b = Math.round(low.b + (high.b - low.b) * t);
  return `rgb(${r},${g},${b})`;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
}

export function cgpImpact(utilizationDelta: number): number {
  return utilizationDelta * 40;
}
