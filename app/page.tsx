'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useStore } from '@/lib/store';
import { useStreamingChat } from '@/lib/useStreamingChat';
import { Send, LampDesk, Home, Search, User, Sparkles, ArrowLeft } from 'lucide-react';
import {
  UserMessage,
  AssistantMessage,
  StreamingMessage,
  TypingIndicator,
  QuickReplyChips,
  detectReplyContext,
  BarView,
  RecipesView,
  ProfileView,
  BeginnerFlow,
  WelcomeEntryCard,
  RecipeDetailView,
} from '@/components/ui';
import { Recipe } from '@/data/recipes';

export default function HomePage() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => { setIsHydrated(true); }, []);

  const {
    inventory, messages, addMessage, clearMessages,
    recentlyMade, markAsMade, preferences,
    currentView, setCurrentView, isLoading, setIsLoading,
    getMakeableRecipes, addToInventory, removeFromInventory,
    savedRecipes, saveRecipe, unsaveRecipe,
    hasCompletedOnboarding, setHasCompletedOnboarding,
    updatePreferences,
  } = useStore();

  const [inputValue, setInputValue] = useState('');
  const [chatActive, setChatActive] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [newDrinksUnlocked, setNewDrinksUnlocked] = useState<number | null>(null);
  const [previousRecipeCount, setPreviousRecipeCount] = useState<number | null>(null);
  const [showBeginnerFlow, setShowBeginnerFlow] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const makeableRecipes = isHydrated ? getMakeableRecipes() : [];
  const savedRecipeIds = savedRecipes.map(r => r.id);

  const { isStreaming, streamingContent, streamingRecipe, sendMessage: sendStreamingMessage, clearStreaming, resetSession } = useStreamingChat({
    inventory, recentlyMade, preferences
  });

  // Mobile keyboard handling — scroll input into view when focused
  useEffect(() => {
    const handleFocus = () => {
      // Small delay lets the keyboard finish opening
      setTimeout(() => {
        inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    };
    const input = inputRef.current;
    if (input) {
      input.addEventListener('focus', handleFocus);
      return () => input.removeEventListener('focus', handleFocus);
    }
  }, [chatActive]);

  // Gamification: track recipe count changes
  useEffect(() => {
    if (previousRecipeCount !== null && makeableRecipes.length > previousRecipeCount) {
      const newCount = makeableRecipes.length - previousRecipeCount;
      setNewDrinksUnlocked(newCount);
      setTimeout(() => setNewDrinksUnlocked(null), 3000);
    }
    setPreviousRecipeCount(makeableRecipes.length);
  }, [makeableRecipes.length, previousRecipeCount]);

  // Scroll tracking
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !chatActive) return;
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      setIsAtBottom(scrollHeight - scrollTop - clientHeight < 150);
    };
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [chatActive]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (chatActive) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent, chatActive]);

  const hasMessages = messages.length > 0 || isStreaming;

  const sendMessage = async (content?: string) => {
    const messageContent = content || inputValue.trim();
    if (!messageContent || isLoading || isStreaming) return;
    setChatActive(true);
    setChatError(null);
    addMessage({ role: 'user', content: messageContent });
    setInputValue('');
    setIsLoading(true);
    try {
      await sendStreamingMessage(messageContent, (finalContent, recipe) => {
        addMessage({ role: 'assistant', content: finalContent, recipe: recipe || undefined });
        clearStreaming();
        setIsLoading(false);
      });
    } catch (err) {
      setChatError("Couldn't reach the bar — check your connection and try again.");
      setIsLoading(false);
      clearStreaming();
    }
  };

  const handleStartChat = () => {
    setChatActive(true);
    setTimeout(() => inputRef.current?.focus(), 150);
  };

  const handleMakeRecipe = (recipeName: string) => {
    markAsMade(recipeName);
    addMessage({ role: 'assistant', content: `Enjoy your ${recipeName}! Let me know how it turns out.` });
  };

  const handleSaveRecipe = useCallback((recipe: Recipe) => {
    saveRecipe(recipe);
  }, [saveRecipe]);

  const handleUnsaveRecipe = useCallback((recipeId: string) => {
    unsaveRecipe(recipeId);
  }, [unsaveRecipe]);

  const handleBackToHome = () => {
    setChatActive(false);
    clearMessages();
    setInputValue('');
    setCurrentView('chat');
    resetSession();
  };

  const handleSelectRecipe = useCallback((recipe: Recipe) => {
    setSelectedRecipe(recipe);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setSelectedRecipe(null);
  }, []);

  const handleAddIngredient = useCallback((item: string) => {
    addToInventory(item);
  }, [addToInventory]);

  const handleBeginnerComplete = (prefs: { mood: string; bitter: string; strength: number }) => {
    // Map beginner answers into preference scores
    const bitterMap: Record<string, number> = { love: 0.9, some: 0.6, no: 0.2, new: 0.4 };
    const strengthVal = prefs.strength;
    const citrusMap: Record<string, number> = { refreshing: 0.9, strong: 0.5, complex: 0.6, unknown: 0.7 };

    updatePreferences({
      bitter: bitterMap[prefs.bitter] ?? 0.5,
      strength: strengthVal,
      citrus: citrusMap[prefs.mood] ?? 0.7,
    });

    setHasCompletedOnboarding(true);
    setShowBeginnerFlow(false);

    // Kick off a chat with context from their answers
    const moodMap: Record<string, string> = {
      refreshing: 'something bright and refreshing',
      strong: 'something spirit-forward and bold',
      complex: 'something complex and interesting',
      unknown: 'something to help me discover what I like',
    };
    const prompt = `I'm new here. I want ${moodMap[prefs.mood] || 'a great cocktail'}. ${prefs.bitter === 'love' ? "I love bitter." : prefs.bitter === 'no' ? "I don't like bitter." : "I'm open to a little bitterness."}`;
    setChatActive(true);
    setTimeout(() => sendMessage(prompt), 100);
  };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const quickPrompts = ['Pre-dinner', 'Nightcap', 'Impress guests', 'Surprise me'];

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="w-12 h-12 border-2 border-ember/30 border-t-ember rounded-full animate-spin" />
      </div>
    );
  }

  // Recipe detail overlay — renders on top of any view
  if (selectedRecipe) {
    return (
      <RecipeDetailView
        recipe={selectedRecipe}
        allRecipes={makeableRecipes}
        onClose={handleCloseDetail}
        onMake={handleMakeRecipe}
        onSave={handleSaveRecipe}
        onUnsave={handleUnsaveRecipe}
        saved={savedRecipeIds.includes(selectedRecipe.id)}
        onSelectRecipe={handleSelectRecipe}
      />
    );
  }

  // Beginner flow overlay
  if (showBeginnerFlow) {
    return (
      <BeginnerFlow
        onComplete={handleBeginnerComplete}
        onSkip={() => { setShowBeginnerFlow(false); setHasCompletedOnboarding(true); }}
      />
    );
  }

  // ============ BAR VIEW ============
  if (currentView === 'bar') {
    return (
      <div className="min-h-screen pb-24" style={{ background: 'var(--bg)' }}>
        <div className="vignette" /><div className="grain" />
        <header className="header sticky top-0 z-50 backdrop-blur-sm" style={{ background: 'var(--bg)' }}>
          <p className="eyebrow">Your shelf · {inventory.length} bottles</p>
        </header>
        <main className="relative z-10 max-w-2xl mx-auto px-6 pt-6">
          <BarView inventory={inventory} recipeCount={makeableRecipes.length} onAddIngredient={handleAddIngredient} onRemoveIngredient={removeFromInventory} />
        </main>
        {newDrinksUnlocked && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
            <div className="px-5 py-3 flex items-center gap-2" style={{ background: 'var(--forest-dark)', color: 'white', borderRadius: '2px' }}>
              <Sparkles className="w-4 h-4" />
              <span className="text-[13px] font-medium tracking-wide">+{newDrinksUnlocked} new {newDrinksUnlocked === 1 ? 'drink' : 'drinks'} unlocked</span>
            </div>
          </div>
        )}
        <NavBar currentView="bar" onViewChange={(v) => v === 'home' ? handleBackToHome() : setCurrentView(v)} recipeCount={makeableRecipes.length} inventoryCount={inventory.length} />
      </div>
    );
  }

  // ============ RECIPES VIEW ============
  if (currentView === 'recipes') {
    return (
      <div className="min-h-screen pb-24" style={{ background: 'var(--bg)' }}>
        <div className="vignette" /><div className="grain" />
        <header className="header sticky top-0 z-50 backdrop-blur-sm" style={{ background: 'var(--bg)' }}>
          <p className="eyebrow">Ready to pour · {makeableRecipes.length} cocktails</p>
        </header>
        <main className="relative z-10 max-w-2xl mx-auto px-6 pt-6">
          <RecipesView
            recipes={makeableRecipes}
            savedRecipes={savedRecipes}
            onMakeRecipe={handleMakeRecipe}
            onSaveRecipe={handleSaveRecipe}
            onUnsaveRecipe={handleUnsaveRecipe}
            onSelectRecipe={handleSelectRecipe}
          />
        </main>
        <NavBar currentView="recipes" onViewChange={(v) => v === 'home' ? handleBackToHome() : setCurrentView(v)} recipeCount={makeableRecipes.length} inventoryCount={inventory.length} />
      </div>
    );
  }

  // ============ PROFILE VIEW ============
  if (currentView === 'profile') {
    return (
      <div className="min-h-screen pb-24" style={{ background: 'var(--bg)' }}>
        <div className="vignette" /><div className="grain" />
        <header className="header sticky top-0 z-50 backdrop-blur-sm" style={{ background: 'var(--bg)' }}>
          <p className="eyebrow">Your palate</p>
        </header>
        <main className="relative z-10 max-w-2xl mx-auto px-6 pt-6">
          <ProfileView recentlyMade={recentlyMade} recipeCount={makeableRecipes.length} inventoryCount={inventory.length} preferences={preferences} />
        </main>
        <NavBar currentView="profile" onViewChange={(v) => v === 'home' ? handleBackToHome() : setCurrentView(v)} recipeCount={makeableRecipes.length} inventoryCount={inventory.length} />
      </div>
    );
  }

  // ============ MAIN HOME ============
  return (
    <div ref={scrollContainerRef} className="min-h-screen overflow-y-auto" style={{ background: 'var(--bg)' }}>
      <div className="vignette" /><div className="grain" />

      {/* ── HOME SCREEN ── */}
      {!chatActive && (
        <div className="relative z-10 animate-fade-in pb-32">

          {/* Greeting */}
          <div className="px-6 pt-[48px] pb-4 max-w-md mx-auto">
            <p className="eyebrow mb-4">Speakeasier · Est. Tonight</p>
            <h1 className="display-lg mb-3">{greeting}.</h1>
            <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '18px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
            </p>
          </div>


          <div className="px-6 max-w-md mx-auto">

            {/* Invitation to chat */}
            <button onClick={handleStartChat} className="invitation-card mb-8">
              <p className="eyebrow eyebrow-ember mb-3">A quiet word</p>
              <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '22px', color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: '14px' }}>
                Tell me where your head is…
              </p>
              <p className="eyebrow">Tap to speak →</p>
            </button>

            {/* Quick prompts */}
            <div className="flex flex-wrap gap-2 mb-10">
              {quickPrompts.map((prompt) => (
                <button key={prompt} onClick={() => sendMessage(prompt)} className="quick-reply">{prompt}</button>
              ))}
            </div>


            {/* Stats */}
            <div className="flex gap-3 mb-6">
              <button onClick={() => setCurrentView('recipes')} className="stat-card flex-1 text-left">
                <p className="stat-number stat-number-ember">{makeableRecipes.length}</p>
                <p className="stat-label">cocktails ready</p>
              </button>
              <button onClick={() => setCurrentView('bar')} className="stat-card flex-1 text-left">
                <p className="stat-number">{inventory.length}</p>
                <p className="stat-label">in your bar</p>
              </button>
            </div>

            {/* Beginner entry */}
            <WelcomeEntryCard onClick={() => setShowBeginnerFlow(true)} />

          </div>
        </div>
      )}

      {/* ── CHAT ACTIVE HEADER ── */}
      {chatActive && (
        <div className="relative z-10 pt-12 pb-4">
          <div className="px-6 max-w-md mx-auto">
            <button onClick={handleBackToHome} className="mb-4 flex items-center gap-2" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-tertiary)" }}><ArrowLeft className="w-4 h-4" /><span style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase" }}>Back</span></button>
            <div className="mb-6">
              <p className="eyebrow mb-3">A quiet word</p>
              <h2 className="display-md">Tell me where your head is…</h2>
            </div>
            <div className="flex items-center gap-3 border-t pt-4" style={{ borderColor: 'var(--line-strong)' }}>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="What are we thinking…"
                className="chat-input"
              />
              <button onClick={() => sendMessage()} disabled={!inputValue.trim() || isLoading || isStreaming} className="send-btn">
                <Send className="w-3.5 h-3.5" style={{ color: 'var(--bg)' }} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Messages */}
      {chatActive && hasMessages && (
        <div className="relative z-10 px-6 max-w-2xl mx-auto pb-32 animate-fade-in">
          <div className="space-y-6">
            {messages.map((msg) => (
              msg.role === 'user' ? (
                <UserMessage key={msg.id} content={msg.content} />
              ) : (
                <AssistantMessage
                  key={msg.id}
                  content={msg.content}
                  recipe={msg.recipe}
                  onMakeRecipe={handleMakeRecipe}
                  onSaveRecipe={handleSaveRecipe}
                  savedRecipeIds={savedRecipeIds}
                  onSelectRecipe={handleSelectRecipe}
                />
              )
            ))}

            {isStreaming && streamingContent && (
              <StreamingMessage
                content={streamingContent}
                recipe={streamingRecipe}
                onMakeRecipe={handleMakeRecipe}
                onSaveRecipe={handleSaveRecipe}
                savedRecipeIds={savedRecipeIds}
                onSelectRecipe={handleSelectRecipe}
              />
            )}

            {isStreaming && !streamingContent && <TypingIndicator />}

            {/* Error state */}
            {chatError && !isStreaming && (
              <div className="mb-6 animate-fade-in">
                <p className="eyebrow mb-3" style={{ color: 'var(--ember)' }}>Lost the thread</p>
                <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '18px', lineHeight: 1.4, color: 'var(--text-secondary)', marginBottom: '14px' }}>
                  {chatError}
                </p>
                <button 
                  onClick={() => { setChatError(null); sendMessage(messages[messages.length - 1]?.content); }}
                  className="quick-reply"
                  style={{ borderColor: 'var(--ember)', color: 'var(--ember)' }}
                >
                  Try again
                </button>
              </div>
            )}

            {!isStreaming && messages.length > 0 && messages[messages.length - 1].role === 'assistant' && (
              <QuickReplyChips
                context={detectReplyContext(messages[messages.length - 1].content)}
                onSelect={(text) => sendMessage(text)}
              />
            )}

            <div ref={messagesEndRef} className="h-4" />
          </div>

          {hasMessages && !isStreaming && (
            <div className="fixed bottom-0 left-0 right-0 z-40 input-area px-6 py-4" style={{ background: 'var(--bg)', borderTop: '1px solid var(--line)' }}>
              <div className="max-w-2xl mx-auto flex items-center gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="What are we thinking…"
                  className="chat-input"
                  enterKeyHint="send"
                />
                <button onClick={() => sendMessage()} disabled={!inputValue.trim() || isLoading} className="send-btn">
                  <Send className="w-3.5 h-3.5" style={{ color: 'var(--bg)' }} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <NavBar
        currentView="home"
        onViewChange={(v) => v === 'home' ? handleBackToHome() : setCurrentView(v)}
        recipeCount={makeableRecipes.length}
        inventoryCount={inventory.length}
        visible={!chatActive || (!hasMessages && isAtBottom)}
      />
    </div>
  );
}

// ============ BOTTOM NAV ============
interface NavBarProps {
  currentView: string;
  onViewChange: (view: 'home' | 'recipes' | 'bar' | 'profile') => void;
  recipeCount: number;
  inventoryCount: number;
  visible?: boolean;
}

function NavBar({ currentView, onViewChange, recipeCount, inventoryCount, visible = true }: NavBarProps) {
  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
      <div style={{ background: 'var(--bg)', borderTop: '1px solid var(--line)' }} className="backdrop-blur-md">
        <div className="max-w-md mx-auto px-6 py-3 flex justify-around">
          <NavItem icon={<Home className="w-5 h-5" />} label="Home" active={currentView === 'home'} onClick={() => onViewChange('home')} />
          <NavItem icon={<Search className="w-5 h-5" />} label="Recipes" active={currentView === 'recipes'} onClick={() => onViewChange('recipes')} badge={recipeCount} />
          <NavItem icon={<LampDesk className="w-5 h-5" />} label="My Bar" active={currentView === 'bar'} onClick={() => onViewChange('bar')} />
          <NavItem icon={<User className="w-5 h-5" />} label="Profile" active={currentView === 'profile'} onClick={() => onViewChange('profile')} />
        </div>
      </div>
    </nav>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: number;
}

function NavItem({ icon, label, active, onClick, badge }: NavItemProps) {
  return (
    <button onClick={onClick} className={`nav-item px-4 py-1 relative ${active ? 'nav-item-active' : ''}`}>
      <div className="relative">
        {icon}
        {badge !== undefined && (
          <span className="absolute -top-1 -right-2 text-[9px] font-medium px-1.5 py-0.5 rounded-full min-w-[18px] text-center" style={{ background: 'var(--ember)', color: 'white' }}>
            {badge}
          </span>
        )}
      </div>
      <span className="text-[10px] tracking-[0.12em] uppercase">{label}</span>
    </button>
  );
}
