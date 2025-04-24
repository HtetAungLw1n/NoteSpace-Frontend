import React from "react";
import { FileText } from "lucide-react";

const EmptySummary = () => {
  return (
    <div className="text-center mt-20">
      <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
        <FileText size={28} className="text-neutral-500" />
      </div>
      <h3 className="text-xl font-medium text-white">No Summaries</h3>
      <p className="text-neutral-400 mt-2 max-w-xs mx-auto text-sm">
        Please write the note first
      </p>
    </div>
  );
};

export default EmptySummary;
