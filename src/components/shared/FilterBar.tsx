import React from 'react';
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
  background: theme.surfaceRaised,
  border: `1px solid ${theme.surfaceBorder}`,
  borderRadius: theme.radiusSm,
  color: theme.text,
  padding: `${theme.sp(2)} ${theme.sp(3)}`,
  fontSize: theme.fontSize.sm,
  fontFamily: 'inherit',
  cursor: 'pointer',
  minWidth: '160px',
  outline: 'none',
};

export const FilterBar: React.FC<FilterBarProps> = ({
  geoFilter, practiceFilter, jrsFilter,
  onGeoChange, onPracticeChange, onJrsChange, onReset,
}) => {
  const hasFilters = geoFilter || practiceFilter || jrsFilter;

  return (
    <div style={{
      display: 'flex', gap: theme.sp(3), alignItems: 'center',
      flexWrap: 'wrap', marginBottom: theme.sp(4),
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
          background: 'transparent',
          border: `1px solid ${theme.surfaceBorder}`,
          borderRadius: theme.radiusSm,
          color: theme.textSecondary,
          padding: `${theme.sp(2)} ${theme.sp(3)}`,
          fontSize: theme.fontSize.sm,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}>
          Reset
        </button>
      )}
    </div>
  );
};
