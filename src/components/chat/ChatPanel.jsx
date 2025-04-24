import React, { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { useUIContext } from "../../contexts/UIContext";

const SAMPLE_QUESTIONS = [
  "How can I handle this error?",
  "How can I learn by using notespace ?",
];

const ChatPanel = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState("");
  const [shouldRender, setShouldRender] = useState(false);
  const panelRef = useRef(null);
  const { isSummaryOpen } = useUIContext();

  // Panel visibility with animations on mount and unmount
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    } else if (panelRef.current) {
      panelRef.current.classList.add("chat-panel-hide");
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  const positionClass = isSummaryOpen ? "right-[545px]" : "right-20";

  return (
    <div
      ref={panelRef}
      className={`fixed bottom-23 transition-all duration-500 ease-in-out 
                  w-[384px] bg-neutral-900 border border-neutral-800 
                  rounded-3xl shadow-lg z-40 
                  ${isOpen ? "chat-panel-show" : ""} ${positionClass}`}
    >
      <div className="p-5 flex flex-col h-[450px] rounded-3xl">
        {/* Header */}
        <div className="pb-4 border-b border-neutral-800 mb-4">
          <h2 className="text-xl text-white font-medium text-center">
            AI Assistant
          </h2>
        </div>

        {/* Chat area */}
        <div className="flex-grow overflow-y-auto mb-16 flex flex-col space-y-4 p-1">
          {/* Sample questions */}
          <div className="flex flex-col space-y-3 mt-auto">
            {SAMPLE_QUESTIONS.map((question, index) => (
              <button
                key={index}
                className="text-left bg-neutral-800 hover:bg-neutral-700 
                           rounded-full py-2 px-4 text-neutral-300 text-sm flex items-center"
              >
                <span className="mr-2 text-white opacity-70">💬</span>{" "}
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Input area */}
        <div className="absolute bottom-5 left-5 right-5">
          <div className="flex items-center relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full bg-neutral-800 border border-neutral-800 
                         rounded-lg py-3 px-4 pr-12 text-white focus:outline-none text-sm"
            />
            <button className="absolute right-4 text-white">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
