import { NextRequest, NextResponse } from 'next/server';
import { callOpenRouter, SYSTEM_PROMPTS } from '@/lib/ai/openrouter';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contactName, company, purpose, tone, duration, customPrompt } = body;

    if (!contactName || !purpose) {
      return NextResponse.json(
        { error: 'Contact name and purpose are required' },
        { status: 400 }
      );
    }

    const durationGuide = {
      short: '20-30 seconds',
      medium: '45-60 seconds',
      long: '60-90 seconds'
    };

    const userPrompt = `Generate a ${tone} voicemail for:
Contact: ${contactName}${company ? ` from ${company}` : ''}
Purpose: ${purpose}
Duration: ${durationGuide[duration as keyof typeof durationGuide] || '45-60 seconds'}
Tone: ${tone}

${customPrompt ? `Additional instructions: ${customPrompt}` : ''}

Please generate a natural, engaging voicemail script that would be effective for this contact.`;

    const response = await callOpenRouter([
      { role: 'system', content: SYSTEM_PROMPTS.voicemail },
      { role: 'user', content: userPrompt }
    ]);

    return NextResponse.json({
      id: `vm_${Date.now()}`,
      text: response,
      contactName,
      company,
      createdAt: new Date().toISOString(),
      status: 'generated'
    });

  } catch (error) {
    console.error('Voicemail generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate voicemail' },
      { status: 500 }
    );
  }
}