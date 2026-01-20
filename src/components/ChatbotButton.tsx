import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { ConsumerDutyChatbot } from './ConsumerDutyChatbot';
import { Button } from '@/components/ui/button';

export const ChatbotButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating trigger button - positioned to avoid mobile navigation */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg hover:shadow-xl 
                  transition-all z-40"
        aria-label="Open Consumer Duty Assistant"
        title="Consumer Duty Assistant"
      >
        <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>

      {/* Chatbot modal */}
      <ConsumerDutyChatbot isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ChatbotButton;
