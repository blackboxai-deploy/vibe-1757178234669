'use client';

import { Layout } from '@/components/layout/Layout';
import { ContactList } from '@/components/contacts/ContactList';
import { CSVUpload } from '@/components/contacts/CSVUpload';
import { VoicemailGenerator } from '@/components/ai/VoicemailGenerator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ContactsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Management</h1>
          <p className="text-gray-600 mt-2">
            Manage your leads, import contacts, and generate AI-powered voicemails
          </p>
        </div>

        <Tabs defaultValue="contacts" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="contacts">Contact List</TabsTrigger>
            <TabsTrigger value="import">Import Contacts</TabsTrigger>
            <TabsTrigger value="voicemail">AI Voicemail</TabsTrigger>
          </TabsList>
          
          <TabsContent value="contacts" className="mt-6">
            <ContactList />
          </TabsContent>
          
          <TabsContent value="import" className="mt-6">
            <CSVUpload />
          </TabsContent>
          
          <TabsContent value="voicemail" className="mt-6">
            <VoicemailGenerator />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}