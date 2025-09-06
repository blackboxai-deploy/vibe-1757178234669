// AI integration types and interfaces

export interface AIConfig {
  provider: 'openrouter';
  model: string;
  endpoint: string;
  headers: Record<string, string>;
  systemPrompt: string;
  temperature?: number;
  maxTokens?: number;
}

export interface VoicemailRequest {
  contactName: string;
  company?: string;
  purpose: string;
  tone: 'professional' | 'friendly' | 'urgent' | 'casual';
  duration: 'short' | 'medium' | 'long';
  customPrompt?: string;
  templateId?: string;
}

export interface VoicemailResponse {
  id: string;
  text: string;
  audioUrl?: string;
  duration: number;
  createdAt: Date;
  contactId: string;
  status: 'generated' | 'processing' | 'ready' | 'failed';
}

export interface CallSummaryRequest {
  callId: string;
  transcript?: string;
  duration: number;
  outcome: string;
  notes?: string;
}

export interface CallSummaryResponse {
  id: string;
  callId: string;
  summary: string;
  actionItems: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  outcome: string;
  nextSteps: string[];
  keyPoints: string[];
  createdAt: Date;
}

export interface AIAnalytics {
  callPatterns: {
    bestCallTimes: string[];
    successfulApproaches: string[];
    commonObjections: string[];
  };
  leadScoring: {
    contactId: string;
    score: number;
    factors: string[];
    recommendation: string;
  }[];
  performanceInsights: {
    strengths: string[];
    improvements: string[];
    trends: string[];
  };
}

export interface SmartDisposition {
  callId: string;
  suggestedDisposition: string;
  confidence: number;
  reasoning: string;
  alternativeOptions: string[];
}