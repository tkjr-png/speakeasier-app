import { useState, useCallback, useRef } from 'react';
import { Recipe } from '@/data/recipes';
import { extractRecommendedDrink } from './prompts';

interface UseStreamingChatOptions {
  inventory: string[];
  recentlyMade: string[];
  preferences: {
    bitter: number;
    sweet: number;
    citrus: number;
    herbal: number;
    smoky: number;
    spicy: number;
    strength: number;
  };
}

interface ConversationEntry {
  role: 'user' | 'assistant';
  content: string;
}

export function useStreamingChat(options: UseStreamingChatOptions) {
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [streamingRecipe, setStreamingRecipe] = useState<Recipe | null>(null);
  
  // Session memory - persists across messages within the session
  const recommendedThisSession = useRef<string[]>([]);
  const conversationHistory = useRef<ConversationEntry[]>([]);

  const sendMessage = useCallback(async (
    message: string,
    onComplete?: (content: string, recipe: Recipe | null) => void
  ) => {
    setIsStreaming(true);
    setStreamingContent('');
    setStreamingRecipe(null);

    // Add user message to conversation history
    conversationHistory.current.push({ role: 'user', content: message });

    try {
      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          inventory: options.inventory,
          recentlyMade: options.recentlyMade,
          preferences: options.preferences,
          conversationHistory: conversationHistory.current.slice(-10), // Last 10 messages
          recommendedThisSession: recommendedThisSession.current
        })
      });

      if (!response.ok) {
        throw new Error('Stream request failed');
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No reader available');
      }

      const decoder = new TextDecoder();
      let fullContent = '';
      let recipe: Recipe | null = null;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              
              if (data.type === 'text') {
                fullContent += data.content;
                setStreamingContent(fullContent);
              } else if (data.type === 'recipe') {
                recipe = data.recipe;
                setStreamingRecipe(recipe);
              } else if (data.type === 'done') {
                // Stream complete
                
                // Track recommended drink
                const recommendedDrink = extractRecommendedDrink(fullContent);
                if (recommendedDrink && !recommendedThisSession.current.includes(recommendedDrink)) {
                  recommendedThisSession.current.push(recommendedDrink);
                }
                
                // Add assistant response to history
                conversationHistory.current.push({ role: 'assistant', content: fullContent });
                
                if (onComplete) {
                  onComplete(fullContent, recipe);
                }
              }
            } catch (e) {
              // Ignore JSON parse errors for incomplete chunks
            }
          }
        }
      }
    } catch (error) {
      console.error('Streaming error:', error);
      let fallbackContent: string;
      if (error instanceof TypeError && error.message.includes('fetch')) {
        fallbackContent = "Can't reach the bar right now — check your connection.";
      } else {
        fallbackContent = "I'm having a moment — let me gather my thoughts. Try again?";
      }
      setStreamingContent(fallbackContent);
      conversationHistory.current.push({ role: 'assistant', content: fallbackContent });
      if (onComplete) {
        onComplete(fallbackContent, null);
      }
    } finally {
      setIsStreaming(false);
    }
  }, [options.inventory, options.recentlyMade, options.preferences]);

  // Clear only the UI streaming state — call this after each message completes.
  // Does NOT reset session memory (recommendations, conversation history).
  const clearStreaming = useCallback(() => {
    setStreamingContent('');
    setStreamingRecipe(null);
  }, []);

  // Reset everything including session memory — call this when the conversation
  // is fully ended (user navigates back to home, starts a new thread).
  const resetSession = useCallback(() => {
    setStreamingContent('');
    setStreamingRecipe(null);
    recommendedThisSession.current = [];
    conversationHistory.current = [];
  }, []);

  return {
    isStreaming,
    streamingContent,
    streamingRecipe,
    sendMessage,
    clearStreaming,
    resetSession,
    recommendedThisSession: recommendedThisSession.current
  };
}
