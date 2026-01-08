import React, { createContext, useContext, useState, useCallback, ReactNode, Suspense, lazy } from "react";

const Chatbot = lazy(() => import("./Chatbot"));

interface ChatbotContextType {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openChat = useCallback(() => setIsOpen(true), []);
  const closeChat = useCallback(() => setIsOpen(false), []);
  const toggleChat = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <ChatbotContext.Provider value={{ isOpen, openChat, closeChat, toggleChat }}>
      {children}
      <Suspense fallback={null}>
        <Chatbot isOpen={isOpen} onClose={closeChat} />
      </Suspense>
    </ChatbotContext.Provider>
  );
}

export function useChatbot() {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error("useChatbot must be used within a ChatbotProvider");
  }
  return context;
}
