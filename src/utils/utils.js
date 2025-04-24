// Decodes HTML entities in content string
export const decodeHTML = (html) => {
  if (!html) return "";
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

// Default state for new notes
export const createInitialNoteState = () => {
  return {
    title: "New Note",
    content: "",
  };
};
