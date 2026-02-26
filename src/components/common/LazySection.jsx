'use client';

import { lazy, Suspense } from 'react';
import Box from '@mui/material/Box';
import { SectionSkeleton } from './SectionSkeleton';

/**
 * Wraps a section component with React.lazy and Suspense.
 * Fallback uses SectionSkeleton by default.
 */
export function LazySection({ component: Component, fallback, ...props }) {
  const Fallback = fallback ?? <SectionSkeleton />;
  return (
    <Suspense
      fallback={
        <Box className="animate-fade-in" sx={{ mb: 3 }}>
          {Fallback}
        </Box>
      }
    >
      <Component {...props} />
    </Suspense>
  );
}

/**
 * Create a lazy-loaded section from a dynamic import path.
 * Usage: LazySectionWithImport({ import: () => import('./Summary'), ... })
 */
export function createLazySection(importFn) {
  const LazyComponent = lazy(importFn);
  return function Wrapped(props) {
    return (
      <Suspense fallback={<SectionSkeleton />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

export default LazySection;
