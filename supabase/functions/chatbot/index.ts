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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [] } = await req.json();

    const apiKey = Deno.env.get('ANTHROPIC_API_KEY');
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY is not configured');
    }

    // Build messages array with conversation history
    const messages = [
      ...conversationHistory,
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
        model: 'claude-sonnet-4-5-20241022',
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
