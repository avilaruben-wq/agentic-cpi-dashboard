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
  const allValues = data.flat();
  const minVal = Math.min(...allValues);
  const maxVal = Math.max(...allValues);

  return (
    <div style={{
      background: theme.surface,
      border: `1px solid ${theme.surfaceBorder}`,
      borderRadius: theme.radiusLg,
      padding: theme.sp(5),
    }}>
      <div style={{
        fontSize: theme.fontSize.md, fontWeight: theme.fontWeight.semibold,
        color: theme.text, marginBottom: theme.sp(4),
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
                textTransform: 'uppercase', letterSpacing: '0.5px',
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
                  whiteSpace: 'nowrap', borderBottom: `1px solid ${theme.surfaceBorder}20`,
                }}>
                  {row}
                </td>
                {columns.map((col, ci) => {
                  const val = data[ri]?.[ci] ?? 0;
                  const bg = val > 0
                    ? interpolateColor(val, minVal, maxVal, '#1A2940', '#DA1E28')
                    : 'transparent';
                  return (
                    <td key={col} style={{
                      padding: `${theme.sp(2)} ${theme.sp(3)}`,
                      textAlign: 'center', fontSize: theme.fontSize.sm,
                      fontFamily: theme.fontMono,
                      color: val > 0 ? theme.text : theme.textMuted,
                      background: bg,
                      borderBottom: `1px solid ${theme.surfaceBorder}20`,
                      borderRadius: '2px',
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
