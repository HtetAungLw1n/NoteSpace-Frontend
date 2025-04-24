// Formats raw summary text into structured content with summary and bullet points
const formatSummaryContent = (text) => {
  if (!text) return null;

  if (text.includes("Summarized Main Points:")) {
    // Split the main points section
    const [mainSummary, mainPoints] = text.split("Summarized Main Points:");
    return {
      summary: mainSummary.trim(),
      points: mainPoints
        .split(/[-•]/)
        .map((point) => point.trim())
        .filter((point) => point.length > 0),
    };
  }

  // Fall back to sentence splitting if no main points section
  return {
    summary: text,
    points: [],
  };
};

export default formatSummaryContent;
