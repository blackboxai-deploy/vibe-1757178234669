// OpenRouter AI API integration

export interface OpenRouterConfig {
  endpoint: string;
  headers: Record<string, string>;
  model: string;
}

export const DEFAULT_OPENROUTER_CONFIG: OpenRouterConfig = {
  endpoint: 'https://oi-server.onrender.com/chat/completions',
  headers: {
    'CustomerId': 'cus_T0O2Xzmsl9EYY5',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer xxx',
  },
  model: 'openrouter/anthropic/claude-sonnet-4',
};

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatCompletionRequest {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
}

export interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export async function callOpenRouter(
  messages: ChatMessage[],
  config: OpenRouterConfig = DEFAULT_OPENROUTER_CONFIG
): Promise<string> {
  const request: ChatCompletionRequest = {
    model: config.model,
    messages,
    temperature: 0.7,
    max_tokens: 2000,
  };

  try {
    const response = await fetch(config.endpoint, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);
    }

    const data: ChatCompletionResponse = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error('No response from OpenRouter API');
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error('OpenRouter API call failed:', error);
    throw error;
  }
}

// System prompts for different AI features
export const SYSTEM_PROMPTS = {
  voicemail: `You are an expert at creating professional, engaging voicemail scripts. 
    Generate personalized voicemail messages that are:
    - Professional yet friendly
    - Concise (30-60 seconds when spoken)
    - Personalized to the contact and company
    - Include a clear call-to-action
    - Sound natural and conversational`,
    
  callSummary: `You are an expert at analyzing sales call conversations and creating structured summaries.
    For each call transcript, provide:
    - Brief summary of the conversation
    - Key points discussed
    - Contact's interests or objections
    - Recommended next steps
    - Overall sentiment (positive/neutral/negative)
    - Priority level for follow-up`,
    
  leadScoring: `You are an AI lead scoring specialist. Analyze contact information and interaction history to:
    - Score leads from 1-100 based on likelihood to convert
    - Identify key qualifying factors
    - Suggest personalized outreach strategies
    - Recommend optimal contact timing
    - Flag high-priority prospects`,
}