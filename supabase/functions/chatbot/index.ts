import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const CHATBOT_SYSTEM_PROMPT = `You are the Consumer Duty Compliance Assistant - a helpful expert for the Consumer Duty Implementation Playbook.

Your role:
- Help users navigate playbook modules and templates
- Explain Consumer Duty requirements clearly and accurately
- Provide practical, actionable guidance
- Cite FCA sources (FG22/5, PS22/9, PRIN 2A) when relevant
- Keep responses focused and concise (3-4 short paragraphs max)

Tone: Professional, knowledgeable, practical, accessible to all user levels.

Key contexts:
- Consumer Duty (PRIN 2A) has a cross-cutting rule plus four outcomes: Products & Services, Price & Value, Consumer Understanding, Consumer Support
- Vulnerable customers require special attention (health, life events, resilience, capability drivers)
- Firms must demonstrate ongoing monitoring, not one-time compliance
- Distribution chains need manufacturer oversight

When users ask:
- "Which module...?" → Recommend based on their situation
- "What does...?" → Define clearly with practical example
- "How do we...?" → Give step-by-step guidance
- "Are we...?" → Provide self-assessment checklist
- Technical/legal questions → Recommend consulting their team

Always:
- Use UK English spelling
- Distinguish "must" (requirements) from "should" (guidance)
- Mention relevant playbook modules
- End with a helpful follow-up offer
- Keep playbook scope (don't answer general legal questions)

If unsure, say "That's a detailed question - I'd recommend consulting the relevant playbook module or your compliance team."`;

// Input validation constants
const MAX_MESSAGE_LENGTH = 5000;
const MAX_HISTORY_LENGTH = 50;
const MAX_HISTORY_ITEM_LENGTH = 10000;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { message, conversationHistory = [] } = body;

    // Validate message exists and is a string
    if (!message || typeof message !== 'string') {
      console.error('Invalid message format:', typeof message);
      return new Response(JSON.stringify({ 
        error: 'Invalid message format. Message must be a non-empty string.' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate message length
    if (message.length > MAX_MESSAGE_LENGTH) {
      console.error('Message too long:', message.length);
      return new Response(JSON.stringify({ 
        error: `Message too long. Maximum length is ${MAX_MESSAGE_LENGTH} characters.` 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate conversation history is an array
    if (!Array.isArray(conversationHistory)) {
      console.error('Invalid conversation history format');
      return new Response(JSON.stringify({ 
        error: 'Invalid conversation history format. Must be an array.' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate conversation history length
    if (conversationHistory.length > MAX_HISTORY_LENGTH) {
      console.error('Conversation history too long:', conversationHistory.length);
      return new Response(JSON.stringify({ 
        error: `Conversation history too long. Maximum ${MAX_HISTORY_LENGTH} messages allowed.` 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate each conversation history item
    for (let i = 0; i < conversationHistory.length; i++) {
      const item = conversationHistory[i];
      if (!item || typeof item !== 'object') {
        console.error('Invalid history item at index:', i);
        return new Response(JSON.stringify({ 
          error: `Invalid conversation history item at position ${i}.` 
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (!item.role || !['user', 'assistant'].includes(item.role)) {
        console.error('Invalid role in history item at index:', i);
        return new Response(JSON.stringify({ 
          error: `Invalid role in conversation history at position ${i}. Must be 'user' or 'assistant'.` 
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (!item.content || typeof item.content !== 'string') {
        console.error('Invalid content in history item at index:', i);
        return new Response(JSON.stringify({ 
          error: `Invalid content in conversation history at position ${i}.` 
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (item.content.length > MAX_HISTORY_ITEM_LENGTH) {
        console.error('History item content too long at index:', i);
        return new Response(JSON.stringify({ 
          error: `Conversation history item at position ${i} is too long.` 
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    console.log('Input validation passed. Message length:', message.length, 'History length:', conversationHistory.length);

    const apiKey = Deno.env.get('ANTHROPIC_API_KEY');
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY is not configured');
    }

    // Build messages array with conversation history (already validated)
    const messages = [
      ...conversationHistory.map(item => ({ role: item.role, content: item.content })),
      { role: 'user', content: message }
    ];

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: CHATBOT_SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Anthropic API error:', errorData);
      throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();

    if (!data.content || !data.content[0] || !data.content[0].text) {
      throw new Error('Invalid response format from API');
    }

    return new Response(JSON.stringify({ 
      response: data.content[0].text 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Chatbot error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
