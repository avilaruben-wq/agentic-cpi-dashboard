import React from 'react';
import { theme } from '../../theme';
import { interpolateColor } from '../../utils/calculations';

interface HeatmapTableProps {
  title: string;
  rows: string[];
  columns: string[];
  data: number[][];
  rowLabel?: string;
}

export const HeatmapTable: React.FC<HeatmapTableProps> = ({
  title, rows, columns, data, rowLabel = 'JRS',
}) => {
  const allValues = data.flat().filter(v => v > 0);
  const minVal = allValues.length ? Math.min(...allValues) : 0;
  const maxVal = allValues.length ? Math.max(...allValues) : 1;

  return (
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
      <div style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={{
                padding: `${theme.sp(2)} ${theme.sp(3)}`,
                fontSize: theme.fontSize.xs, color: theme.textSecondary,
                textAlign: 'left', fontWeight: theme.fontWeight.semibold,
                textTransform: 'uppercase', letterSpacing: '0.32px',
                borderBottom: `1px solid ${theme.surfaceBorder}`,
              }}>
                {rowLabel}
              </th>
              {columns.map(col => (
                <th key={col} style={{
                  padding: `${theme.sp(2)} ${theme.sp(3)}`,
                  fontSize: theme.fontSize.xs, color: theme.textSecondary,
                  textAlign: 'center', fontWeight: theme.fontWeight.semibold,
                  borderBottom: `1px solid ${theme.surfaceBorder}`,
                }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={row}>
                <td style={{
                  padding: `${theme.sp(2)} ${theme.sp(3)}`,
                  fontSize: theme.fontSize.sm, color: theme.text,
                  whiteSpace: 'nowrap', borderBottom: `1px solid ${theme.surfaceBorder}`,
                }}>
                  {row}
                </td>
                {columns.map((col, ci) => {
                  const val = data[ri]?.[ci] ?? 0;
                  const bg = val > 0
                    ? interpolateColor(val, minVal, maxVal, '#fff1f1', '#da1e28')
                    : 'transparent';
                  return (
                    <td key={col} style={{
                      padding: `${theme.sp(2)} ${theme.sp(3)}`,
                      textAlign: 'center', fontSize: theme.fontSize.sm,
                      fontFamily: theme.fontMono,
                      color: val > 0 ? (val > maxVal * 0.6 ? '#fff' : theme.text) : theme.textMuted,
                      background: bg,
                      borderBottom: `1px solid ${theme.surfaceBorder}`,
                    }}>
                      {val || '—'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
