import { useState, useMemo } from 'react';

interface UseSearchFilterOptions<T> {
  items: T[];
  searchFields: (keyof T)[];
  searchQuery: string;
  filterFn?: (item: T) => boolean;
  sortFn?: (a: T, b: T) => number;
}

export function useSearchFilter<T>({
  items,
  searchFields,
  searchQuery,
  filterFn,
  sortFn
}: UseSearchFilterOptions<T>) {
  
  const processedItems = useMemo(() => {
    // 1. Filter by search query
    let result = items;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((item) => {
        return searchFields.some((field) => {
          const value = item[field];
          if (typeof value === 'string') {
            return value.toLowerCase().includes(q);
          }
          if (Array.isArray(value)) {
            return value.some((v) => typeof v === 'string' && v.toLowerCase().includes(q));
          }
          return false;
        });
      });
    }

    // 2. Apply custom filter
    if (filterFn) {
      result = result.filter(filterFn);
    }

    // 3. Apply custom sorting
    if (sortFn) {
      result = [...result].sort(sortFn);
    }

    return result;
  }, [items, searchFields, searchQuery, filterFn, sortFn]);

  return processedItems;
}
