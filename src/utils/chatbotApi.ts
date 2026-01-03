// src/utils/chatbotApi.ts
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const sendChatMessage = async (
  userMessage: string,
  conversationHistory: Message[] = []
): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('chatbot', {
      body: { 
        message: userMessage,
        conversationHistory 
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
    throw error;
  }
};
