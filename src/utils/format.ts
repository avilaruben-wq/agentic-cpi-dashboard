export function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}

export function formatCurrency(n: number): string {
  if (Math.abs(n) >= 1_000_000_000) {
    return `$${(n / 1_000_000_000).toFixed(1)}B`;
  }
  if (Math.abs(n) >= 1_000_000) {
    return `$${(n / 1_000_000).toFixed(1)}M`;
  }
  if (Math.abs(n) >= 1_000) {
    return `$${(n / 1_000).toFixed(1)}K`;
  }
  return `$${n.toLocaleString('en-US')}`;
}

export function formatPercent(n: number, decimals = 1): string {
  return `${n.toFixed(decimals)}%`;
}

export function formatDelta(n: number): string {
  const sign = n >= 0 ? '+' : '';
  return `${sign}${n.toLocaleString('en-US')}`;
}

export function formatDeltaPercent(n: number): string {
  const sign = n >= 0 ? '+' : '';
  return `${sign}${n.toFixed(1)}%`;
}

export function formatDays(n: number): string {
  return `${n}d`;
}
