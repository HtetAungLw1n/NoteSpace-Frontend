import React from "react";
import { FileText } from "lucide-react";

const SummarizePanel = ({ isOpen, summary }) => {
  // Format the summary text into bullet points if available
  const formatSummaryContent = (text) => {
    if (!text) return [];

    // Check if the text contains "Summarized Main Points:"
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

  const summaryContent = summary?.summary
    ? formatSummaryContent(summary.summary)
    : null;

  return (
    <div
      className={`summarize-panel fixed top-0 right-0 bottom-0 bg-tertiary shadow-lg z-10 ${
        isOpen ? "open" : ""
      }`}
      style={{
        transform: isOpen ? "translateX(0)" : "translateX(100%)",
        top: "72px",
        width: "520px",
      }}
    >
      <div className="h-full flex flex-col">
        {/* Content */}
        <div className="flex-grow overflow-y-auto p-8">
          {summaryContent ? (
            <div className="mt-4 pb-28">
              <div className="flex items-center justify-between mb-6">
                <div className="text-neutral-400 text-sm">Updated 2m ago</div>
              </div>

              {/* Main Summary */}
              {summaryContent.summary && (
                <div className="mb-8">
                  <p className="text-neutral-300 leading-relaxed">
                    {summaryContent.summary}
                  </p>
                </div>
              )}

              {/* Main Points */}
              {summaryContent.points.length > 0 && (
                <div>
                  <h4 className="text-white font-medium mb-4">
                    Summarized Main Points:
                  </h4>
                  <ul className="space-y-3">
                    {summaryContent.points.map((point, index) => (
                      <li
                        key={index}
                        className="flex items-start text-neutral-300 leading-relaxed"
                      >
                        <span className="text-primary mr-3">-</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-tertiary to-transparent pt-20">
                <button className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  Show With Graph
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center mt-20">
              <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText size={28} className="text-neutral-500" />
              </div>
              <h3 className="text-xl font-medium text-white">No Summaries</h3>
              <p className="text-neutral-400 mt-2 max-w-xs mx-auto text-sm">
                Please write the note first
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SummarizePanel;
