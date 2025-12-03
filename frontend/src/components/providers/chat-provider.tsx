'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './auth-provider';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatContextType {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const createDefaultMessage = (): Message => ({
  id: Date.now().toString(),
  role: 'assistant',
  content: "Hi! I'm your event assistant. How can I help you today?",
  timestamp: new Date(),
});

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([createDefaultMessage()]);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const clearChat = () => {
    setMessages([createDefaultMessage()]);
  };

  useEffect(() => {
    clearChat();    
  }, [user?.userId]);

  return (
    <ChatContext.Provider value={{ messages, setMessages, isOpen, setIsOpen, clearChat }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
