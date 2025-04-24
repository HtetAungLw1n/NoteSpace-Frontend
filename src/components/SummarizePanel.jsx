import React from "react";
import { FileText } from "lucide-react";

const SummarizePanel = ({ isOpen }) => {
  return (
    <div
      className={`summarize-panel fixed top-0 right-0 bottom-0 bg-tertiary shadow-lg z-10 ${
        isOpen ? "open" : ""
      }`}
      style={{
        transform: isOpen ? "translateX(0)" : "translateX(100%)",
        top: "72px",
      }}
    >
      <div className="h-full flex flex-col">
        {/* Content */}
        <div className="flex-grow overflow-y-auto p-6">
          <div className="text-center mt-20">
            <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText size={28} className="text-neutral-500" />
            </div>
            <h3 className="text-xl font-medium text-white">No Summaries</h3>
            <p className="text-neutral-400 mt-2 max-w-xs mx-auto text-sm">
              Please write the note first
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummarizePanel;
