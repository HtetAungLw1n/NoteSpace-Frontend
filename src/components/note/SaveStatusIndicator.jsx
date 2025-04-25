import React from "react";

const SaveStatusIndicator = ({ status }) => {
  switch (status) {
    case "saving":
      return (
        <div className="text-neutral-400 text-sm flex items-center justify-end">
          <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse mr-2"></div>
          <span>Saving...</span>
        </div>
      );
    case "saved":
      return (
        <div className="text-neutral-400 text-sm flex items-center justify-end">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
          <span>Saved</span>
        </div>
      );
    case "error":
      return (
        <div className="text-red-400 text-sm flex items-center justify-end">
          <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
          <span>Error saving</span>
        </div>
      );
    default:
      return null;
  }
};

export default SaveStatusIndicator;
