'use client';

import { createTheme } from '@mui/material/styles';

/** Default: dark theme with orange & black */
const DEFAULT_DARK_PALETTE = {
  mode: 'dark',
  primary: { main: '#e65100' },
  secondary: { main: '#ff9800' },
  background: { default: '#0d0d0d', paper: '#1a1a1a' },
  text: { primary: '#fafafa', secondary: '#b0b0b0' },
};

/**
 * Creates MUI theme from backend theme payload.
 * @param {Object} themeFromBackend - { mode, primary, secondary, background, surface, textPrimary, textSecondary }
 * @returns {Object} MUI theme
 */
export function createPortfolioTheme(themeFromBackend = null) {
  const isDark = themeFromBackend?.mode !== 'light';
  const palette = themeFromBackend
    ? {
        mode: themeFromBackend.mode || (isDark ? 'dark' : 'light'),
        primary: { main: themeFromBackend.primary ?? DEFAULT_DARK_PALETTE.primary.main },
        secondary: { main: themeFromBackend.secondary ?? DEFAULT_DARK_PALETTE.secondary.main },
        background: {
          default: themeFromBackend.background ?? DEFAULT_DARK_PALETTE.background.default,
          paper: themeFromBackend.surface ?? DEFAULT_DARK_PALETTE.background.paper,
        },
        text: {
          primary: themeFromBackend.textPrimary ?? DEFAULT_DARK_PALETTE.text.primary,
          secondary: themeFromBackend.textSecondary ?? DEFAULT_DARK_PALETTE.text.secondary,
        },
      }
    : DEFAULT_DARK_PALETTE;

  return createTheme({
    palette,
    typography: {
      fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { textTransform: 'none' },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
            backgroundImage: 'none',
          },
        },
      },
    },
  });
}
