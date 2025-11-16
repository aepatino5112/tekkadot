import React, { useState, useEffect } from "react";

type Message = {
  sender: "me" | "other";
  content: string;
  timestamp: string;
};

type ChatWindowProps = {
  chatId: string;
  messages: Message[];
  onSendMessage: (message: string) => void;
  onClose: () => void; // Function to close the modal
};

const ChatWindow: React.FC<ChatWindowProps> = ({
  chatId,
  messages,
  onSendMessage,
  onClose,
}) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  // Prevent scrolling on the background when the modal is open
  useEffect(() => {
    document.documentElement.classList.add("overflow-hidden");
    return () => {
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative max-w-[40rem] w-full mx-auto p-[var(--spacing-300)] rounded-lg bg-white-500 dark:bg-black-800 border border-white-600 dark:border-black-400 overflow-y-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-[var(--spacing-200)]">
          <h2 className="text-lg font-medium text-black-500 dark:text-white-500">
            Conversation
          </h2>
          <button
            className="text-black-500 dark:text-white-500 hover:text-vivid-pink-500 transition-all"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-white-300 dark:bg-black-800 rounded-lg p-[var(--spacing-200)]">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "me" ? "justify-end" : "justify-start"
              } mb-[var(--spacing-100)]`}
            >
              <div
                className={`max-w-[70%] p-[var(--spacing-150)] rounded-lg ${
                  message.sender === "me"
                    ? "bg-vivid-pink-500 text-white"
                    : "bg-white-500 dark:bg-black-500 text-black-500 dark:text-white-500"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs text-white-700 mt-[var(--spacing-50)]">
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-[var(--spacing-100)] mt-[var(--spacing-200)]">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-[var(--spacing-150)] rounded-lg bg-white-300 dark:bg-black-600 text-black-500 dark:text-white-500"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessage}
            className="px-[var(--spacing-200)] py-[var(--spacing-100)] rounded-lg bg-vivid-pink-500 text-white hover:opacity-90 transition-all"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
