import React, { createContext, useContext, useState } from "react";

const NoteContext = createContext();
export const useNoteContext = () => useContext(NoteContext);

// Provider component
export const NoteProvider = ({ children }) => {
  const [noteData, setNoteData] = useState(null);
  const value = {
    noteData,
    setNoteData,
  };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};

export default NoteContext;
