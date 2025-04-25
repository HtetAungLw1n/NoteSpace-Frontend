import React from "react";
// import LoadingState from "./LoadingState";
import SummaryContent from "./SummaryContent";
import EmptySummary from "./EmptySummary";
import formatSummaryContent from "../../utils/SummaryFormatter";

const SummarizePanel = ({
  isOpen,
  summary,
  isSummarizing,
  isSummarizeButtonClicked,
}) => {
  const summaryContent = summary?.summary?.content
    ? formatSummaryContent(summary.summary.content)
    : null;

  const hasLoadedWithNoSummary = !isSummarizing && isOpen && !summaryContent;
  const hasLoadedWithSummary = !isSummarizing && isOpen && summaryContent;
  const isLoading = isSummarizing && isOpen;

  const loadingText = isSummarizeButtonClicked
    ? "Summarizing Data..."
    : "Loading summary...";

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
          {isLoading && (
            <div className="h-full flex items-center justify-center flex-col">
              <div className="loader"></div>
              <p className="text-neutral-400 mt-4">{loadingText}</p>
            </div>
          )}
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
