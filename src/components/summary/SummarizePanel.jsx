import React from "react";
import LoadingState from "./LoadingState";
import SummaryContent from "./SummaryContent";
import EmptySummary from "./EmptySummary";
import formatSummaryContent from "../../utils/SummaryFormatter";

const SummarizePanel = ({ isOpen, summary, isSummarizing }) => {
  // Process the summary content if available
  const summaryContent =
    summary?.summary?.content
      ? formatSummaryContent(summary.summary.content)
      : null;

  // Determine the panel's content state
  const hasLoadedWithNoSummary = !isSummarizing && isOpen && !summaryContent;
  const hasLoadedWithSummary = !isSummarizing && isOpen && summaryContent;
  const isLoading = isSummarizing && isOpen;

  return (
    <div
      className={`summarize-panel fixed top-0 right-0 bottom-0 bg-tertiary shadow-lg z-10 ${
        isOpen ? "open" : ""
      }`}
      style={{
        transform: isOpen ? "translateX(0)" : "translateX(100%)",
        top: "72px",
        width: "520px",
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <div className="h-full flex flex-col">
        <div className="flex-grow overflow-y-auto p-8">
          {isLoading && <LoadingState />}
          {hasLoadedWithSummary && (
            <SummaryContent summaryContent={summaryContent} />
          )}
          {hasLoadedWithNoSummary && <EmptySummary />}
        </div>
      </div>
    </div>
  );
};

export default SummarizePanel;
