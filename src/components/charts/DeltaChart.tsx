import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { theme } from '../../theme';

interface DeltaChartProps {
  title: string;
  data: { name: string; delta: number; severity: string }[];
  height?: number;
}

export const DeltaChart: React.FC<DeltaChartProps> = ({ title, data, height = 350 }) => (
  <div style={{
    background: theme.surface,
    border: `1px solid ${theme.surfaceBorder}`,
    borderLeft: `3px solid ${theme.primary}`,
    borderRadius: theme.radiusLg,
    padding: theme.sp(5),
  }}>
    <div style={{
      fontSize: theme.fontSize.md, fontWeight: theme.fontWeight.semibold,
      color: theme.text, marginBottom: theme.sp(1),
    }}>
      {title}
    </div>
    <div style={{
      fontSize: theme.fontSize.xs, color: theme.primaryLight,
      marginBottom: theme.sp(4), fontWeight: theme.fontWeight.medium,
    }}>
      NET NEW CAPABILITY — Bottoms-up vs Top-down Reconciliation
    </div>
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 120, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={theme.surfaceBorder} horizontal={false} />
        <XAxis type="number" tick={{ fill: theme.textSecondary, fontSize: 11 }} axisLine={{ stroke: theme.surfaceBorder }} />
        <YAxis type="category" dataKey="name" tick={{ fill: theme.textSecondary, fontSize: 10 }} axisLine={{ stroke: theme.surfaceBorder }} width={110} />
        <Tooltip
          contentStyle={{
            background: theme.surfaceRaised, border: `1px solid ${theme.surfaceBorder}`,
            borderRadius: theme.radiusSm, color: theme.text, fontSize: 12,
          }}
          formatter={(value) => [`${value} HC`, 'Delta']}
        />
        <ReferenceLine x={0} stroke={theme.textMuted} strokeWidth={1} />
        <Bar dataKey="delta" radius={[0, 4, 4, 0]}>
          {data.map((entry, idx) => (
            <Cell
              key={idx}
              fill={entry.severity === 'critical' ? theme.red
                : entry.severity === 'high' ? theme.orange
                : entry.severity === 'medium' ? theme.yellow
                : theme.green}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);
