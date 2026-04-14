import { useState, useCallback } from 'react';

export interface Filters {
  geo: string;
  practice: string;
  jrs: string;
}

export function useFilters() {
  const [filters, setFilters] = useState<Filters>({ geo: '', practice: '', jrs: '' });

  const setGeo = useCallback((geo: string) => setFilters(f => ({ ...f, geo })), []);
  const setPractice = useCallback((practice: string) => setFilters(f => ({ ...f, practice })), []);
  const setJrs = useCallback((jrs: string) => setFilters(f => ({ ...f, jrs })), []);
  const reset = useCallback(() => setFilters({ geo: '', practice: '', jrs: '' }), []);

  function filterData<T>(
    data: T[],
    getGeo: (item: T) => string,
    getPractice: (item: T) => string,
    getJrs: (item: T) => string,
  ): T[] {
    return data.filter(item => {
      if (filters.geo && getGeo(item) !== filters.geo) return false;
      if (filters.practice && getPractice(item) !== filters.practice) return false;
      if (filters.jrs && getJrs(item) !== filters.jrs) return false;
      return true;
    });
  }

  return { filters, setGeo, setPractice, setJrs, reset, filterData };
}
