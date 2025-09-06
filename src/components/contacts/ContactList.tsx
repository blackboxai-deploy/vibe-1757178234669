'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useContacts } from '@/contexts/ContactsContext';
import { Contact } from '@/types/contacts';

export function ContactList() {
  const { state, selectContacts } = useContacts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Mock contacts for demonstration
  const mockContacts: Contact[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@techcorp.com',
      phoneNumber: '+1-555-0123',
      company: 'Tech Corp',
      title: 'Sales Manager',
      tags: ['prospect', 'high-value'],
      priority: 'high',
      status: 'new',
      source: 'Website',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
      callHistory: [],
    },
    {
      id: '2',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.j@marketing.com',
      phoneNumber: '+1-555-0124',
      company: 'Marketing Inc',
      title: 'Marketing Director',
      tags: ['warm-lead', 'decision-maker'],
      priority: 'medium',
      status: 'contacted',
      source: 'Referral',
      createdAt: new Date('2024-01-14'),
      updatedAt: new Date('2024-01-16'),
      lastContactedAt: new Date('2024-01-16'),
      callHistory: ['call1'],
    },
    {
      id: '3',
      firstName: 'Mike',
      lastName: 'Wilson',
      email: 'mike.wilson@salesltd.com',
      phoneNumber: '+1-555-0125',
      company: 'Sales Ltd',
      title: 'VP Sales',
      tags: ['qualified', 'callback'],
      priority: 'high',
      status: 'qualified',
      source: 'LinkedIn',
      createdAt: new Date('2024-01-13'),
      updatedAt: new Date('2024-01-17'),
      lastContactedAt: new Date('2024-01-17'),
      callHistory: ['call2', 'call3'],
    },
  ];

  const contacts = state.contacts.length > 0 ? state.contacts : mockContacts;

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || contact.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleContactSelect = (contactId: string, checked: boolean) => {
    const current = state.selectedContacts;
    if (checked) {
      selectContacts([...current, contactId]);
    } else {
      selectContacts(current.filter(id => id !== contactId));
    }
  };

  const handleSelectAll = () => {
    const allIds = filteredContacts.map(c => c.id);
    selectContacts(allIds);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-purple-100 text-purple-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      case 'converted': return 'bg-emerald-100 text-emerald-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'dnc': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Contact List</CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">
              {filteredContacts.length} contacts
            </Badge>
            <Badge variant="outline">
              {state.selectedContacts.length} selected
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="converted">Converted</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
              <SelectItem value="dnc">DNC</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={handleSelectAll}>
            Select All
          </Button>
        </div>

        {/* Contact List */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50"
            >
              <Checkbox
                checked={state.selectedContacts.includes(contact.id)}
                onCheckedChange={(checked) => 
                  handleContactSelect(contact.id, checked as boolean)
                }
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">
                      {contact.firstName} {contact.lastName}
                    </span>
                    <Badge className={getPriorityColor(contact.priority)}>
                      {contact.priority}
                    </Badge>
                    <Badge className={getStatusColor(contact.status)}>
                      {contact.status}
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-500">
                    {contact.phoneNumber}
                  </span>
                </div>
                
                <div className="flex items-center justify-between mt-1">
                  <div className="text-sm text-gray-600">
                    {contact.company} • {contact.title}
                  </div>
                  <div className="flex items-center space-x-1">
                    {contact.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {contact.lastContactedAt && (
                  <div className="text-xs text-gray-500 mt-1">
                    Last contacted: {contact.lastContactedAt.toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredContacts.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No contacts found matching your criteria
          </div>
        )}
      </CardContent>
    </Card>
  );
}