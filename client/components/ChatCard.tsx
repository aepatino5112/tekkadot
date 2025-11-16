import React from "react";

type ChatCardProps = {
  id: string;
  title: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  onClick: () => void;
};

const ChatCard: React.FC<ChatCardProps> = ({
  title,
  lastMessage,
  lastMessageTime,
  unreadCount,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex items-center justify-between p-[var(--spacing-200)] rounded-lg bg-white-400 dark:bg-black-800 border border-white-600 dark:border-black-400 hover:bg-black-100 transition-all"
    >
      <div className="flex items-center gap-[var(--spacing-200)]">
        <div className="w-10 h-10 rounded-full bg-white-600 dark:bg-black-800 flex items-center justify-center">
          {/* Placeholder for user avatar */}
          <span className="text-white-500 dark:text-white-700 text-lg">👤</span>
        </div>
        <div>
          <h4 className="text-lg font-medium text-black-500 dark:text-white-500">{title}</h4>
          <p className="text-sm text-white-700">{lastMessage}</p>
          <p className="text-xs text-white-700">{lastMessageTime}</p>
        </div>
      </div>
      {unreadCount > 0 && (
        <div className="w-6 h-6 rounded-full bg-vivid-pink-500 text-white flex items-center justify-center text-sm font-bold">
          {unreadCount}
        </div>
      )}
    </div>
  );
};

export default ChatCard;
