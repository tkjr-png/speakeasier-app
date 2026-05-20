/**
 * parser.ts — Extracted from app/api/chat/stream/route.ts
 * 
 * All the pure parsing functions, testable without Next.js runtime.
 * The route.ts file should import from here instead of defining these inline.
 * 
 * Until you refactor route.ts to import these, this file mirrors the logic exactly
 * so the test suite validates the same behavior.
 */

import { Recipe } from '@/data/recipes';

// ─── SECTION EXTRACTION ───────────────────────────────────────────────────

export function extractSection(text: string, startMarker: string, endMarker: string | null): string {
  const start = text.indexOf(startMarker);
  if (start === -1) return '';
  const after = text.slice(start + startMarker.length);
  if (!endMarker) return after.trim();
  const end = after.indexOf(endMarker);
  return end === -1 ? after.trim() : after.slice(0, end).trim();
}

// ─── INGREDIENT PARSING ──────────────────────────────────────────────────

export function parseIngredients(specBlock: string): Array<{ name: string; amount: number; unit: string }> {
  const lines = specBlock.split('\n').filter(l => l.trim().match(/^[-•*]/));
  return lines.map(line => {
    const clean = line.replace(/^[-•*]\s*/, '').trim();
    const match = clean.match(/^([\d./]+)\s+(oz|ml|dash|dashes|tsp|tbsp|barspoon|rinse|float|drop|drops|splash)\s+(.+)$/i);
    if (match) {
      let amount: number;
      try {
        // Safe fraction evaluation
        const parts = match[1].split('/');
        amount = parts.length === 2 ? Number(parts[0]) / Number(parts[1]) : parseFloat(match[1]);
      } catch {
        amount = parseFloat(match[1]);
      }
      return {
        amount: amount || 0,
        unit: match[2].toLowerCase().replace('dashes', 'dash'),
        name: match[3].trim()
      };
    }
    return { amount: 0, unit: '', name: clean };
  }).filter(i => i.name && i.name.length > 1);
}

// ─── METHOD LINE PARSING ─────────────────────────────────────────────────

export function parseMethodLine(methodLine: string): { method: string; glass: string; garnish: string } {
  const parts = methodLine.split('·').map(p => p.trim());
  let method = '', glass = '', garnish = 'None';
  for (const part of parts) {
    if (part.startsWith('METHOD:')) method = part.replace('METHOD:', '').trim();
    else if (part.startsWith('GLASS:')) glass = part.replace('GLASS:', '').trim();
    else if (part.startsWith('GARNISH:')) garnish = part.replace('GARNISH:', '').trim();
  }
  return { method, glass, garnish };
}

// ─── ENRICH KNOWN RECIPE ─────────────────────────────────────────────────

export function enrichKnownRecipe(recipe: Recipe, response: string): Recipe {
  const why = extractSection(response, 'WHY:', 'FINISH:');
  const finish = extractSection(response, 'FINISH:', 'ALTERNATIVES:');
  const alt = extractSection(response, 'ALTERNATIVES:', null);

  const methodLine = extractSection(response, 'METHOD:', 'WHY:');
  const { method, glass, garnish } = parseMethodLine(methodLine);

  return {
    ...recipe,
    method: method || recipe.method,
    glass: glass || recipe.glass,
    garnish: garnish || recipe.garnish,
    balance: why || recipe.balance,
    tags: [
      ...recipe.tags.filter(t => !t.startsWith('finish:') && !t.startsWith('alt:')),
      finish ? `finish:${finish}` : '',
      alt ? `alt:${alt}` : '',
    ].filter(Boolean),
  };
}

// ─── MAIN PARSER ──────────────────────────────────────────────────────────

export function parseResponseIntoCard(response: string, makeableRecipes: Recipe[]): Recipe | null {
  // Step 1: get the recommended drink name from first **bold**
  const boldMatch = response.match(/\*\*([^*\n]{2,60})\*\*/);
  const drinkName = boldMatch ? boldMatch[1].trim() : null;

  const specBlock = extractSection(response, 'SPEC:', 'METHOD:');
  const methodLine = extractSection(response, 'METHOD:', 'WHY:');
  const why = extractSection(response, 'WHY:', 'FINISH:');
  const finish = extractSection(response, 'FINISH:', 'ALTERNATIVES:');
  const alt = extractSection(response, 'ALTERNATIVES:', null);
  const hasStructuredSpec = specBlock.length > 10;

  // Step 2: exact name match against known recipes
  if (drinkName) {
    const known = makeableRecipes.find(
      r => r.name.toLowerCase() === drinkName.toLowerCase()
    );
    if (known) {
      return enrichKnownRecipe(known, response);
    }
  }

  // Step 3: if AI provided a SPEC block, build a custom card from it
  if (hasStructuredSpec && drinkName) {
    const ingredients = parseIngredients(specBlock);
    const { method, glass, garnish } = parseMethodLine(methodLine);
    if (ingredients.length >= 2) {
      return {
        id: `ai-${Date.now()}`,
        name: drinkName,
        creator: 'Speakeasier AI',
        source: 'Custom',
        category: 'Original',
        ingredients,
        method: method || 'Stir with ice, strain',
        glass: glass || 'Coupe',
        garnish: garnish || 'None',
        tags: ['custom', 'ai-created',
          finish ? `finish:${finish}` : '',
          alt ? `alt:${alt}` : ''
        ].filter(Boolean),
        balance: why || '',
        flavorProfile: { bitter: 0.5, sweet: 0.5, citrus: 0.5, herbal: 0.5, smoky: 0, spicy: 0, strength: 0.7 }
      };
    }
  }

  // Step 4: last resort — fuzzy name match
  if (drinkName) {
    for (const recipe of makeableRecipes) {
      if (drinkName.toLowerCase() === recipe.name.toLowerCase() ||
          recipe.name.toLowerCase() === drinkName.toLowerCase()) {
        return enrichKnownRecipe(recipe, response);
      }
    }
    for (const recipe of makeableRecipes) {
      const recipeWords = recipe.name.toLowerCase().split(' ');
      const drinkWords = drinkName.toLowerCase().split(' ');
      const allMatch = recipeWords.every(w => drinkWords.includes(w));
      const extraWords = drinkWords.filter(w => !recipeWords.includes(w)).length;
      if (allMatch && extraWords <= 1) {
        return enrichKnownRecipe(recipe, response);
      }
    }
  }

  return null;
}
