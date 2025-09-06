import { NextRequest, NextResponse } from 'next/server';
import { callOpenRouter, SYSTEM_PROMPTS } from '@/lib/ai/openrouter';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { callId, transcript, duration, outcome, notes } = body;

    if (!callId) {
      return NextResponse.json(
        { error: 'Call ID is required' },
        { status: 400 }
      );
    }

    const userPrompt = `Analyze this sales call and provide a structured summary:

Call ID: ${callId}
Duration: ${duration} seconds
Outcome: ${outcome}
${transcript ? `Transcript: ${transcript}` : ''}
${notes ? `Additional notes: ${notes}` : ''}

Please provide:
1. Brief summary of the conversation
2. Key points discussed
3. Contact's interests or objections mentioned
4. Recommended next steps
5. Overall sentiment (positive/neutral/negative)
6. Priority level for follow-up (high/medium/low)
7. Any action items or commitments made`;

    const response = await callOpenRouter([
      { role: 'system', content: SYSTEM_PROMPTS.callSummary },
      { role: 'user', content: userPrompt }
    ]);

    return NextResponse.json({
      id: `summary_${Date.now()}`,
      callId,
      summary: response,
      actionItems: [],
      sentiment: 'neutral',
      nextSteps: [],
      keyPoints: [],
      createdAt: new Date().toISOString(),
      rawResponse: response
    });

  } catch (error) {
    console.error('Call summary generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate call summary' },
      { status: 500 }
    );
  }
}