// src/utils/chatbotApi.ts
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatOptions {
  conversationHistory?: Message[];
  currentContext?: string;
}

export const sendChatMessage = async (
  userMessage: string,
  options: ChatOptions = {}
): Promise<string> => {
  const { conversationHistory = [], currentContext } = options;
  
  try {
    const { data, error } = await supabase.functions.invoke('chatbot', {
      body: { 
        message: userMessage,
        conversationHistory,
        currentContext
      }
    });

    if (error) {
      throw new Error(error.message || 'Failed to get response');
    }

    if (data.error) {
      throw new Error(data.error);
    }

    return data.response;
  } catch (error) {
    console.error('Chatbot API Error:', error);
    void reportChatbotFailure(error);
    throw error;
  }
};

/**
 * Sends failure detail to the backend so chatbot outages are visible in
 * server-side logs for monitoring. Never throws.
 */
export const reportChatbotFailure = async (error: unknown): Promise<void> => {
  try {
    const detail = error instanceof Error ? error.message : String(error);
    await supabase.functions.invoke('chatbot', {
      body: { clientError: `${detail} | path: ${window.location.pathname}` },
    });
  } catch {
    // Monitoring must never surface to the user.
  }
};
