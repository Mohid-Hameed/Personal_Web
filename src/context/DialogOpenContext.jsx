'use client';

import { createContext, useContext, useState, useCallback } from 'react';

/**
 * When using a Dialog (e.g. MUI Dialog), call setDialogOpen(true) when it opens
 * and setDialogOpen(false) when it closes so the app restores the custom cursor
 * when the dialog is closed.
 */
const DialogOpenContext = createContext(null);

export function DialogOpenProvider({ children }) {
  const [dialogOpen, setDialogOpenState] = useState(false);
  const setDialogOpen = useCallback((open) => {
    setDialogOpenState(Boolean(open));
  }, []);
  return (
    <DialogOpenContext.Provider value={{ dialogOpen, setDialogOpen }}>
      {children}
    </DialogOpenContext.Provider>
  );
}

export function useDialogOpen() {
  const ctx = useContext(DialogOpenContext);
  return ctx ?? { dialogOpen: false, setDialogOpen: () => {} };
}
