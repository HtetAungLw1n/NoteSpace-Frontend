import React, { useState, useEffect, useRef, useCallback } from "react";
import { Send } from "lucide-react";
import { useUIContext } from "../../contexts/UIContext";
import { privateAxios } from "../../utils/axios";
import { cleanResponse } from "../../utils/utils";

const SAMPLE_QUESTIONS = [
  "How can I learn by using notespace?",
  "Can you summarize this note?",
  "What are the key points in this note?",
];

const ChatPanel = ({ isOpen, noteId }) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);

  const [shouldRender, setShouldRender] = useState(false);

  const panelRef = useRef(null);
  const chatAreaRef = useRef(null);

  const { isSummaryOpen } = useUIContext();

  // Handle panel visibility with animations
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

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSendMessage = useCallback(async () => {
    if (!message.trim() || !noteId || isLoading) {
      return;
    }

    setChatMessages((prev) => [...prev, { role: "user", content: message }]);

    const userMessage = message;
    setMessage("");
    setIsLoading(true);

    const startTime = Date.now();

    try {
      const payload = {
        message: userMessage,
        chat_history: chatHistory,
      };

      console.log("Chat API Payload:", payload);

      const response = await privateAxios.post(
        `/notes/${noteId}/chat/`,
        payload
      );

      console.log("AI Response Data:", response.data);

      let aiResponse = "";
      if (response.data && response.data.response) {
        aiResponse = cleanResponse(response.data.response);
      } else if (response.data) {
        aiResponse = cleanResponse(response.data);
      }

      setChatMessages((prev) => [
        ...prev,
        { role: "system", content: aiResponse },
      ]);

      // Store all messages for chat history
      if (response.status === 200 && response.data && response.data.prompt) {
        setChatHistory((prev) => [...prev, response.data.prompt]);
      }
    } catch (error) {
      console.error("Chat error:", error.response?.data || error.message);

      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 1000 - elapsedTime);

      if (remainingTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingTime));
      }

      setChatMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: "Server is currently busy. Please try again shortly.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [message, isLoading, noteId, chatHistory]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  const handleSampleQuestion = useCallback((question) => {
    setMessage(question);
  }, []);

  if (!shouldRender) return null;

  const positionClass = isSummaryOpen ? "right-[545px]" : "right-20";

  return (
    <div
      ref={panelRef}
      className={`fixed bottom-23 transition-all duration-500 ease-in-out 
                  w-[384px] bg-neutral-900 border border-neutral-700 
                  rounded-3xl shadow-lg z-200 
                  ${isOpen ? "chat-panel-show" : ""} ${positionClass}`}
    >
      <div className="p-5 flex flex-col h-[450px] rounded-3xl">
        {/* Header */}
        <div className="pb-4 border-b border-neutral-800 mb-4">
          <h2 className="text-xl text-white font-medium text-center">
            Dhoke Htoe Assistant
          </h2>
        </div>

        {/* Chat Message Area */}
        <div
          ref={chatAreaRef}
          className="flex-grow overflow-y-auto scrollbar-hide mb-16 flex flex-col space-y-4 p-1"
        >
          {chatMessages.length > 0 ? (
            chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[85%] ${
                  msg.role === "user"
                    ? "self-end bg-primary text-white"
                    : "self-start bg-neutral-700 text-white"
                } rounded-lg py-2 px-4 text-sm`}
              >
                {msg.content}
              </div>
            ))
          ) : (
            // Sample questions shown when no messages exist
            <div className="flex flex-col space-y-3 mt-auto">
              <p className="text-neutral-400 text-sm mb-2">Try asking:</p>
              {SAMPLE_QUESTIONS.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSampleQuestion(question)}
                  className="text-left bg-neutral-800 hover:bg-neutral-700 
                           rounded-lg py-2 px-4 text-neutral-300 text-sm flex items-center focus:outline-none"
                >
                  <span className="mr-2 text-white opacity-70">💬</span>
                  {question}
                </button>
              ))}
            </div>
          )}

          {isLoading && (
            <div className="self-start flex flex-col items-center bg-neutral-800 text-neutral-300 rounded-lg py-2 px-4 text-sm mt-2">
              <div
                className="loader"
                style={{ width: "28px", transform: "scale(0.8)" }}
              ></div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="absolute bottom-5 left-5 right-5">
          <div className="flex items-center relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="w-full bg-neutral-800 border border-neutral-600 
                       rounded-lg py-3 px-4 pr-12 text-white focus:outline-none text-sm"
            />
            <button
              onClick={handleSendMessage}
              disabled={!message.trim() || isLoading}
              className={`absolute right-4 focus:outline-none ${
                message.trim() && !isLoading
                  ? "text-primary"
                  : "text-neutral-500"
              }`}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
