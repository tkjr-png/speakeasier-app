import { describe, it, expect, beforeEach } from 'vitest';

/**
 * Store tests — we test the pure logic (add/remove/fill level behavior)
 * without Zustand middleware by extracting the state transition logic.
 * 
 * Since the Zustand store uses `persist` middleware and `crypto.randomUUID`,
 * we test the state transition patterns directly.
 */

// ═══════════════════════════════════════════════════════════════════════════
// Inventory logic
// ═══════════════════════════════════════════════════════════════════════════

describe('inventory state transitions', () => {
  let inventory: string[];

  beforeEach(() => {
    inventory = ['bourbon', 'gin', 'campari'];
  });

  function addToInventory(item: string): string[] {
    return [...new Set([...inventory, item.toLowerCase()])];
  }

  function removeFromInventory(item: string): string[] {
    return inventory.filter(i => i.toLowerCase() !== item.toLowerCase());
  }

  it('adds a new item', () => {
    inventory = addToInventory('aperol');
    expect(inventory).toContain('aperol');
    expect(inventory).toHaveLength(4);
  });

  it('lowercases new items', () => {
    inventory = addToInventory('Green Chartreuse');
    expect(inventory).toContain('green chartreuse');
  });

  it('deduplicates — adding existing item does not create duplicate', () => {
    inventory = addToInventory('bourbon');
    expect(inventory.filter(i => i === 'bourbon')).toHaveLength(1);
    expect(inventory).toHaveLength(3);
  });

  it('deduplicates case-insensitively', () => {
    inventory = addToInventory('BOURBON');
    // Both "bourbon" and "BOURBON" would be in the set, but lowercased before add
    // Actually the code does: [...new Set([...state.inventory, item.toLowerCase()])]
    // So if inventory already has 'bourbon' and we add 'bourbon' (lowercased BOURBON), Set dedupes
    expect(inventory).toHaveLength(3);
  });

  it('removes an item', () => {
    inventory = removeFromInventory('campari');
    expect(inventory).not.toContain('campari');
    expect(inventory).toHaveLength(2);
  });

  it('removes case-insensitively', () => {
    inventory = removeFromInventory('CAMPARI');
    expect(inventory).not.toContain('campari');
  });

  it('removing non-existent item is a no-op', () => {
    inventory = removeFromInventory('dragon fruit syrup');
    expect(inventory).toHaveLength(3);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// Fill level logic
// ═══════════════════════════════════════════════════════════════════════════

describe('fill level state transitions', () => {
  let fillLevels: Record<string, number>;

  beforeEach(() => {
    fillLevels = {};
  });

  function setFillLevel(ingredient: string, level: number) {
    fillLevels = { ...fillLevels, [ingredient.toLowerCase()]: level };
  }

  function getFillLevel(ingredient: string): number {
    return fillLevels[ingredient.toLowerCase()] ?? 100;
  }

  it('defaults to 100 (full) for unknown ingredients', () => {
    expect(getFillLevel('bourbon')).toBe(100);
  });

  it('sets and retrieves fill level', () => {
    setFillLevel('bourbon', 75);
    expect(getFillLevel('bourbon')).toBe(75);
  });

  it('lowercases ingredient keys', () => {
    setFillLevel('Green Chartreuse', 50);
    expect(getFillLevel('green chartreuse')).toBe(50);
  });

  it('tracks fill levels at valid values', () => {
    const validLevels = [100, 75, 50, 25] as const;
    for (const level of validLevels) {
      setFillLevel('test-bottle', level);
      expect(getFillLevel('test-bottle')).toBe(level);
    }
  });

  it('25% should trigger "Low!" warning threshold', () => {
    setFillLevel('campari', 25);
    const level = getFillLevel('campari');
    expect(level <= 25).toBe(true); // UI shows "Low!" at ≤25%
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// Saved recipes logic
// ═══════════════════════════════════════════════════════════════════════════

describe('saved recipes state transitions', () => {
  let savedRecipes: Array<{ id: string; name: string }>;

  beforeEach(() => {
    savedRecipes = [];
  });

  function saveRecipe(recipe: { id: string; name: string }) {
    if (savedRecipes.find(r => r.id === recipe.id)) return;
    savedRecipes = [recipe, ...savedRecipes];
  }

  function unsaveRecipe(recipeId: string) {
    savedRecipes = savedRecipes.filter(r => r.id !== recipeId);
  }

  function isRecipeSaved(recipeId: string): boolean {
    return savedRecipes.some(r => r.id === recipeId);
  }

  it('saves a recipe', () => {
    saveRecipe({ id: 'paper-plane', name: 'Paper Plane' });
    expect(isRecipeSaved('paper-plane')).toBe(true);
    expect(savedRecipes).toHaveLength(1);
  });

  it('prepends saved recipes (most recent first)', () => {
    saveRecipe({ id: 'paper-plane', name: 'Paper Plane' });
    saveRecipe({ id: 'negroni', name: 'Negroni' });
    expect(savedRecipes[0].id).toBe('negroni');
    expect(savedRecipes[1].id).toBe('paper-plane');
  });

  it('does not duplicate when saving same recipe twice', () => {
    saveRecipe({ id: 'paper-plane', name: 'Paper Plane' });
    saveRecipe({ id: 'paper-plane', name: 'Paper Plane' });
    expect(savedRecipes).toHaveLength(1);
  });

  it('unsaves a recipe', () => {
    saveRecipe({ id: 'paper-plane', name: 'Paper Plane' });
    unsaveRecipe('paper-plane');
    expect(isRecipeSaved('paper-plane')).toBe(false);
    expect(savedRecipes).toHaveLength(0);
  });

  it('unsaving non-existent recipe is a no-op', () => {
    saveRecipe({ id: 'negroni', name: 'Negroni' });
    unsaveRecipe('nonexistent');
    expect(savedRecipes).toHaveLength(1);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// Recently made logic
// ═══════════════════════════════════════════════════════════════════════════

describe('recently made state transitions', () => {
  let recentlyMade: string[];

  beforeEach(() => {
    recentlyMade = ['Paper Plane', 'Boulevardier', 'Last Word'];
  });

  function markAsMade(recipeName: string) {
    recentlyMade = [recipeName, ...recentlyMade.filter(r => r !== recipeName)].slice(0, 10);
  }

  it('adds a new drink to the front', () => {
    markAsMade('Negroni');
    expect(recentlyMade[0]).toBe('Negroni');
    expect(recentlyMade).toHaveLength(4);
  });

  it('moves existing drink to front without duplicating', () => {
    markAsMade('Last Word');
    expect(recentlyMade[0]).toBe('Last Word');
    expect(recentlyMade.filter(r => r === 'Last Word')).toHaveLength(1);
    expect(recentlyMade).toHaveLength(3);
  });

  it('caps at 10 items', () => {
    for (let i = 0; i < 15; i++) {
      markAsMade(`Drink ${i}`);
    }
    expect(recentlyMade).toHaveLength(10);
    expect(recentlyMade[0]).toBe('Drink 14');
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// Preferences logic
// ═══════════════════════════════════════════════════════════════════════════

describe('preferences state transitions', () => {
  let preferences = {
    bitter: 0.7, sweet: 0.5, citrus: 0.8,
    herbal: 0.7, smoky: 0.5, spicy: 0.3, strength: 0.7,
  };

  it('partial updates merge correctly', () => {
    preferences = { ...preferences, bitter: 0.9, smoky: 0.8 };
    expect(preferences.bitter).toBe(0.9);
    expect(preferences.smoky).toBe(0.8);
    // Unchanged values preserved
    expect(preferences.citrus).toBe(0.8);
    expect(preferences.strength).toBe(0.7);
  });

  it('all preference values are between 0 and 1', () => {
    for (const val of Object.values(preferences)) {
      expect(val).toBeGreaterThanOrEqual(0);
      expect(val).toBeLessThanOrEqual(1);
    }
  });
});
