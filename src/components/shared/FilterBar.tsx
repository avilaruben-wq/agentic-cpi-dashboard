import React, { useState } from 'react';
import { theme } from '../../theme';
import { GEOS, PRACTICES, JRS_CATALOG } from '../../data/constants';

interface FilterBarProps {
  geoFilter: string;
  practiceFilter: string;
  jrsFilter: string;
  onGeoChange: (v: string) => void;
  onPracticeChange: (v: string) => void;
  onJrsChange: (v: string) => void;
  onReset: () => void;
}

const selectStyle: React.CSSProperties = {
  background: theme.surface,
  border: `1px solid ${theme.surfaceBorder}`,
  borderRadius: theme.radius,
  color: theme.text,
  padding: `${theme.sp(1)} ${theme.sp(3)}`,
  fontSize: theme.fontSize.sm,
  fontFamily: 'inherit',
  cursor: 'pointer',
  minWidth: '160px',
  outline: 'none',
  height: '32px',
};

export const FilterBar: React.FC<FilterBarProps> = ({
  geoFilter, practiceFilter, jrsFilter,
  onGeoChange, onPracticeChange, onJrsChange, onReset,
}) => {
  const hasFilters = geoFilter || practiceFilter || jrsFilter;
  const [expanded, setExpanded] = useState(false);
  const activeCount = [geoFilter, practiceFilter, jrsFilter].filter(Boolean).length;

  return (
    <div style={{ marginBottom: theme.sp(1) }}>
      <button
        onClick={() => setExpanded(e => !e)}
        style={{
          background: theme.surface,
          border: `1px solid ${theme.surfaceBorder}`,
          borderRadius: theme.radius,
          color: theme.textSecondary,
          padding: `0 ${theme.sp(3)}`,
          fontSize: theme.fontSize.sm,
          cursor: 'pointer',
          fontFamily: 'inherit',
          display: 'flex',
          alignItems: 'center',
          gap: theme.sp(1),
          height: '32px',
        }}
      >
        <span style={{ fontSize: '10px', transform: expanded ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.15s', display: 'inline-block' }}>▶</span>
        Filters
        {activeCount > 0 && (
          <span style={{
            background: theme.primary, color: '#fff',
            borderRadius: '50%', width: '16px', height: '16px',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '10px', fontWeight: theme.fontWeight.semibold,
          }}>
            {activeCount}
          </span>
        )}
      </button>

      {expanded && (
        <div style={{
          display: 'flex', gap: theme.sp(2), alignItems: 'center',
          flexWrap: 'wrap', marginTop: theme.sp(2),
          animation: 'fadeIn 0.15s ease',
        }}>
          <select value={geoFilter} onChange={e => onGeoChange(e.target.value)} style={selectStyle}>
            <option value="">All GEOs</option>
            {GEOS.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          <select value={practiceFilter} onChange={e => onPracticeChange(e.target.value)} style={selectStyle}>
            <option value="">All Practices</option>
            {PRACTICES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <select value={jrsFilter} onChange={e => onJrsChange(e.target.value)} style={selectStyle}>
            <option value="">All JRS</option>
            {JRS_CATALOG.map(j => <option key={j.id} value={j.name}>{j.name}</option>)}
          </select>
          {hasFilters && (
            <button onClick={onReset} style={{
              background: theme.surface, border: `1px solid ${theme.surfaceBorder}`,
              borderRadius: theme.radius, color: theme.textSecondary,
              padding: `0 ${theme.sp(3)}`, fontSize: theme.fontSize.sm,
              cursor: 'pointer', fontFamily: 'inherit', height: '32px',
            }}>
              Reset
            </button>
          )}
        </div>
      )}
    </div>
  );
};
