'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { callOpenRouter, SYSTEM_PROMPTS } from '@/lib/ai/openrouter';

interface VoicemailRequest {
  contactName: string;
  company: string;
  purpose: string;
  tone: 'professional' | 'friendly' | 'urgent' | 'casual';
  duration: 'short' | 'medium' | 'long';
  customPrompt?: string;
}

export function VoicemailGenerator() {
  const [request, setRequest] = useState<VoicemailRequest>({
    contactName: '',
    company: '',
    purpose: '',
    tone: 'professional',
    duration: 'medium',
  });
  const [generatedVoicemail, setGeneratedVoicemail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [systemPrompt, setSystemPrompt] = useState(SYSTEM_PROMPTS.voicemail);

  const handleGenerate = async () => {
    if (!request.contactName || !request.purpose) {
      setError('Please fill in contact name and purpose');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const durationGuide = {
        short: '20-30 seconds',
        medium: '45-60 seconds',
        long: '60-90 seconds'
      };

      const userPrompt = `Generate a ${request.tone} voicemail for:
Contact: ${request.contactName}${request.company ? ` from ${request.company}` : ''}
Purpose: ${request.purpose}
Duration: ${durationGuide[request.duration]}
Tone: ${request.tone}

${request.customPrompt ? `Additional instructions: ${request.customPrompt}` : ''}

Please generate a natural, engaging voicemail script that would be effective for this contact.`;

      const response = await callOpenRouter([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]);

      setGeneratedVoicemail(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate voicemail');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedVoicemail);
  };

  return (
    <div className="space-y-6">
      {/* System Prompt Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>AI System Prompt</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Label htmlFor="system-prompt">
              Customize the AI behavior for voicemail generation:
            </Label>
            <Textarea
              id="system-prompt"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              rows={4}
              className="font-mono text-sm"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSystemPrompt(SYSTEM_PROMPTS.voicemail)}
            >
              Reset to Default
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Voicemail Generation Form */}
      <Card>
        <CardHeader>
          <CardTitle>Generate AI Voicemail</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact-name">Contact Name *</Label>
              <Input
                id="contact-name"
                value={request.contactName}
                onChange={(e) => setRequest({ ...request, contactName: e.target.value })}
                placeholder="John Smith"
              />
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={request.company}
                onChange={(e) => setRequest({ ...request, company: e.target.value })}
                placeholder="Tech Corp"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="purpose">Purpose/Message *</Label>
            <Textarea
              id="purpose"
              value={request.purpose}
              onChange={(e) => setRequest({ ...request, purpose: e.target.value })}
              placeholder="Following up on our previous conversation about your sales automation needs..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tone">Tone</Label>
              <Select value={request.tone} onValueChange={(value: any) => setRequest({ ...request, tone: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="duration">Duration</Label>
              <Select value={request.duration} onValueChange={(value: any) => setRequest({ ...request, duration: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short (20-30s)</SelectItem>
                  <SelectItem value="medium">Medium (45-60s)</SelectItem>
                  <SelectItem value="long">Long (60-90s)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="custom-prompt">Additional Instructions (Optional)</Label>
            <Textarea
              id="custom-prompt"
              value={request.customPrompt || ''}
              onChange={(e) => setRequest({ ...request, customPrompt: e.target.value })}
              placeholder="Any specific points to mention or style preferences..."
              rows={2}
            />
          </div>

          {error && (
            <Alert>
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !request.contactName || !request.purpose}
            className="w-full"
          >
            {isGenerating ? 'Generating...' : 'Generate AI Voicemail'}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Voicemail */}
      {generatedVoicemail && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Generated Voicemail</CardTitle>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">Ready</Badge>
                <Button variant="outline" size="sm" onClick={handleCopyToClipboard}>
                  Copy to Clipboard
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="whitespace-pre-wrap text-gray-900">
                {generatedVoicemail}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <span>Estimated reading time: ~{Math.ceil(generatedVoicemail.split(' ').length / 150 * 60)}s</span>
              <span>{generatedVoicemail.split(' ').length} words</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}