'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { PortfolioProvider } from '../../context/PortfolioContext';

export default function ThemeRegistry({ children, demoData }) {
  return (
    <AppRouterCacheProvider options={{ key: 'css' }}>
      <PortfolioProvider demoData={demoData}>
        {children}
      </PortfolioProvider>
    </AppRouterCacheProvider>
  );
}
