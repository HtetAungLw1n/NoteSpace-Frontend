import React from "react";
import { Sparkles } from "lucide-react";
import { useUIContext } from "../../contexts/UIContext";

const ChatIcon = ({ onClick, isOpen }) => {
  const { isSummaryOpen } = useUIContext();

  const positionClass = isSummaryOpen ? "right-[450px]" : "right-12";
  const animationClass = !isOpen ? "pulse-animation" : "";

  return (
    <button
      onClick={onClick}
      className={`fixed bottom-5 transition-all duration-500 ease-in-out 
                  bg-primary hover:bg-blue-500 
                  rounded-full w-13 h-13 
                  flex items-center justify-center 
                  shadow-lg z-50 cursor-pointer
                  ${animationClass} ${positionClass}`}
      aria-label="Open AI Assistant"
    >
      <Sparkles className="w-6 h-6 text-white" />
    </button>
  );
};

export default ChatIcon;
