import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { recipes, getMakeableRecipes, Recipe } from '@/data/recipes';
import { buildSystemPrompt, buildUserContext, UserPreferences } from '@/lib/prompts';

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
        bitter: 0.7,
        sweet: 0.5,
        citrus: 0.8,
        herbal: 0.7,
        smoky: 0.5,
        spicy: 0.3,
        strength: 0.7
      },
      conversationHistory = [],
      recommendedThisSession = [],
      userName
    } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Get makeable recipes
    const makeableRecipes = getMakeableRecipes(inventory || []);
    
    // Build context
    const currentTime = new Date().toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
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
      message,
      inventory || [],
      makeableRecipes,
      recentlyMade,
      preferences as UserPreferences,
      conversationHistory,
      recommendedThisSession,
      userName,
    );

    // Call Claude API
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userContext
        }
      ]
    });

    // Extract text content
    const textContent = response.content.find(block => block.type === 'text');
    const assistantMessage = textContent ? textContent.text : 'I apologize, but I encountered an issue. Could you try asking again?';

    // Try to extract recipe recommendation from response
    const recommendedRecipe = extractRecommendedRecipe(assistantMessage, makeableRecipes);

    return NextResponse.json({
      message: assistantMessage,
      recipe: recommendedRecipe
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    
    // Fallback response if API fails
    return NextResponse.json({
      message: "I'm having a moment — let me gather my thoughts. What are you in the mood for tonight?",
      recipe: null
    });
  }
}

// Extract recipe from Claude's response
function extractRecommendedRecipe(response: string, makeableRecipes: Recipe[]): Recipe | null {
  // Look for recipe names in the response
  for (const recipe of makeableRecipes) {
    // Check for exact name match (case insensitive)
    const nameRegex = new RegExp(`\\*\\*${recipe.name}\\*\\*|\\b${recipe.name}\\b`, 'i');
    if (nameRegex.test(response)) {
      return recipe;
    }
  }
  
  // If no match found, check for partial matches
  for (const recipe of makeableRecipes) {
    const words = recipe.name.toLowerCase().split(' ');
    const hasMatch = words.some(word => 
      word.length > 3 && response.toLowerCase().includes(word)
    );
    if (hasMatch && response.toLowerCase().includes(recipe.name.toLowerCase())) {
      return recipe;
    }
  }
  
  return null;
}
