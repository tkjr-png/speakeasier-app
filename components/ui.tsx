'use client';

import React from 'react';
import { Recipe } from '@/data/recipes';
import { useStore, FillLevel } from '@/lib/store';
import { Send, Loader2, LampDesk, ChevronRight, Home, Search, User, Check, Plus, Users, Bookmark, BookmarkCheck, ArrowLeft } from 'lucide-react';

// ============ HEADER ============
interface HeaderProps {
  currentView: 'chat' | 'bar' | 'recipes' | 'home';
  onViewChange: (view: 'chat' | 'bar' | 'recipes' | 'home') => void;
  inventoryCount: number;
  recipeCount: number;
  showBackButton?: boolean;
}

export function Header({ currentView, onViewChange, showBackButton }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-midnight/95 backdrop-blur-md">
      <div className="max-w-3xl mx-auto px-6 py-4 flex justify-between items-center">
        {showBackButton ? (
          <button 
            onClick={() => onViewChange('home')}
            className="text-gray-400 hover:text-white transition-colors text-[13px]"
          >
            ← Back
          </button>
        ) : (
          <div className="w-16" /> 
        )}
        
        <button 
          onClick={() => onViewChange('home')}
          className="text-[11px] tracking-[4px] text-ember font-normal uppercase hover:opacity-80 transition-opacity"
        >
          SPEAKEASIER
        </button>
        
        <div className="w-16" />
      </div>
    </header>
  );
}

// ============ BOTTOM NAV ============
interface BottomNavProps {
  currentView: 'chat' | 'bar' | 'recipes' | 'home';
  onViewChange: (view: 'chat' | 'bar' | 'recipes' | 'home') => void;
  recipeCount: number;
  inventoryCount: number;
}

export function BottomNav({ currentView, onViewChange, recipeCount, inventoryCount }: BottomNavProps) {
  const tabs = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'recipes' as const, label: 'Discover', icon: Search },
    { id: 'bar' as const, label: 'My bar', icon: LampDesk },
    { id: 'chat' as const, label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-midnight/95 backdrop-blur-md border-t border-white/[0.06] z-50">
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex justify-around py-3">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onViewChange(id)}
              className={`flex flex-col items-center gap-1 px-4 py-1 transition-colors ${
                currentView === id ? 'text-ember' : 'text-gray-500 hover:text-gray-400'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px]">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function NavButton({ 
  children, 
  active, 
  onClick 
}: { 
  children: React.ReactNode; 
  active: boolean; 
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-[13px] transition-colors ${
        active ? 'text-ember' : 'text-gray-500 hover:text-gray-400'
      }`}
    >
      {children}
    </button>
  );
}

// ============ WELCOME SCREEN ============
interface WelcomeScreenProps {
  recipeCount: number;
  inventoryCount: number;
  recentlyMade: string[];
  onQuickPrompt: (prompt: string) => void;
  onStartChat: () => void;
  onViewRecipes?: () => void;
  onViewBar?: () => void;
}

export function WelcomeScreen({ 
  recipeCount, 
  inventoryCount, 
  recentlyMade, 
  onQuickPrompt,
  onStartChat,
  onViewRecipes,
  onViewBar
}: WelcomeScreenProps) {
  const quickPrompts = [
    'Pre-dinner',
    'Nightcap',
    'Impress guests',
    'Surprise me'
  ];

  // Get time-based greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="text-center pt-8 pb-8 animate-fade-in">
      {/* Logo */}
      <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-white/[0.15] flex items-center justify-center">
        <LampDesk className="w-7 h-7 text-ember" />
      </div>

      {/* Greeting */}
      <p className="text-gray-500 text-[11px] tracking-[3px] uppercase mb-2">
        {greeting}
      </p>
      <h2 className="text-[28px] font-light tracking-tight mb-10">
        What shall we make?
      </h2>

      {/* Main CTA Card */}
      <button 
        onClick={onStartChat}
        className="mx-auto max-w-sm w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 mb-6 cursor-pointer hover:bg-white/[0.05] hover:border-ember/30 transition-all text-left"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-ember flex items-center justify-center flex-shrink-0">
            <LampDesk className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-medium text-[16px] mb-1">Talk to your mixologist</h3>
            <p className="text-gray-500 text-[13px]">I know your bar. I know your taste.</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </div>

        {/* Quick prompts inside card */}
        <div className="border-t border-white/[0.06] mt-5 pt-5">
          <p className="text-gray-600 text-[11px] tracking-wider uppercase mb-3">Quick prompts</p>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt) => (
              <span
                key={prompt}
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickPrompt(prompt);
                }}
                className="bg-white/[0.03] border border-white/[0.1] rounded-full px-4 py-2 text-[13px] text-gray-400 hover:bg-ember/10 hover:border-ember/30 hover:text-ember transition-all cursor-pointer"
              >
                {prompt}
              </span>
            ))}
          </div>
        </div>
      </button>

      {/* Stats tiles - now clickable */}
      <div className="flex justify-center gap-4 mt-8 max-w-sm mx-auto">
        <button 
          onClick={onViewRecipes}
          className="flex-1 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 hover:bg-ember/5 hover:border-ember/20 transition-all text-left"
        >
          <p className="text-[32px] font-light text-ember">{recipeCount}</p>
          <p className="text-gray-600 text-[12px] mt-1">cocktails ready</p>
        </button>
        <button 
          onClick={onViewBar}
          className="flex-1 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.04] hover:border-white/[0.12] transition-all text-left"
        >
          <p className="text-[32px] font-light text-white">{inventoryCount}</p>
          <p className="text-gray-600 text-[12px] mt-1">in your bar</p>
        </button>
      </div>
    </div>
  );
}

// ============ MESSAGE COMPONENTS ============
interface UserMessageProps {
  content: string;
}

export function UserMessage({ content }: UserMessageProps) {
  return (
    <div className="flex justify-end mb-6 animate-fade-in">
      <div className="message-user max-w-[280px]">
        <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-primary)' }}>{content}</p>
      </div>
    </div>
  );
}

interface AssistantMessageProps {
  content: string;
  recipe?: Recipe | null;
  onMakeRecipe?: (name: string) => void;
  onSaveRecipe?: (recipe: Recipe) => void;
  savedRecipeIds?: string[];
  onSelectRecipe?: (recipe: Recipe) => void;
}

export function AssistantMessage({ content, recipe, onMakeRecipe, onSaveRecipe, savedRecipeIds = [], onSelectRecipe }: AssistantMessageProps) {
  // Strip everything from SPEC: onwards — that goes on the card
  const cleanContent = content.split(/SPEC:|METHOD:|WHY:|FINISH:|ALTERNATIVES:/)[0].trim();

  // Parse markdown-style bold text
  const parseContent = (text: string) => {
    return text.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="mb-6 animate-fade-in">
      <p className="eyebrow mb-3">For you, tonight</p>
      <div className="mb-6" style={{ maxWidth: '300px', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '20px', lineHeight: 1.4, color: 'var(--text-primary)' }}>
        {parseContent(cleanContent)}
      </div>
      {recipe && (
        <EnhancedRecipeCard
          recipe={recipe}
          onMake={onMakeRecipe}
          onSave={onSaveRecipe}
          saved={savedRecipeIds.includes(recipe.id)}
          onSelect={onSelectRecipe}
        />
      )}
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="mb-6">
      <p className="eyebrow mb-3">Reading the room</p>
      <div className="flex gap-1.5">
        <span className="typing-dot w-1.5 h-1.5 rounded-full" style={{ background: 'var(--text-tertiary)' }} />
        <span className="typing-dot w-1.5 h-1.5 rounded-full" style={{ background: 'var(--text-tertiary)' }} />
        <span className="typing-dot w-1.5 h-1.5 rounded-full" style={{ background: 'var(--text-tertiary)' }} />
      </div>
    </div>
  );
}

// ============ QUICK REPLY CHIPS ============
export type QuickReplyContext = 'after-recommendation' | 'after-explanation' | 'open-ended' | 'after-options';

interface QuickReplyChipsProps {
  context: QuickReplyContext;
  onSelect: (text: string) => void;
}

const chipsByContext: Record<QuickReplyContext, string[]> = {
  'after-recommendation': [
    'Louder',
    'Softer',
    'Surprise me',
  ],
  'after-explanation': [
    'Another, please',
    'Pour it',
    'Tell me more'
  ],
  'after-options': [
    'The first',
    'The second', 
    'Surprise me'
  ],
  'open-ended': [
    'Something bitter',
    'Surprise me',
    'Dealer\'s choice'
  ]
};

export function QuickReplyChips({ context, onSelect }: QuickReplyChipsProps) {
  const chips = chipsByContext[context] || chipsByContext['open-ended'];
  
  return (
    <div className="flex flex-wrap gap-2 mt-4 animate-fade-in">
      {chips.map((chip) => (
        <button
          key={chip}
          onClick={() => onSelect(chip)}
          className="quick-reply"
        >
          {chip}
        </button>
      ))}
    </div>
  );
}

// Helper to determine context from last message
export function detectReplyContext(lastMessage: string): QuickReplyContext {
  const lower = lastMessage.toLowerCase();
  
  // Check if it's offering options
  if (lower.includes('could also') || lower.includes('or if you') || lower.includes('another option')) {
    return 'after-options';
  }
  
  // Check if it's an explanation
  if (lower.includes('the balance') || lower.includes('works because') || lower.includes('the theory')) {
    return 'after-explanation';
  }
  
  // Check if it has a recipe (recommendation)
  if (lower.includes('oz') || lower.includes('ingredients') || lower.includes('shake') || lower.includes('stir')) {
    return 'after-recommendation';
  }
  
  return 'open-ended';
}

// ============ ENHANCED RECIPE CARD ============
interface EnhancedRecipeCardProps {
  recipe: Recipe;
  onMake?: (name: string) => void;
  onSave?: (recipe: Recipe) => void;
  saved?: boolean;
  onSelect?: (recipe: Recipe) => void;
}

function EnhancedRecipeCard({ recipe, onMake, onSave, saved = false, onSelect }: EnhancedRecipeCardProps) {
  const [expanded, setExpanded] = React.useState(false);

  const finishTag = recipe.tags.find(t => t.startsWith('finish:'));
  const altTag = recipe.tags.find(t => t.startsWith('alt:'));
  const finishNote = finishTag ? finishTag.replace('finish:', '') : null;
  const altNote = altTag ? altTag.replace('alt:', '') : null;

  const methodLine = [recipe.method, recipe.glass, recipe.garnish && recipe.garnish !== 'None' && `Garnish: ${recipe.garnish}`]
    .filter(Boolean).join(' · ');

  // Figure out the "Created by" line
  const isAICreated = recipe.id?.startsWith('ai-') || recipe.creator === 'Speakeasier AI';
  const isCustom = recipe.source === 'Custom';
  const createdByLine = isAICreated
    ? 'Created by Speakeasier AI · Tonight'
    : isCustom
      ? 'Original creation'
      : [recipe.creator, recipe.source, recipe.year ? `${recipe.year}` : null].filter(Boolean).join(' · ');

  return (
    <div className="rec-card animate-slide-up">

      {/* Header */}
      <div className="flex gap-4 mb-4">
        <div className="cocktail-image cocktail-image-amber w-24 h-32 flex-shrink-0" style={{ aspectRatio: '3/4' }}>
          <div className="grain" style={{ position: 'absolute' }} />
        </div>
        <div className="flex-1 pt-1">
          <p className="eyebrow mb-2">{recipe.source || 'Custom'} · In your bar</p>
          <h3 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400, fontSize: '28px', lineHeight: 1.1, color: 'var(--text-primary)', marginBottom: '8px' }}>{recipe.name}</h3>
          <p className="eyebrow" style={{ color: 'var(--text-tertiary)', fontSize: '11px' }}>{methodLine}</p>
        </div>
      </div>

      {/* WHY — AI reasoning shown prominently */}
      {recipe.balance && (
        <p className="rec-card-why mb-4">{recipe.balance}</p>
      )}

      {/* Ingredients */}
      <div className="mb-4" style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '4px 0' }}>
        {recipe.ingredients.map((ing, i) => (
          <div key={i} className="ingredient-row">
            <span className="ingredient-name">{ing.name}</span>
            <span className="ingredient-amount">{ing.amount} {ing.unit}</span>
          </div>
        ))}
      </div>

      {/* Finish & Alternatives — always expanded inline */}
      {(finishNote || altNote) && (
        <div className="mb-4 space-y-3">
          {finishNote && (
            <div style={{ borderLeft: '2px solid var(--ember)', paddingLeft: '12px' }}>
              <p className="eyebrow mb-1">Finish</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6 }}>{finishNote}</p>
            </div>
          )}
          {altNote && (
            <div style={{ borderLeft: '2px solid var(--line-strong)', paddingLeft: '12px' }}>
              <p className="eyebrow mb-1">Also consider</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{altNote}</p>
            </div>
          )}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3 mb-4">
        {onMake && (
          <button onClick={() => onMake(recipe.name)} className="btn-primary flex-1">
            Pour it
          </button>
        )}
        {onSave && (
          <button
            onClick={() => onSave(recipe)}
            className="btn-ghost"
            style={{ width: '52px', flex: 'none', padding: '16px' }}
            title={saved ? 'Saved' : 'Save recipe'}
          >
            {saved
              ? <BookmarkCheck className="w-4 h-4 mx-auto" style={{ color: 'var(--ember)' }} />
              : <Bookmark className="w-4 h-4 mx-auto" style={{ color: 'var(--text-tertiary)' }} />
            }
          </button>
        )}
      </div>

      {/* Full recipe link */}
      {onSelect && (
        <button
          onClick={() => onSelect(recipe)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '12px', display: 'block', padding: 0 }}
        >
          Full recipe →
        </button>
      )}

      {/* Created by footer */}
      {createdByLine && (
        <div style={{ borderTop: '1px solid var(--line)', paddingTop: '10px' }}>
          <p style={{ color: 'var(--text-tertiary)', fontSize: '11px', letterSpacing: '0.08em' }}>
            {isAICreated ? '🤖' : '📍'} {createdByLine}
          </p>
        </div>
      )}
    </div>
  );
}

// ============ STREAMING MESSAGE ============
interface StreamingMessageProps {
  content: string;
  recipe?: Recipe | null;
  onMakeRecipe?: (name: string) => void;
  onSaveRecipe?: (recipe: Recipe) => void;
  savedRecipeIds?: string[];
  onSelectRecipe?: (recipe: Recipe) => void;
}

export function StreamingMessage({ content, recipe, onMakeRecipe, onSaveRecipe, savedRecipeIds = [], onSelectRecipe }: StreamingMessageProps) {
  // Strip everything from SPEC: onwards — that goes on the card
  const cleanContent = content.split(/SPEC:|METHOD:|WHY:|FINISH:|ALTERNATIVES:/)[0].trim();

  const parseContent = (text: string) => {
    return text.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="mb-6 animate-fade-in">
      <p className="eyebrow mb-3">For you, tonight</p>
      <div className="mb-6" style={{ maxWidth: '300px', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '20px', lineHeight: 1.4, color: 'var(--text-primary)' }}>
        {parseContent(cleanContent)}
        <span
          className="inline-block w-0.5 h-5 ml-1 animate-pulse"
          style={{ background: 'var(--ember)', opacity: 0.6 }}
        />
      </div>
      {recipe && (
        <EnhancedRecipeCard
          recipe={recipe}
          onMake={onMakeRecipe}
          onSave={onSaveRecipe}
          saved={savedRecipeIds.includes(recipe.id)}
          onSelect={onSelectRecipe}
        />
      )}
    </div>
  );
}

// ============ RECIPE CARD ============
interface RecipeCardProps {
  recipe: Recipe;
  onMake?: (name: string) => void;
  compact?: boolean;
}

export function RecipeCard({ recipe, onMake, compact = false }: RecipeCardProps) {
  return (
    <div className={`bg-ember/[0.06] border border-ember/[0.15] rounded-2xl p-4 ${compact ? '' : 'max-w-sm'} animate-slide-up`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-[17px] font-medium text-white">{recipe.name}</h3>
          <p className="text-[11px] text-gray-500 mt-1">{recipe.source}</p>
        </div>
        <span className="badge-ready">Ready</span>
      </div>

      <div className="border-t border-white/[0.06] pt-3 mb-3">
        {recipe.ingredients.map((ing, i) => (
          <p key={i} className="text-[13px] text-gray-400 mb-1">
            <span className="text-ember">{ing.amount} {ing.unit}</span> {ing.name}
          </p>
        ))}
      </div>

      <p className="text-[12px] text-gray-500 mb-4">
        {recipe.method}. {recipe.glass}. {recipe.garnish && `Garnish: ${recipe.garnish}`}
      </p>

      {onMake && (
        <button
          onClick={() => onMake(recipe.name)}
          className="w-full bg-ember hover:bg-ember-600 text-white rounded-xl py-3 text-[14px] font-medium transition-colors"
        >
          Make this
        </button>
      )}
    </div>
  );
}

// ============ CHAT INPUT ============
interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
  showQuickChips?: boolean;
  onQuickPrompt?: (prompt: string) => void;
}

export function ChatInput({ 
  value, 
  onChange, 
  onSend, 
  isLoading,
  showQuickChips = false,
  onQuickPrompt
}: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const quickChips = ['Something stronger', 'More bitter', 'Surprise me'];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-midnight via-midnight to-transparent pt-6 pb-8 px-6">
      <div className="max-w-3xl mx-auto">
        {showQuickChips && onQuickPrompt && (
          <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
            {quickChips.map((chip) => (
              <button
                key={chip}
                onClick={() => onQuickPrompt(chip)}
                className="bg-white/[0.03] border border-white/[0.08] rounded-full px-3 py-1.5 text-[12px] text-gray-400 whitespace-nowrap hover:bg-white/[0.05] transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>
        )}
        
        <div className="flex gap-3">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What are you in the mood for..."
            disabled={isLoading}
            className="flex-1 bg-white/[0.03] border border-white/[0.08] rounded-full px-5 py-3 text-[15px] text-white placeholder-gray-600 focus:border-ember/40 transition-colors disabled:opacity-50"
          />
          <button
            onClick={onSend}
            disabled={!value.trim() || isLoading}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              value.trim() && !isLoading
                ? 'bg-ember hover:bg-ember-600'
                : 'bg-gray-800'
            }`}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 text-white animate-spin" />
            ) : (
              <Send className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ BAR VIEW ============
interface BarViewProps {
  inventory: string[];
  recipeCount: number;
  onAddIngredient?: (item: string) => void;
  onRemoveIngredient?: (item: string) => void;
}

// Comprehensive ingredient database with aliases for search
const INGREDIENT_DATABASE: Record<string, string[]> = {
  // BASE SPIRITS - WHISKEY
  'bourbon': ['bourbon', 'bourbon whiskey', 'kentucky bourbon', 'wild turkey', 'buffalo trace', 'makers mark', 'woodford reserve', 'four roses', 'elijah craig', 'evan williams', 'old forester', 'knob creek', 'bulleit bourbon', 'angels envy', 'blantons', 'eagle rare', 'weller', 'pappy'],
  'rye whiskey': ['rye', 'rye whiskey', 'straight rye', 'rittenhouse', 'bulleit rye', 'old overholt', 'sazerac rye', 'pikesville', 'whistlepig', 'high west', 'michters rye'],
  'blended scotch': ['scotch', 'blended scotch', 'scotch whisky', 'johnnie walker', 'dewars', 'chivas', 'famous grouse', 'monkey shoulder', 'compass box'],
  'islay scotch': ['islay', 'islay scotch', 'peated scotch', 'laphroaig', 'lagavulin', 'ardbeg', 'bowmore', 'caol ila', 'bruichladdich', 'port charlotte'],
  'irish whiskey': ['irish whiskey', 'irish', 'jameson', 'bushmills', 'redbreast', 'powers', 'tullamore', 'green spot'],
  'japanese whisky': ['japanese whisky', 'japanese', 'hibiki', 'yamazaki', 'hakushu', 'nikka', 'suntory', 'toki'],
  
  // BASE SPIRITS - OTHER
  'gin': ['gin', 'london dry gin', 'london dry', 'tanqueray', 'beefeater', 'bombay', 'hendricks', 'plymouth', 'aviation gin', 'botanist', 'monkey 47', 'roku'],
  'vodka': ['vodka', 'titos', 'ketel one', 'grey goose', 'absolut', 'belvedere', 'stolichnaya', 'smirnoff', 'chopin'],
  'blanco tequila': ['blanco tequila', 'silver tequila', 'blanco', 'tequila blanco', 'white tequila', 'fortaleza blanco', 'el tesoro', 'ocho', 'tapatio', 'siete leguas', 'g4', 'terralta', 'pasote', 'cascahuin'],
  'reposado tequila': ['reposado', 'reposado tequila', 'tequila reposado', 'fortaleza reposado', 'el tesoro reposado', 'ocho reposado'],
  'anejo tequila': ['anejo', 'anejo tequila', 'tequila anejo', 'aged tequila', 'extra anejo'],
  'mezcal': ['mezcal', 'del maguey', 'vida', 'ilegal', 'montelobos', 'banhez', 'bozal', 'el jolgorio', 'vago', 'real minero', 'mal bien'],
  'white rum': ['white rum', 'silver rum', 'light rum', 'bacardi', 'havana club', 'flor de cana', 'plantation 3 star', 'banks', 'cana brava', 'probitas'],
  'aged rum': ['aged rum', 'dark rum', 'gold rum', 'jamaican rum', 'plantation', 'appleton', 'smith and cross', 'rum bar', 'hampden', 'worthy park', 'el dorado', 'mount gay', 'doorlys', 'foursquare'],
  'rhum agricole': ['rhum agricole', 'agricole', 'clement', 'neisson', 'jm', 'la favorite', 'martinique rum'],
  'cognac': ['cognac', 'brandy', 'hennessy', 'remy martin', 'courvoisier', 'pierre ferrand', 'hine', 'martell', 'hardy'],
  'calvados': ['calvados', 'apple brandy', 'applejack', 'laird\'s'],
  'pisco': ['pisco', 'pisco porton', 'barsol', 'macchu pisco'],
  'aquavit': ['aquavit', 'akvavit', 'linie'],
  'cachaça': ['cachaca', 'cachaza', 'leblon', 'novo fogo', 'yaguara', 'avua'],
  
  // LIQUEURS & APERITIFS - BITTER
  'campari': ['campari'],
  'aperol': ['aperol'],
  'bruto americano': ['bruto americano', 'bruto', 'st george bruto'],
  'cappelletti': ['cappelletti', 'aperitivo cappelletti'],
  'contratto': ['contratto', 'contratto bitter'],
  'select aperitivo': ['select', 'select aperitivo'],
  'cynar': ['cynar', 'artichoke liqueur'],
  'suze': ['suze', 'gentian liqueur'],
  
  // LIQUEURS & APERITIFS - AMARI
  'amaro nonino': ['amaro nonino', 'nonino', 'nonino quintessentia'],
  'averna': ['averna', 'amaro averna'],
  'fernet branca': ['fernet', 'fernet branca', 'branca'],
  'amaro montenegro': ['montenegro', 'amaro montenegro'],
  'amaro ciociaro': ['ciociaro', 'amaro ciociaro'],
  'amaro meletti': ['meletti', 'amaro meletti'],
  'amaro lucano': ['lucano', 'amaro lucano'],
  'amaro ramazzotti': ['ramazzotti', 'amaro ramazzotti'],
  'amaro dell\'etna': ['dell etna', 'amaro dell etna'],
  'amaro sfumato': ['sfumato', 'amaro sfumato'],
  'braulio': ['braulio', 'amaro braulio'],
  'zucca rabarbaro': ['zucca', 'rabarbaro'],
  
  // LIQUEURS & APERITIFS - HERBAL
  'green chartreuse': ['green chartreuse', 'chartreuse green', 'chartreuse verte', 'verte'],
  'yellow chartreuse': ['yellow chartreuse', 'chartreuse yellow', 'chartreuse jaune', 'jaune'],
  'benedictine': ['benedictine', 'dom', 'b&b'],
  'strega': ['strega', 'liquore strega'],
  'galliano': ['galliano', 'galliano lautentico'],
  'genepy': ['genepy', 'génépy'],
  'dolin génépy': ['dolin genepy'],
  
  // LIQUEURS & APERITIFS - MARASCHINO & CHERRY
  'maraschino liqueur': ['maraschino', 'luxardo maraschino', 'luxardo', 'maraska'],
  'cherry heering': ['cherry heering', 'heering', 'cherry liqueur'],
  
  // LIQUEURS & APERITIFS - ORANGE
  'cointreau': ['cointreau', 'triple sec'],
  'grand marnier': ['grand marnier', 'grand mar'],
  'curacao': ['curacao', 'dry curacao', 'orange curacao', 'blue curacao', 'pierre ferrand curacao'],
  
  // LIQUEURS & APERITIFS - NUT & CREAM
  'amaretto': ['amaretto', 'disaronno', 'lazzaroni'],
  'frangelico': ['frangelico', 'hazelnut liqueur'],
  'nocino': ['nocino', 'walnut liqueur'],
  'creme de cacao': ['creme de cacao', 'chocolate liqueur', 'godiva'],
  'baileys': ['baileys', 'irish cream'],
  
  // LIQUEURS & APERITIFS - COFFEE
  'coffee liqueur': ['coffee liqueur', 'kahlua', 'mr black', 'tia maria', 'caffè'],
  
  // LIQUEURS & APERITIFS - FLORAL
  'st-germain': ['st germain', 'st-germain', 'elderflower', 'elderflower liqueur'],
  'creme de violette': ['creme de violette', 'violet liqueur', 'violette', 'rothman and winter'],
  'creme de rose': ['creme de rose', 'rose liqueur'],
  
  // LIQUEURS & APERITIFS - FRUIT
  'chambord': ['chambord', 'raspberry liqueur'],
  'creme de cassis': ['cassis', 'creme de cassis', 'blackcurrant'],
  'creme de mure': ['creme de mure', 'blackberry liqueur'],
  'peach liqueur': ['peach liqueur', 'creme de peche', 'peach schnapps'],
  'poire william': ['poire william', 'pear brandy', 'clear creek'],
  'apple liqueur': ['apple liqueur', 'apple schnapps', 'berentzen'],
  
  // LIQUEURS & APERITIFS - ANISE
  'absinthe': ['absinthe', 'pernod', 'herbsaint', 'st george absinthe', 'kübler', 'vieux pontarlier'],
  'pastis': ['pastis', 'ricard', 'pastis 51'],
  'sambuca': ['sambuca'],
  'anisette': ['anisette'],
  
  // LIQUEURS & APERITIFS - OTHER
  'falernum': ['falernum', 'velvet falernum', 'john d taylor'],
  'allspice dram': ['allspice dram', 'pimento dram', 'st elizabeth'],
  'licor 43': ['licor 43', 'cuarenta y tres'],
  'drambuie': ['drambuie'],
  'midori': ['midori', 'melon liqueur'],
  'domaine de canton': ['canton', 'ginger liqueur', 'domaine de canton'],
  'limoncello': ['limoncello'],
  
  // VERMOUTH & AROMATIZED WINE
  'sweet vermouth': ['sweet vermouth', 'vermouth rosso', 'carpano antica', 'cocchi vermouth di torino', 'dolin rouge', 'martini rosso', 'cinzano rosso'],
  'dry vermouth': ['dry vermouth', 'vermouth dry', 'dolin dry', 'noilly prat', 'martini dry'],
  'bianco vermouth': ['bianco vermouth', 'vermouth bianco', 'dolin blanc', 'martini bianco'],
  'punt e mes': ['punt e mes', 'carpano punt e mes'],
  'lillet blanc': ['lillet blanc', 'lillet', 'kina lillet'],
  'lillet rouge': ['lillet rouge', 'lillet red'],
  'cocchi americano': ['cocchi americano', 'cocchi'],
  'dubonnet': ['dubonnet'],
  'byrrh': ['byrrh'],
  'pineau des charentes': ['pineau', 'pineau des charentes'],
  
  // WINE & SPARKLING
  'champagne': ['champagne', 'sparkling wine', 'brut'],
  'prosecco': ['prosecco'],
  'cava': ['cava'],
  'sherry': ['sherry', 'fino sherry', 'manzanilla', 'amontillado', 'oloroso', 'pedro ximenez', 'px'],
  'port': ['port', 'ruby port', 'tawny port'],
  'madeira': ['madeira'],
  'marsala': ['marsala'],
  
  // CITRUS & JUICE
  'lemon juice': ['lemon juice', 'lemon', 'fresh lemon'],
  'lime juice': ['lime juice', 'lime', 'fresh lime'],
  'orange juice': ['orange juice', 'oj', 'fresh orange'],
  'grapefruit juice': ['grapefruit juice', 'grapefruit', 'fresh grapefruit'],
  'pineapple juice': ['pineapple juice', 'pineapple'],
  'cranberry juice': ['cranberry juice', 'cranberry'],
  'pomegranate juice': ['pomegranate juice', 'pomegranate', 'pom'],
  'passion fruit': ['passion fruit', 'passion fruit juice', 'passion fruit puree', 'lilikoi'],
  
  // SWEETENERS & SYRUPS
  'simple syrup': ['simple syrup', 'simple', 'sugar syrup', '1:1 syrup'],
  'rich simple syrup': ['rich simple', 'rich syrup', '2:1 syrup', 'demerara syrup'],
  'demerara syrup': ['demerara', 'demerara syrup'],
  'agave nectar': ['agave', 'agave nectar', 'agave syrup'],
  'honey syrup': ['honey syrup', 'honey'],
  'honey ginger syrup': ['honey ginger', 'honey ginger syrup', 'ginger honey'],
  'maple syrup': ['maple syrup', 'maple'],
  'cinnamon syrup': ['cinnamon syrup', 'cinnamon'],
  'vanilla syrup': ['vanilla syrup', 'vanilla'],
  'orgeat': ['orgeat', 'almond syrup', 'orzata'],
  'grenadine': ['grenadine', 'pomegranate syrup'],
  'raspberry syrup': ['raspberry syrup'],
  'gum syrup': ['gum syrup', 'gomme'],
  
  // BITTERS
  'angostura bitters': ['angostura', 'angostura bitters', 'ango'],
  'orange bitters': ['orange bitters', 'regan\'s orange', 'fee brothers orange', 'angostura orange'],
  'peychauds bitters': ['peychaud', 'peychauds', 'peychauds bitters'],
  'chocolate bitters': ['chocolate bitters', 'aztec chocolate'],
  'coffee bitters': ['coffee bitters'],
  'cherry bitters': ['cherry bitters', 'cherry bark vanilla'],
  'aromatic bitters': ['aromatic bitters'],
  'celery bitters': ['celery bitters'],
  'grapefruit bitters': ['grapefruit bitters'],
  'mole bitters': ['mole bitters'],
  'tiki bitters': ['tiki bitters'],
  'creole bitters': ['creole bitters'],
  
  // MIXERS
  'soda water': ['soda water', 'soda', 'club soda', 'sparkling water', 'seltzer'],
  'tonic water': ['tonic', 'tonic water', 'fever tree tonic', 'q tonic'],
  'ginger beer': ['ginger beer', 'fever tree ginger beer', 'bundaberg', 'goslings ginger beer'],
  'ginger ale': ['ginger ale', 'canada dry'],
  'cola': ['cola', 'coke', 'coca cola', 'pepsi'],
  'grapefruit soda': ['grapefruit soda', 'squirt', 'jarritos grapefruit', 'ting'],
  'cream': ['cream', 'heavy cream', 'half and half'],
  'coconut cream': ['coconut cream', 'coco lopez', 'cream of coconut'],
  
  // FRESH INGREDIENTS
  'mint': ['mint', 'fresh mint', 'spearmint'],
  'basil': ['basil', 'fresh basil', 'thai basil'],
  'rosemary': ['rosemary'],
  'thyme': ['thyme'],
  'sage': ['sage'],
  'fresh ginger': ['fresh ginger', 'ginger root', 'ginger'],
  'cucumber': ['cucumber'],
  'jalapeño': ['jalapeno', 'jalapeño'],
  'serrano': ['serrano', 'serrano pepper'],
  'egg white': ['egg white', 'egg whites'],
  'egg yolk': ['egg yolk'],
  'whole egg': ['whole egg', 'egg'],
  
  // SPECIALTY & FAT-WASHED
  'bacon fat-washed bourbon': ['bacon bourbon', 'bacon fat washed', 'bentons'],
  'brown butter bourbon': ['brown butter bourbon', 'brown butter'],
  'blackberry puree': ['blackberry puree', 'blackberry'],
  'strawberry puree': ['strawberry puree', 'strawberry'],
  'raspberry puree': ['raspberry puree'],
  
  // GARNISHES & OTHER
  'luxardo cherries': ['luxardo cherries', 'luxardo cherry', 'maraschino cherries'],
  'olives': ['olives', 'cocktail olives'],
  'cocktail onions': ['cocktail onions', 'pearl onions'],
};

// Build flat list and search index
const ALL_INGREDIENTS = Object.keys(INGREDIENT_DATABASE);
const SEARCH_INDEX: Record<string, string> = {};
Object.entries(INGREDIENT_DATABASE).forEach(([canonical, aliases]) => {
  aliases.forEach(alias => {
    SEARCH_INDEX[alias.toLowerCase()] = canonical;
  });
});

// Categories for display grouping
const INGREDIENT_CATEGORIES: Record<string, string[]> = {
  'Whiskey': ['bourbon', 'rye whiskey', 'blended scotch', 'islay scotch', 'irish whiskey', 'japanese whisky'],
  'Gin & Vodka': ['gin', 'vodka'],
  'Tequila & Mezcal': ['blanco tequila', 'reposado tequila', 'anejo tequila', 'mezcal'],
  'Rum': ['white rum', 'aged rum', 'rhum agricole'],
  'Brandy': ['cognac', 'calvados', 'pisco'],
  'Bitter Aperitifs': ['campari', 'aperol', 'bruto americano', 'cappelletti', 'cynar', 'suze'],
  'Amari': ['amaro nonino', 'averna', 'fernet branca', 'amaro montenegro', 'amaro ciociaro', 'amaro meletti', 'braulio'],
  'Herbal Liqueurs': ['green chartreuse', 'yellow chartreuse', 'benedictine', 'strega', 'galliano', 'genepy'],
  'Orange Liqueurs': ['cointreau', 'grand marnier', 'curacao'],
  'Other Liqueurs': ['maraschino liqueur', 'st-germain', 'amaretto', 'frangelico', 'coffee liqueur', 'falernum', 'allspice dram', 'creme de violette', 'absinthe', 'licor 43', 'drambuie'],
  'Vermouth': ['sweet vermouth', 'dry vermouth', 'bianco vermouth', 'punt e mes', 'lillet blanc', 'cocchi americano'],
  'Wine & Sparkling': ['champagne', 'prosecco', 'sherry', 'port'],
  'Citrus': ['lemon juice', 'lime juice', 'orange juice', 'grapefruit juice', 'pineapple juice'],
  'Sweeteners': ['simple syrup', 'demerara syrup', 'agave nectar', 'honey syrup', 'honey ginger syrup', 'maple syrup', 'orgeat', 'grenadine'],
  'Bitters': ['angostura bitters', 'orange bitters', 'peychauds bitters', 'chocolate bitters', 'coffee bitters', 'cherry bitters'],
  'Mixers': ['soda water', 'tonic water', 'ginger beer', 'ginger ale', 'grapefruit soda', 'cream', 'coconut cream'],
  'Fresh': ['mint', 'basil', 'fresh ginger', 'cucumber', 'jalapeño', 'egg white'],
};

export function BarView({ inventory, recipeCount, onAddIngredient, onRemoveIngredient }: BarViewProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const { fillLevels, setFillLevel } = useStore();

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const inventoryByCategory = React.useMemo(() => {
    const grouped: Record<string, string[]> = {};
    for (const [category, items] of Object.entries(INGREDIENT_CATEGORIES)) {
      const matching = items.filter(item => inventory.includes(item));
      if (matching.length > 0) grouped[category] = matching;
    }
    const allCategorized = Object.values(INGREDIENT_CATEGORIES).flat();
    const uncategorized = inventory.filter(item => !allCategorized.includes(item));
    if (uncategorized.length > 0) grouped['Other'] = uncategorized;
    return grouped;
  }, [inventory]);

  const suggestions = React.useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) {
      const popular = ['campari', 'green chartreuse', 'mezcal', 'cognac', 'absinthe', 'fernet branca', 'amaro nonino', 'st-germain', 'punt e mes', 'amaretto'];
      return { available: popular.filter(item => !inventory.includes(item)).slice(0, 6), inBar: [] };
    }
    const available = new Set<string>();
    const inBar = new Set<string>();
    Object.entries(INGREDIENT_DATABASE).forEach(([canonical, aliases]) => {
      const hasMatch = aliases.some(alias => alias.toLowerCase().includes(term));
      if (hasMatch) {
        if (inventory.includes(canonical)) inBar.add(canonical);
        else available.add(canonical);
      }
    });
    ALL_INGREDIENTS.forEach(ingredient => {
      if (ingredient.toLowerCase().includes(term)) {
        if (inventory.includes(ingredient)) inBar.add(ingredient);
        else available.add(ingredient);
      }
    });
    return { available: Array.from(available).slice(0, 8), inBar: Array.from(inBar).slice(0, 4) };
  }, [searchTerm, inventory]);

  const getDisplayName = (canonical: string): { name: string; alias?: string } => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return { name: canonical };
    const aliases = INGREDIENT_DATABASE[canonical] || [];
    const matchingAlias = aliases.find(a => a.toLowerCase().includes(term) && a.toLowerCase() !== canonical.toLowerCase());
    if (matchingAlias && matchingAlias.toLowerCase() !== canonical.toLowerCase()) return { name: canonical, alias: matchingAlias };
    return { name: canonical };
  };

  const handleAddIngredient = (item: string) => {
    if (onAddIngredient) onAddIngredient(item);
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const handleAddCustom = () => {
    const term = searchTerm.trim().toLowerCase();
    if (term && !inventory.includes(term) && onAddIngredient) {
      const canonical = SEARCH_INDEX[term];
      if (canonical && !inventory.includes(canonical)) onAddIngredient(canonical);
      else onAddIngredient(term);
      setSearchTerm('');
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      if (suggestions.available.length > 0) handleAddIngredient(suggestions.available[0]);
      else handleAddCustom();
    }
    if (e.key === 'Escape') { setShowSuggestions(false); inputRef.current?.blur(); }
  };

  const FILL_LEVELS: FillLevel[] = [100, 75, 50, 25];

  const getFillColor = (level: FillLevel) => {
    if (level <= 25) return '#E24B4A';
    if (level <= 50) return '#BA7517';
    return 'var(--forest)';
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-light mb-2">My Bar</h2>
      <p className="text-gray-500 text-sm mb-6">
        {inventory.length} ingredients · {recipeCount} cocktails ready
      </p>

      {onAddIngredient && (
        <div className="relative mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setShowSuggestions(true); }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={handleKeyDown}
              placeholder="Search ingredients to add..."
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3 text-[14px] text-white placeholder-gray-600 focus:border-ember/40 transition-colors"
            />
          </div>
          {showSuggestions && (
            <div ref={dropdownRef} className="absolute top-full left-0 right-0 mt-2 bg-midnight-100 border border-white/[0.1] rounded-xl overflow-hidden z-10 shadow-xl max-h-80 overflow-y-auto">
              {!searchTerm.trim() && (
                <div className="px-4 py-2 border-b border-white/[0.06]">
                  <span className="text-[11px] text-gray-500 uppercase tracking-wider">Popular additions</span>
                </div>
              )}
              {suggestions.inBar.length > 0 && (
                <>
                  <div className="px-4 py-2 border-b border-white/[0.06]">
                    <span className="text-[11px] text-forest uppercase tracking-wider">Already in your bar</span>
                  </div>
                  {suggestions.inBar.map(item => {
                    const display = getDisplayName(item);
                    return (
                      <div key={item} className="w-full text-left px-4 py-3 text-[14px] text-gray-500 flex items-center gap-3 bg-forest/5">
                        <Check className="w-4 h-4 text-forest flex-shrink-0" />
                        <span className="capitalize">{display.name}</span>
                        {display.alias && <span className="text-gray-600 text-[12px]">({display.alias})</span>}
                      </div>
                    );
                  })}
                </>
              )}
              {suggestions.available.length > 0 ? (
                <>
                  {suggestions.inBar.length > 0 && (
                    <div className="px-4 py-2 border-b border-white/[0.06] border-t border-white/[0.06]">
                      <span className="text-[11px] text-gray-500 uppercase tracking-wider">Add to bar</span>
                    </div>
                  )}
                  {suggestions.available.map(item => {
                    const display = getDisplayName(item);
                    return (
                      <button key={item} onClick={() => handleAddIngredient(item)} className="w-full text-left px-4 py-3 text-[14px] text-gray-300 hover:bg-ember/10 hover:text-white transition-colors flex items-center gap-3">
                        <Plus className="w-4 h-4 text-ember/50 flex-shrink-0" />
                        <span className="capitalize">{display.name}</span>
                        {display.alias && <span className="text-gray-500 text-[12px]">({display.alias})</span>}
                      </button>
                    );
                  })}
                </>
              ) : searchTerm.trim() && suggestions.inBar.length === 0 ? (
                <div className="px-4 py-3">
                  <p className="text-gray-500 text-[13px] mb-2">No exact matches</p>
                  <button onClick={handleAddCustom} className="text-ember text-[13px] hover:underline">
                    + Add "{searchTerm.trim()}" as custom ingredient
                  </button>
                </div>
              ) : null}
            </div>
          )}
        </div>
      )}

      {/* Categorized inventory with fill levels */}
      <div className="space-y-6">
        {Object.entries(inventoryByCategory).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-[11px] text-gray-500 uppercase tracking-wider mb-3">{category}</h3>
            <div className="space-y-2">
              {items.sort().map((item) => {
                const level = fillLevels[item] ?? 100;
                const isLow = level <= 25;
                const fillColor = getFillColor(level as FillLevel);
                return (
                  <div key={item} className="bg-white/[0.02] border rounded-xl px-4 py-3" style={{ borderColor: isLow ? '#E24B4A44' : 'var(--line)' }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="ingredient-dot" style={{ background: fillColor }} />
                        <span className="capitalize text-[14px] text-gray-300">{item}</span>
                        {isLow && <span className="text-[10px] font-medium" style={{ color: '#E24B4A' }}>Low!</span>}
                      </div>
                      {onRemoveIngredient && (
                        <button onClick={() => onRemoveIngredient(item)} className="text-gray-600 hover:text-red-400 transition-colors text-[12px]">×</button>
                      )}
                    </div>
                    {/* Fill level bar + tap controls */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-300" style={{ width: `${level}%`, background: fillColor }} />
                      </div>
                      <div className="flex gap-1">
                        {FILL_LEVELS.map(lvl => (
                          <button
                            key={lvl}
                            onClick={() => setFillLevel(item, lvl)}
                            className="rounded text-[9px] px-1.5 py-0.5 transition-colors"
                            style={{
                              background: level === lvl ? fillColor : 'var(--surface-1)',
                              color: level === lvl ? 'white' : 'var(--text-tertiary)',
                              border: `1px solid ${level === lvl ? fillColor : 'var(--line)'}`,
                            }}
                          >
                            {lvl === 100 ? 'Full' : lvl === 75 ? '¾' : lvl === 50 ? '½' : '¼'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {inventory.length === 0 && (
        <div className="text-center py-16">
          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '22px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            The shelf is bare
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', lineHeight: 1.5, maxWidth: '260px', margin: '0 auto 20px' }}>
            Search above to add what you have — even a few bottles unlocks dozens of cocktails.
          </p>
        </div>
      )}
    </div>
  );
}

// ============ RECIPES VIEW ============
interface RecipesViewProps {
  recipes: Recipe[];
  savedRecipes: Recipe[];
  onMakeRecipe?: (name: string) => void;
  onSaveRecipe?: (recipe: Recipe) => void;
  onUnsaveRecipe?: (recipeId: string) => void;
  onSelectRecipe?: (recipe: Recipe) => void;
}

// Spirit filter categories mapped to ingredient keywords
const SPIRIT_FILTERS: Record<string, string[]> = {
  'All': [],
  'Bourbon': ['bourbon'],
  'Rye': ['rye'],
  'Scotch': ['scotch'],
  'Tequila': ['tequila', 'blanco tequila', 'reposado tequila'],
  'Mezcal': ['mezcal'],
  'Gin': ['gin'],
  'Rum': ['rum'],
  'Amaro': ['amaro', 'fernet', 'campari', 'aperol', 'nonino', 'averna'],
  'Chartreuse': ['chartreuse'],
  'Saved': [], // special case
};

export function RecipesView({ recipes, savedRecipes, onMakeRecipe, onSaveRecipe, onUnsaveRecipe, onSelectRecipe }: RecipesViewProps) {
  const [spiritFilter, setSpiritFilter] = React.useState<string>('All');
  const [searchQuery, setSearchQuery] = React.useState('');
  const savedIds = savedRecipes.map(r => r.id);

  // Combine makeable + saved (deduplicated)
  const allRecipes = React.useMemo(() => {
    const makeableIds = new Set(recipes.map(r => r.id));
    const extraSaved = savedRecipes.filter(r => !makeableIds.has(r.id));
    return [...recipes, ...extraSaved];
  }, [recipes, savedRecipes]);

  const filteredRecipes = React.useMemo(() => {
    let pool = spiritFilter === 'Saved'
      ? savedRecipes
      : allRecipes;

    // Spirit filter
    if (spiritFilter !== 'All' && spiritFilter !== 'Saved') {
      const keywords = SPIRIT_FILTERS[spiritFilter] || [];
      pool = pool.filter(r =>
        r.ingredients.some(ing =>
          keywords.some(kw => ing.name.toLowerCase().includes(kw))
        ) || r.tags.some(t => keywords.some(kw => t.toLowerCase().includes(kw)))
      );
    }

    // Text search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      pool = pool.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.ingredients.some(i => i.name.toLowerCase().includes(q)) ||
        r.tags.some(t => t.toLowerCase().includes(q)) ||
        r.source.toLowerCase().includes(q)
      );
    }

    return pool;
  }, [allRecipes, savedRecipes, spiritFilter, searchQuery]);

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-light mb-2">Recipes</h2>
      <p className="text-gray-500 text-sm mb-5">
        {recipes.length} ready to pour · {savedRecipes.length} saved
      </p>

      {/* Search bar */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search by name, spirit, or tag..."
          className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3 text-[14px] text-white placeholder-gray-600 focus:border-ember/40 transition-colors"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">×</button>
        )}
      </div>

      {/* Spirit filter chips */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {Object.keys(SPIRIT_FILTERS).map(filter => (
          <button
            key={filter}
            onClick={() => setSpiritFilter(filter)}
            className="px-3 py-1.5 rounded-full text-[12px] whitespace-nowrap transition-colors flex items-center gap-1"
            style={{
              background: spiritFilter === filter ? 'var(--ember)' : 'var(--surface-1)',
              color: spiritFilter === filter ? 'white' : 'var(--text-tertiary)',
              border: `1px solid ${spiritFilter === filter ? 'var(--ember)' : 'var(--line)'}`,
            }}
          >
            {filter === 'Saved' && <Bookmark className="w-3 h-3" />}
            {filter}{filter === 'Saved' && savedRecipes.length > 0 && ` (${savedRecipes.length})`}
          </button>
        ))}
      </div>

      <div style={{ borderTop: '1px solid var(--line)' }}>
        {filteredRecipes.map((recipe) => {
          const isSaved = savedIds.includes(recipe.id);
          const isMakeable = recipes.some(r => r.id === recipe.id);
          return (
            <div key={recipe.id} style={{ borderBottom: '1px solid var(--line)' }}>
              <div className="flex items-start justify-between py-4 cursor-pointer" onClick={() => onSelectRecipe?.(recipe)}>
                <div className="flex-1 pr-3">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    {isMakeable && <span className="badge-ready">Ready</span>}
                    {isSaved && !isMakeable && <span style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-tertiary)', border: '1px solid var(--line)', padding: '2px 8px', borderRadius: '2px' }}>Saved</span>}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400, fontSize: '20px', lineHeight: 1.2, color: 'var(--text-primary)', margin: '0 0 4px' }}>{recipe.name}</h3>
                  <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '8px' }}>{recipe.source}</p>
                  <div className="flex flex-wrap gap-1">
                    {recipe.tags.filter(t => !t.startsWith('finish:') && !t.startsWith('alt:') && t !== 'custom' && t !== 'ai-created').slice(0, 3).map((tag) => (
                      <span key={tag} style={{ fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-tertiary)', border: '1px solid var(--line)', padding: '2px 8px', borderRadius: '2px' }}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0 mt-1">
                  {onSaveRecipe && onUnsaveRecipe && (
                    <button
                      onClick={e => { e.stopPropagation(); isSaved ? onUnsaveRecipe(recipe.id) : onSaveRecipe(recipe); }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                    >
                      {isSaved
                        ? <BookmarkCheck className="w-4 h-4" style={{ color: 'var(--ember)' }} />
                        : <Bookmark className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                      }
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredRecipes.length === 0 && (
        <div className="text-center py-16">
          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '20px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
            {searchQuery ? `Nothing for "${searchQuery}"` : spiritFilter === 'Saved' ? 'No saved drinks yet' : 'Nothing matches this filter'}
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginBottom: '16px' }}>
            {spiritFilter === 'Saved' ? 'Tap the bookmark on any drink to save it here.' : 'Try a different search or filter.'}
          </p>
          {spiritFilter !== 'All' && (
            <button onClick={() => { setSpiritFilter('All'); setSearchQuery(''); }} className="quick-reply" style={{ borderColor: 'var(--ember)', color: 'var(--ember)' }}>
              Show all
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ============ PROFILE VIEW ============
interface ProfileViewProps {
  recentlyMade: string[];
  recipeCount: number;
  inventoryCount: number;
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

export function ProfileView({ recentlyMade, recipeCount, inventoryCount, preferences }: ProfileViewProps) {
  // Calculate top flavor preferences
  const flavorEntries = Object.entries(preferences)
    .filter(([key]) => key !== 'strength')
    .sort((a, b) => b[1] - a[1]);
  
  const topFlavors = flavorEntries.slice(0, 3);
  
  // Flavor colors
  const flavorColors: Record<string, string> = {
    bitter: 'bg-amber-500',
    sweet: 'bg-pink-500',
    citrus: 'bg-yellow-500',
    herbal: 'bg-green-500',
    smoky: 'bg-gray-500',
    spicy: 'bg-red-500'
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Profile Header */}
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-ember to-amber-600 flex items-center justify-center">
          <User className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-medium text-white mb-1">Your Profile</h2>
        <p className="text-gray-500 text-sm">Home bartender</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-center">
          <p className="text-2xl font-light text-ember">{recipeCount}</p>
          <p className="text-[11px] text-gray-500 mt-1">Available</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-center">
          <p className="text-2xl font-light text-white">{inventoryCount}</p>
          <p className="text-[11px] text-gray-500 mt-1">Ingredients</p>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-center">
          <p className="text-2xl font-light text-forest">{recentlyMade.length}</p>
          <p className="text-[11px] text-gray-500 mt-1">Made</p>
        </div>
      </div>

      {/* Flavor Profile */}
      <div>
        <h3 className="text-[11px] text-gray-500 uppercase tracking-wider mb-4">Your Flavor Profile</h3>
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
          <div className="space-y-4">
            {flavorEntries.map(([flavor, value]) => (
              <div key={flavor} className="flex items-center gap-3">
                <span className="text-[13px] text-gray-400 w-16 capitalize">{flavor}</span>
                <div className="flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${flavorColors[flavor] || 'bg-ember'}`}
                    style={{ width: `${value * 100}%` }}
                  />
                </div>
                <span className="text-[12px] text-gray-500 w-8 text-right">{Math.round(value * 100)}%</span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-white/[0.06] mt-5 pt-4">
            <p className="text-[13px] text-gray-400">
              You tend to prefer <span className="text-white font-medium">{topFlavors[0]?.[0]}</span> and <span className="text-white font-medium">{topFlavors[1]?.[0]}</span> flavors with 
              <span className="text-white font-medium"> {preferences.strength > 0.6 ? 'stronger' : preferences.strength > 0.4 ? 'medium' : 'lighter'}</span> cocktails.
            </p>
          </div>
        </div>
      </div>

      {/* Recently Made */}
      {recentlyMade.length > 0 && (
        <div>
          <h3 className="text-[11px] text-gray-500 uppercase tracking-wider mb-4">Recently Made</h3>
          <div className="space-y-2">
            {recentlyMade.slice(0, 5).map((drink, i) => (
              <div 
                key={i}
                className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 flex items-center justify-between"
              >
                <span className="text-[14px] text-gray-300">{drink}</span>
                <span className="text-[11px] text-gray-600">#{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Social Section - Coming Soon */}
      <div>
        <h3 className="text-[11px] text-gray-500 uppercase tracking-wider mb-4">Friends</h3>
        <div className="bg-white/[0.03] border border-white/[0.06] border-dashed rounded-xl p-6 text-center">
          <Users className="w-8 h-8 text-gray-600 mx-auto mb-3" />
          <p className="text-[14px] text-gray-400 mb-1">Coming Soon</p>
          <p className="text-[12px] text-gray-600">Follow friends to see what they're making</p>
        </div>
      </div>
    </div>
  );
}

// ============ BEGINNER ONBOARDING FLOW ============

interface BeginnerFlowProps {
  onComplete: (preferences: { mood: string; bitter: string; strength: number }) => void;
  onSkip: () => void;
}

export function BeginnerFlow({ onComplete, onSkip }: BeginnerFlowProps) {
  const [step, setStep] = React.useState(0);
  const [mood, setMood] = React.useState('');
  const [bitter, setBitter] = React.useState('');
  const [strength, setStrength] = React.useState(0.5);

  const steps = [
    {
      label: 'Question 1 of 3',
      title: 'What sounds good right now?',
      options: [
        { value: 'refreshing', label: 'Something refreshing', sub: 'Bright, citrusy, easy to drink' },
        { value: 'strong', label: 'Something strong', sub: 'Spirit-forward, bold, warming' },
        { value: 'complex', label: 'Something complex', sub: 'Layered, interesting, surprising' },
        { value: 'unknown', label: "I don't know yet", sub: 'Help me discover' },
      ],
      selected: mood,
      onSelect: (v: string) => { setMood(v); setTimeout(() => setStep(1), 200); },
    },
    {
      label: 'Question 2 of 3',
      title: 'How do you feel about bitter?',
      options: [
        { value: 'love', label: 'Love it', sub: 'Negronis, Campari, amari' },
        { value: 'some', label: 'A little is nice', sub: 'Balanced, not overpowering' },
        { value: 'no', label: 'Not for me', sub: 'Keep it smooth and sweet' },
        { value: 'new', label: "What's bitter?", sub: "I'm new to this" },
      ],
      selected: bitter,
      onSelect: (v: string) => { setBitter(v); setTimeout(() => setStep(2), 200); },
    },
  ];

  const getStrengthLabel = () => {
    if (strength < 0.35) return { label: 'Light & easy', sub: 'Low ABV, refreshing' };
    if (strength < 0.65) return { label: 'Balanced', sub: 'Flavorful but not too boozy' };
    return { label: 'Spirit-forward', sub: 'Bold, warming, complex' };
  };

  const strengthInfo = getStrengthLabel();

  if (step < 2) {
    const current = steps[step];
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-6" style={{ background: 'var(--bg)' }}>
        <div className="w-full max-w-sm animate-fade-in">
          <p className="text-[11px] tracking-[2px] uppercase text-center mb-2" style={{ color: 'var(--text-tertiary)' }}>{current.label}</p>
          <h2 className="text-[22px] font-light text-center mb-8" style={{ color: 'var(--text-primary)' }}>{current.title}</h2>
          <div className="space-y-3">
            {current.options.map(opt => (
              <button
                key={opt.value}
                onClick={() => current.onSelect(opt.value)}
                className="w-full text-left rounded-2xl px-5 py-4 transition-all"
                style={{
                  background: current.selected === opt.value ? 'rgba(216,90,48,0.15)' : 'var(--surface-1)',
                  border: `1px solid ${current.selected === opt.value ? 'var(--ember)' : 'var(--line)'}`,
                }}
              >
                <p className="text-[15px]" style={{ color: 'var(--text-primary)' }}>{opt.label}</p>
                <p className="text-[12px] mt-1" style={{ color: 'var(--text-tertiary)' }}>{opt.sub}</p>
              </button>
            ))}
          </div>
          <div className="flex gap-2 justify-center mt-8">
            {[0, 1, 2].map(i => (
              <div key={i} className="h-1 rounded-full transition-all" style={{ width: i === step ? '28px' : '20px', background: i <= step ? 'var(--ember)' : 'var(--line)' }} />
            ))}
          </div>
          <button onClick={onSkip} className="w-full text-center mt-6 text-[13px]" style={{ color: 'var(--text-tertiary)' }}>Skip for now</button>
        </div>
      </div>
    );
  }

  // Step 3: Strength slider
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6" style={{ background: 'var(--bg)' }}>
      <div className="w-full max-w-sm animate-fade-in">
        <p className="text-[11px] tracking-[2px] uppercase text-center mb-2" style={{ color: 'var(--text-tertiary)' }}>Question 3 of 3</p>
        <h2 className="text-[22px] font-light text-center mb-8" style={{ color: 'var(--text-primary)' }}>How strong do you like it?</h2>

        <div className="mb-8 px-2">
          <div className="flex justify-between mb-4">
            <span className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>Light & easy</span>
            <span className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>Spirit-forward</span>
          </div>
          <div className="relative mb-6">
            <div className="h-1.5 rounded-full" style={{ background: 'var(--surface-1)' }}>
              <div className="h-full rounded-full transition-all" style={{ width: `${strength * 100}%`, background: 'linear-gradient(90deg, var(--forest) 0%, var(--ember) 100%)' }} />
            </div>
            <input
              type="range" min="0" max="1" step="0.05"
              value={strength}
              onChange={e => setStrength(parseFloat(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-pointer w-full"
            />
            <div className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 transition-all"
              style={{ left: `calc(${strength * 100}% - 10px)`, background: 'var(--ember)', borderColor: 'var(--bg)', boxShadow: '0 0 12px rgba(216,90,48,0.4)' }}
            />
          </div>
          <div className="text-center py-4 px-5 rounded-xl" style={{ background: 'var(--surface-1)', border: '1px solid var(--line)' }}>
            <p className="text-[18px] font-light" style={{ color: 'var(--ember)' }}>{strengthInfo.label}</p>
            <p className="text-[12px] mt-1" style={{ color: 'var(--text-tertiary)' }}>{strengthInfo.sub}</p>
          </div>
        </div>

        <div className="flex gap-2 justify-center mb-8">
          {[0, 1, 2].map(i => (
            <div key={i} className="h-1 rounded-full" style={{ width: '28px', background: 'var(--ember)' }} />
          ))}
        </div>

        <button
          onClick={() => onComplete({ mood, bitter, strength })}
          className="w-full py-4 rounded-xl text-[15px] font-medium transition-colors"
          style={{ background: 'var(--ember)', color: 'white' }}
        >
          Find my drinks →
        </button>
        <button onClick={onSkip} className="w-full text-center mt-4 text-[13px]" style={{ color: 'var(--text-tertiary)' }}>Skip for now</button>
      </div>
    </div>
  );
}

// ============ RECIPE DETAIL VIEW ============
interface RecipeDetailViewProps {
  recipe: Recipe;
  allRecipes: Recipe[];
  onClose: () => void;
  onMake?: (name: string) => void;
  onSave?: (recipe: Recipe) => void;
  onUnsave?: (recipeId: string) => void;
  saved?: boolean;
  onSelectRecipe?: (recipe: Recipe) => void;
}

export function RecipeDetailView({ recipe, allRecipes, onClose, onMake, onSave, onUnsave, saved = false, onSelectRecipe }: RecipeDetailViewProps) {
  const cleanTags = recipe.tags.filter(t => !t.startsWith('finish:') && !t.startsWith('alt:') && t !== 'custom' && t !== 'ai-created');
  const profileTag = cleanTags[0];
  const methodVerb = recipe.method.split(/\s/)[0];

  const isAICreated = recipe.id?.startsWith('ai-') || recipe.creator === 'Speakeasier AI';
  const createdBy = isAICreated
    ? 'Speakeasier AI · Tonight'
    : [recipe.creator, recipe.source, recipe.year ? String(recipe.year) : null].filter(Boolean).join(' · ');

  const similarRecipes = React.useMemo(() => {
    return allRecipes
      .filter(r => r.id !== recipe.id)
      .map(r => ({
        recipe: r,
        overlap: cleanTags.filter(t => r.tags.includes(t)).length,
      }))
      .filter(x => x.overlap > 0)
      .sort((a, b) => b.overlap - a.overlap)
      .slice(0, 2)
      .map(x => x.recipe);
  }, [allRecipes, recipe.id, cleanTags]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-fade-in" style={{ background: 'var(--bg)' }}>
      <div className="vignette" /><div className="grain" />

      {/* Hero gradient */}
      <div className="relative" style={{ height: '210px', background: 'linear-gradient(180deg, #2a1810 0%, var(--bg) 100%)' }}>
        {/* Top nav */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-5 pt-12">
          <button onClick={onClose} className="flex items-center gap-2" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)' }}>
            <ArrowLeft className="w-4 h-4" />
            <span style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Back</span>
          </button>
          <button
            onClick={() => saved ? onUnsave?.(recipe.id) : onSave?.(recipe)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
          >
            {saved
              ? <BookmarkCheck className="w-5 h-5" style={{ color: 'var(--ember)' }} />
              : <Bookmark className="w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
            }
          </button>
        </div>

        {/* Hero text */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-5">
          <div className="flex gap-2 mb-2 flex-wrap">
            <span style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', background: 'var(--forest)', color: 'white', padding: '3px 10px', borderRadius: '2px' }}>
              You can make this
            </span>
            {recipe.category && (
              <span style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--text-tertiary)', padding: '3px 10px', border: '1px solid var(--line)', borderRadius: '2px' }}>
                {recipe.category}
              </span>
            )}
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400, fontSize: '30px', lineHeight: 1.1, color: 'var(--text-primary)', margin: 0 }}>
            {recipe.name}
          </h1>
          {createdBy && (
            <p style={{ color: 'var(--text-tertiary)', fontSize: '12px', marginTop: '5px' }}>{createdBy}</p>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="relative z-10 px-6 pb-36 max-w-2xl mx-auto">

        {/* Stat pills */}
        <div className="flex gap-3 mt-6 mb-8">
          {profileTag && (
            <div className="flex-1 text-center py-4" style={{ border: '1px solid var(--line)' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '15px', color: 'var(--text-primary)', margin: 0 }}>{profileTag}</p>
              <p className="eyebrow mt-1">Profile</p>
            </div>
          )}
          <div className="flex-1 text-center py-4" style={{ border: '1px solid var(--line)' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '15px', color: 'var(--text-primary)', margin: 0 }}>{methodVerb}</p>
            <p className="eyebrow mt-1">Method</p>
          </div>
          <div className="flex-1 text-center py-4" style={{ border: '1px solid var(--line)' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '15px', color: 'var(--text-primary)', margin: 0 }}>{recipe.glass}</p>
            <p className="eyebrow mt-1">Glass</p>
          </div>
        </div>

        {/* Ingredients */}
        <div className="mb-8">
          <p className="eyebrow mb-4">Ingredients</p>
          <div style={{ borderTop: '1px solid var(--line)' }}>
            {recipe.ingredients.map((ing, i) => (
              <div key={i} className="flex items-center gap-3 py-3" style={{ borderBottom: '1px solid var(--line)' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--forest)', flexShrink: 0 }} />
                <span style={{ flex: 1, fontSize: '15px', color: 'var(--text-primary)', textTransform: 'capitalize' }}>{ing.name}</span>
                <span style={{ fontSize: '13px', color: 'var(--text-tertiary)', fontVariantNumeric: 'tabular-nums' }}>{ing.amount} {ing.unit}</span>
              </div>
            ))}
            {recipe.garnish && recipe.garnish !== 'None' && (
              <div className="flex items-center gap-3 py-3" style={{ borderBottom: '1px solid var(--line)' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--line-strong)', flexShrink: 0 }} />
                <span style={{ flex: 1, fontSize: '14px', color: 'var(--text-secondary)' }}>Garnish: {recipe.garnish}</span>
              </div>
            )}
          </div>
        </div>

        {/* Method block */}
        <div className="mb-8">
          <p className="eyebrow mb-4">Method</p>
          <div className="px-4 py-4" style={{ background: 'var(--surface-raised)', border: '1px solid var(--line)' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
              {recipe.method}{recipe.glass ? `. Serve in a ${recipe.glass.toLowerCase()}.` : '.'}
            </p>
          </div>
        </div>

        {/* Balance notes */}
        {recipe.balance && (
          <div className="mb-8">
            <p className="eyebrow mb-4">Balance notes</p>
            <p className="rec-card-why">{recipe.balance}</p>
          </div>
        )}

        {/* Similar cocktails */}
        {similarRecipes.length > 0 && onSelectRecipe && (
          <div className="mb-8">
            <p className="eyebrow mb-4">Similar cocktails</p>
            <div className="flex gap-3">
              {similarRecipes.map(r => (
                <button
                  key={r.id}
                  onClick={() => onSelectRecipe(r)}
                  className="flex-1 text-left px-4 py-4 transition-opacity hover:opacity-80"
                  style={{ border: '1px solid var(--line)', background: 'var(--surface-raised)', borderRadius: '2px', cursor: 'pointer' }}
                >
                  <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '16px', color: 'var(--text-primary)', margin: '0 0 4px' }}>{r.name}</p>
                  <p className="eyebrow">{r.category || r.tags.find(t => !t.startsWith('finish:') && !t.startsWith('alt:')) || ''}</p>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-6 pb-8 pt-6" style={{ background: 'linear-gradient(0deg, var(--bg) 75%, transparent 100%)' }}>
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => onMake?.(recipe.name)}
            style={{ width: '100%', padding: '16px', background: 'var(--ember)', color: 'white', border: 'none', cursor: 'pointer', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', borderRadius: '2px' }}
          >
            Make this cocktail
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ WELCOME CARD (home screen entry point) ============
interface WelcomeEntryCardProps {
  onClick: () => void;
}

export function WelcomeEntryCard({ onClick }: WelcomeEntryCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-2xl px-5 py-4 mt-4 transition-all hover:opacity-90"
      style={{ background: 'rgba(216,90,48,0.06)', border: '1px solid rgba(216,90,48,0.2)' }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] tracking-[2px] uppercase mb-1" style={{ color: 'var(--ember)' }}>First time here?</p>
          <p className="text-[15px]" style={{ color: 'var(--text-primary)' }}>Welcome in — let's find your style →</p>
        </div>
        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--ember)' }}>
          <ChevronRight className="w-4 h-4 text-white" />
        </div>
      </div>
    </button>
  );
}
