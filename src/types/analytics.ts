// Analytics and reporting types

export interface CallMetrics {
  totalCalls: number;
  connectedCalls: number;
  voicemails: number;
  busySignals: number;
  noAnswers: number;
  connectionRate: number;
  averageCallDuration: number;
  callsPerHour: number;
  conversionRate: number;
}

export interface AgentPerformance {
  agentId: string;
  agentName: string;
  metrics: CallMetrics;
  totalTalkTime: number;
  averageCallDuration: number;
  callsCompleted: number;
  successfulConnections: number;
  leadConversions: number;
  rating: number;
  trends: {
    daily: number[];
    weekly: number[];
    monthly: number[];
  };
}

export interface CampaignAnalytics {
  campaignId: string;
  campaignName: string;
  startDate: Date;
  endDate?: Date;
  totalContacts: number;
  contactsReached: number;
  successfulConnections: number;
  conversions: number;
  roi: number;
  costPerLead: number;
  conversionsBySource: Record<string, number>;
  timeBasedMetrics: {
    date: string;
    calls: number;
    connections: number;
    conversions: number;
  }[];
}

export interface RealtimeMetrics {
  timestamp: Date;
  activeCalls: number;
  queuedCalls: number;
  availableAgents: number;
  callsInProgress: number;
  callsCompleted: number;
  currentConnectionRate: number;
  averageWaitTime: number;
}

export interface AnalyticsReport {
  id: string;
  name: string;
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  dateRange: {
    from: Date;
    to: Date;
  };
  filters: {
    agents?: string[];
    campaigns?: string[];
    dispositions?: string[];
  };
  data: {
    overview: CallMetrics;
    agents: AgentPerformance[];
    campaigns: CampaignAnalytics[];
    trends: {
      calls: { date: string; value: number }[];
      connections: { date: string; value: number }[];
      conversions: { date: string; value: number }[];
    };
  };
  createdAt: Date;
  exportUrl?: string;
}