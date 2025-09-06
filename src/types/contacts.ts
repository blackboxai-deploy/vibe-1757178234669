// Contact and lead management types

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber: string;
  company?: string;
  title?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  tags: string[];
  priority: 'low' | 'medium' | 'high';
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed' | 'dnc';
  source?: string;
  notes?: string;
  customFields?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  lastContactedAt?: Date;
  callHistory: string[]; // Array of call session IDs
}

export interface ContactList {
  id: string;
  name: string;
  description?: string;
  contacts: Contact[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  totalContacts: number;
  completedContacts: number;
}

export interface ContactFilter {
  search?: string;
  tags?: string[];
  priority?: ('low' | 'medium' | 'high')[];
  status?: ('new' | 'contacted' | 'qualified' | 'converted' | 'closed' | 'dnc')[];
  company?: string;
  source?: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
}

export interface ContactImport {
  file: File;
  mapping: Record<string, string>;
  duplicateHandling: 'skip' | 'update' | 'create';
  listId?: string;
  tags?: string[];
}

export interface ContactExport {
  format: 'csv' | 'xlsx' | 'json';
  filters?: ContactFilter;
  fields: string[];
  includeCallHistory: boolean;
}