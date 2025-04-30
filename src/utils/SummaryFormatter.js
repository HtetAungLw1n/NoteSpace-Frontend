// Formats raw summary text into structured content with summary and bullet points
const formatSummaryContent = (text) => {
    if (!text) return null;
  
    // Check if the text contains bullet points (lines starting with - or •)
    const hasListItems = /\n[-•]/.test(text);
  
    if (hasListItems) {
      // Split the text into paragraphs
      const paragraphs = text.split(/\n\n+/);
  
      // First paragraph is usually the main summary
      let mainSummary = paragraphs[0].trim();
  
      // If the first paragraph is also a bullet point, use empty string as summary
      if (mainSummary.startsWith("-") || mainSummary.startsWith("•")) {
        mainSummary = "";
      }
  
      // Extract all bullet points from the text
      // Match any line that starts with - or • followed by text
      const bulletPoints = [];
      const lines = text.split("\n");
  
      lines.forEach((line) => {
        // Trim the line and check if it starts with - or •
        const trimmed = line.trim();
        if (trimmed.startsWith("-") || trimmed.startsWith("•")) {
          // Remove the bullet point marker and add to the list
          let pointContent = trimmed.substring(1).trim();
  
          // Clean up any extra formatting
          pointContent = pointContent.replace(/\s+/g, " ").trim();
  
          if (pointContent.length > 0) {
            bulletPoints.push(pointContent);
          }
        }
      });
  
      return {
        summary: mainSummary,
        points: bulletPoints,
      };
    }
  
    // Fall back to treating the whole text as summary if no bullet points
    return {
      summary: text,
      points: [],
    };
  };
  
  export default formatSummaryContent;