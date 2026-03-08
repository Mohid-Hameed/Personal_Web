"use client";

import { createContext, useContext, useState, useCallback } from "react";

const AppReadyContext = createContext(null);

export function useAppReady() {
  const ctx = useContext(AppReadyContext);
  return ctx ?? { appReady: false, setAppReady: () => {} };
}

export function AppReadyProvider({ children }) {
  const [appReady, setAppReady] = useState(false);
  const value = { appReady, setAppReady: useCallback((v) => setAppReady(Boolean(v)), []) };
  return (
    <AppReadyContext.Provider value={value}>
      {children}
    </AppReadyContext.Provider>
  );
}
