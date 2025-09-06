// Core dialer types and interfaces

export type DialingMode = 'power' | 'parallel' | 'predictive' | 'ringless';

export type CallStatus = 
  | 'idle'
  | 'dialing'
  | 'ringing'
  | 'connected'
  | 'on-hold'
  | 'disconnected'
  | 'failed'
  | 'voicemail'
  | 'busy'
  | 'no-answer';

export type CallDisposition = 
  | 'answered'
  | 'voicemail'
  | 'busy'
  | 'no-answer'
  | 'invalid'
  | 'callback'
  | 'dnc'
  | 'sale'
  | 'not-interested';

export interface CallSession {
  id: string;
  contactId: string;
  phoneNumber: string;
  status: CallStatus;
  disposition?: CallDisposition;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  recordingUrl?: string;
  summary?: string;
  notes?: string;
  agentId: string;
}

export interface DialerConfig {
  mode: DialingMode;
  simultaneousCalls: number;
  callTimeout: number;
  retryAttempts: number;
  retryDelay: number;
  enableRecording: boolean;
  enableVoicemail: boolean;
  predictiveFilters: {
    filterVoicemail: boolean;
    filterBusy: boolean;
    filterNoAnswer: boolean;
  };
}

export interface CallMetrics {
  totalCalls: number;
  connectedCalls: number;
  voicemails: number;
  busySignals: number;
  noAnswers: number;
  connectionRate: number;
  averageCallDuration: number;
  callsPerHour: number;
}

export interface DialerState {
  isActive: boolean;
  currentMode: DialingMode;
  activeCalls: CallSession[];
  callQueue: string[];
  metrics: CallMetrics;
  config: DialerConfig;
}