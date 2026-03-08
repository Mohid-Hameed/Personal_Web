"use client";

import { createContext, useContext, useState, useCallback } from "react";

const ScrollContext = createContext(null);

export function useScroll() {
  const ctx = useContext(ScrollContext);
  return ctx ?? { scrolledPastHero: false, setScrolledPastHero: () => {} };
}

export function ScrollProvider({ children }) {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const value = {
    scrolledPastHero,
    setScrolledPastHero: useCallback((v) => setScrolledPastHero(Boolean(v)), []),
  };
  return (
    <ScrollContext.Provider value={value}>
      {children}
    </ScrollContext.Provider>
  );
}
