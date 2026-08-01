import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, MessageCircle, Bot, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { sendChatMessage } from '@/utils/chatbotApi';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getModuleByPath, RESOURCE_ROUTE_CONFIG } from '@/config/routes';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ConsumerDutyChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

// Get human-readable context from current route
function getCurrentContext(pathname: string): string | undefined {
  const module = getModuleByPath(pathname);
  if (module) {
    return `${module.code} - ${module.title} (${module.category} phase)`;
  }
  
  const resource = RESOURCE_ROUTE_CONFIG.find(r => r.path === pathname);
  if (resource) {
    return `${resource.title}${resource.description ? ` - ${resource.description}` : ''}`;
  }
  
  return undefined;
}

// Strict allow-list for rendering AI-generated content
const chatbotSanitizeConfig = {
  ALLOWED_TAGS: ['strong', 'em', 'code', 'br'],
  ALLOWED_ATTR: ['class'],
  ALLOW_DATA_ATTR: false,
};

// Escape any HTML present in the model output before applying markdown formatting
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Format message content with basic markdown-like parsing
function formatMessageContent(content: string): React.ReactNode {
  // Split by double newlines for paragraphs
  const paragraphs = content.split(/\n\n+/);
  
  return paragraphs.map((paragraph, pIndex) => {
    // Check for bullet points
    const lines = paragraph.split('\n');
    const isBulletList = lines.every(line => line.trim().startsWith('-') || line.trim().startsWith('•') || line.trim() === '');
    
    if (isBulletList && lines.some(line => line.trim().startsWith('-') || line.trim().startsWith('•'))) {
      return (
        <ul key={pIndex} className="list-disc list-inside space-y-1 my-2">
          {lines.filter(line => line.trim()).map((line, lIndex) => (
            <li key={lIndex} className="text-sm">
              {line.replace(/^[-•]\s*/, '')}
            </li>
          ))}
        </ul>
      );
    }
    
    // Regular paragraph with inline formatting (HTML escaped first, then sanitised)
    const formattedText = escapeHtml(paragraph)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`(.*?)`/g, '<code class="bg-muted px-1 rounded text-xs">$1</code>');

    const safeHtml = DOMPurify.sanitize(formattedText, chatbotSanitizeConfig);

    return (
      <p 
        key={pIndex} 
        className="mb-2 last:mb-0"
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />
    );
  });
}

export const ConsumerDutyChatbot: React.FC<ConsumerDutyChatbotProps> = ({
  isOpen,
  onClose,
}) => {
  const location = useLocation();
  
  const initialMessage: Message = {
    id: '0',
    role: 'assistant',
    content:
      "Hello! I'm your Consumer Duty Compliance Assistant. I can help you navigate the playbook, explain Consumer Duty requirements, and provide implementation guidance.\n\nWhat would you like to know? You can ask me about specific modules, templates, or how to get started with your implementation.",
    timestamp: new Date(),
  };

  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset chat when closed
  useEffect(() => {
    if (!isOpen) {
      setMessages([{ ...initialMessage, timestamp: new Date() }]);
      setInput('');
      setError(null);
    }
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      // Build conversation history for context
      const conversationHistory = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      // Get current page context
      const currentContext = getCurrentContext(location.pathname);

      const response = await sendChatMessage(currentInput, {
        conversationHistory,
        currentContext,
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to get response. Please try again.';
      setError(errorMessage);

      const errorMsg: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: `I apologise, but I encountered an error: ${errorMessage}. Please try again or contact support if the issue persists.`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Quick action suggestions
  const quickActions = [
    "How should I start?",
    "What is CD-F1?",
    "Explain the four outcomes",
  ];

  const handleQuickAction = (action: string) => {
    setInput(action);
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-4 sm:inset-auto sm:bottom-4 sm:right-4 sm:w-[420px] sm:h-[560px] max-h-[calc(100vh-2rem)] bg-background border border-border rounded-xl shadow-2xl flex flex-col z-50"
      role="dialog"
      aria-label="Consumer Duty Assistant Chat"
      aria-modal="true"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-semibold text-sm">Consumer Duty Assistant</h2>
            <p className="text-xs opacity-80">Playbook guidance & compliance help</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
          aria-label="Close chat"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex gap-2',
              message.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            {message.role === 'assistant' && (
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bot className="h-4 w-4 text-primary" />
              </div>
            )}
            <div
              className={cn(
                'max-w-[85%] rounded-lg px-4 py-3 text-sm',
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground'
              )}
            >
              {message.role === 'assistant' 
                ? formatMessageContent(message.content)
                : message.content
              }
            </div>
            {message.role === 'user' && (
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex gap-2 justify-start">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Bot className="h-4 w-4 text-primary" />
            </div>
            <div className="bg-muted rounded-lg px-4 py-3 flex items-center gap-1">
              <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        {/* Error display */}
        {error && !isLoading && (
          <div className="text-xs text-destructive text-center px-4 py-2 bg-destructive/10 rounded-lg">
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions (only show if just started) */}
      {messages.length === 1 && !isLoading && (
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          {quickActions.map((action) => (
            <button
              key={action}
              onClick={() => handleQuickAction(action)}
              className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 text-foreground transition-colors"
            >
              {action}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Consumer Duty..."
            disabled={isLoading}
            className="flex-1 border border-input rounded-lg px-3 py-2.5 text-sm
                      focus:outline-none focus:ring-2 focus:ring-ring 
                      disabled:opacity-50 bg-background"
            aria-label="Type your message"
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            aria-label="Send message"
            className="h-10 w-10"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ConsumerDutyChatbot;
