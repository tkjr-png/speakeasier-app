import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Recipe, getMakeableRecipes } from '@/data/recipes';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  recipe?: Recipe;
  timestamp: Date;
}

export interface UserPreferences {
  bitter: number;
  sweet: number;
  citrus: number;
  herbal: number;
  smoky: number;
  spicy: number;
  strength: number;
}

export type FillLevel = 100 | 75 | 50 | 25;

interface AppState {
  // Inventory
  inventory: string[];
  addToInventory: (item: string) => void;
  removeFromInventory: (item: string) => void;
  setInventory: (items: string[]) => void;

  // Fill levels per ingredient
  fillLevels: Record<string, FillLevel>;
  setFillLevel: (ingredient: string, level: FillLevel) => void;
  getFillLevel: (ingredient: string) => FillLevel;

  // Saved recipes
  savedRecipes: Recipe[];
  saveRecipe: (recipe: Recipe) => void;
  unsaveRecipe: (recipeId: string) => void;
  isRecipeSaved: (recipeId: string) => boolean;

  // Messages
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;

  // Recently made
  recentlyMade: string[];
  markAsMade: (recipeName: string) => void;

  // User preferences
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;

  // Beginner onboarding
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (val: boolean) => void;

  // UI state
  currentView: 'chat' | 'bar' | 'recipes' | 'profile';
  setCurrentView: (view: 'chat' | 'bar' | 'recipes' | 'profile') => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  // Computed
  getMakeableRecipes: () => Recipe[];
}

const DEFAULT_INVENTORY = [
  'bourbon', 'rye whiskey', 'gin', 'blanco tequila', 'reposado tequila',
  'mezcal', 'white rum', 'aged rum', 'blended scotch', 'islay scotch',
  'cognac', 'vodka', 'campari', 'aperol', 'green chartreuse', 'yellow chartreuse',
  'amaro nonino', 'averna', 'fernet branca', 'sweet vermouth', 'dry vermouth',
  'lillet blanc', 'maraschino liqueur', 'cointreau', 'st-germain', 'benedictine',
  'falernum', 'coffee liqueur', 'absinthe', 'orgeat', 'creme de violette',
  'apple liqueur', 'grenadine', 'simple syrup', 'agave nectar', 'honey ginger syrup',
  'honey syrup', 'maple syrup', 'lemon juice', 'lime juice', 'orange juice',
  'pineapple juice', 'grapefruit soda', 'angostura bitters', 'orange bitters',
  'peychauds bitters', 'champagne', 'soda water', 'ginger beer', 'mint',
  'fresh ginger', 'bacon fat-washed bourbon', 'blackberry puree', 'egg white',
];

const DEFAULT_PREFERENCES: UserPreferences = {
  bitter: 0.7, sweet: 0.5, citrus: 0.8,
  herbal: 0.7, smoky: 0.5, spicy: 0.3, strength: 0.7,
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      inventory: DEFAULT_INVENTORY,
      addToInventory: (item) => set((state) => ({
        inventory: [...new Set([...state.inventory, item.toLowerCase()])]
      })),
      removeFromInventory: (item) => set((state) => ({
        inventory: state.inventory.filter(i => i.toLowerCase() !== item.toLowerCase())
      })),
      setInventory: (items) => set({ inventory: items.map(i => i.toLowerCase()) }),

      fillLevels: {},
      setFillLevel: (ingredient, level) => set((state) => ({
        fillLevels: { ...state.fillLevels, [ingredient.toLowerCase()]: level }
      })),
      getFillLevel: (ingredient) => get().fillLevels[ingredient.toLowerCase()] ?? 100,

      savedRecipes: [],
      saveRecipe: (recipe) => set((state) => {
        if (state.savedRecipes.find(r => r.id === recipe.id)) return state;
        return { savedRecipes: [recipe, ...state.savedRecipes] };
      }),
      unsaveRecipe: (recipeId) => set((state) => ({
        savedRecipes: state.savedRecipes.filter(r => r.id !== recipeId)
      })),
      isRecipeSaved: (recipeId) => get().savedRecipes.some(r => r.id === recipeId),

      messages: [],
      addMessage: (message) => set((state) => ({
        messages: [...state.messages, {
          ...message,
          id: crypto.randomUUID(),
          timestamp: new Date()
        }]
      })),
      clearMessages: () => set({ messages: [] }),

      recentlyMade: ['Paper Plane', 'Boulevardier', 'Last Word'],
      markAsMade: (recipeName) => set((state) => ({
        recentlyMade: [recipeName, ...state.recentlyMade.filter(r => r !== recipeName)].slice(0, 10)
      })),

      preferences: DEFAULT_PREFERENCES,
      updatePreferences: (updates) => set((state) => ({
        preferences: { ...state.preferences, ...updates }
      })),

      hasCompletedOnboarding: false,
      setHasCompletedOnboarding: (val) => set({ hasCompletedOnboarding: val }),

      currentView: 'chat',
      setCurrentView: (view) => set({ currentView: view }),
      isLoading: false,
      setIsLoading: (loading) => set({ isLoading: loading }),

      getMakeableRecipes: () => getMakeableRecipes(get().inventory),
    }),
    {
      name: 'speakeasier-storage',
      partialize: (state) => ({
        inventory: state.inventory,
        fillLevels: state.fillLevels,
        savedRecipes: state.savedRecipes,
        recentlyMade: state.recentlyMade,
        preferences: state.preferences,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        messages: state.messages.slice(-50),
      })
    }
  )
);
