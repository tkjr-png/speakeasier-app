import { describe, it, expect } from 'vitest';
import {
  extractSection,
  parseIngredients,
  parseMethodLine,
  parseResponseIntoCard,
  enrichKnownRecipe,
} from '@/lib/parser';
import { recipes, Recipe } from '@/data/recipes';

// ─── HELPERS ──────────────────────────────────────────────────────────────

/** Build a well-formed AI response string */
function buildResponse(opts: {
  name: string;
  intro?: string;
  spec: string[];
  method?: string;
  glass?: string;
  garnish?: string;
  why?: string;
  finish?: string;
  altLouder?: string;
  altSofter?: string;
}): string {
  const lines: string[] = [];
  lines.push(`**${opts.name}**`);
  lines.push(opts.intro || 'A perfect drink for the moment.');
  lines.push('');
  lines.push('SPEC:');
  opts.spec.forEach(s => lines.push(`- ${s}`));
  lines.push('');
  lines.push(`METHOD: ${opts.method || 'Stir'} · GLASS: ${opts.glass || 'Coupe'} · GARNISH: ${opts.garnish || 'None'}`);
  lines.push('');
  lines.push(`WHY: ${opts.why || 'It works.'}`);
  lines.push('');
  lines.push(`FINISH: ${opts.finish || 'Smooth start → warming middle → long finish'}`);
  lines.push('');
  lines.push('ALTERNATIVES:');
  lines.push(`- Louder: ${opts.altLouder || 'Something stronger'}`);
  lines.push(`- Softer: ${opts.altSofter || 'Something lighter'}`);
  return lines.join('\n');
}

/** Get a subset of recipes as "makeable" for testing */
function getTestRecipes(): Recipe[] {
  // Return recipes that cover key matching scenarios
  return recipes.filter(r =>
    ['paper-plane', 'boulevardier', 'negroni', 'last-word', 'gold-rush', 'oaxaca-old-fashioned'].includes(r.id)
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// extractSection
// ═══════════════════════════════════════════════════════════════════════════

describe('extractSection', () => {
  const text = `Some intro text.

SPEC:
- 2 oz bourbon
- 0.75 oz aperol

METHOD: Shake · GLASS: Coupe · GARNISH: None

WHY: The bourbon adds warmth.

FINISH: Entry → Mid → Long

ALTERNATIVES:
- Louder: Negroni
- Softer: Aperol Spritz`;

  it('extracts SPEC block between markers', () => {
    const result = extractSection(text, 'SPEC:', 'METHOD:');
    expect(result).toContain('2 oz bourbon');
    expect(result).toContain('0.75 oz aperol');
    expect(result).not.toContain('METHOD:');
  });

  it('extracts METHOD line between markers', () => {
    const result = extractSection(text, 'METHOD:', 'WHY:');
    expect(result).toContain('Shake');
    expect(result).toContain('GLASS:');
    expect(result).not.toContain('WHY:');
  });

  it('extracts WHY block between markers', () => {
    const result = extractSection(text, 'WHY:', 'FINISH:');
    expect(result).toContain('bourbon adds warmth');
  });

  it('extracts ALTERNATIVES with null end marker (to end of string)', () => {
    const result = extractSection(text, 'ALTERNATIVES:', null);
    expect(result).toContain('Louder');
    expect(result).toContain('Softer');
  });

  it('returns empty string for missing marker', () => {
    expect(extractSection(text, 'NONEXISTENT:', null)).toBe('');
  });

  it('returns everything after start marker when end marker is missing', () => {
    const partial = 'WHY: It is delicious.';
    const result = extractSection(partial, 'WHY:', 'FINISH:');
    expect(result).toBe('It is delicious.');
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// parseIngredients
// ═══════════════════════════════════════════════════════════════════════════

describe('parseIngredients', () => {
  it('parses standard oz ingredients', () => {
    const spec = `
- 2 oz bourbon
- 0.75 oz aperol
- 0.75 oz amaro nonino
- 0.75 oz lemon juice`;
    const result = parseIngredients(spec);
    expect(result).toHaveLength(4);
    expect(result[0]).toEqual({ amount: 2, unit: 'oz', name: 'bourbon' });
    expect(result[1]).toEqual({ amount: 0.75, unit: 'oz', name: 'aperol' });
  });

  it('parses dash units', () => {
    const spec = `- 2 dash angostura bitters`;
    const result = parseIngredients(spec);
    expect(result[0]).toEqual({ amount: 2, unit: 'dash', name: 'angostura bitters' });
  });

  it('normalizes "dashes" to "dash"', () => {
    const spec = `- 2 dashes orange bitters`;
    const result = parseIngredients(spec);
    expect(result[0].unit).toBe('dash');
  });

  it('parses barspoon, tsp, rinse units', () => {
    const spec = `
- 1 barspoon demerara syrup
- 0.5 tsp absinthe
- 1 rinse absinthe`;
    const result = parseIngredients(spec);
    expect(result[0]).toEqual({ amount: 1, unit: 'barspoon', name: 'demerara syrup' });
    expect(result[1]).toEqual({ amount: 0.5, unit: 'tsp', name: 'absinthe' });
    expect(result[2]).toEqual({ amount: 1, unit: 'rinse', name: 'absinthe' });
  });

  it('handles bullet (•) and asterisk (*) list markers', () => {
    const spec = `
• 2 oz gin
* 1 oz campari`;
    const result = parseIngredients(spec);
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('gin');
    expect(result[1].name).toBe('campari');
  });

  it('filters out empty or too-short ingredient names', () => {
    const spec = `
- 2 oz bourbon
- x
- `;
    const result = parseIngredients(spec);
    expect(result).toHaveLength(1);
  });

  it('handles lines without a recognized amount/unit pattern', () => {
    const spec = `- fresh mint leaves`;
    const result = parseIngredients(spec);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ amount: 0, unit: '', name: 'fresh mint leaves' });
  });

  it('handles fractional amounts like 3/4', () => {
    const spec = `- 3/4 oz green chartreuse`;
    const result = parseIngredients(spec);
    expect(result[0].amount).toBe(0.75);
    expect(result[0].name).toBe('green chartreuse');
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// parseMethodLine
// ═══════════════════════════════════════════════════════════════════════════

describe('parseMethodLine', () => {
  it('parses a full method line', () => {
    const result = parseMethodLine('METHOD: Shake with ice · GLASS: Coupe · GARNISH: Orange twist');
    expect(result).toEqual({
      method: 'Shake with ice',
      glass: 'Coupe',
      garnish: 'Orange twist'
    });
  });

  it('defaults garnish to "None" when missing', () => {
    const result = parseMethodLine('METHOD: Stir · GLASS: Rocks');
    expect(result.garnish).toBe('None');
  });

  it('handles empty/malformed method lines', () => {
    const result = parseMethodLine('');
    expect(result.method).toBe('');
    expect(result.glass).toBe('');
    expect(result.garnish).toBe('None');
  });

  it('handles extra whitespace', () => {
    const result = parseMethodLine('METHOD:   Shake hard  ·  GLASS:  Nick & Nora  ·  GARNISH:  Lemon peel  ');
    expect(result.method).toBe('Shake hard');
    expect(result.glass).toBe('Nick & Nora');
    expect(result.garnish).toBe('Lemon peel');
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// parseResponseIntoCard — THE CRITICAL TESTS
// ═══════════════════════════════════════════════════════════════════════════

describe('parseResponseIntoCard', () => {
  const makeable = getTestRecipes();

  // ── Step 2: Exact name match to known recipe ──────────────────────────

  describe('exact name match (Step 2)', () => {
    it('matches "Paper Plane" exactly to the known recipe', () => {
      const response = buildResponse({
        name: 'Paper Plane',
        spec: ['0.75 oz bourbon', '0.75 oz aperol', '0.75 oz amaro nonino', '0.75 oz lemon juice'],
      });
      const result = parseResponseIntoCard(response, makeable);
      expect(result).not.toBeNull();
      expect(result!.id).toBe('paper-plane'); // from database, not ai-generated
      expect(result!.name).toBe('Paper Plane');
    });

    it('matches case-insensitively', () => {
      const response = buildResponse({
        name: 'paper plane',
        spec: ['0.75 oz bourbon'],
      });
      const result = parseResponseIntoCard(response, makeable);
      expect(result).not.toBeNull();
      expect(result!.id).toBe('paper-plane');
    });

    it('enriches known recipe with WHY/FINISH/ALTERNATIVES from response', () => {
      const response = buildResponse({
        name: 'Boulevardier',
        spec: ['1.25 oz bourbon', '1 oz campari', '1 oz sweet vermouth'],
        why: 'The bourbon warmth tames the Campari bitterness.',
        finish: 'Bitter entry → warming middle → dry finish',
        altLouder: 'Negroni',
        altSofter: 'Aperol Spritz',
      });
      const result = parseResponseIntoCard(response, makeable);
      expect(result).not.toBeNull();
      expect(result!.id).toBe('boulevardier');
      expect(result!.balance).toBe('The bourbon warmth tames the Campari bitterness.');
      expect(result!.tags).toContain('finish:Bitter entry → warming middle → dry finish');
    });
  });

  // ── Step 3: Custom AI drink with SPEC block ───────────────────────────

  describe('custom AI drink with SPEC (Step 3)', () => {
    it('builds custom card for unknown drink name with SPEC block', () => {
      const response = buildResponse({
        name: 'The Cattleman',
        spec: ['2 oz barrel proof rye', '0.75 oz bruto americano', '0.5 oz yellow chartreuse', '2 dash coffee bitters'],
        method: 'Stir with ice, strain',
        glass: 'Rocks',
        garnish: 'Orange twist',
        why: 'Rye adds backbone, Bruto brings earthy bitterness.',
      });
      const result = parseResponseIntoCard(response, makeable);
      expect(result).not.toBeNull();
      expect(result!.id).toMatch(/^ai-/); // dynamically generated ID
      expect(result!.name).toBe('The Cattleman');
      expect(result!.creator).toBe('Speakeasier AI');
      expect(result!.ingredients).toHaveLength(4);
      expect(result!.balance).toContain('Rye adds backbone');
    });

    it('THE BIG FIX: "Dark Roast Boulevardier" gets custom card, NOT the plain Boulevardier', () => {
      const response = buildResponse({
        name: 'Dark Roast Boulevardier',
        spec: ['1.5 oz bourbon', '0.75 oz campari', '0.75 oz sweet vermouth', '0.25 oz mr black coffee liqueur'],
        why: 'Coffee deepens the Boulevardier template.',
      });
      const result = parseResponseIntoCard(response, makeable);
      expect(result).not.toBeNull();
      expect(result!.id).toMatch(/^ai-/); // custom, NOT 'boulevardier'
      expect(result!.name).toBe('Dark Roast Boulevardier');
      expect(result!.creator).toBe('Speakeasier AI');
    });

    it('custom drink with fewer than 2 ingredients returns null', () => {
      const response = buildResponse({
        name: 'The Minimalist',
        spec: ['2 oz bourbon'],
      });
      const result = parseResponseIntoCard(response, makeable);
      // Only 1 ingredient parsed — should not create card
      expect(result).toBeNull();
    });
  });

  // ── Step 4: Fuzzy name matching ───────────────────────────────────────

  describe('fuzzy name match (Step 4)', () => {
    it('matches when AI skips SPEC format entirely but names a known drink', () => {
      const response = `**Negroni**
The classic aperitif. Equal parts gin, Campari, and sweet vermouth. Perfect before dinner.`;
      const result = parseResponseIntoCard(response, makeable);
      expect(result).not.toBeNull();
      expect(result!.id).toBe('negroni');
    });

    it('matches "Negroni Variation" to Negroni (1 extra word allowed)', () => {
      const response = `**Negroni Variation**
A twist on the classic. No SPEC block here.`;
      const result = parseResponseIntoCard(response, makeable);
      expect(result).not.toBeNull();
      expect(result!.id).toBe('negroni');
    });

    it('does NOT fuzzy-match when drink name has 2+ extra words', () => {
      const response = `**Smoky Autumn Negroni**
Something completely different. No SPEC block.`;
      const result = parseResponseIntoCard(response, makeable);
      // "Smoky Autumn Negroni" = 2 extra words beyond "Negroni" → no match
      expect(result).toBeNull();
    });
  });

  // ── Edge cases ────────────────────────────────────────────────────────

  describe('edge cases', () => {
    it('returns null when response has no bold name and no SPEC', () => {
      const response = 'Just a casual conversation about cocktails, no recommendation.';
      const result = parseResponseIntoCard(response, makeable);
      expect(result).toBeNull();
    });

    it('returns null when bold name exists but no matching recipe and no SPEC', () => {
      const response = `**The Mystery Drink**
Something ethereal and unknowable.`;
      const result = parseResponseIntoCard(response, makeable);
      expect(result).toBeNull();
    });

    it('returns null when makeable recipes list is empty', () => {
      const response = buildResponse({
        name: 'Paper Plane',
        spec: ['0.75 oz bourbon', '0.75 oz aperol'],
      });
      const result = parseResponseIntoCard(response, []);
      // No known recipes to match, but has SPEC → should create custom card
      expect(result).not.toBeNull();
      expect(result!.id).toMatch(/^ai-/);
    });

    it('handles bold name with special characters', () => {
      const response = buildResponse({
        name: "Benton's Old Fashioned",
        spec: ['2 oz bacon fat-washed bourbon', '0.25 oz maple syrup', '2 dash angostura bitters'],
      });
      // "Benton's Old Fashioned" is in our DB — depends on if it's in the makeable list
      const allRecipes = recipes;
      const result = parseResponseIntoCard(response, allRecipes);
      expect(result).not.toBeNull();
      expect(result!.name).toBe("Benton's Old Fashioned");
    });

    it('prioritizes exact match over SPEC-based custom card', () => {
      // If AI responds with "Boulevardier" and includes a SPEC block,
      // the exact match (Step 2) should win over custom card (Step 3)
      const response = buildResponse({
        name: 'Boulevardier',
        spec: ['1.25 oz bourbon', '1 oz campari', '1 oz sweet vermouth'],
      });
      const result = parseResponseIntoCard(response, makeable);
      expect(result!.id).toBe('boulevardier'); // from DB, not ai-generated
    });
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// enrichKnownRecipe
// ═══════════════════════════════════════════════════════════════════════════

describe('enrichKnownRecipe', () => {
  const paperPlane = recipes.find(r => r.id === 'paper-plane')!;

  it('overlays WHY from response onto recipe balance', () => {
    const response = 'WHY: Custom explanation here.\nFINISH: Entry → Done';
    const result = enrichKnownRecipe(paperPlane, response);
    expect(result.balance).toBe('Custom explanation here.');
  });

  it('preserves original balance when WHY is missing', () => {
    const response = 'Just some text, no markers.';
    const result = enrichKnownRecipe(paperPlane, response);
    expect(result.balance).toBe(paperPlane.balance);
  });

  it('preserves original method/glass/garnish when METHOD line is missing', () => {
    const response = 'WHY: Great drink.';
    const result = enrichKnownRecipe(paperPlane, response);
    expect(result.method).toBe(paperPlane.method);
    expect(result.glass).toBe(paperPlane.glass);
  });

  it('adds finish and alt tags without duplicating', () => {
    const response = `WHY: Tasty.
FINISH: Bitter → Sweet
ALTERNATIVES:
- Louder: Negroni`;
    const result = enrichKnownRecipe(paperPlane, response);
    expect(result.tags).toContain('finish:Bitter → Sweet');
    // Should not have empty strings
    expect(result.tags.every(t => t.length > 0)).toBe(true);
  });
});
