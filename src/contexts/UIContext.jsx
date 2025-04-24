import React, { createContext, useContext, useState, useMemo } from "react";

const UIContext = createContext();

export const useUIContext = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUIContext must be used within a UIProvider");
  }
  return context;
};

export const UIProvider = ({ children }) => {
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  // Memoized context value to prevent unnecessary rerenders
  const value = useMemo(
    () => ({
      isSummaryOpen,
      setIsSummaryOpen,
    }),
    [isSummaryOpen]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export default UIContext;
