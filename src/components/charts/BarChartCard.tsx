import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { theme } from '../../theme';

interface BarChartCardProps {
  title: string;
  subtitle?: string;
  data: Record<string, unknown>[];
  bars: { dataKey: string; color: string; name: string }[];
  xKey: string;
  height?: number;
  stacked?: boolean;
}

export const BarChartCard: React.FC<BarChartCardProps> = ({
  title, subtitle, data, bars, xKey, height = 300, stacked,
}) => (
  <div style={{
    background: theme.surface,
    border: `1px solid ${theme.surfaceBorder}`,
    borderRadius: theme.radius,
    padding: theme.sp(4),
  }}>
    <div style={{ marginBottom: theme.sp(3) }}>
      <div style={{ fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.semibold, color: theme.text }}>
        {title}
      </div>
      {subtitle && (
        <div style={{ fontSize: theme.fontSize.xs, color: theme.textMuted, marginTop: '2px' }}>
          {subtitle}
        </div>
      )}
    </div>
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={theme.surfaceBorder} />
        <XAxis dataKey={xKey} tick={{ fill: theme.textSecondary, fontSize: 11 }} axisLine={{ stroke: theme.surfaceBorder }} />
        <YAxis tick={{ fill: theme.textSecondary, fontSize: 11 }} axisLine={{ stroke: theme.surfaceBorder }} />
        <Tooltip contentStyle={{
          background: theme.surface, border: `1px solid ${theme.surfaceBorder}`,
          borderRadius: theme.radius, color: theme.text, fontSize: 12, boxShadow: theme.shadow,
        }} />
        <Legend wrapperStyle={{ fontSize: 11, color: theme.textSecondary }} />
        {bars.map(b => (
          <Bar key={b.dataKey} dataKey={b.dataKey} fill={b.color} name={b.name}
            stackId={stacked ? 'stack' : undefined} radius={stacked ? undefined : [2, 2, 0, 0]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  </div>
);
