'use client';

import { useMemo } from 'react';

/**
 * Portfolio data – frontend only, uses dummy/constants data.
 */
export function usePortfolioData(options = {}) {
  const { demoData } = options;
  const data = demoData ?? null;
  const theme = data?.theme ?? null;
  const profile = data?.profile ?? null;
  const sections = data?.sections ?? null;

  return useMemo(
    () => ({
      data,
      theme,
      profile,
      sections,
      loading: false,
      error: null,
      refetch: () => {},
    }),
    [data, theme, profile, sections]
  );
}
