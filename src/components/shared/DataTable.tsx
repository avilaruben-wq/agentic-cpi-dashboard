import React, { useState, useMemo } from 'react';
import { theme } from '../../theme';

export interface Column<T> {
  key: string;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
  getValue?: (row: T) => string | number;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  expandable?: boolean;
  renderExpanded?: (row: T) => React.ReactNode;
  maxHeight?: string;
}

export function DataTable<T>({
  columns, data, keyExtractor, expandable, renderExpanded, maxHeight,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    const col = columns.find(c => c.key === sortKey);
    if (!col) return data;
    return [...data].sort((a, b) => {
      const aVal = col.getValue ? col.getValue(a) : (a as Record<string, unknown>)[sortKey];
      const bVal = col.getValue ? col.getValue(b) : (b as Record<string, unknown>)[sortKey];
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
      }
      const aStr = String(aVal ?? '');
      const bStr = String(bVal ?? '');
      return sortDir === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
    });
  }, [data, sortKey, sortDir, columns]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const toggleExpand = (key: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const headerStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    background: theme.surfaceRaised,
    padding: `${theme.sp(2)} ${theme.sp(3)}`,
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semibold,
    color: theme.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    borderBottom: `1px solid ${theme.surfaceBorder}`,
    whiteSpace: 'nowrap',
    userSelect: 'none',
  };

  const cellStyle: React.CSSProperties = {
    padding: `${theme.sp(2)} ${theme.sp(3)}`,
    fontSize: theme.fontSize.sm,
    color: theme.text,
    borderBottom: `1px solid ${theme.surfaceBorder}20`,
    whiteSpace: 'nowrap',
  };

  return (
    <div style={{
      border: `1px solid ${theme.surfaceBorder}`,
      borderRadius: theme.radius,
      overflow: 'hidden',
    }}>
      <div style={{
        maxHeight: maxHeight || '500px',
        overflowY: 'auto',
        overflowX: 'auto',
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          tableLayout: 'auto',
        }}>
          <thead>
            <tr>
              {expandable && <th style={{ ...headerStyle, width: '32px' }} />}
              {columns.map(col => (
                <th
                  key={col.key}
                  style={{
                    ...headerStyle,
                    width: col.width,
                    textAlign: col.align || 'left',
                    cursor: col.sortable !== false ? 'pointer' : 'default',
                  }}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                >
                  {col.label}
                  {sortKey === col.key && (
                    <span style={{ marginLeft: '4px' }}>
                      {sortDir === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, idx) => {
              const key = keyExtractor(row);
              const isExpanded = expandedRows.has(key);
              return (
                <React.Fragment key={key}>
                  <tr
                    style={{
                      background: idx % 2 === 0 ? 'transparent' : `${theme.surface}80`,
                      cursor: expandable ? 'pointer' : 'default',
                      transition: 'background 0.15s',
                    }}
                    onClick={() => expandable && toggleExpand(key)}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = theme.surfaceHover; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = idx % 2 === 0 ? 'transparent' : `${theme.surface}80`; }}
                  >
                    {expandable && (
                      <td style={{ ...cellStyle, width: '32px', textAlign: 'center' }}>
                        <span style={{
                          display: 'inline-block',
                          transform: isExpanded ? 'rotate(90deg)' : 'rotate(0)',
                          transition: 'transform 0.2s',
                          color: theme.textMuted,
                        }}>
                          ▶
                        </span>
                      </td>
                    )}
                    {columns.map(col => (
                      <td key={col.key} style={{ ...cellStyle, textAlign: col.align || 'left' }}>
                        {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key] ?? '')}
                      </td>
                    ))}
                  </tr>
                  {expandable && isExpanded && renderExpanded && (
                    <tr>
                      <td colSpan={columns.length + 1} style={{
                        padding: theme.sp(4),
                        background: theme.surfaceRaised,
                        borderBottom: `1px solid ${theme.surfaceBorder}`,
                      }}>
                        {renderExpanded(row)}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
