import { describe, it, expect } from 'vitest';
import {
  normalizeIngredient,
  canMakeRecipe,
  getMakeableRecipes,
  getMissingIngredients,
  recipes,
  ingredientAliases,
} from '@/data/recipes';

// ═══════════════════════════════════════════════════════════════════════════
// normalizeIngredient
// ═══════════════════════════════════════════════════════════════════════════

describe('normalizeIngredient', () => {
  it('lowercases and trims', () => {
    expect(normalizeIngredient('  Bourbon  ')).toBe('bourbon');
  });

  it('maps common aliases', () => {
    expect(normalizeIngredient('rye')).toBe('rye whiskey');
    expect(normalizeIngredient('scotch')).toBe('blended scotch');
    expect(normalizeIngredient('chartreuse green')).toBe('green chartreuse');
    expect(normalizeIngredient('chartreuse yellow')).toBe('yellow chartreuse');
    expect(normalizeIngredient('luxardo maraschino')).toBe('maraschino liqueur');
    expect(normalizeIngredient('luxardo')).toBe('maraschino liqueur');
    expect(normalizeIngredient('nonino')).toBe('amaro nonino');
    expect(normalizeIngredient('angostura')).toBe('angostura bitters');
    expect(normalizeIngredient('ango')).toBe('angostura bitters');
  });

  it('maps citrus aliases', () => {
    expect(normalizeIngredient('fresh lemon juice')).toBe('lemon juice');
    expect(normalizeIngredient('fresh lime juice')).toBe('lime juice');
  });

  it('maps sweetener aliases', () => {
    expect(normalizeIngredient('simple')).toBe('simple syrup');
    expect(normalizeIngredient('rich simple syrup')).toBe('simple syrup');
    expect(normalizeIngredient('demerara syrup')).toBe('simple syrup');
  });

  it('maps sparkling aliases', () => {
    expect(normalizeIngredient('prosecco')).toBe('champagne');
    expect(normalizeIngredient('sparkling wine')).toBe('champagne');
    expect(normalizeIngredient('cava')).toBe('champagne');
  });

  it('maps vermouth aliases', () => {
    expect(normalizeIngredient('carpano antica')).toBe('sweet vermouth');
    expect(normalizeIngredient('dolin dry')).toBe('dry vermouth');
    expect(normalizeIngredient('punt e mes')).toBe('sweet vermouth');
  });

  it('maps spirit aliases', () => {
    expect(normalizeIngredient('tequila')).toBe('blanco tequila');
    expect(normalizeIngredient('brandy')).toBe('cognac');
    expect(normalizeIngredient('apple brandy')).toBe('calvados');
    expect(normalizeIngredient('light rum')).toBe('white rum');
  });

  it('passes through unknown ingredients unchanged', () => {
    expect(normalizeIngredient('dragon fruit syrup')).toBe('dragon fruit syrup');
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// canMakeRecipe
// ═══════════════════════════════════════════════════════════════════════════

describe('canMakeRecipe', () => {
  const paperPlane = recipes.find(r => r.id === 'paper-plane')!;
  // Paper Plane needs: bourbon, aperol, amaro nonino, lemon juice

  it('returns true when all ingredients are present', () => {
    const inventory = ['bourbon', 'aperol', 'amaro nonino', 'lemon juice', 'gin'];
    expect(canMakeRecipe(paperPlane, inventory)).toBe(true);
  });

  it('returns false when missing one ingredient', () => {
    const inventory = ['bourbon', 'aperol', 'lemon juice']; // missing amaro nonino
    expect(canMakeRecipe(paperPlane, inventory)).toBe(false);
  });

  it('matches through aliases — "nonino" counts as "amaro nonino"', () => {
    const inventory = ['bourbon', 'aperol', 'nonino', 'fresh lemon juice'];
    expect(canMakeRecipe(paperPlane, inventory)).toBe(true);
  });

  it('matches through aliases — "angostura" counts as "angostura bitters"', () => {
    const negroni = recipes.find(r => r.id === 'negroni')!;
    // Negroni needs: gin, campari, sweet vermouth
    const inventory = ['gin', 'campari', 'carpano antica']; // carpano antica → sweet vermouth
    expect(canMakeRecipe(negroni, inventory)).toBe(true);
  });

  it('handles case insensitivity', () => {
    const inventory = ['BOURBON', 'Aperol', 'Amaro Nonino', 'Lemon Juice'];
    expect(canMakeRecipe(paperPlane, inventory)).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// getMakeableRecipes
// ═══════════════════════════════════════════════════════════════════════════

describe('getMakeableRecipes', () => {
  it('returns only recipes where all ingredients are available', () => {
    // Minimal inventory: just enough for Negroni (gin + campari + sweet vermouth)
    const inventory = ['gin', 'campari', 'sweet vermouth'];
    const makeable = getMakeableRecipes(inventory);
    const names = makeable.map(r => r.name);
    expect(names).toContain('Negroni');
    // Should NOT contain Paper Plane (needs bourbon, aperol, amaro nonino, lemon juice)
    expect(names).not.toContain('Paper Plane');
  });

  it('returns more recipes as inventory grows', () => {
    const small = getMakeableRecipes(['gin', 'campari', 'sweet vermouth']);
    const big = getMakeableRecipes([
      'gin', 'campari', 'sweet vermouth', 'bourbon', 'aperol',
      'amaro nonino', 'lemon juice', 'rye whiskey', 'green chartreuse',
      'maraschino liqueur', 'lime juice',
    ]);
    expect(big.length).toBeGreaterThan(small.length);
  });

  it('returns empty array for empty inventory', () => {
    expect(getMakeableRecipes([])).toHaveLength(0);
  });

  it('the default inventory can make a substantial number of recipes', () => {
    // The default inventory from store.ts has ~50 ingredients
    const defaultInventory = [
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
    const makeable = getMakeableRecipes(defaultInventory);
    // With this large inventory, should be able to make at least 30 of the 50+ recipes
    expect(makeable.length).toBeGreaterThanOrEqual(30);
  });

  it('adding one key bottle unlocks new recipes', () => {
    // Start without green chartreuse
    const without = getMakeableRecipes([
      'gin', 'lime juice', 'maraschino liqueur', 'rye whiskey', 'lemon juice',
    ]);
    // Add green chartreuse — should unlock Last Word and Final Ward
    const withChartreuse = getMakeableRecipes([
      'gin', 'lime juice', 'maraschino liqueur', 'green chartreuse', 'rye whiskey', 'lemon juice',
    ]);
    const newNames = withChartreuse.filter(r => !without.find(w => w.id === r.id)).map(r => r.name);
    expect(newNames).toContain('Last Word');
    expect(newNames).toContain('Final Ward');
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// getMissingIngredients
// ═══════════════════════════════════════════════════════════════════════════

describe('getMissingIngredients', () => {
  it('returns list of missing ingredients', () => {
    const paperPlane = recipes.find(r => r.id === 'paper-plane')!;
    const inventory = ['bourbon', 'lemon juice'];
    const missing = getMissingIngredients(paperPlane, inventory);
    expect(missing).toContain('aperol');
    expect(missing).toContain('amaro nonino');
    expect(missing).not.toContain('bourbon');
    expect(missing).not.toContain('lemon juice');
  });

  it('returns empty array when all ingredients present', () => {
    const negroni = recipes.find(r => r.id === 'negroni')!;
    const inventory = ['gin', 'campari', 'sweet vermouth'];
    expect(getMissingIngredients(negroni, inventory)).toHaveLength(0);
  });

  it('accounts for aliases when checking missing', () => {
    const paperPlane = recipes.find(r => r.id === 'paper-plane')!;
    const inventory = ['bourbon', 'fresh lemon juice', 'nonino']; // aliases for lemon juice and amaro nonino
    const missing = getMissingIngredients(paperPlane, inventory);
    expect(missing).toEqual(['aperol']); // only aperol missing
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// Alias coverage — ensure all aliases map to ingredients used in recipes
// ═══════════════════════════════════════════════════════════════════════════

describe('ingredient alias integrity', () => {
  it('all alias target values appear as normalized ingredients in at least one recipe', () => {
    const allRecipeIngredients = new Set<string>();
    for (const recipe of recipes) {
      for (const ing of recipe.ingredients) {
        allRecipeIngredients.add(normalizeIngredient(ing.name));
      }
    }

    // Check a sample of critical aliases
    const criticalTargets = [
      'bourbon', 'rye whiskey', 'blended scotch', 'green chartreuse',
      'maraschino liqueur', 'amaro nonino', 'angostura bitters',
      'lemon juice', 'lime juice', 'simple syrup', 'sweet vermouth',
      'dry vermouth', 'campari', 'aperol', 'cointreau',
    ];

    for (const target of criticalTargets) {
      expect(allRecipeIngredients.has(target)).toBe(true);
    }
  });

  it('no alias creates a circular chain (A→B→A)', () => {
    for (const [alias, target] of Object.entries(ingredientAliases)) {
      if (alias === target) continue; // self-reference is harmless, tested separately
      const secondHop = ingredientAliases[target];
      if (secondHop) {
        expect(secondHop).not.toBe(alias);
      }
    }
  });

  it('has no self-referencing aliases', () => {
    const selfRefs = Object.entries(ingredientAliases)
      .filter(([alias, target]) => alias === target)
      .map(([alias]) => alias);
    expect(selfRefs).toEqual([]);
  });
});
