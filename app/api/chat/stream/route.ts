import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';
import { getMakeableRecipes, Recipe } from '@/data/recipes';
import { buildSystemPrompt, buildUserContext, UserPreferences } from '@/lib/prompts';
import { parseResponseIntoCard } from '@/lib/parser';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      message,
      inventory,
      recentlyMade = [],
      preferences = {
        bitter: 0.7, sweet: 0.5, citrus: 0.8,
        herbal: 0.7, smoky: 0.5, spicy: 0.3, strength: 0.7
      },
      conversationHistory = [],
      recommendedThisSession = [],
      userName
    } = body;

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400, headers: { 'Content-Type': 'application/json' }
      });
    }

    const makeableRecipes = getMakeableRecipes(inventory || []);

    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric', minute: '2-digit', hour12: true
    });

    const systemPrompt = buildSystemPrompt({
      inventory: inventory || [],
      makeableRecipes,
      userPreferences: preferences as UserPreferences,
      recentlyMade,
      currentTime,
      conversationHistory,
      sessionMemory: {
        recommendedThisSession,
        feedbackReceived: [],
        topicsDiscussed: []
      },
      userName,
    });

    const userContext = buildUserContext(
      message, inventory || [], makeableRecipes, recentlyMade,
      preferences as UserPreferences, conversationHistory, recommendedThisSession,
      userName,
    );

    const messages: Array<{ role: 'user' | 'assistant'; content: string }> = [];
    const recentHistory = conversationHistory.slice(-6);
    for (const msg of recentHistory) {
      messages.push({ role: msg.role, content: msg.content });
    }
    messages.push({ role: 'user', content: userContext });

    const stream = await anthropic.messages.stream({
      model: 'claude-sonnet-4-5',
      max_tokens: 2000,
      system: [
        {
          type: 'text',
          text: systemPrompt,
          cache_control: { type: 'ephemeral' }
        }
      ],
      messages
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        let fullText = '';
        let introDone = false;
        let introBuffer = '';

        for await (const event of stream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            const text = event.delta.text;
            fullText += text;

            // Stream only the intro (before SPEC:)
            if (!introDone) {
              const prevLen = introBuffer.length;
              introBuffer += text;
              const specIdx = introBuffer.indexOf('SPEC:');
              if (specIdx !== -1) {
                // Only send the slice of the current chunk that falls before SPEC: —
                // everything before this chunk was already sent as individual deltas.
                const tail = introBuffer.slice(prevLen, specIdx);
                if (tail) {
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'text', content: tail })}\n\n`));
                }
                introDone = true;
              } else {
                // Stream this chunk immediately
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'text', content: text })}\n\n`));
              }
            }
            // After SPEC: found, silently accumulate the rest for the card
          }
        }

        // If AI never used SPEC: format, send the full text as intro
        if (!introDone && introBuffer.trim()) {
          // Already streamed above, nothing to do
        }

        // Parse into card — try structured first, fall back to name matching
        const cardData = parseResponseIntoCard(fullText, makeableRecipes);

        if (cardData) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'recipe', recipe: cardData })}\n\n`));
        }

        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`));
        controller.close();
      }
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      }
    });

  } catch (error) {
    console.error('Stream API Error:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred while processing your request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

