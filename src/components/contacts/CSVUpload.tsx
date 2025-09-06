'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useContacts } from '@/contexts/ContactsContext';

interface CSVUploadStatus {
  status: 'idle' | 'uploading' | 'processing' | 'completed' | 'error';
  message: string;
  progress: number;
  processedCount?: number;
  totalCount?: number;
}

export function CSVUpload() {
  const { importContacts } = useContacts();
  const [uploadStatus, setUploadStatus] = useState<CSVUploadStatus>({
    status: 'idle',
    message: '',
    progress: 0,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      setUploadStatus({
        status: 'error',
        message: 'Please select a CSV file',
        progress: 0,
      });
      return;
    }

    setUploadStatus({
      status: 'uploading',
      message: 'Reading CSV file...',
      progress: 25,
    });

    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      
      if (lines.length < 2) {
        throw new Error('CSV file must contain at least a header row and one data row');
      }

      setUploadStatus({
        status: 'processing',
        message: 'Processing contacts...',
        progress: 50,
      });

      // Parse CSV headers
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
      const dataRows = lines.slice(1);

      // Map CSV columns to contact properties
      const contacts = dataRows.map((row, index) => {
        const values = row.split(',').map(v => v.trim().replace(/"/g, ''));
        const contact: any = {
          id: `imported_${Date.now()}_${index}`,
          firstName: '',
          lastName: '',
          phoneNumber: '',
          email: '',
          company: '',
          title: '',
          tags: ['imported'],
          priority: 'medium' as const,
          status: 'new' as const,
          source: 'CSV Import',
          createdAt: new Date(),
          updatedAt: new Date(),
          callHistory: [],
        };

        // Map common field names
        headers.forEach((header, headerIndex) => {
          const value = values[headerIndex] || '';
          const lowerHeader = header.toLowerCase();
          
          if (lowerHeader.includes('first') && lowerHeader.includes('name')) {
            contact.firstName = value;
          } else if (lowerHeader.includes('last') && lowerHeader.includes('name')) {
            contact.lastName = value;
          } else if (lowerHeader.includes('phone') || lowerHeader.includes('mobile')) {
            contact.phoneNumber = value;
          } else if (lowerHeader.includes('email')) {
            contact.email = value;
          } else if (lowerHeader.includes('company') || lowerHeader.includes('organization')) {
            contact.company = value;
          } else if (lowerHeader.includes('title') || lowerHeader.includes('position')) {
            contact.title = value;
          }
        });

        return contact;
      });

      // Filter out contacts without required fields
      const validContacts = contacts.filter(contact => 
        contact.firstName && contact.lastName && contact.phoneNumber
      );

      setUploadStatus({
        status: 'processing',
        message: 'Importing contacts...',
        progress: 75,
        processedCount: validContacts.length,
        totalCount: dataRows.length,
      });

      // Import contacts
      importContacts(validContacts);

      setUploadStatus({
        status: 'completed',
        message: `Successfully imported ${validContacts.length} contacts`,
        progress: 100,
        processedCount: validContacts.length,
        totalCount: dataRows.length,
      });

    } catch (error) {
      setUploadStatus({
        status: 'error',
        message: error instanceof Error ? error.message : 'Failed to process CSV file',
        progress: 0,
      });
    }
  };

  const resetUpload = () => {
    setUploadStatus({
      status: 'idle',
      message: '',
      progress: 0,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getStatusColor = (status: CSVUploadStatus['status']) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'uploading':
      case 'processing': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Import Contacts from CSV</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Area */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="csv-file">Select CSV File</Label>
            <Input
              id="csv-file"
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              disabled={uploadStatus.status === 'uploading' || uploadStatus.status === 'processing'}
              ref={fileInputRef}
              className="mt-1"
            />
          </div>

          {/* Expected Format */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Expected CSV Format</h4>
            <p className="text-sm text-blue-700 mb-2">
              Your CSV should include these columns (column names are flexible):
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-blue-600">
              <div>• First Name (required)</div>
              <div>• Last Name (required)</div>
              <div>• Phone Number (required)</div>
              <div>• Email</div>
              <div>• Company</div>
              <div>• Title/Position</div>
            </div>
          </div>
        </div>

        {/* Upload Status */}
        {uploadStatus.status !== 'idle' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium ${getStatusColor(uploadStatus.status)}`}>
                {uploadStatus.message}
              </span>
              <Badge variant={uploadStatus.status === 'completed' ? 'default' : 'secondary'}>
                {uploadStatus.status}
              </Badge>
            </div>

            {(uploadStatus.status === 'uploading' || uploadStatus.status === 'processing') && (
              <Progress value={uploadStatus.progress} className="w-full" />
            )}

            {uploadStatus.processedCount !== undefined && uploadStatus.totalCount !== undefined && (
              <div className="text-sm text-gray-600">
                Processed {uploadStatus.processedCount} of {uploadStatus.totalCount} rows
              </div>
            )}

            {uploadStatus.status === 'error' && (
              <Alert>
                <AlertDescription>{uploadStatus.message}</AlertDescription>
              </Alert>
            )}

            {uploadStatus.status === 'completed' && (
              <Alert>
                <AlertDescription className="text-green-700">
                  {uploadStatus.message}
                </AlertDescription>
              </Alert>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={resetUpload}
              disabled={uploadStatus.status === 'uploading' || uploadStatus.status === 'processing'}
            >
              Upload Another File
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}