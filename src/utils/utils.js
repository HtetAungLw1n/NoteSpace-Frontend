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

export const cleanResponse = (response) => {
  if (!response) return "";

  // Handle nested response object
  if (typeof response === "object" && response.response) {
    response = response.response;
  }

  // Handle string response
  if (typeof response === "string") {
    return response.replace(/No Chat History\s*\n+\s*/i, "");
  }

  // Fallback for other types
  return String(response);
};
