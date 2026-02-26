'use client';

import { createContext, useContext, useMemo } from 'react';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { createPortfolioTheme } from '../theme/createTheme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const PortfolioContext = createContext(null);

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  return ctx;
}

export function PortfolioProvider({ children, demoData }) {
  const portfolio = usePortfolioData({ demoData: demoData ?? null });
  const theme = useMemo(
    () => createPortfolioTheme(portfolio.theme),
    [portfolio.theme]
  );

  const value = useMemo(
    () => ({
      ...portfolio,
      themeConfig: portfolio.theme,
    }),
    [portfolio.data, portfolio.theme, portfolio.profile, portfolio.sections]
  );

  return (
    <PortfolioContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </PortfolioContext.Provider>
  );
}
