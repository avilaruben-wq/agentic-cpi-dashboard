import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { theme } from '../../theme';

interface StackedBarCardProps {
  title: string;
  data: Record<string, unknown>[];
  xKey: string;
  segments: { dataKey: string; color: string; name: string }[];
  height?: number;
}

export const StackedBarCard: React.FC<StackedBarCardProps> = ({
  title, data, xKey, segments, height = 300,
}) => (
  <div style={{
    background: theme.surface,
    border: `1px solid ${theme.surfaceBorder}`,
    borderRadius: theme.radius,
    padding: theme.sp(4),
  }}>
    <div style={{
      fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.semibold,
      color: theme.text, marginBottom: theme.sp(3),
    }}>
      {title}
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
        {segments.map(s => (
          <Bar key={s.dataKey} dataKey={s.dataKey} stackId="stack" fill={s.color} name={s.name} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  </div>
);
