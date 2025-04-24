import React, { useState, useCallback } from "react";
import ChatIcon from "./ChatIcon";
import ChatPanel from "./ChatPanel";

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <ChatIcon onClick={handleToggle} isOpen={isOpen} />
      <ChatPanel isOpen={isOpen} onClose={handleClose} />
    </>
  );
};

export default AIChat;
