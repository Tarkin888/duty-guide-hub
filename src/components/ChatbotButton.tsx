import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { ConsumerDutyChatbot } from './ConsumerDutyChatbot';
import { Button } from '@/components/ui/button';

export const ChatbotButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating trigger button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg hover:shadow-xl 
                  transition-all z-40"
        aria-label="Open Consumer Duty Assistant"
        title="Consumer Duty Assistant"
      >
        <MessageCircle size={24} />
      </Button>

      {/* Chatbot modal */}
      <ConsumerDutyChatbot isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ChatbotButton;
