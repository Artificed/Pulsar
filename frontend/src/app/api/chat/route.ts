import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

const SYSTEM_PROMPT = `You are Pulsar AI, a friendly and helpful event assistant for the Pulsar planetarium and cosmic event platform. 

Your role is to help users with:
- Finding and recommending events (planetarium shows, space exhibitions, stargazing nights, etc.)
- Answering questions about event details, schedules, and venues
- Helping with booking information and ticket availability
- Providing information about astronomy and space-related topics
- General customer support for the platform

Keep your responses concise, friendly, and helpful. Use a warm, enthusiastic tone that matches the cosmic theme of the platform. If you don't know something specific about an event, suggest the user check the event details page or contact support.`;

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const chatHistory = history?.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    })) || [];

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: SYSTEM_PROMPT }],
        },
        {
          role: 'model',
          parts: [{ text: 'Understood! I am Pulsar AI, your cosmic event assistant. I\'m here to help you discover amazing planetarium shows, space exhibitions, and stargazing events. How can I assist you today?' }],
        },
        ...chatHistory,
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error('Gemini API error:', error);
    return NextResponse.json(
      { error: 'Failed to get response from AI' },
      { status: 500 }
    );
  }
}
