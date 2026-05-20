export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

export interface FlavorProfile {
  bitter: number;
  sweet: number;
  citrus: number;
  herbal: number;
  smoky: number;
  spicy: number;
  strength: number;
}

export interface Recipe {
  id: string;
  name: string;
  creator: string;
  source: string;
  year?: number;
  category: string;
  ingredients: Ingredient[];
  method: string;
  glass: string;
  garnish: string;
  tags: string[];
  balance: string;
  flavorProfile: FlavorProfile;
}

export const recipes: Recipe[] = [
  // ============================================
  // DEATH & CO ORIGINALS
  // ============================================
  {
    id: 'oaxaca-old-fashioned',
    name: 'Oaxaca Old Fashioned',
    creator: 'Phil Ward',
    source: 'Death & Co, NYC',
    year: 2007,
    category: 'Old Fashioned variant',
    ingredients: [
      { name: 'reposado tequila', amount: 1.5, unit: 'oz' },
      { name: 'mezcal', amount: 0.5, unit: 'oz' },
      { name: 'agave nectar', amount: 1, unit: 'tsp' },
      { name: 'angostura bitters', amount: 2, unit: 'dash' }
    ],
    method: 'Stir with ice, strain over large cube',
    glass: 'Rocks',
    garnish: 'Flamed orange twist',
    tags: ['smoky', 'spirit-forward', 'tequila', 'mezcal', 'stirred', 'modern-classic'],
    balance: 'Small proportion of mezcal (25%) adds smoke without dominating. Agave nectar ties agave spirits together.',
    flavorProfile: { bitter: 0.3, sweet: 0.4, citrus: 0.1, herbal: 0.3, smoky: 0.5, spicy: 0.1, strength: 0.8 }
  },
  {
    id: 'naked-and-famous',
    name: 'Naked and Famous',
    creator: 'Joaquín Simó',
    source: 'Death & Co, NYC',
    year: 2011,
    category: 'Last Word variant',
    ingredients: [
      { name: 'mezcal', amount: 0.75, unit: 'oz' },
      { name: 'yellow chartreuse', amount: 0.75, unit: 'oz' },
      { name: 'aperol', amount: 0.75, unit: 'oz' },
      { name: 'lime juice', amount: 0.75, unit: 'oz' }
    ],
    method: 'Shake with ice, double strain',
    glass: 'Coupe',
    garnish: 'None',
    tags: ['smoky', 'herbal', 'bitter-sweet', 'mezcal', 'shaken', 'modern-classic', 'equal-parts'],
    balance: 'Smoky (mezcal) meets herbal (Chartreuse) meets bitter-sweet (Aperol). Each powerful ingredient in equal democracy.',
    flavorProfile: { bitter: 0.6, sweet: 0.5, citrus: 0.7, herbal: 0.8, smoky: 0.7, spicy: 0, strength: 0.6 }
  },
  {
    id: 'paper-plane',
    name: 'Paper Plane',
    creator: 'Sam Ross',
    source: 'Death & Co / Milk & Honey',
    year: 2008,
    category: 'Equal parts, Modern Sour',
    ingredients: [
      { name: 'bourbon', amount: 0.75, unit: 'oz' },
      { name: 'aperol', amount: 0.75, unit: 'oz' },
      { name: 'amaro nonino', amount: 0.75, unit: 'oz' },
      { name: 'lemon juice', amount: 0.75, unit: 'oz' }
    ],
    method: 'Shake with ice, double strain',
    glass: 'Coupe',
    garnish: 'None',
    tags: ['bitter-sweet', 'citrus', 'bourbon', 'amaro', 'shaken', 'modern-classic', 'equal-parts'],
    balance: 'Bitter elements (Aperol, Nonino) balance sweet elements; lemon ties it together. Perfect bitter-sweet-citrus harmony.',
    flavorProfile: { bitter: 0.7, sweet: 0.5, citrus: 0.8, herbal: 0.3, smoky: 0, spicy: 0.1, strength: 0.6 }
  },
  {
    id: 'final-ward',
    name: 'Final Ward',
    creator: 'Phil Ward',
    source: 'Death & Co, NYC',
    year: 2007,
    category: 'Last Word variant',
    ingredients: [
      { name: 'rye whiskey', amount: 0.75, unit: 'oz' },
      { name: 'green chartreuse', amount: 0.75, unit: 'oz' },
      { name: 'maraschino liqueur', amount: 0.75, unit: 'oz' },
      { name: 'lemon juice', amount: 0.75, unit: 'oz' }
    ],
    method: 'Shake with ice, double strain',
    glass: 'Coupe',
    garnish: 'Brandied cherry',
    tags: ['herbal', 'complex', 'rye', 'chartreuse', 'shaken', 'modern-classic', 'equal-parts'],
    balance: "Last Word template with rye replacing gin. Rye's spice plays with Chartreuse's herbal punch.",
    flavorProfile: { bitter: 0.4, sweet: 0.5, citrus: 0.7, herbal: 0.9, smoky: 0, spicy: 0.3, strength: 0.6 }
  },
  {
    id: 'the-conference',
    name: 'The Conference',
    creator: 'Brian Miller',
    source: 'Death & Co, NYC',
    year: 2008,
    category: 'Split-base Old Fashioned',
    ingredients: [
      { name: 'rye whiskey', amount: 0.75, unit: 'oz' },
      { name: 'bourbon', amount: 0.75, unit: 'oz' },
      { name: 'calvados', amount: 0.5, unit: 'oz' },
      { name: 'cognac', amount: 0.5, unit: 'oz' },
      { name: 'demerara syrup', amount: 1, unit: 'barspoon' },
      { name: 'angostura bitters', amount: 2, unit: 'dash' },
      { name: 'orange bitters', amount: 2, unit: 'dash' }
    ],
    method: 'Stir with ice, strain over large cube',
    glass: 'Rocks',
    garnish: 'Orange and lemon twist',
    tags: ['spirit-forward', 'complex', 'whiskey', 'stirred', 'modern-classic'],
    balance: 'Four-spirit split base creates complexity. Each spirit adds different characteristics. Minimal sweetener lets spirits speak.',
    flavorProfile: { bitter: 0.3, sweet: 0.3, citrus: 0.1, herbal: 0.2, smoky: 0.1, spicy: 0.2, strength: 0.9 }
  },
  // ============================================
  // PDT (PLEASE DON'T TELL) SIGNATURES
  // ============================================
  {
    id: 'bentons-old-fashioned',
    name: "Benton's Old Fashioned",
    creator: 'Don Lee',
    source: 'PDT, NYC',
    year: 2008,
    category: 'Fat-washed Old Fashioned',
    ingredients: [
      { name: 'bacon fat-washed bourbon', amount: 2, unit: 'oz' },
      { name: 'maple syrup', amount: 0.25, unit: 'oz' },
      { name: 'angostura bitters', amount: 2, unit: 'dash' }
    ],
    method: 'Stir with ice, strain over large cube',
    glass: 'Rocks',
    garnish: 'Orange twist',
    tags: ['spirit-forward', 'savory', 'bourbon', 'stirred', 'technique', 'modern-classic'],
    balance: 'Fat-washing adds savory umami depth without greasiness. Maple complements bacon (breakfast flavors).',
    flavorProfile: { bitter: 0.3, sweet: 0.4, citrus: 0.1, herbal: 0.2, smoky: 0.4, spicy: 0.1, strength: 0.9 }
  },
  {
    id: 'mezcal-mule',
    name: 'Mezcal Mule',
    creator: 'Jim Meehan',
    source: 'PDT, NYC',
    year: 2007,
    category: 'Mule variant',
    ingredients: [
      { name: 'mezcal', amount: 2, unit: 'oz' },
      { name: 'lime juice', amount: 0.75, unit: 'oz' },
      { name: 'simple syrup', amount: 0.5, unit: 'oz' },
      { name: 'ginger beer', amount: 2, unit: 'oz' }
    ],
    method: 'Shake mezcal, lime, syrup with ice; strain into Collins with ice; top with ginger beer',
    glass: 'Collins',
    garnish: 'Lime wheel, candied ginger',
    tags: ['smoky', 'refreshing', 'mezcal', 'ginger', 'highball'],
    balance: 'Smoke meets spicy ginger. Lime brightness cuts through both.',
    flavorProfile: { bitter: 0.2, sweet: 0.4, citrus: 0.7, herbal: 0.2, smoky: 0.6, spicy: 0.5, strength: 0.5 }
  },
  // ============================================
  // MILK & HONEY / ATTABOY SIGNATURES
  // ============================================
  {
    id: 'penicillin',
    name: 'Penicillin',
    creator: 'Sam Ross',
    source: 'Milk & Honey, NYC',
    year: 2005,
    category: 'Whisky Sour variant',
    ingredients: [
      { name: 'blended scotch', amount: 2, unit: 'oz' },
      { name: 'lemon juice', amount: 0.75, unit: 'oz' },
      { name: 'honey ginger syrup', amount: 0.75, unit: 'oz' },
      { name: 'islay scotch', amount: 0.25, unit: 'oz' }
    ],
    method: 'Shake first three, strain over ice, float Islay on top',
    glass: 'Rocks',
    garnish: 'Candied ginger',
    tags: ['smoky', 'ginger', 'scotch', 'shaken', 'warming', 'modern-classic'],
    balance: 'Layered experience — smoke hits nose first from Islay float, then honey-ginger sour underneath.',
    flavorProfile: { bitter: 0.3, sweet: 0.5, citrus: 0.7, herbal: 0.4, smoky: 0.6, spicy: 0.5, strength: 0.7 }
  },
  {
    id: 'gold-rush',
    name: 'Gold Rush',
    creator: 'T.J. Siegal',
    source: 'Milk & Honey, NYC',
    year: 2001,
    category: 'Whiskey Sour variant',
    ingredients: [
      { name: 'bourbon', amount: 2, unit: 'oz' },
      { name: 'lemon juice', amount: 0.75, unit: 'oz' },
      { name: 'honey syrup', amount: 0.75, unit: 'oz' }
    ],
    method: 'Shake with ice, double strain',
    glass: 'Coupe',
    garnish: 'None',
    tags: ['citrus', 'bourbon', 'shaken', 'honey', 'modern-classic', 'simple'],
    balance: "Simple three-ingredient sour. Honey's floral notes complement bourbon's vanilla and oak.",
    flavorProfile: { bitter: 0.2, sweet: 0.5, citrus: 0.8, herbal: 0.2, smoky: 0, spicy: 0.1, strength: 0.6 }
  },
  {
    id: 'greenpoint',
    name: 'Greenpoint',
    creator: 'Michael McIlroy',
    source: 'Milk & Honey, NYC',
    year: 2006,
    category: 'Manhattan variant',
    ingredients: [
      { name: 'rye whiskey', amount: 2, unit: 'oz' },
      { name: 'yellow chartreuse', amount: 0.5, unit: 'oz' },
      { name: 'sweet vermouth', amount: 0.5, unit: 'oz' },
      { name: 'angostura bitters', amount: 1, unit: 'dash' },
      { name: 'orange bitters', amount: 1, unit: 'dash' }
    ],
    method: 'Stir with ice, strain',
    glass: 'Coupe',
    garnish: 'Lemon twist',
    tags: ['herbal', 'spirit-forward', 'rye', 'chartreuse', 'stirred', 'modern-classic'],
    balance: 'Yellow Chartreuse adds herbal honey notes to Manhattan template. Named after Brooklyn neighborhood.',
    flavorProfile: { bitter: 0.4, sweet: 0.5, citrus: 0.1, herbal: 0.7, smoky: 0, spicy: 0.2, strength: 0.8 }
  },
  // ============================================
  // PEGU CLUB SIGNATURES
  // ============================================
  {
    id: 'gin-gin-mule',
    name: 'Gin-Gin Mule',
    creator: 'Audrey Saunders',
    source: 'Pegu Club, NYC',
    year: 2000,
    category: 'Mule-Mojito hybrid',
    ingredients: [
      { name: 'gin', amount: 1.75, unit: 'oz' },
      { name: 'simple syrup', amount: 1, unit: 'oz' },
      { name: 'lime juice', amount: 0.75, unit: 'oz' },
      { name: 'ginger beer', amount: 1, unit: 'oz' },
      { name: 'mint', amount: 6, unit: 'leaves' }
    ],
    method: 'Muddle mint with syrup and lime; add gin, shake; strain; top with ginger beer',
    glass: 'Highball',
    garnish: 'Mint sprig, lime wheel',
    tags: ['refreshing', 'ginger', 'gin', 'shaken', 'summer', 'modern-classic'],
    balance: 'Mojito structure meets Mule. Gin replaces rum/vodka. Gateway gin drink with familiar flavors.',
    flavorProfile: { bitter: 0.2, sweet: 0.5, citrus: 0.7, herbal: 0.6, smoky: 0, spicy: 0.4, strength: 0.5 }
  },
  {
    id: 'old-cuban',
    name: 'Old Cuban',
    creator: 'Audrey Saunders',
    source: 'Pegu Club, NYC',
    year: 2001,
    category: 'Champagne cocktail',
    ingredients: [
      { name: 'aged rum', amount: 1.5, unit: 'oz' },
      { name: 'lime juice', amount: 0.75, unit: 'oz' },
      { name: 'simple syrup', amount: 1, unit: 'oz' },
      { name: 'mint', amount: 6, unit: 'leaves' },
      { name: 'angostura bitters', amount: 2, unit: 'dash' },
      { name: 'champagne', amount: 2, unit: 'oz' }
    ],
    method: 'Muddle mint gently; add rum, lime, syrup, bitters; shake; strain; top with Champagne',
    glass: 'Coupe',
    garnish: 'Mint sprig',
    tags: ['elegant', 'sparkling', 'rum', 'shaken', 'celebration', 'modern-classic'],
    balance: 'Mojito meets French 75. Aged rum adds depth. Champagne lifts and adds effervescence.',
    flavorProfile: { bitter: 0.2, sweet: 0.5, citrus: 0.7, herbal: 0.5, smoky: 0, spicy: 0, strength: 0.5 }
  },
  {
    id: 'french-pearl',
    name: 'French Pearl',
    creator: 'Audrey Saunders',
    source: 'Pegu Club, NYC',
    year: 2006,
    category: 'Gin sour with pastis',
    ingredients: [
      { name: 'gin', amount: 1.5, unit: 'oz' },
      { name: 'lime juice', amount: 1, unit: 'oz' },
      { name: 'simple syrup', amount: 0.75, unit: 'oz' },
      { name: 'mint', amount: 6, unit: 'leaves' },
      { name: 'absinthe', amount: 0.25, unit: 'oz' }
    ],
    method: 'Muddle mint with syrup; add remaining ingredients; shake with ice; double strain',
    glass: 'Coupe',
    garnish: 'Mint sprig',
    tags: ['herbal', 'anise', 'gin', 'shaken', 'complex'],
    balance: "Pastis adds anise backbone — unexpected with mint/lime. Gin's botanicals complement pastis.",
    flavorProfile: { bitter: 0.3, sweet: 0.4, citrus: 0.7, herbal: 0.8, smoky: 0, spicy: 0, strength: 0.5 }
  },
  {
    id: 'pegu-club',
    name: 'Pegu Club Cocktail',
    creator: 'Historic (1920s Burma)',
    source: 'Pegu Club, NYC',
    year: 1920,
    category: 'Gin sour, Bittered',
    ingredients: [
      { name: 'gin', amount: 2, unit: 'oz' },
      { name: 'cointreau', amount: 0.75, unit: 'oz' },
      { name: 'lime juice', amount: 0.75, unit: 'oz' },
      { name: 'angostura bitters', amount: 1, unit: 'dash' },
      { name: 'orange bitters', amount: 1, unit: 'dash' }
    ],
    method: 'Shake with ice, strain',
    glass: 'Coupe',
    garnish: 'Lime wheel',
    tags: ['citrus', 'gin', 'shaken', 'classic', 'aperitif'],
    balance: 'Extremely dry cocktail. Double bitters add complexity. Curaçao provides subtle sweetness.',
    flavorProfile: { bitter: 0.4, sweet: 0.3, citrus: 0.8, herbal: 0.4, smoky: 0, spicy: 0, strength: 0.6 }
  },
  // ============================================
  // EMPLOYEES ONLY SIGNATURES
  // ============================================
  {
    id: 'amelia',
    name: 'Amelia',
    creator: 'Employees Only',
    source: 'Employees Only, NYC',
    year: 2004,
    category: 'Vodka Sour',
    ingredients: [
      { name: 'vodka', amount: 2, unit: 'oz' },
      { name: 'st-germain', amount: 1, unit: 'oz' },
      { name: 'blackberry puree', amount: 1, unit: 'oz' },
      { name: 'lemon juice', amount: 0.75, unit: 'oz' }
    ],
    method: 'Shake hard with ice, double strain',
    glass: 'Coupe',
    garnish: 'Mint sprig (smacked)',
    tags: ['fruity', 'floral', 'vodka', 'shaken', 'elegant'],
    balance: 'Fruit-forward but balanced. Elderflower adds floral elegance. "Cosmopolitan sequel" — approachable but sophisticated.',
    flavorProfile: { bitter: 0.1, sweet: 0.6, citrus: 0.6, herbal: 0.3, smoky: 0, spicy: 0, strength: 0.5 }
  },
  {
    id: 'ginger-smash',
    name: 'Ginger Smash',
    creator: 'Employees Only',
    source: 'Employees Only, NYC',
    year: 2004,
    category: 'Smash',
    ingredients: [
      { name: 'aged rum', amount: 2, unit: 'oz' },
      { name: 'apple liqueur', amount: 0.5, unit: 'oz' },
      { name: 'maraschino liqueur', amount: 0.5, unit: 'oz' },
      { name: 'lime juice', amount: 0.75, unit: 'oz' },
      { name: 'fresh ginger', amount: 4, unit: 'slices' }
    ],
    method: 'Muddle ginger; add remaining ingredients; shake hard; double strain over fresh ice',
    glass: 'Rocks',
    garnish: 'Candied ginger',
    tags: ['tropical', 'spicy', 'rum', 'muddled', 'refreshing'],
    balance: 'Fresh ginger provides spicy heat. Maraschino and apple liqueur deepen complexity.',
    flavorProfile: { bitter: 0.2, sweet: 0.5, citrus: 0.6, herbal: 0.3, smoky: 0, spicy: 0.7, strength: 0.5 }
  },
  {
    id: 'billionaire',
    name: 'Billionaire Cocktail',
    creator: 'Employees Only',
    source: 'Employees Only, NYC',
    year: 2004,
    category: 'Bourbon Sour',
    ingredients: [
      { name: 'bourbon', amount: 2, unit: 'oz' },
      { name: 'lemon juice', amount: 1, unit: 'oz' },
      { name: 'grenadine', amount: 0.5, unit: 'oz' },
      { name: 'simple syrup', amount: 0.5, unit: 'oz' },
      { name: 'absinthe', amount: 2, unit: 'dash' }
    ],
    method: 'Shake with ice, double strain',
    glass: 'Coupe',
    garnish: 'Lemon twist',
    tags: ['spirit-forward', 'bourbon', 'shaken', 'complex'],
    balance: 'High-proof bourbon stands up to citrus. Grenadine adds depth and color. Absinthe provides anise whisper.',
    flavorProfile: { bitter: 0.3, sweet: 0.5, citrus: 0.7, herbal: 0.4, smoky: 0, spicy: 0.2, strength: 0.7 }
  },
  {
    id: 'mata-hari',
    name: 'Mata Hari',
    creator: 'Employees Only',
    source: 'Employees Only, NYC',
    year: 2004,
    category: 'Cognac-based',
    ingredients: [
      { name: 'cognac', amount: 2, unit: 'oz' },
      { name: 'sweet vermouth', amount: 1, unit: 'oz' },
      { name: 'pomegranate juice', amount: 0.75, unit: 'oz' }
    ],
    method: 'Shake with ice, double strain',
    glass: 'Coupe',
    garnish: 'Star anise',
    tags: ['fruity', 'cognac', 'shaken', 'elegant'],
    balance: 'Cognac richness meets tart pomegranate. Vermouth adds herbal depth.',
    flavorProfile: { bitter: 0.3, sweet: 0.5, citrus: 0.4, herbal: 0.4, smoky: 0, spicy: 0.1, strength: 0.7 }
  },
  // ============================================
  // DANTE NYC SIGNATURES
  // ============================================
  {
    id: 'garibaldi',
    name: 'Garibaldi',
    creator: 'Classic Italian',
    source: 'Dante, NYC',
    year: 1860,
    category: 'Highball',
    ingredients: [
      { name: 'campari', amount: 1.5, unit: 'oz' },
      { name: 'orange juice', amount: 4, unit: 'oz' }
    ],
    method: 'Add Campari to glass with ice; use high-speed juicer for "fluffy" OJ; pour over Campari; stir gently',
    glass: 'Collins',
    garnish: 'Orange wedge',
    tags: ['bitter', 'refreshing', 'aperitivo', 'easy', 'summer', 'brunch'],
    balance: 'Two ingredients, but technique matters. Fresh-squeezed, aerated OJ is essential for the "fluffy" texture.',
    flavorProfile: { bitter: 0.6, sweet: 0.4, citrus: 0.8, herbal: 0.2, smoky: 0, spicy: 0, strength: 0.3 }
  },
  {
    id: 'negroni-sbagliato',
    name: 'Negroni Sbagliato',
    creator: 'Mirko Stocchetto',
    source: 'Bar Basso, Milan',
    year: 1972,
    category: 'Negroni variant',
    ingredients: [
      { name: 'campari', amount: 1, unit: 'oz' },
      { name: 'sweet vermouth', amount: 1, unit: 'oz' },
      { name: 'prosecco', amount: 2, unit: 'oz' }
    ],
    method: 'Build in glass over ice, stir gently',
    glass: 'Rocks',
    garnish: 'Orange slice',
    tags: ['bitter', 'sparkling', 'aperitivo', 'light', 'easy'],
    balance: '"Sbagliato" means "mistaken" — prosecco replaces gin by happy accident. Lighter, more refreshing than classic Negroni.',
    flavorProfile: { bitter: 0.7, sweet: 0.5, citrus: 0.2, herbal: 0.4, smoky: 0, spicy: 0, strength: 0.4 }
  },
  // ============================================
  // CLASSIC NEGRONI FAMILY
  // ============================================
  {
    id: 'negroni',
    name: 'Negroni',
    creator: 'Count Camillo Negroni',
    source: 'Caffè Casoni, Florence',
    year: 1919,
    category: 'Bitter-sweet aperitivo',
    ingredients: [
      { name: 'gin', amount: 1, unit: 'oz' },
      { name: 'campari', amount: 1, unit: 'oz' },
      { name: 'sweet vermouth', amount: 1, unit: 'oz' }
    ],
    method: 'Stir with ice, strain over large cube',
    glass: 'Rocks',
    garnish: 'Orange twist',
    tags: ['bitter', 'classic', 'gin', 'aperitivo', 'stirred', 'pre-dinner', 'equal-parts'],
    balance: 'The holy trinity of bitter-sweet balance. Equal parts creates perfect tension between botanical gin, bitter Campari, and sweet vermouth.',
    flavorProfile: { bitter: 0.9, sweet: 0.5, citrus: 0.2, herbal: 0.6, smoky: 0, spicy: 0, strength: 0.7 }
  },
  {
    id: 'boulevardier',
    name: 'Boulevardier',
    creator: 'Erskine Gwynne',
    source: "Harry's New York Bar, Paris",
    year: 1927,
    category: 'Negroni variant',
    ingredients: [
      { name: 'bourbon', amount: 1.25, unit: 'oz' },
      { name: 'campari', amount: 1, unit: 'oz' },
      { name: 'sweet vermouth', amount: 1, unit: 'oz' }
    ],
    method: 'Stir with ice, strain over large cube',
    glass: 'Rocks',
    garnish: 'Orange twist',
    tags: ['bitter', 'spirit-forward', 'bourbon', 'stirred', 'pre-dinner', 'classic'],
    balance: "Whiskey's warmth replaces gin's brightness. Spirit-forward but balanced — perfect pre-dinner.",
    flavorProfile: { bitter: 0.8, sweet: 0.5, citrus: 0.2, herbal: 0.4, smoky: 0, spicy: 0.2, strength: 0.8 }
  },
  {
    id: 'old-pal',
    name: 'Old Pal',
    creator: 'Harry MacElhone',
    source: "Harry's New York Bar, Paris",
    year: 1920,
    category: 'Negroni variant, Dry',
    ingredients: [
      { name: 'rye whiskey', amount: 1, unit: 'oz' },
      { name: 'campari', amount: 1, unit: 'oz' },
      { name: 'dry vermouth', amount: 1, unit: 'oz' }
    ],
    method: 'Stir with ice, strain',
    glass: 'Coupe',
    garnish: 'Lemon twist',
    tags: ['bitter', 'dry', 'rye', 'stirred', 'classic', 'equal-parts'],
    balance: "Dry vermouth instead of sweet = much drier drink. Rye's spice plays well with Campari's bitterness.",
    flavorProfile: { bitter: 0.8, sweet: 0.3, citrus: 0.2, herbal: 0.5, smoky: 0, spicy: 0.3, strength: 0.7 }
  },
  {
    id: 'americano',
    name: 'Americano',
    creator: 'Gaspare Campari',
    source: 'Caffè Campari, Milan',
    year: 1860,
    category: 'Highball',
    ingredients: [
      { name: 'campari', amount: 1.5, unit: 'oz' },
      { name: 'sweet vermouth', amount: 1.5, unit: 'oz' },
      { name: 'soda water', amount: 3, unit: 'oz' }
    ],
    method: 'Build in glass over ice, top with soda',
    glass: 'Highball',
    garnish: 'Orange slice',
    tags: ['bitter', 'refreshing', 'aperitivo', 'light', 'easy', 'classic'],
    balance: 'The Negroni before gin was added. Light, refreshing, perfect afternoon aperitivo.',
    flavorProfile: { bitter: 0.7, sweet: 0.4, citrus: 0.2, herbal: 0.4, smoky: 0, spicy: 0, strength: 0.3 }
  },
  // ============================================
  // CLASSIC SOUR FAMILY
  // ============================================
  {
    id: 'whiskey-sour',
    name: 'Whiskey Sour',
    creator: 'Classic',
    source: 'Historic',
    year: 1870,
    category: 'Sour',
    ingredients: [
      { name: 'bourbon', amount: 2, unit: 'oz' },
      { name: 'lemon juice', amount: 0.75, unit: 'oz' },
      { name: 'simple syrup', amount: 0.75, unit: 'oz' },
      { name: 'egg white', amount: 1, unit: 'whole' }
    ],
    method: 'Dry shake without ice, then shake with ice, strain',
    glass: 'Coupe',
    garnish: 'Angostura drops on foam, cherry',
    tags: ['citrus', 'bourbon', 'shaken', 'classic', 'egg-white'],
    balance: 'The original sour template. Egg white adds silky texture. Bourbon warmth balanced by bright citrus.',
    flavorProfile: { bitter: 0.2, sweet: 0.5, citrus: 0.8, herbal: 0.1, smoky: 0, spicy: 0.1, strength: 0.6 }
  },
  {
    id: 'daiquiri',
    name: 'Daiquiri',
    creator: 'Jennings Cox',
    source: 'Cuba',
    year: 1898,
    category: 'Sour',
    ingredients: [
      { name: 'white rum', amount: 2, unit: 'oz' },
      { name: 'lime juice', amount: 1, unit: 'oz' },
      { name: 'simple syrup', amount: 0.75, unit: 'oz' }
    ],
    method: 'Shake with ice, double strain',
    glass: 'Coupe',
    garnish: 'Lime wheel',
    tags: ['refreshing', 'citrus', 'rum', 'shaken', 'classic', 'summer'],
    balance: 'The perfect sour template. Spirit, citrus, sugar in ideal proportion. Clean, bright, balanced.',
    flavorProfile: { bitter: 0.1, sweet: 0.5, citrus: 0.9, herbal: 0.1, smoky: 0, spicy: 0, strength: 0.5 }
  },
  {
    id: 'margarita',
    name: 'Margarita',
    creator: 'Disputed',
    source: 'Mexico',
    year: 1940,
    category: 'Sour',
    ingredients: [
      { name: 'blanco tequila', amount: 2, unit: 'oz' },
      { name: 'lime juice', amount: 1, unit: 'oz' },
      { name: 'cointreau', amount: 0.75, unit: 'oz' }
    ],
    method: 'Shake with ice, strain into salt-rimmed glass',
    glass: 'Coupe',
    garnish: 'Lime wheel, salt rim',
    tags: ['refreshing', 'citrus', 'tequila', 'shaken', 'classic', 'summer'],
    balance: 'Bright lime against agave sweetness. Cointreau bridges spirit and acid. Salt rim amplifies all flavors.',
    flavorProfile: { bitter: 0.2, sweet: 0.5, citrus: 0.9, herbal: 0.2, smoky: 0, spicy: 0.1, strength: 0.6 }
  },
  {
    id: 'sidecar',
    name: 'Sidecar',
    creator: 'Disputed',
    source: 'Paris',
    year: 1920,
    category: 'Sour',
    ingredients: [
      { name: 'cognac', amount: 2, unit: 'oz' },
      { name: 'cointreau', amount: 0.75, unit: 'oz' },
      { name: 'lemon juice', amount: 0.75, unit: 'oz' }
    ],
    method: 'Shake with ice, strain into sugar-rimmed glass (optional)',
    glass: 'Coupe',
    garnish: 'Sugar rim (optional), lemon twist',
    tags: ['citrus', 'cognac', 'shaken', 'classic', 'elegant'],
    balance: 'Cognac richness meets bright citrus. Cointreau bridges spirit and acid. The brandy sour perfected.',
    flavorProfile: { bitter: 0.2, sweet: 0.5, citrus: 0.8, herbal: 0.2, smoky: 0, spicy: 0.1, strength: 0.7 }
  },
  // ============================================
  // CLASSIC MANHATTAN FAMILY
  // ============================================
  {
    id: 'manhattan',
    name: 'Manhattan',
    creator: 'Manhattan Club',
    source: 'New York City',
    year: 1870,
    category: 'Spirit-forward',
    ingredients: [
      { name: 'rye whiskey', amount: 2, unit: 'oz' },
      { name: 'sweet vermouth', amount: 1, unit: 'oz' },
      { name: 'angostura bitters', amount: 2, unit: 'dash' }
    ],
    method: 'Stir with ice, strain',
    glass: 'Coupe',
    garnish: 'Brandied cherry',
    tags: ['spirit-forward', 'rye', 'classic', 'stirred', 'elegant'],
    balance: 'Rye spice meets vermouth sweetness. Bitters tie it together. The template for countless variations.',
    flavorProfile: { bitter: 0.4, sweet: 0.5, citrus: 0.1, herbal: 0.3, smoky: 0, spicy: 0.3, strength: 0.8 }
  },
  {
    id: 'rob-roy',
    name: 'Rob Roy',
    creator: 'Unknown',
    source: 'Waldorf Astoria, NYC',
    year: 1894,
    category: 'Manhattan variant',
    ingredients: [
      { name: 'blended scotch', amount: 2, unit: 'oz' },
      { name: 'sweet vermouth', amount: 1, unit: 'oz' },
      { name: 'angostura bitters', amount: 2, unit: 'dash' }
    ],
    method: 'Stir with ice, strain',
    glass: 'Coupe',
    garnish: 'Brandied cherry',
    tags: ['spirit-forward', 'scotch', 'classic', 'stirred'],
    balance: 'Manhattan with Scotch. Malt and smoke meet vermouth sweetness.',
    flavorProfile: { bitter: 0.4, sweet: 0.5, citrus: 0.1, herbal: 0.3, smoky: 0.3, spicy: 0.2, strength: 0.8 }
  },
  {
    id: 'vieux-carre',
    name: 'Vieux Carré',
    creator: 'Walter Bergeron',
    source: 'Hotel Monteleone, New Orleans',
    year: 1930,
    category: 'Manhattan variant',
    ingredients: [
      { name: 'rye whiskey', amount: 0.75, unit: 'oz' },
      { name: 'cognac', amount: 0.75, unit: 'oz' },
      { name: 'sweet vermouth', amount: 0.75, unit: 'oz' },
      { name: 'benedictine', amount: 1, unit: 'barspoon' },
      { name: 'peychauds bitters', amount: 2, unit: 'dash' },
      { name: 'angostura bitters', amount: 2, unit: 'dash' }
    ],
    method: 'Stir with ice, strain over large cube',
    glass: 'Rocks',
    garnish: 'Lemon twist',
    tags: ['spirit-forward', 'complex', 'rye', 'cognac', 'stirred', 'classic'],
    balance: 'Split base (rye + cognac) creates more complexity. Bénédictine adds herbal honey sweetness.',
    flavorProfile: { bitter: 0.4, sweet: 0.5, citrus: 0.1, herbal: 0.5, smoky: 0, spicy: 0.3, strength: 0.8 }
  },
  {
    id: 'toronto',
    name: 'Toronto',
    creator: 'Unknown',
    source: 'Canada',
    year: 1920,
    category: 'Manhattan variant',
    ingredients: [
      { name: 'rye whiskey', amount: 2, unit: 'oz' },
      { name: 'fernet branca', amount: 0.25, unit: 'oz' },
      { name: 'simple syrup', amount: 0.25, unit: 'oz' },
      { name: 'angostura bitters', amount: 2, unit: 'dash' }
    ],
    method: 'Stir with ice, strain',
    glass: 'Coupe',
    garnish: 'Orange twist',
    tags: ['bitter', 'spirit-forward', 'rye', 'fernet', 'stirred', 'classic'],
    balance: 'Fernet adds intense menthol-bitter complexity to rye. Not for the faint-hearted.',
    flavorProfile: { bitter: 0.8, sweet: 0.3, citrus: 0.1, herbal: 0.7, smoky: 0, spicy: 0.2, strength: 0.8 }
  },
  {
    id: 'black-manhattan',
    name: 'Black Manhattan',
    creator: 'Todd Smith',
    source: 'Bourbon & Branch, San Francisco',
    year: 2005,
    category: 'Manhattan variant',
    ingredients: [
      { name: 'rye whiskey', amount: 2, unit: 'oz' },
      { name: 'averna', amount: 1, unit: 'oz' },
      { name: 'angostura bitters', amount: 1, unit: 'dash' },
      { name: 'orange bitters', amount: 1, unit: 'dash' }
    ],
    method: 'Stir with ice, strain',
    glass: 'Coupe',
    garnish: 'Brandied cherry',
    tags: ['bitter', 'spirit-forward', 'rye', 'amaro', 'stirred', 'modern-classic'],
    balance: 'Averna replaces sweet vermouth for deeper, more bitter complexity. Chocolate and orange notes emerge.',
    flavorProfile: { bitter: 0.7, sweet: 0.4, citrus: 0.1, herbal: 0.5, smoky: 0, spicy: 0.2, strength: 0.8 }
  },
  // ============================================
  // CLASSIC OLD FASHIONED FAMILY
  // ============================================
  {
    id: 'old-fashioned',
    name: 'Old Fashioned',
    creator: 'Pendennis Club',
    source: 'Louisville, Kentucky',
    year: 1880,
    category: 'Spirit-forward',
    ingredients: [
      { name: 'bourbon', amount: 2, unit: 'oz' },
      { name: 'simple syrup', amount: 0.25, unit: 'oz' },
      { name: 'angostura bitters', amount: 2, unit: 'dash' }
    ],
    method: 'Stir with ice, strain over large cube',
    glass: 'Rocks',
    garnish: 'Orange twist, cherry',
    tags: ['spirit-forward', 'bourbon', 'classic', 'stirred', 'nightcap'],
    balance: 'The template for spirit-forward cocktails. Minimal sweetness lets the whiskey shine. Bitters add aromatic complexity.',
    flavorProfile: { bitter: 0.3, sweet: 0.3, citrus: 0.1, herbal: 0.2, smoky: 0, spicy: 0.2, strength: 0.9 }
  },
  {
    id: 'sazerac',
    name: 'Sazerac',
    creator: 'Antoine Peychaud',
    source: 'New Orleans',
    year: 1850,
    category: 'Old Fashioned variant',
    ingredients: [
      { name: 'rye whiskey', amount: 2, unit: 'oz' },
      { name: 'simple syrup', amount: 0.25, unit: 'oz' },
      { name: 'peychauds bitters', amount: 3, unit: 'dash' },
      { name: 'absinthe', amount: 1, unit: 'rinse' }
    ],
    method: 'Rinse chilled glass with absinthe, discard excess; stir remaining ingredients with ice; strain into prepared glass (no ice)',
    glass: 'Rocks (no ice)',
    garnish: 'Lemon twist (expressed, discarded)',
    tags: ['spirit-forward', 'rye', 'stirred', 'classic', 'new-orleans', 'anise'],
    balance: "The original New Orleans cocktail. Absinthe rinse adds anise perfume without overwhelming. Peychaud's floral bitters essential.",
    flavorProfile: { bitter: 0.4, sweet: 0.3, citrus: 0.1, herbal: 0.6, smoky: 0, spicy: 0.2, strength: 0.9 }
  },
  // ============================================
  // CLASSIC MARTINI FAMILY
  // ============================================
  {
    id: 'dry-martini',
    name: 'Dry Martini',
    creator: 'Classic',
    source: 'Historic',
    year: 1900,
    category: 'Spirit-forward',
    ingredients: [
      { name: 'gin', amount: 2.5, unit: 'oz' },
      { name: 'dry vermouth', amount: 0.5, unit: 'oz' },
      { name: 'orange bitters', amount: 1, unit: 'dash' }
    ],
    method: 'Stir with ice, strain',
    glass: 'Martini',
    garnish: 'Lemon twist or olive',
    tags: ['spirit-forward', 'gin', 'stirred', 'classic', 'elegant'],
    balance: 'The most iconic cocktail. Dry vermouth adds herbal complexity. Gin botanicals shine.',
    flavorProfile: { bitter: 0.3, sweet: 0.2, citrus: 0.2, herbal: 0.7, smoky: 0, spicy: 0.1, strength: 0.9 }
  },
  {
    id: 'martinez',
    name: 'Martinez',
    creator: 'Historic',
    source: 'Classic',
    year: 1880,
    category: 'Proto-Martini',
    ingredients: [
      { name: 'gin', amount: 1.5, unit: 'oz' },
      { name: 'sweet vermouth', amount: 1.5, unit: 'oz' },
      { name: 'maraschino liqueur', amount: 1, unit: 'barspoon' },
      { name: 'angostura bitters', amount: 2, unit: 'dash' }
    ],
    method: 'Stir with ice, strain',
    glass: 'Coupe',
    garnish: 'Lemon twist',
    tags: ['spirit-forward', 'gin', 'stirred', 'classic', 'historical'],
    balance: 'The Martini before it went dry. Sweeter, more complex. Equal parts gin and vermouth.',
    flavorProfile: { bitter: 0.3, sweet: 0.5, citrus: 0.1, herbal: 0.6, smoky: 0, spicy: 0.1, strength: 0.7 }
  },
  // ============================================
  // LAST WORD FAMILY
  // ============================================
  {
    id: 'last-word',
    name: 'Last Word',
    creator: 'Detroit Athletic Club',
    source: 'Detroit Athletic Club',
    year: 1920,
    category: 'Equal parts',
    ingredients: [
      { name: 'gin', amount: 0.75, unit: 'oz' },
      { name: 'green chartreuse', amount: 0.75, unit: 'oz' },
      { name: 'maraschino liqueur', amount: 0.75, unit: 'oz' },
      { name: 'lime juice', amount: 0.75, unit: 'oz' }
    ],
    method: 'Shake with ice, double strain',
    glass: 'Coupe',
    garnish: 'None',
    tags: ['herbal', 'complex', 'gin', 'chartreuse', 'shaken', 'classic', 'equal-parts'],
    balance: 'Perfect equal parts balance. Herbal (Chartreuse) + cherry (Maraschino) + botanical (gin) + acid (lime). Each bold ingredient held in democracy.',
    flavorProfile: { bitter: 0.4, sweet: 0.5, citrus: 0.7, herbal: 0.9, smoky: 0, spicy: 0.1, strength: 0.6 }
  },
  // ============================================
  // TIKI ESSENTIALS
  // ============================================
  {
    id: 'mai-tai',
    name: 'Mai Tai',
    creator: 'Trader Vic',
    source: "Trader Vic's, Oakland",
    year: 1944,
    category: 'Tiki',
    ingredients: [
      { name: 'aged rum', amount: 2, unit: 'oz' },
      { name: 'cointreau', amount: 0.5, unit: 'oz' },
      { name: 'lime juice', amount: 0.75, unit: 'oz' },
      { name: 'orgeat', amount: 0.5, unit: 'oz' },
      { name: 'simple syrup', amount: 0.25, unit: 'oz' }
    ],
    method: 'Shake with ice, strain over crushed ice',
    glass: 'Rocks',
    garnish: 'Spent lime shell, mint sprig',
    tags: ['tropical', 'rum', 'tiki', 'shaken', 'classic'],
    balance: 'The king of tiki. Aged rum complexity, almond orgeat sweetness, bright lime acid.',
    flavorProfile: { bitter: 0.2, sweet: 0.5, citrus: 0.7, herbal: 0.3, smoky: 0, spicy: 0, strength: 0.6 }
  },
  {
    id: 'jungle-bird',
    name: 'Jungle Bird',
    creator: 'Unknown',
    source: 'Kuala Lumpur Hilton',
    year: 1978,
    category: 'Tiki, Bitter',
    ingredients: [
      { name: 'aged rum', amount: 1.5, unit: 'oz' },
      { name: 'campari', amount: 0.75, unit: 'oz' },
      { name: 'pineapple juice', amount: 1.5, unit: 'oz' },
      { name: 'lime juice', amount: 0.5, unit: 'oz' },
      { name: 'simple syrup', amount: 0.5, unit: 'oz' }
    ],
    method: 'Shake with ice, strain over fresh ice',
    glass: 'Rocks',
    garnish: 'Pineapple wedge',
    tags: ['tropical', 'bitter', 'rum', 'tiki', 'shaken', 'modern-classic'],
    balance: 'Campari in tiki = unexpected bitter backbone. Pineapple sweetness balances Campari bitterness.',
    flavorProfile: { bitter: 0.6, sweet: 0.6, citrus: 0.5, herbal: 0.2, smoky: 0, spicy: 0, strength: 0.5 }
  },
  {
    id: 'trinidad-sour',
    name: 'Trinidad Sour',
    creator: 'Giuseppe González',
    source: 'Clover Club, NYC',
    year: 2009,
    category: 'Bitters-forward Sour',
    ingredients: [
      { name: 'angostura bitters', amount: 1.5, unit: 'oz' },
      { name: 'orgeat', amount: 1, unit: 'oz' },
      { name: 'lemon juice', amount: 0.75, unit: 'oz' },
      { name: 'rye whiskey', amount: 0.5, unit: 'oz' }
    ],
    method: 'Shake with ice, double strain',
    glass: 'Coupe',
    garnish: 'None',
    tags: ['bitter', 'unique', 'shaken', 'modern-classic', 'conversation-starter'],
    balance: "Bitters as base spirit — radical inversion. Orgeat's sweetness essential to balance. Proves any ingredient can be a base with proper balance.",
    flavorProfile: { bitter: 0.9, sweet: 0.5, citrus: 0.6, herbal: 0.8, smoky: 0, spicy: 0.5, strength: 0.6 }
  },
  // ============================================
  // APERITIVO & SPRITZ
  // ============================================
  {
    id: 'aperol-spritz',
    name: 'Aperol Spritz',
    creator: 'Classic Italian',
    source: 'Italy',
    year: 1950,
    category: 'Spritz',
    ingredients: [
      { name: 'prosecco', amount: 3, unit: 'oz' },
      { name: 'aperol', amount: 2, unit: 'oz' },
      { name: 'soda water', amount: 1, unit: 'oz' }
    ],
    method: 'Build in glass over ice, stir gently',
    glass: 'Wine glass',
    garnish: 'Orange slice',
    tags: ['refreshing', 'light', 'aperitivo', 'sparkling', 'summer', 'easy'],
    balance: 'Light and refreshing. Bitter-sweet Aperol lifted by bubbles. Perfect afternoon drink.',
    flavorProfile: { bitter: 0.4, sweet: 0.5, citrus: 0.3, herbal: 0.2, smoky: 0, spicy: 0, strength: 0.3 }
  },
  // ============================================
  // AFTER-DINNER & DIGESTIF
  // ============================================
  {
    id: 'revolver',
    name: 'Revolver',
    creator: 'Jon Santer',
    source: 'Bourbon & Branch, San Francisco',
    year: 2004,
    category: 'After-dinner',
    ingredients: [
      { name: 'bourbon', amount: 2, unit: 'oz' },
      { name: 'coffee liqueur', amount: 0.5, unit: 'oz' },
      { name: 'orange bitters', amount: 2, unit: 'dash' }
    ],
    method: 'Stir with ice, strain',
    glass: 'Coupe',
    garnish: 'Flamed orange twist',
    tags: ['spirit-forward', 'coffee', 'bourbon', 'stirred', 'nightcap', 'modern-classic'],
    balance: 'Coffee liqueur adds depth without sweetness overload. Orange bitters bridge bourbon and coffee. Perfect nightcap.',
    flavorProfile: { bitter: 0.4, sweet: 0.4, citrus: 0.2, herbal: 0.2, smoky: 0, spicy: 0.1, strength: 0.8 }
  },
  {
    id: 'espresso-martini',
    name: 'Espresso Martini',
    creator: 'Dick Bradsell',
    source: "Fred's Club, London",
    year: 1983,
    category: 'After-dinner',
    ingredients: [
      { name: 'vodka', amount: 1.5, unit: 'oz' },
      { name: 'coffee liqueur', amount: 1, unit: 'oz' },
      { name: 'simple syrup', amount: 0.5, unit: 'oz' }
    ],
    method: 'Shake hard with ice (for foam), double strain',
    glass: 'Martini',
    garnish: '3 coffee beans',
    tags: ['coffee', 'vodka', 'shaken', 'nightcap', 'modern-classic'],
    balance: 'Vodka provides clean canvas for coffee. Shake hard for signature foam.',
    flavorProfile: { bitter: 0.4, sweet: 0.5, citrus: 0, herbal: 0.1, smoky: 0, spicy: 0, strength: 0.5 }
  },
  {
    id: 'bitter-giuseppe',
    name: 'Bitter Giuseppe',
    creator: 'Stephen Cole',
    source: 'Amor y Amargo, NYC',
    year: 2008,
    category: 'Spirit-forward, Bitter',
    ingredients: [
      { name: 'cynar', amount: 2, unit: 'oz' },
      { name: 'sweet vermouth', amount: 1, unit: 'oz' },
      { name: 'lemon juice', amount: 0.25, unit: 'oz' },
      { name: 'orange bitters', amount: 6, unit: 'dash' }
    ],
    method: 'Stir with ice, strain over large cube',
    glass: 'Rocks',
    garnish: 'Lemon twist',
    tags: ['bitter', 'amaro', 'stirred', 'modern-classic', 'digestif'],
    balance: 'Cynar-forward with vermouth support. Touch of citrus brightens. For serious bitter lovers.',
    flavorProfile: { bitter: 0.9, sweet: 0.4, citrus: 0.3, herbal: 0.7, smoky: 0, spicy: 0.1, strength: 0.6 }
  },
  // ============================================
  // CHARTREUSE COCKTAILS
  // ============================================
  {
    id: 'champs-elysees',
    name: 'Champs-Élysées',
    creator: 'Harry Craddock',
    source: 'The Savoy, London',
    year: 1930,
    category: 'Sour',
    ingredients: [
      { name: 'cognac', amount: 1.5, unit: 'oz' },
      { name: 'green chartreuse', amount: 0.5, unit: 'oz' },
      { name: 'lemon juice', amount: 0.75, unit: 'oz' },
      { name: 'simple syrup', amount: 0.25, unit: 'oz' },
      { name: 'angostura bitters', amount: 1, unit: 'dash' }
    ],
    method: 'Shake with ice, double strain',
    glass: 'Coupe',
    garnish: 'Lemon twist',
    tags: ['herbal', 'cognac', 'chartreuse', 'shaken', 'classic', 'elegant'],
    balance: 'Cognac richness meets Chartreuse herbaceousness. Lemon brightens, bitters add depth.',
    flavorProfile: { bitter: 0.4, sweet: 0.4, citrus: 0.7, herbal: 0.7, smoky: 0, spicy: 0.1, strength: 0.7 }
  },
  {
    id: 'chartreuse-swizzle',
    name: 'Chartreuse Swizzle',
    creator: 'Marcovaldo Dionysos',
    source: 'Clock Bar, San Francisco',
    year: 2005,
    category: 'Swizzle',
    ingredients: [
      { name: 'green chartreuse', amount: 1.25, unit: 'oz' },
      { name: 'pineapple juice', amount: 1, unit: 'oz' },
      { name: 'lime juice', amount: 0.75, unit: 'oz' },
      { name: 'falernum', amount: 0.5, unit: 'oz' }
    ],
    method: 'Combine in Collins glass, fill with crushed ice, swizzle until frost forms',
    glass: 'Collins',
    garnish: 'Mint bouquet, freshly grated nutmeg',
    tags: ['herbal', 'tropical', 'chartreuse', 'swizzle', 'refreshing', 'modern-classic'],
    balance: 'Chartreuse tamed by pineapple and falernum. Tropical meets alpine monastery.',
    flavorProfile: { bitter: 0.3, sweet: 0.5, citrus: 0.6, herbal: 0.9, smoky: 0, spicy: 0.3, strength: 0.5 }
  },
  {
    id: 'benevolent-king',
    name: 'A Benevolent King',
    creator: 'Chartreuse Lounge',
    source: 'Chartreuse Lounge',
    year: 2010,
    category: 'Stirred, Complex',
    ingredients: [
      { name: 'bourbon', amount: 1.5, unit: 'oz' },
      { name: 'green chartreuse', amount: 0.75, unit: 'oz' },
      { name: 'sweet vermouth', amount: 0.75, unit: 'oz' },
      { name: 'angostura bitters', amount: 2, unit: 'dash' }
    ],
    method: 'Stir with ice, strain',
    glass: 'Coupe',
    garnish: 'Orange twist',
    tags: ['herbal', 'spirit-forward', 'bourbon', 'chartreuse', 'stirred'],
    balance: 'Manhattan meets Chartreuse. Bourbon warmth, herbal complexity, vermouth sweetness.',
    flavorProfile: { bitter: 0.4, sweet: 0.5, citrus: 0.1, herbal: 0.8, smoky: 0, spicy: 0.2, strength: 0.7 }
  },
  // ============================================
  // AMARO-FORWARD
  // ============================================
  {
    id: 'division-bell',
    name: 'Division Bell',
    creator: 'Phil Ward',
    source: 'Mayahuel, NYC',
    year: 2009,
    category: 'Mezcal-Aperol',
    ingredients: [
      { name: 'mezcal', amount: 1, unit: 'oz' },
      { name: 'aperol', amount: 1, unit: 'oz' },
      { name: 'maraschino liqueur', amount: 0.5, unit: 'oz' },
      { name: 'lime juice', amount: 0.75, unit: 'oz' }
    ],
    method: 'Shake with ice, double strain',
    glass: 'Coupe',
    garnish: 'Grapefruit twist',
    tags: ['smoky', 'bitter-sweet', 'mezcal', 'shaken', 'modern-classic'],
    balance: 'Mezcal smoke meets Aperol bitter-sweet. Maraschino adds subtle cherry depth.',
    flavorProfile: { bitter: 0.6, sweet: 0.4, citrus: 0.7, herbal: 0.3, smoky: 0.7, spicy: 0, strength: 0.5 }
  },
  // ============================================
  // OTHER MODERN CLASSICS
  // ============================================
  {
    id: 'corpse-reviver-2',
    name: 'Corpse Reviver No. 2',
    creator: 'Harry Craddock',
    source: 'The Savoy, London',
    year: 1930,
    category: 'Equal parts',
    ingredients: [
      { name: 'gin', amount: 0.75, unit: 'oz' },
      { name: 'cointreau', amount: 0.75, unit: 'oz' },
      { name: 'lillet blanc', amount: 0.75, unit: 'oz' },
      { name: 'lemon juice', amount: 0.75, unit: 'oz' },
      { name: 'absinthe', amount: 1, unit: 'dash' }
    ],
    method: 'Shake with ice, strain',
    glass: 'Coupe',
    garnish: 'Cherry or lemon twist',
    tags: ['complex', 'gin', 'shaken', 'classic', 'brunch', 'equal-parts'],
    balance: 'The hangover cure that became a classic. Equal parts with absinthe whisper. Bright, complex, restorative.',
    flavorProfile: { bitter: 0.3, sweet: 0.5, citrus: 0.7, herbal: 0.5, smoky: 0, spicy: 0, strength: 0.5 }
  },
  {
    id: 'aviation',
    name: 'Aviation',
    creator: 'Hugo Ensslin',
    source: 'Hotel Wallick, NYC',
    year: 1916,
    category: 'Gin Sour',
    ingredients: [
      { name: 'gin', amount: 2, unit: 'oz' },
      { name: 'maraschino liqueur', amount: 0.5, unit: 'oz' },
      { name: 'creme de violette', amount: 0.25, unit: 'oz' },
      { name: 'lemon juice', amount: 0.75, unit: 'oz' }
    ],
    method: 'Shake with ice, strain',
    glass: 'Coupe',
    garnish: 'Cherry',
    tags: ['floral', 'gin', 'shaken', 'classic', 'elegant'],
    balance: 'Sky-blue color from crème de violette. Floral without being perfumy. The violet should whisper, not shout.',
    flavorProfile: { bitter: 0.2, sweet: 0.4, citrus: 0.7, herbal: 0.3, smoky: 0, spicy: 0, strength: 0.6 }
  },
  {
    id: 'bees-knees',
    name: "Bee's Knees",
    creator: 'Frank Meier',
    source: 'Hotel Ritz, Paris',
    year: 1920,
    category: 'Gin Sour',
    ingredients: [
      { name: 'gin', amount: 2, unit: 'oz' },
      { name: 'lemon juice', amount: 0.75, unit: 'oz' },
      { name: 'honey syrup', amount: 0.75, unit: 'oz' }
    ],
    method: 'Shake with ice, strain',
    glass: 'Coupe',
    garnish: 'Lemon twist',
    tags: ['citrus', 'gin', 'shaken', 'classic', 'honey', 'prohibition'],
    balance: "Prohibition-era drink designed to mask bathtub gin. Honey adds floral sweetness that pairs beautifully with juniper.",
    flavorProfile: { bitter: 0.2, sweet: 0.5, citrus: 0.8, herbal: 0.4, smoky: 0, spicy: 0, strength: 0.5 }
  },
  {
    id: 'paloma',
    name: 'Paloma',
    creator: 'Classic Mexican',
    source: 'Mexico',
    year: 1950,
    category: 'Highball',
    ingredients: [
      { name: 'blanco tequila', amount: 2, unit: 'oz' },
      { name: 'lime juice', amount: 0.5, unit: 'oz' },
      { name: 'grapefruit soda', amount: 4, unit: 'oz' }
    ],
    method: 'Build in glass over ice, stir gently',
    glass: 'Collins',
    garnish: 'Lime wheel, salt rim (optional)',
    tags: ['refreshing', 'citrus', 'tequila', 'highball', 'summer', 'easy'],
    balance: 'More popular than Margarita in Mexico. Grapefruit bitterness complements agave. Light, crushable, perfect hot-weather drink.',
    flavorProfile: { bitter: 0.3, sweet: 0.4, citrus: 0.8, herbal: 0.1, smoky: 0, spicy: 0, strength: 0.4 }
  },
  {
    id: 'french-75',
    name: 'French 75',
    creator: 'Harry MacElhone',
    source: "Harry's New York Bar, Paris",
    year: 1926,
    category: 'Champagne cocktail',
    ingredients: [
      { name: 'gin', amount: 1.5, unit: 'oz' },
      { name: 'lemon juice', amount: 0.75, unit: 'oz' },
      { name: 'simple syrup', amount: 0.5, unit: 'oz' },
      { name: 'champagne', amount: 2, unit: 'oz' }
    ],
    method: 'Shake gin, lemon, syrup with ice; strain into flute; top with Champagne',
    glass: 'Flute',
    garnish: 'Lemon twist',
    tags: ['sparkling', 'gin', 'elegant', 'celebration', 'classic'],
    balance: 'Named after French 75mm artillery gun — it "hits hard." Champagne lifts a simple gin sour into celebration territory.',
    flavorProfile: { bitter: 0.2, sweet: 0.4, citrus: 0.7, herbal: 0.3, smoky: 0, spicy: 0, strength: 0.5 }
  },
  {
    id: 'mint-julep',
    name: 'Mint Julep',
    creator: 'Classic American',
    source: 'Kentucky',
    year: 1800,
    category: 'Smash',
    ingredients: [
      { name: 'bourbon', amount: 2.5, unit: 'oz' },
      { name: 'simple syrup', amount: 0.5, unit: 'oz' },
      { name: 'mint', amount: 8, unit: 'leaves' }
    ],
    method: 'Gently muddle mint with syrup; add bourbon; fill with crushed ice; stir until frost forms; pack more crushed ice',
    glass: 'Julep cup',
    garnish: 'Mint bouquet',
    tags: ['spirit-forward', 'bourbon', 'mint', 'summer', 'classic', 'derby'],
    balance: "Kentucky's signature drink. Crushed ice is essential — it dilutes quickly and stays cold. Mint should be gently pressed, not pulverized.",
    flavorProfile: { bitter: 0.1, sweet: 0.4, citrus: 0, herbal: 0.6, smoky: 0, spicy: 0.1, strength: 0.7 }
  },
  {
    id: 'dark-n-stormy',
    name: "Dark 'n' Stormy",
    creator: 'Gosling Brothers',
    source: 'Bermuda',
    year: 1920,
    category: 'Highball',
    ingredients: [
      { name: 'aged rum', amount: 2, unit: 'oz' },
      { name: 'ginger beer', amount: 4, unit: 'oz' },
      { name: 'lime juice', amount: 0.5, unit: 'oz' }
    ],
    method: 'Build ginger beer and lime in glass with ice, float rum on top',
    glass: 'Collins',
    garnish: 'Lime wheel',
    tags: ['refreshing', 'ginger', 'rum', 'highball', 'easy'],
    balance: 'Dark rum floats on spicy ginger beer. The color separation is the signature. Simple but satisfying.',
    flavorProfile: { bitter: 0.2, sweet: 0.4, citrus: 0.5, herbal: 0.2, smoky: 0, spicy: 0.5, strength: 0.5 }
  },
  {
    id: 'mojito',
    name: 'Mojito',
    creator: 'Classic Cuban',
    source: 'Cuba',
    year: 1930,
    category: 'Highball',
    ingredients: [
      { name: 'white rum', amount: 2, unit: 'oz' },
      { name: 'lime juice', amount: 1, unit: 'oz' },
      { name: 'simple syrup', amount: 0.75, unit: 'oz' },
      { name: 'mint', amount: 8, unit: 'leaves' },
      { name: 'soda water', amount: 2, unit: 'oz' }
    ],
    method: 'Gently muddle mint with syrup and lime; add rum; shake briefly; strain into glass with ice; top with soda',
    glass: 'Collins',
    garnish: 'Mint sprig, lime wheel',
    tags: ['refreshing', 'rum', 'mint', 'summer', 'classic'],
    balance: 'Mint, lime, sugar, rum, soda. Simple formula, endless refreshment.',
    flavorProfile: { bitter: 0.1, sweet: 0.5, citrus: 0.7, herbal: 0.6, smoky: 0, spicy: 0, strength: 0.4 }
  },
  {
    id: 'clover-club',
    name: 'Clover Club',
    creator: 'Historic',
    source: 'Philadelphia',
    year: 1910,
    category: 'Gin Sour',
    ingredients: [
      { name: 'gin', amount: 1.5, unit: 'oz' },
      { name: 'lemon juice', amount: 0.75, unit: 'oz' },
      { name: 'raspberry syrup', amount: 0.5, unit: 'oz' },
      { name: 'egg white', amount: 1, unit: 'whole' }
    ],
    method: 'Dry shake, then shake with ice, strain',
    glass: 'Coupe',
    garnish: 'Raspberries',
    tags: ['fruity', 'gin', 'shaken', 'classic', 'egg-white', 'elegant'],
    balance: 'Pink, frothy, sophisticated. Raspberry adds fruit depth. Egg white creates silky texture.',
    flavorProfile: { bitter: 0.2, sweet: 0.5, citrus: 0.7, herbal: 0.3, smoky: 0, spicy: 0, strength: 0.5 }
  },
  {
    id: 'hemingway-daiquiri',
    name: 'Hemingway Daiquiri',
    creator: 'Constante Ribalaigua',
    source: 'El Floridita, Havana',
    year: 1930,
    category: 'Sour',
    ingredients: [
      { name: 'white rum', amount: 2, unit: 'oz' },
      { name: 'lime juice', amount: 0.75, unit: 'oz' },
      { name: 'grapefruit juice', amount: 0.5, unit: 'oz' },
      { name: 'maraschino liqueur', amount: 0.5, unit: 'oz' }
    ],
    method: 'Shake with ice, double strain',
    glass: 'Coupe',
    garnish: 'Lime wheel',
    tags: ['citrus', 'rum', 'shaken', 'classic', 'literary'],
    balance: 'Drier than classic Daiquiri. Grapefruit adds bitter edge. Maraschino provides subtle sweetness. Hemingway liked it with no sugar.',
    flavorProfile: { bitter: 0.3, sweet: 0.3, citrus: 0.9, herbal: 0.2, smoky: 0, spicy: 0, strength: 0.6 }
  },
  {
    id: 'paper-plane-variation',
    name: 'Autumn Leaves',
    creator: 'Unknown',
    source: 'Modern',
    year: 2010,
    category: 'Paper Plane variant',
    ingredients: [
      { name: 'bourbon', amount: 0.75, unit: 'oz' },
      { name: 'apple brandy', amount: 0.75, unit: 'oz' },
      { name: 'sweet vermouth', amount: 0.75, unit: 'oz' },
      { name: 'strega', amount: 0.75, unit: 'oz' }
    ],
    method: 'Stir with ice, strain',
    glass: 'Coupe',
    garnish: 'Lemon twist',
    tags: ['spirit-forward', 'bourbon', 'brandy', 'stirred', 'autumn'],
    balance: 'Seasonal riff on Paper Plane. Apple and bourbon, herbal Strega, vermouth richness.',
    flavorProfile: { bitter: 0.4, sweet: 0.5, citrus: 0.1, herbal: 0.6, smoky: 0, spicy: 0.2, strength: 0.7 }
  },
  {
    id: 'army-navy',
    name: 'Army & Navy',
    creator: 'Historic',
    source: 'Classic',
    year: 1940,
    category: 'Gin Sour',
    ingredients: [
      { name: 'gin', amount: 2, unit: 'oz' },
      { name: 'lemon juice', amount: 0.75, unit: 'oz' },
      { name: 'orgeat', amount: 0.75, unit: 'oz' },
      { name: 'angostura bitters', amount: 2, unit: 'dash' }
    ],
    method: 'Shake with ice, double strain',
    glass: 'Coupe',
    garnish: 'Lemon twist',
    tags: ['almond', 'gin', 'shaken', 'classic'],
    balance: 'Orgeat adds almond richness to gin sour. Bitters provide depth.',
    flavorProfile: { bitter: 0.3, sweet: 0.5, citrus: 0.7, herbal: 0.4, smoky: 0, spicy: 0, strength: 0.6 }
  },
  // ============================================
  // TERRY'S SIGNATURE BUILDS
  // Custom cocktails crafted and refined through AI collaboration.
  // ============================================
  {
    id: 'the-butchers-benediction',
    name: "The Butcher's Benediction",
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Pre-steak stirred',
    ingredients: [
      { name: 'rye whiskey', amount: 2, unit: 'oz' },
      { name: 'bruto americano', amount: 0.5, unit: 'oz' },
      { name: 'chartreuse vep', amount: 0.5, unit: 'oz' },
      { name: 'disaronno', amount: 0.25, unit: 'oz' },
      { name: 'coffee liqueur', amount: 0.25, unit: 'oz' },
      { name: 'black pepper honey syrup', amount: 1, unit: 'barspoon' },
      { name: 'sour cherry bitters', amount: 2, unit: 'dash' },
      { name: 'coffee bitters', amount: 1, unit: 'dash' }
    ],
    method: 'Stir with ice, strain · smoke coupe with rosemary before pouring',
    glass: 'Coupe',
    garnish: 'Torched rosemary sprig, expressed orange peel, cracked black pepper half-rim',
    tags: ['pre-steak', 'rye', 'chartreuse', 'spirit-forward', 'stirred', 'smoked', 'signature', 'terry-original', 'multi-modifier', 'terry-favorite'],
    balance: 'Five-modifier pre-steak architecture — rye spice cuts fat, Bruto stimulates appetite, VEP adds barrel-herbal sophistication, Disaronno brings almond\'s savory side, Mr. Black primes for char. Rosemary-smoked glass delivers herbaceous smoke before first sip.',
    flavorProfile: { bitter: 0.7, sweet: 0.3, citrus: 0.1, herbal: 0.8, smoky: 0.6, spicy: 0.5, strength: 0.8 }
  },
  {
    id: 'the-gaucho',
    name: 'The Gaucho',
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Pre-steak stirred',
    ingredients: [
      { name: 'rye whiskey', amount: 2, unit: 'oz' },
      { name: 'bruto americano', amount: 0.75, unit: 'oz' },
      { name: 'yellow chartreuse', amount: 0.5, unit: 'oz' },
      { name: 'fernet branca', amount: 0.25, unit: 'oz' },
      { name: 'coffee liqueur', amount: 0.25, unit: 'oz' },
      { name: 'simple syrup', amount: 1, unit: 'barspoon' },
      { name: 'chocolate bitters', amount: 3, unit: 'dash' }
    ],
    method: 'Stir with ice, strain',
    glass: 'Coupe',
    garnish: 'Flamed orange peel, Luxardo cherry, cracked black pepper',
    tags: ['pre-steak', 'rye', 'amaro', 'fernet', 'stirred', 'fat-cutting', 'terry-original'],
    balance: 'Quadruple bitter attack designed for fatty beef — Bruto stimulates appetite, Fernet\'s mint-eucalyptus obliterates fat coating, coffee primes for char, Yellow Chartreuse bridges with honey-herbal sweetness.',
    flavorProfile: { bitter: 0.8, sweet: 0.3, citrus: 0.1, herbal: 0.6, smoky: 0.2, spicy: 0.4, strength: 0.8 }
  },
  {
    id: 'the-cattlemans-reserve',
    name: "The Cattleman's Reserve",
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Pre-steak stirred',
    ingredients: [
      { name: 'rye whiskey', amount: 2, unit: 'oz' },
      { name: 'bruto americano', amount: 0.75, unit: 'oz' },
      { name: 'yellow chartreuse', amount: 0.5, unit: 'oz' },
      { name: 'coffee liqueur', amount: 0.25, unit: 'oz' },
      { name: 'maraschino liqueur', amount: 0.25, unit: 'oz' },
      { name: 'sour cherry bitters', amount: 2, unit: 'dash' },
      { name: 'coffee bitters', amount: 2, unit: 'dash' }
    ],
    method: 'Stir with ice, strain',
    glass: 'Coupe',
    garnish: 'Flamed orange peel, Luxardo cherry, cracked black pepper',
    tags: ['pre-steak', 'rye', 'bitter', 'stirred', 'terry-original'],
    balance: 'Coffee bitters prime for char, cherry bitters add fruit acid without citrus, Bruto and Yellow Chartreuse anchor the appetite-stimulating bitter-herbal structure.',
    flavorProfile: { bitter: 0.8, sweet: 0.3, citrus: 0.1, herbal: 0.5, smoky: 0.1, spicy: 0.3, strength: 0.8 }
  },
  {
    id: 'smoke-and-steel',
    name: 'Smoke & Steel',
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Pre-steak spirit-forward',
    ingredients: [
      { name: 'bourbon', amount: 2, unit: 'oz' },
      { name: 'mezcal', amount: 0.75, unit: 'oz' },
      { name: 'punt e mes', amount: 0.5, unit: 'oz' },
      { name: 'fernet branca', amount: 0.25, unit: 'oz' },
      { name: 'coffee liqueur', amount: 0.25, unit: 'oz' },
      { name: 'angostura bitters', amount: 2, unit: 'dash' }
    ],
    method: 'Stir with large cube · smoke glass with applewood before pouring',
    glass: 'Rocks',
    garnish: 'Torched orange peel, torched rosemary sprig, Luxardo cherry',
    tags: ['pre-steak', 'bourbon', 'mezcal', 'smoky', 'stirred', 'terry-original'],
    balance: 'Triple smoke (mezcal + smoked glass + torched garnish) mirrors grilled beef. Fernet and coffee create pre-steak bitter-roasted foundation.',
    flavorProfile: { bitter: 0.6, sweet: 0.3, citrus: 0.1, herbal: 0.4, smoky: 0.8, spicy: 0.2, strength: 0.9 }
  },
  {
    id: 'the-stockyard-sour',
    name: 'The Stockyard Sour',
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Pre-steak sour',
    ingredients: [
      { name: 'bourbon', amount: 2, unit: 'oz' },
      { name: 'green chartreuse', amount: 0.5, unit: 'oz' },
      { name: 'amaro nonino', amount: 0.5, unit: 'oz' },
      { name: 'fernet branca', amount: 0.25, unit: 'oz' },
      { name: 'lemon juice', amount: 0.75, unit: 'oz' },
      { name: 'maple syrup', amount: 0.5, unit: 'oz' },
      { name: 'egg white', amount: 1, unit: 'whole' },
      { name: 'chocolate bitters', amount: 3, unit: 'dash' }
    ],
    method: 'Dry shake 30s, add ice, wet shake 15s, double strain',
    glass: 'Coupe',
    garnish: 'Torched maple syrup drizzle on foam, cracked black pepper, Luxardo cherry',
    tags: ['pre-steak', 'bourbon', 'chartreuse', 'egg-white', 'shaken', 'sour', 'terry-original'],
    balance: 'Contrasts framework — silky egg white against aggressive Green Chartreuse, maple sweetness against Fernet bitter, lemon brightness against rich Amaro. Unconventional sour format for pre-steak.',
    flavorProfile: { bitter: 0.7, sweet: 0.5, citrus: 0.5, herbal: 0.7, smoky: 0.2, spicy: 0.3, strength: 0.7 }
  },
  
  // SECTION B: ESPRESSO & COFFEE BUILDS
  {
    id: 'the-dark-matter-martini',
    name: 'The Dark Matter Martini',
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Coffee cocktail',
    ingredients: [
      { name: 'bourbon', amount: 1.5, unit: 'oz' },
      { name: 'coffee liqueur', amount: 0.75, unit: 'oz' },
      { name: 'fernet branca', amount: 0.5, unit: 'oz' },
      { name: 'espresso', amount: 0.5, unit: 'oz' },
      { name: 'chartreuse vep', amount: 0.25, unit: 'oz' },
      { name: 'demerara syrup', amount: 0.25, unit: 'oz' },
      { name: 'chocolate bitters', amount: 3, unit: 'dash' }
    ],
    method: 'Shake hard with ice, double strain',
    glass: 'Coupe',
    garnish: '3 espresso beans, expressed orange peel (discard)',
    tags: ['coffee', 'espresso', 'bourbon', 'fernet', 'shaken', 'signature', 'terry-original'],
    balance: 'Bourbon replaces vodka for oak backbone. Fernet contributes mint-bitter-chocolate (no Kahlúa candy sweetness). VEP adds barrel-herbal complexity. Coffee and bitters layer roasted depth.',
    flavorProfile: { bitter: 0.7, sweet: 0.4, citrus: 0.1, herbal: 0.6, smoky: 0.1, spicy: 0.1, strength: 0.8 }
  },
  {
    id: 'cafe-con-leche-martini',
    name: 'Café con Leche Martini',
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Coffee cocktail',
    ingredients: [
      { name: 'reposado tequila', amount: 1.5, unit: 'oz' },
      { name: 'coffee liqueur', amount: 0.75, unit: 'oz' },
      { name: 'licor 43', amount: 0.5, unit: 'oz' },
      { name: 'espresso', amount: 0.5, unit: 'oz' },
      { name: 'yellow chartreuse', amount: 0.25, unit: 'oz' },
      { name: 'simple syrup', amount: 0.5, unit: 'oz' },
      { name: 'chocolate bitters', amount: 2, unit: 'dash' },
      { name: 'heavy cream', amount: 1, unit: 'oz' }
    ],
    method: 'Shake hard with ice, double strain',
    glass: 'Coupe',
    garnish: 'Cinnamon dust, 3 coffee beans, orange twist',
    tags: ['coffee', 'espresso', 'tequila', 'cream', 'shaken', 'approachable', 'terry-original'],
    balance: 'Cream softens the tequila-coffee punch into something approachable. Licor 43\'s vanilla and Yellow Chartreuse\'s honey create a café-au-lait sweetness with herbal depth.',
    flavorProfile: { bitter: 0.4, sweet: 0.6, citrus: 0.2, herbal: 0.3, smoky: 0.1, spicy: 0.2, strength: 0.5 }
  },
  {
    id: 'the-reeses-reverie',
    name: "The Reese's Reverie",
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Coffee cocktail',
    ingredients: [
      { name: 'bourbon', amount: 1.5, unit: 'oz' },
      { name: 'coffee liqueur', amount: 0.75, unit: 'oz' },
      { name: 'espresso', amount: 0.5, unit: 'oz' },
      { name: 'amaro nonino', amount: 0.25, unit: 'oz' },
      { name: 'fernet branca', amount: 0.25, unit: 'oz' },
      { name: 'simple syrup', amount: 0.25, unit: 'oz' },
      { name: 'chocolate bitters', amount: 3, unit: 'dash' },
      { name: 'orange bitters', amount: 1, unit: 'dash' }
    ],
    method: 'Shake hard with ice, double strain · use peanut butter bourbon + regular bourbon split (0.75oz each) ideally',
    glass: 'Coupe',
    garnish: 'Shaved dark chocolate, 3 espresso beans, expressed orange peel',
    tags: ['coffee', 'espresso', 'bourbon', 'amaro', 'shaken', 'complex', 'terry-original'],
    balance: 'Amaro Nonino\'s nuttiness bridges peanut butter and coffee. Fernet adds mint-bitter-chocolate dimension extending the finish. Coffee + chocolate bitters layer roasted depth.',
    flavorProfile: { bitter: 0.6, sweet: 0.5, citrus: 0.1, herbal: 0.4, smoky: 0.1, spicy: 0.1, strength: 0.7 }
  },
  
  // SECTION C: SPRITZ & APERITIF BUILDS
  {
    id: 'the-sunset-spritz',
    name: 'The Sunset Spritz',
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Spritz',
    ingredients: [
      { name: 'reposado tequila', amount: 1.5, unit: 'oz' },
      { name: 'aperol', amount: 0.75, unit: 'oz' },
      { name: 'yellow chartreuse', amount: 0.5, unit: 'oz' },
      { name: 'st-germain', amount: 0.25, unit: 'oz' },
      { name: 'lemon juice', amount: 0.75, unit: 'oz' },
      { name: 'champagne', amount: 3, unit: 'oz' }
    ],
    method: 'Shake spirits and juices with ice, strain into wine glass over ice, top with prosecco',
    glass: 'Wine glass',
    garnish: 'Orange wheel, lemon wheel, basil sprig',
    tags: ['spritz', 'tequila', 'aperol', 'chartreuse', 'refreshing', 'shaken', 'terry-original'],
    balance: 'Four-modifier complexity within spritz lightness. Tequila adds agave depth, Chartreuse adds herbal interest, St-Germain lifts the whole structure with floral sweetness.',
    flavorProfile: { bitter: 0.5, sweet: 0.4, citrus: 0.6, herbal: 0.5, smoky: 0.1, spicy: 0.1, strength: 0.4 }
  },
  {
    id: 'the-vep-spritz',
    name: 'The VEP Spritz',
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Spritz',
    ingredients: [
      { name: 'aperol', amount: 1.5, unit: 'oz' },
      { name: 'chartreuse vep', amount: 0.75, unit: 'oz' },
      { name: 'lemon juice', amount: 0.5, unit: 'oz' },
      { name: 'champagne', amount: 3, unit: 'oz' },
      { name: 'soda water', amount: 1, unit: 'oz' }
    ],
    method: 'Build in wine glass over ice, stir gently, top with prosecco and soda',
    glass: 'Wine glass',
    garnish: 'Orange wheel, lemon wheel, Luxardo cherry, basil sprig',
    tags: ['spritz', 'aperol', 'chartreuse', 'refreshing', 'built', 'elegant', 'terry-original'],
    balance: "VEP's barrel-aged oak-herbal complexity transforms a basic Aperol Spritz. Lemon brightens and adds tartness beyond the original.",
    flavorProfile: { bitter: 0.6, sweet: 0.4, citrus: 0.5, herbal: 0.7, smoky: 0.1, spicy: 0.1, strength: 0.3 }
  },
  {
    id: 'the-golden-terrace-pineapple',
    name: 'The Golden Terrace — Pineapple',
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Tequila sour / tropical',
    ingredients: [
      { name: 'reposado tequila', amount: 1.5, unit: 'oz' },
      { name: 'yellow chartreuse', amount: 0.5, unit: 'oz' },
      { name: 'aperol', amount: 0.75, unit: 'oz' },
      { name: 'pineapple juice', amount: 0.75, unit: 'oz' },
      { name: 'lime juice', amount: 0.75, unit: 'oz' },
      { name: 'salt', amount: 1, unit: 'pinch' },
      { name: 'orange bitters', amount: 2, unit: 'dash' }
    ],
    method: 'Shake with ice, strain over ice',
    glass: 'Rocks',
    garnish: 'Pineapple wedge, orange wheel, basil sprig',
    tags: ['tequila', 'aperol', 'chartreuse', 'pineapple', 'shaken', 'refreshing', 'tropical', 'terry-original'],
    balance: 'Aperol increased and lime added to compensate for pineapple\'s sweetness. Salt brightens the tropical elements. Three dimensions: bitter (Aperol), herbal (Chartreuse), tropical-citrus.',
    flavorProfile: { bitter: 0.5, sweet: 0.5, citrus: 0.6, herbal: 0.4, smoky: 0.1, spicy: 0.1, strength: 0.5 }
  },
  {
    id: 'the-golden-terrace-original',
    name: 'The Golden Terrace — Original',
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Tequila sour',
    ingredients: [
      { name: 'reposado tequila', amount: 1.5, unit: 'oz' },
      { name: 'yellow chartreuse', amount: 0.5, unit: 'oz' },
      { name: 'aperol', amount: 0.5, unit: 'oz' },
      { name: 'grapefruit juice', amount: 0.75, unit: 'oz' },
      { name: 'lemon juice', amount: 0.5, unit: 'oz' },
      { name: 'simple syrup', amount: 0.25, unit: 'oz' },
      { name: 'orange bitters', amount: 2, unit: 'dash' }
    ],
    method: 'Shake with ice, strain over ice',
    glass: 'Rocks',
    garnish: 'Grapefruit wheel, orange wheel, basil sprig',
    tags: ['tequila', 'aperol', 'chartreuse', 'citrus', 'grapefruit', 'shaken', 'refreshing', 'terry-original'],
    balance: 'Three-dimension pre-dinner: bitter (Aperol), herbal (Chartreuse), bright-bitter citrus (grapefruit). Grapefruit\'s bitter-sweet character bridges Aperol and Chartreuse perfectly.',
    flavorProfile: { bitter: 0.5, sweet: 0.4, citrus: 0.7, herbal: 0.4, smoky: 0.1, spicy: 0.1, strength: 0.5 }
  },
  
  // SECTION D: SPIRIT-FORWARD STIRRED BUILDS
  {
    id: 'terrys-conference',
    name: "Terry's Conference",
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Multi-modifier stirred',
    ingredients: [
      { name: 'rye whiskey', amount: 2, unit: 'oz' },
      { name: 'chartreuse vep', amount: 0.5, unit: 'oz' },
      { name: 'amaro nonino', amount: 0.25, unit: 'oz' },
      { name: 'coffee liqueur', amount: 0.25, unit: 'oz' },
      { name: 'punt e mes', amount: 0.25, unit: 'oz' },
      { name: 'demerara syrup', amount: 1, unit: 'barspoon' },
      { name: 'sour cherry bitters', amount: 2, unit: 'dash' },
      { name: 'orange bitters', amount: 1, unit: 'dash' }
    ],
    method: 'Stir with ice, strain',
    glass: 'Coupe',
    garnish: 'Flamed orange peel, Luxardo cherry',
    tags: ['rye', 'chartreuse', 'amaro', 'spirit-forward', 'stirred', 'multi-modifier', 'death-and-co', 'terry-original'],
    balance: 'Four supporting players each with distinct roles — VEP for barrel-herbal depth, Nonino for nutty bridge, Punt e Mes for vermouth structure with bitterness, Mr. Black as the silent anchor. 60-second evolving finish.',
    flavorProfile: { bitter: 0.7, sweet: 0.3, citrus: 0.1, herbal: 0.7, smoky: 0.1, spicy: 0.4, strength: 0.9 }
  },
  {
    id: 'a-benevolent-king-terrys-version',
    name: "A Benevolent King — Terry's Version",
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Old Fashioned variant',
    ingredients: [
      { name: 'bourbon', amount: 2, unit: 'oz' },
      { name: 'tawny port', amount: 0.75, unit: 'oz' },
      { name: 'chartreuse vep', amount: 0.5, unit: 'oz' },
      { name: 'angostura bitters', amount: 2, unit: 'dash' }
    ],
    method: 'Stir with ice, strain over large cube',
    glass: 'Rocks',
    garnish: 'Expressed orange peel, Luxardo cherry',
    tags: ['bourbon', 'port', 'chartreuse', 'spirit-forward', 'stirred', 'terry-original'],
    balance: 'Port replaces simple syrup in an Old Fashioned template — oxidized fruit sweetness with tannin depth. VEP adds barrel-herbal sophistication. Reverse-engineered from a bar original.',
    flavorProfile: { bitter: 0.4, sweet: 0.5, citrus: 0.1, herbal: 0.6, smoky: 0.1, spicy: 0.2, strength: 0.8 }
  },
  {
    id: 'the-pomodoro',
    name: 'The Pomodoro',
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Pre-dinner stirred',
    ingredients: [
      { name: 'bourbon', amount: 2, unit: 'oz' },
      { name: 'bruto americano', amount: 0.75, unit: 'oz' },
      { name: 'amaro nonino', amount: 0.5, unit: 'oz' },
      { name: 'maraschino liqueur', amount: 0.25, unit: 'oz' },
      { name: 'yellow chartreuse', amount: 0.25, unit: 'oz' },
      { name: 'orange bitters', amount: 2, unit: 'dash' }
    ],
    method: 'Stir with ice, strain',
    glass: 'Coupe',
    garnish: 'Expressed orange peel, fresh basil leaf, Luxardo cherry',
    tags: ['bourbon', 'bruto', 'amaro', 'italian', 'pre-dinner', 'stirred', 'terry-original'],
    balance: "Bruto's bitterness cuts cream-sauce richness. Amaro Nonino adds nutty depth. Maraschino references tomato's sweetness. Basil garnish ties it to Italian cuisine.",
    flavorProfile: { bitter: 0.7, sweet: 0.4, citrus: 0.1, herbal: 0.5, smoky: 0.1, spicy: 0.2, strength: 0.8 }
  },
  {
    id: 'the-nonna',
    name: 'The Nonna',
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Pre-dinner stirred',
    ingredients: [
      { name: 'bourbon', amount: 2, unit: 'oz' },
      { name: 'punt e mes', amount: 0.75, unit: 'oz' },
      { name: 'amaro nonino', amount: 0.5, unit: 'oz' },
      { name: 'coffee liqueur', amount: 0.25, unit: 'oz' },
      { name: 'honey syrup', amount: 1, unit: 'barspoon' },
      { name: 'chocolate bitters', amount: 2, unit: 'dash' },
      { name: 'orange bitters', amount: 1, unit: 'dash' }
    ],
    method: 'Stir with ice, strain over large cube · brown butter fat-wash bourbon recommended',
    glass: 'Rocks',
    garnish: 'Torched orange peel, Luxardo cherry, fresh basil sprig',
    tags: ['bourbon', 'amaro', 'italian', 'pre-dinner', 'stirred', 'fat-washed', 'terry-original'],
    balance: 'Brown butter richness mirrors cream sauce. Italian modifiers throughout. Coffee cuts the cream-sauce weight.',
    flavorProfile: { bitter: 0.6, sweet: 0.4, citrus: 0.1, herbal: 0.4, smoky: 0.2, spicy: 0.2, strength: 0.8 }
  },
  {
    id: 'the-brooklyn-bianco',
    name: 'The Brooklyn Bianco',
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Stirred, Manhattan variant',
    ingredients: [
      { name: 'rye whiskey', amount: 2, unit: 'oz' },
      { name: 'bianco vermouth', amount: 0.75, unit: 'oz' },
      { name: 'bruto americano', amount: 0.5, unit: 'oz' },
      { name: 'maraschino liqueur', amount: 0.25, unit: 'oz' },
      { name: 'orange bitters', amount: 2, unit: 'dash' }
    ],
    method: 'Stir with ice, strain',
    glass: 'Coupe',
    garnish: 'Lemon twist, Luxardo cherry',
    tags: ['rye', 'vermouth', 'bruto', 'stirred', 'brooklyn', 'problem-solving', 'terry-original'],
    balance: 'Bruto Americano replicates Amer Picon\'s earthy-orange-bitter profile. Bianco vermouth replaces dry vermouth to capture Picon\'s slight sweetness while staying lighter than sweet vermouth.',
    flavorProfile: { bitter: 0.7, sweet: 0.3, citrus: 0.1, herbal: 0.3, smoky: 0.1, spicy: 0.4, strength: 0.8 }
  },
  {
    id: 'the-first-impression',
    name: 'The First Impression',
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Date night sour',
    ingredients: [
      { name: 'bourbon', amount: 1.75, unit: 'oz' },
      { name: 'amaro nonino', amount: 0.5, unit: 'oz' },
      { name: 'yellow chartreuse', amount: 0.5, unit: 'oz' },
      { name: 'st-germain', amount: 0.25, unit: 'oz' },
      { name: 'lemon juice', amount: 0.75, unit: 'oz' },
      { name: 'honey syrup', amount: 0.25, unit: 'oz' },
      { name: 'orange bitters', amount: 2, unit: 'dash' }
    ],
    method: 'Shake with ice, double strain',
    glass: 'Coupe',
    garnish: 'Express orange peel (discard), express lemon peel (discard), Luxardo cherry',
    tags: ['bourbon', 'amaro', 'chartreuse', 'date-night', 'shaken', 'sour', 'elegant', 'terry-original'],
    balance: '1.75 oz keeps ABV conversation-friendly. Dual peel expression (orange + lemon both discarded) creates aromatic ritual. Four-modifier complexity without being overwhelming.',
    flavorProfile: { bitter: 0.5, sweet: 0.5, citrus: 0.6, herbal: 0.5, smoky: 0.1, spicy: 0.2, strength: 0.6 }
  },
  {
    id: 'the-velvet-hour',
    name: 'The Velvet Hour',
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Date night sour',
    ingredients: [
      { name: 'bourbon', amount: 1.5, unit: 'oz' },
      { name: 'aperol', amount: 0.75, unit: 'oz' },
      { name: 'chartreuse vep', amount: 0.5, unit: 'oz' },
      { name: 'maraschino liqueur', amount: 0.25, unit: 'oz' },
      { name: 'lemon juice', amount: 0.75, unit: 'oz' },
      { name: 'simple syrup', amount: 0.5, unit: 'oz' },
      { name: 'egg white', amount: 1, unit: 'whole' },
      { name: 'sour cherry bitters', amount: 2, unit: 'dash' }
    ],
    method: 'Dry shake 30s, add ice, wet shake 15s, double strain',
    glass: 'Coupe',
    garnish: 'Cherry bitters heart drawn on foam, lemon twist',
    tags: ['bourbon', 'aperol', 'chartreuse', 'egg-white', 'shaken', 'date-night', 'sour', 'terry-original'],
    balance: '1.5 oz base keeps it elegant. Egg white creates velvet texture. VEP elevates from spritz-adjacent into contemplative territory. Cherry bitters heart shows intentionality.',
    flavorProfile: { bitter: 0.5, sweet: 0.5, citrus: 0.6, herbal: 0.5, smoky: 0.1, spicy: 0.1, strength: 0.5 }
  },
  {
    id: 'the-watchmaker',
    name: 'The Watchmaker',
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Maximum complexity stirred',
    ingredients: [
      { name: 'bourbon', amount: 2, unit: 'oz' },
      { name: 'chartreuse vep', amount: 0.5, unit: 'oz' },
      { name: 'amaro nonino', amount: 0.25, unit: 'oz' },
      { name: 'coffee liqueur', amount: 0.25, unit: 'oz' },
      { name: 'fernet branca', amount: 0.25, unit: 'oz' },
      { name: 'maraschino liqueur', amount: 0.25, unit: 'oz' },
      { name: 'black pepper honey syrup', amount: 1, unit: 'barspoon' },
      { name: 'chocolate bitters', amount: 2, unit: 'dash' },
      { name: 'coffee bitters', amount: 1, unit: 'dash' }
    ],
    method: 'Stir with ice, strain · smoke coupe with applewood before pouring · brown butter or bacon fat-wash bourbon recommended',
    glass: 'Coupe',
    garnish: 'Torched orange peel, smoked Luxardo cherry, coffee bean, cracked black pepper',
    tags: ['bourbon', 'chartreuse', 'fernet', 'amaro', 'spirit-forward', 'stirred', 'smoked', 'fat-washed', 'technique', 'terry-original', 'multi-modifier'],
    balance: 'Eight flavor dimensions assembled with watchmaker precision. 60+ second finish evolves like a mechanical movement — each modifier engages in sequence and the structure only reveals itself slowly.',
    flavorProfile: { bitter: 0.7, sweet: 0.3, citrus: 0.1, herbal: 0.8, smoky: 0.6, spicy: 0.4, strength: 0.9 }
  },
  {
    id: 'the-architects-dream',
    name: "The Architect's Dream",
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Maximum complexity stirred',
    ingredients: [
      { name: 'bourbon', amount: 2, unit: 'oz' },
      { name: 'chartreuse vep', amount: 0.5, unit: 'oz' },
      { name: 'amaro nonino', amount: 0.5, unit: 'oz' },
      { name: 'maraschino liqueur', amount: 0.25, unit: 'oz' },
      { name: 'coffee liqueur', amount: 0.25, unit: 'oz' },
      { name: 'punt e mes', amount: 0.25, unit: 'oz' },
      { name: 'demerara syrup', amount: 1, unit: 'barspoon' },
      { name: 'sour cherry bitters', amount: 2, unit: 'dash' },
      { name: 'coffee bitters', amount: 2, unit: 'dash' }
    ],
    method: 'Stir with ice, strain · brown butter fat-wash bourbon recommended · triple peel expression: express orange (discard), express lemon (discard), grapefruit peel kept in glass',
    glass: 'Coupe',
    garnish: 'VEP-soaked Luxardo cherry (prep overnight), star anise, torched cinnamon stick',
    tags: ['bourbon', 'chartreuse', 'amaro', 'spirit-forward', 'stirred', 'fat-washed', 'multi-modifier', 'technique', 'terry-original'],
    balance: 'Brown butter savory foundation supports six modifiers in structural hierarchy. Triple peel expression delivers layered citrus aromatics before first sip. VEP-soaked cherry prepared overnight releases final burst on last bite. 60+ second finish.',
    flavorProfile: { bitter: 0.7, sweet: 0.4, citrus: 0.1, herbal: 0.8, smoky: 0.2, spicy: 0.3, strength: 0.9 }
  },
  {
    id: 'the-watchmaker-deluxe',
    name: 'The Watchmaker Deluxe',
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Maximum complexity stirred',
    ingredients: [
      { name: 'rye whiskey', amount: 2, unit: 'oz' },
      { name: 'chartreuse vep', amount: 0.75, unit: 'oz' },
      { name: 'fernet branca', amount: 0.25, unit: 'oz' },
      { name: 'amaro nonino', amount: 0.25, unit: 'oz' },
      { name: 'coffee liqueur', amount: 0.25, unit: 'oz' },
      { name: 'maraschino liqueur', amount: 0.25, unit: 'oz' },
      { name: 'st-germain', amount: 0.25, unit: 'oz' },
      { name: 'black pepper honey syrup', amount: 1, unit: 'barspoon' },
      { name: 'chocolate bitters', amount: 2, unit: 'dash' },
      { name: 'coffee bitters', amount: 1, unit: 'dash' },
      { name: 'sour cherry bitters', amount: 1, unit: 'dash' }
    ],
    method: 'Stir with ice, strain · smoke coupe with rosemary before pouring · bacon fat-wash rye recommended',
    glass: 'Coupe',
    garnish: 'Torched Luxardo cherry, expressed orange peel, coffee bean, cracked black pepper, rosemary sprig',
    tags: ['rye', 'chartreuse', 'fernet', 'amaro', 'spirit-forward', 'stirred', 'smoked', 'fat-washed', 'multi-modifier', 'technique', 'terry-original'],
    balance: 'Seven modifiers + triple bitters assembled with absolute precision. 70+ second finish evolves through seven distinct dimensions. Three techniques: fat-washing, smoking, torching.',
    flavorProfile: { bitter: 0.8, sweet: 0.3, citrus: 0.1, herbal: 0.9, smoky: 0.6, spicy: 0.4, strength: 0.9 }
  },
  {
    id: 'the-sommeliers-secret',
    name: "The Sommelier's Secret",
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Contemplative stirred / Cure philosophy',
    ingredients: [
      { name: 'bourbon', amount: 2, unit: 'oz' },
      { name: 'chartreuse vep', amount: 0.75, unit: 'oz' },
      { name: 'tawny port', amount: 0.5, unit: 'oz' },
      { name: 'amaro nonino', amount: 0.25, unit: 'oz' },
      { name: 'fernet branca', amount: 0.25, unit: 'oz' },
      { name: 'coffee liqueur', amount: 0.25, unit: 'oz' },
      { name: 'demerara syrup', amount: 1, unit: 'barspoon' },
      { name: 'chocolate bitters', amount: 2, unit: 'dash' },
      { name: 'orange bitters', amount: 1, unit: 'dash' }
    ],
    method: 'Stir with ice, strain over large cube · express orange peel (flame it), express lemon peel (discard)',
    glass: 'Rocks',
    garnish: 'Port-soaked Luxardo cherry (prep overnight), expressed orange peel, dark chocolate shaving, coffee bean',
    tags: ['bourbon', 'port', 'chartreuse', 'amaro', 'fernet', 'spirit-forward', 'stirred', 'elegant', 'multi-modifier', 'terry-original'],
    balance: 'Double barrel-aged complexity (VEP + port). Triple bitter modifiers (Amaro-Fernet-coffee) each with distinct profile. Port-soaked cherry releases oxidized sweetness on final bite. Cure New Orleans philosophy — rich, contemplative, unhurried.',
    flavorProfile: { bitter: 0.6, sweet: 0.5, citrus: 0.1, herbal: 0.7, smoky: 0.1, spicy: 0.2, strength: 0.9 }
  },
  {
    id: 'the-apothecary-deluxe',
    name: 'The Apothecary Deluxe',
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Maximum complexity stirred / educational',
    ingredients: [
      { name: 'rye whiskey', amount: 2, unit: 'oz' },
      { name: 'green chartreuse', amount: 0.5, unit: 'oz' },
      { name: 'yellow chartreuse', amount: 0.5, unit: 'oz' },
      { name: 'chartreuse vep', amount: 0.25, unit: 'oz' },
      { name: 'fernet branca', amount: 0.25, unit: 'oz' },
      { name: 'amaro nonino', amount: 0.25, unit: 'oz' },
      { name: 'st-germain', amount: 0.25, unit: 'oz' },
      { name: 'maraschino liqueur', amount: 0.25, unit: 'oz' },
      { name: 'angostura bitters', amount: 2, unit: 'dash' },
      { name: 'orange bitters', amount: 1, unit: 'dash' }
    ],
    method: 'Stir with ice, strain · triple peel expression: express lemon (discard), express orange (discard), grapefruit peel kept',
    glass: 'Coupe',
    garnish: 'Luxardo cherry, fresh herb sprig (basil or mint)',
    tags: ['rye', 'chartreuse', 'fernet', 'amaro', 'spirit-forward', 'stirred', 'herbal', 'multi-modifier', 'educational', 'terry-original'],
    balance: 'Full Chartreuse spectrum in one glass — Green (aggressive herbal), Yellow (honey-herbal), VEP (barrel-herbal). Seven modifiers each with distinct purpose. 55+ second herbal evolution.',
    flavorProfile: { bitter: 0.7, sweet: 0.4, citrus: 0.1, herbal: 1.0, smoky: 0.1, spicy: 0.4, strength: 0.9 }
  },
  {
    id: 'the-aged-gaucho',
    name: 'The Aged Gaucho',
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Pre-steak spirit-forward',
    ingredients: [
      { name: 'bourbon', amount: 2, unit: 'oz' },
      { name: 'chartreuse vep', amount: 0.75, unit: 'oz' },
      { name: 'punt e mes', amount: 0.25, unit: 'oz' },
      { name: 'maraschino liqueur', amount: 0.25, unit: 'oz' },
      { name: 'amaro nonino', amount: 0.25, unit: 'oz' },
      { name: 'demerara syrup', amount: 1, unit: 'barspoon' },
      { name: 'chocolate bitters', amount: 3, unit: 'dash' }
    ],
    method: 'Stir with ice, strain over large cube · brown butter fat-wash bourbon recommended',
    glass: 'Rocks',
    garnish: 'Torched orange peel, VEP-soaked Luxardo cherry, star anise, cinnamon stick',
    tags: ['bourbon', 'chartreuse', 'amaro', 'pre-steak', 'stirred', 'fat-washed', 'cure-philosophy', 'terry-original'],
    balance: 'Four barrel-aged elements (brown butter bourbon, VEP, Punt e Mes oxidation, Amaro Nonino). Slowest-evolving pre-steak build. Cure philosophy — rich, contemplative, 50+ second finish.',
    flavorProfile: { bitter: 0.6, sweet: 0.5, citrus: 0.1, herbal: 0.7, smoky: 0.2, spicy: 0.2, strength: 0.9 }
  },
  {
    id: 'the-biscotti-deluxe',
    name: 'The Biscotti Deluxe',
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Dessert stirred',
    ingredients: [
      { name: 'bourbon', amount: 2, unit: 'oz' },
      { name: 'licor 43', amount: 0.75, unit: 'oz' },
      { name: 'coffee liqueur', amount: 0.25, unit: 'oz' },
      { name: 'disaronno', amount: 0.25, unit: 'oz' },
      { name: 'demerara syrup', amount: 1, unit: 'barspoon' },
      { name: 'chocolate bitters', amount: 2, unit: 'dash' }
    ],
    method: 'Stir with ice, strain · brown butter fat-wash bourbon recommended',
    glass: 'Coupe',
    garnish: 'Torched orange peel, amaretti cookie on side',
    tags: ['bourbon', 'licor43', 'coffee', 'dessert', 'stirred', 'fat-washed', 'sweet', 'terry-original'],
    balance: "Brown butter richness pairs with Licor 43's vanilla-spice. Disaronno's almond adds biscotti character. Chocolate bitters bridge coffee and chocolate without additional sweetness.",
    flavorProfile: { bitter: 0.3, sweet: 0.7, citrus: 0.1, herbal: 0.2, smoky: 0.1, spicy: 0.2, strength: 0.7 }
  },
  
  // SECTION E: SOUR & CITRUS BUILDS
  {
    id: 'the-runway',
    name: 'The Runway',
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Paper Plane variant',
    ingredients: [
      { name: 'bourbon', amount: 1, unit: 'oz' },
      { name: 'amaro nonino', amount: 0.75, unit: 'oz' },
      { name: 'yellow chartreuse', amount: 0.75, unit: 'oz' },
      { name: 'lemon juice', amount: 0.75, unit: 'oz' },
      { name: 'maraschino liqueur', amount: 0.25, unit: 'oz' }
    ],
    method: 'Shake with ice, double strain',
    glass: 'Coupe',
    garnish: 'Lemon twist',
    tags: ['bourbon', 'amaro', 'chartreuse', 'sour', 'shaken', 'paper-plane-variant', 'terry-original'],
    balance: 'Paper Plane DNA with Chartreuse replacing Aperol for herbal complexity, Maraschino adding cherry depth while maintaining the bitter-sweet-citrus balance.',
    flavorProfile: { bitter: 0.6, sweet: 0.5, citrus: 0.7, herbal: 0.6, smoky: 0, spicy: 0.1, strength: 0.6 }
  },
  {
    id: 'barrel-aged-paper-plane',
    name: 'Barrel-Aged Paper Plane',
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Paper Plane variant',
    ingredients: [
      { name: 'bourbon', amount: 0.75, unit: 'oz' },
      { name: 'chartreuse vep', amount: 0.75, unit: 'oz' },
      { name: 'amaro nonino', amount: 0.75, unit: 'oz' },
      { name: 'lemon juice', amount: 0.75, unit: 'oz' },
      { name: 'simple syrup', amount: 0.25, unit: 'oz' }
    ],
    method: 'Shake with ice, double strain',
    glass: 'Coupe',
    garnish: 'Lemon twist, Luxardo cherry',
    tags: ['bourbon', 'chartreuse', 'amaro', 'sour', 'shaken', 'paper-plane-variant', 'terry-original'],
    balance: "VEP's barrel-herbal complexity replaces Aperol's bitter-orange. Same equal-parts architecture, deeper oak-herbal finish.",
    flavorProfile: { bitter: 0.6, sweet: 0.4, citrus: 0.7, herbal: 0.8, smoky: 0.1, spicy: 0.2, strength: 0.6 }
  },
  
  // SECTION F: TEQUILA & MEZCAL BUILDS
  {
    id: 'el-jardin',
    name: 'El Jardín',
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Tequila sour / refreshing',
    ingredients: [
      { name: 'blanco tequila', amount: 2, unit: 'oz' },
      { name: 'st-germain', amount: 0.5, unit: 'oz' },
      { name: 'green chartreuse', amount: 0.5, unit: 'oz' },
      { name: 'lime juice', amount: 1, unit: 'oz' },
      { name: 'agave syrup', amount: 0.25, unit: 'oz' },
      { name: 'orange bitters', amount: 2, unit: 'dash' }
    ],
    method: 'Shake hard with ice, strain over crushed ice',
    glass: 'Rocks',
    garnish: 'Lime wheel, cucumber ribbon',
    tags: ['tequila', 'chartreuse', 'st-germain', 'lime', 'shaken', 'refreshing', 'herbal', 'terry-original'],
    balance: "Green Chartreuse's herbal assault softened by St-Germain's elderflower bridge. High-proof tequila cuts through both. Crushed ice creates constant dilution so every sip evolves.",
    flavorProfile: { bitter: 0.4, sweet: 0.3, citrus: 0.8, herbal: 0.8, smoky: 0.1, spicy: 0.1, strength: 0.7 }
  },
  {
    id: 'verde-complejo',
    name: 'Verde Complejo',
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Tequila sour',
    ingredients: [
      { name: 'blanco tequila', amount: 2, unit: 'oz' },
      { name: 'green chartreuse', amount: 0.5, unit: 'oz' },
      { name: 'bruto americano', amount: 0.5, unit: 'oz' },
      { name: 'lime juice', amount: 0.75, unit: 'oz' },
      { name: 'agave syrup', amount: 0.25, unit: 'oz' },
      { name: 'orange bitters', amount: 2, unit: 'dash' }
    ],
    method: 'Shake with ice, strain over crushed ice',
    glass: 'Rocks',
    garnish: 'Lime wheel, cucumber ribbon, fresh cilantro',
    tags: ['tequila', 'chartreuse', 'bruto', 'lime', 'shaken', 'herbal', 'bitter', 'terry-original'],
    balance: 'Three aggressive elements (high-proof tequila, Green Chartreuse, Bruto Americano) that somehow coexist — agave sweetness and lime hold them together.',
    flavorProfile: { bitter: 0.7, sweet: 0.3, citrus: 0.7, herbal: 0.8, smoky: 0.1, spicy: 0.2, strength: 0.7 }
  },
  {
    id: 'the-oaxacan-sour',
    name: 'The Oaxacan Sour',
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Tequila-mezcal sour',
    ingredients: [
      { name: 'reposado tequila', amount: 1.5, unit: 'oz' },
      { name: 'mezcal', amount: 0.75, unit: 'oz' },
      { name: 'yellow chartreuse', amount: 0.5, unit: 'oz' },
      { name: 'maraschino liqueur', amount: 0.25, unit: 'oz' },
      { name: 'lime juice', amount: 0.75, unit: 'oz' },
      { name: 'simple syrup', amount: 0.5, unit: 'oz' },
      { name: 'egg white', amount: 1, unit: 'whole' },
      { name: 'orange bitters', amount: 2, unit: 'dash' }
    ],
    method: 'Dry shake 30s, add ice, wet shake 15s, double strain',
    glass: 'Coupe',
    garnish: 'Lime wheel, smoked salt rim',
    tags: ['tequila', 'mezcal', 'chartreuse', 'egg-white', 'shaken', 'smoky', 'sour', 'terry-original'],
    balance: 'Tequila smoothness + mezcal smoke in silk egg white texture. Chartreuse herbal and Maraschino cherry add complexity. Smoked salt rim reinforces smoke.',
    flavorProfile: { bitter: 0.4, sweet: 0.5, citrus: 0.7, herbal: 0.5, smoky: 0.5, spicy: 0.1, strength: 0.6 }
  },
  {
    id: 'paloma-deluxe',
    name: 'Paloma Deluxe',
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Tequila highball',
    ingredients: [
      { name: 'reposado tequila', amount: 2, unit: 'oz' },
      { name: 'aperol', amount: 0.5, unit: 'oz' },
      { name: 'yellow chartreuse', amount: 0.25, unit: 'oz' },
      { name: 'pineapple juice', amount: 1, unit: 'oz' },
      { name: 'lime juice', amount: 0.75, unit: 'oz' },
      { name: 'salt', amount: 1, unit: 'pinch' },
      { name: 'soda water', amount: 2, unit: 'oz' }
    ],
    method: 'Shake tequila, Aperol, Chartreuse, juices with ice; strain over ice; top with soda',
    glass: 'Collins',
    garnish: 'Lime wheel, salt rim',
    tags: ['tequila', 'aperol', 'chartreuse', 'pineapple', 'highball', 'refreshing', 'terry-original'],
    balance: "Aperol's bitter-orange plays where grapefruit would normally go. Chartreuse adds herbal depth. Pineapple adds tropical sweetness balanced by Aperol's bitterness and lime's tartness.",
    flavorProfile: { bitter: 0.5, sweet: 0.5, citrus: 0.6, herbal: 0.4, smoky: 0.1, spicy: 0.1, strength: 0.4 }
  },
  {
    id: 'the-agave-paper-plane',
    name: 'The Agave Paper Plane',
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Paper Plane variant / equal parts',
    ingredients: [
      { name: 'reposado tequila', amount: 0.75, unit: 'oz' },
      { name: 'aperol', amount: 0.75, unit: 'oz' },
      { name: 'amaro nonino', amount: 0.75, unit: 'oz' },
      { name: 'lime juice', amount: 0.75, unit: 'oz' },
      { name: 'agave syrup', amount: 0.25, unit: 'oz' }
    ],
    method: 'Shake with ice, double strain',
    glass: 'Coupe',
    garnish: 'Lime twist, orange wheel',
    tags: ['tequila', 'aperol', 'amaro', 'lime', 'shaken', 'equal-parts', 'paper-plane-variant', 'terry-original'],
    balance: "Paper Plane structure with tequila replacing bourbon — agave's vegetal brightness transforms the drink's character while maintaining perfect bitter-sweet-citrus balance.",
    flavorProfile: { bitter: 0.7, sweet: 0.4, citrus: 0.7, herbal: 0.3, smoky: 0.1, spicy: 0.1, strength: 0.5 }
  },
  {
    id: 'tequila-last-word',
    name: 'Tequila Last Word',
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Last Word variant / equal parts',
    ingredients: [
      { name: 'blanco tequila', amount: 0.75, unit: 'oz' },
      { name: 'green chartreuse', amount: 0.75, unit: 'oz' },
      { name: 'maraschino liqueur', amount: 0.75, unit: 'oz' },
      { name: 'lime juice', amount: 0.75, unit: 'oz' }
    ],
    method: 'Shake with ice, double strain',
    glass: 'Coupe',
    garnish: 'Lime twist',
    tags: ['tequila', 'chartreuse', 'maraschino', 'lime', 'shaken', 'equal-parts', 'classic-variant', 'terry-original'],
    balance: 'Last Word structure with tequila replacing gin — agave-herbal instead of botanical-herbal. All four elements have strong presence, perfect democratic balance.',
    flavorProfile: { bitter: 0.5, sweet: 0.5, citrus: 0.7, herbal: 0.9, smoky: 0.1, spicy: 0.1, strength: 0.6 }
  },
  {
    id: 'oaxacan-paper-plane',
    name: 'Oaxacan Paper Plane',
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Paper Plane variant',
    ingredients: [
      { name: 'reposado tequila', amount: 0.75, unit: 'oz' },
      { name: 'mezcal', amount: 0.75, unit: 'oz' },
      { name: 'aperol', amount: 0.75, unit: 'oz' },
      { name: 'amaro nonino', amount: 0.75, unit: 'oz' },
      { name: 'lime juice', amount: 0.75, unit: 'oz' }
    ],
    method: 'Shake with ice, double strain',
    glass: 'Coupe',
    garnish: 'Lime twist, smoked salt rim',
    tags: ['tequila', 'mezcal', 'aperol', 'amaro', 'lime', 'shaken', 'smoky', 'equal-parts', 'paper-plane-variant', 'terry-original'],
    balance: "Paper Plane architecture with split agave base — tequila's smoothness + mezcal's smoke create a third flavor dimension the original doesn't have.",
    flavorProfile: { bitter: 0.7, sweet: 0.4, citrus: 0.7, herbal: 0.3, smoky: 0.6, spicy: 0.1, strength: 0.6 }
  },
  
  // SECTION G: FAT-WASHED BUILDS
  {
    id: 'the-breakfast-manhattan',
    name: 'The Breakfast Manhattan',
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Manhattan variant / fat-washed',
    ingredients: [
      { name: 'bourbon', amount: 2.5, unit: 'oz' },
      { name: 'punt e mes', amount: 0.75, unit: 'oz' },
      { name: 'maraschino liqueur', amount: 0.25, unit: 'oz' },
      { name: 'maple syrup', amount: 0.25, unit: 'oz' },
      { name: 'angostura bitters', amount: 2, unit: 'dash' },
      { name: 'orange bitters', amount: 1, unit: 'dash' }
    ],
    method: 'Stir with ice, strain · bacon fat-wash bourbon recommended',
    glass: 'Coupe',
    garnish: 'Candied bacon, expressed orange peel, Luxardo cherry',
    tags: ['bourbon', 'punt-e-mes', 'maraschino', 'bacon', 'fat-washed', 'stirred', 'brunch', 'terry-original'],
    balance: 'Bacon + maple in Manhattan form — classic breakfast pairing. Punt e Mes adds vermouth structure with bitterness. Candied bacon garnish reinforces the savory-sweet contrast.',
    flavorProfile: { bitter: 0.5, sweet: 0.5, citrus: 0.1, herbal: 0.3, smoky: 0.3, spicy: 0.2, strength: 0.9 }
  },
  {
    id: 'smoke-and-bacon',
    name: 'Smoke & Bacon',
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Pre-steak fat-washed',
    ingredients: [
      { name: 'bourbon', amount: 2, unit: 'oz' },
      { name: 'mezcal', amount: 0.75, unit: 'oz' },
      { name: 'amaro nonino', amount: 0.5, unit: 'oz' },
      { name: 'coffee liqueur', amount: 0.25, unit: 'oz' },
      { name: 'maple syrup', amount: 0.25, unit: 'oz' },
      { name: 'coffee bitters', amount: 2, unit: 'dash' }
    ],
    method: 'Stir with ice, strain over large cube · smoke glass with applewood · bacon fat-wash bourbon recommended',
    glass: 'Rocks',
    garnish: 'Candied bacon, expressed orange peel, coffee beans',
    tags: ['bourbon', 'mezcal', 'amaro', 'bacon', 'smoky', 'fat-washed', 'pre-steak', 'stirred', 'terry-original'],
    balance: 'Triple smoke (bacon fat, mezcal, smoked glass) mirrors grilled beef in layers. Coffee + bacon references breakfast pairing. Amaro bridges bacon and coffee.',
    flavorProfile: { bitter: 0.6, sweet: 0.4, citrus: 0.1, herbal: 0.3, smoky: 0.9, spicy: 0.2, strength: 0.8 }
  },
  {
    id: 'the-butchers-flip',
    name: "The Butcher's Flip",
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Flip / dessert',
    ingredients: [
      { name: 'bourbon', amount: 2, unit: 'oz' },
      { name: 'licor 43', amount: 0.5, unit: 'oz' },
      { name: 'coffee liqueur', amount: 0.25, unit: 'oz' },
      { name: 'maple syrup', amount: 0.5, unit: 'oz' },
      { name: 'whole egg', amount: 1, unit: 'whole' },
      { name: 'chocolate bitters', amount: 3, unit: 'dash' }
    ],
    method: 'Dry shake hard 45s, add ice, wet shake 20s, double strain · bacon fat-wash bourbon recommended',
    glass: 'Coupe',
    garnish: 'Candied bacon, grated nutmeg, dark chocolate shavings',
    tags: ['bourbon', 'licor43', 'coffee', 'bacon', 'flip', 'egg', 'dessert', 'fat-washed', 'terry-original'],
    balance: 'Maximum richness — bacon fat + whole egg + Licor 43 creates unparalleled decadence. Licor 43\'s vanilla complements bacon. Coffee and chocolate bitters prevent it from being one-dimensional.',
    flavorProfile: { bitter: 0.2, sweet: 0.7, citrus: 0, herbal: 0.2, smoky: 0.3, spicy: 0.2, strength: 0.6 }
  },
  {
    id: 'the-southern-sour',
    name: 'The Southern Sour',
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Sour / fat-washed',
    ingredients: [
      { name: 'bourbon', amount: 2, unit: 'oz' },
      { name: 'amaro nonino', amount: 0.5, unit: 'oz' },
      { name: 'disaronno', amount: 0.25, unit: 'oz' },
      { name: 'lemon juice', amount: 0.75, unit: 'oz' },
      { name: 'honey syrup', amount: 0.5, unit: 'oz' },
      { name: 'egg white', amount: 1, unit: 'whole' },
      { name: 'angostura bitters', amount: 2, unit: 'dash' }
    ],
    method: 'Dry shake 30s, add ice, wet shake 15s, double strain · bacon fat-wash bourbon recommended',
    glass: 'Coupe',
    garnish: 'Candied bacon on rim, lemon twist, cracked black pepper on foam',
    tags: ['bourbon', 'amaro', 'egg-white', 'bacon', 'fat-washed', 'sour', 'shaken', 'terry-original'],
    balance: "Sour format showcases bacon bourbon without overwhelming. Amaro and Disaronno's nuttiness complements almond-bacon pairing. Honey adds Southern sweetness.",
    flavorProfile: { bitter: 0.5, sweet: 0.5, citrus: 0.6, herbal: 0.3, smoky: 0.3, spicy: 0.2, strength: 0.6 }
  },
  {
    id: 'the-old-fashioned-deluxe',
    name: 'The Old Fashioned Deluxe',
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Old Fashioned variant / fat-washed',
    ingredients: [
      { name: 'bourbon', amount: 2.5, unit: 'oz' },
      { name: 'maple syrup', amount: 0.25, unit: 'oz' },
      { name: 'angostura bitters', amount: 3, unit: 'dash' },
      { name: 'orange bitters', amount: 2, unit: 'dash' }
    ],
    method: 'Stir with ice, strain over large cube · bacon fat-wash bourbon recommended',
    glass: 'Rocks',
    garnish: 'Candied bacon strip, expressed orange peel, Luxardo cherry, torched cinnamon stick',
    tags: ['bourbon', 'bacon', 'fat-washed', 'stirred', 'old-fashioned', 'simple', 'terry-original'],
    balance: 'Simplest fat-washed application — let the bacon bourbon shine. Maple + bacon is the classic breakfast pairing. Minimal modifiers, maximum spirit transparency.',
    flavorProfile: { bitter: 0.4, sweet: 0.4, citrus: 0.1, herbal: 0.2, smoky: 0.3, spicy: 0.2, strength: 0.9 }
  },
  {
    id: 'the-carbonara',
    name: 'The Carbonara',
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Savory stirred / Italian',
    ingredients: [
      { name: 'bourbon', amount: 2, unit: 'oz' },
      { name: 'bruto americano', amount: 0.5, unit: 'oz' },
      { name: 'punt e mes', amount: 0.5, unit: 'oz' },
      { name: 'licor 43', amount: 0.25, unit: 'oz' },
      { name: 'black pepper honey syrup', amount: 1, unit: 'barspoon' },
      { name: 'angostura bitters', amount: 2, unit: 'dash' }
    ],
    method: 'Stir with ice, strain · bacon fat-wash bourbon recommended',
    glass: 'Coupe',
    garnish: 'Cracked black pepper half-rim, expressed orange peel',
    tags: ['bourbon', 'bruto', 'punt-e-mes', 'italian', 'bacon', 'fat-washed', 'stirred', 'savory', 'terry-original'],
    balance: "Literal carbonara reference — bacon (fat-washed), black pepper (syrup, rim), Italian bitters (Bruto + Punt e Mes). Licor 43's vanilla echoes egg richness. Most savory cocktail in the catalog.",
    flavorProfile: { bitter: 0.6, sweet: 0.4, citrus: 0.1, herbal: 0.3, smoky: 0.3, spicy: 0.6, strength: 0.8 }
  },
  {
    id: 'the-blt',
    name: 'The BLT',
    creator: 'Terry Kaiser',
    source: 'Speakeasier Originals',
    year: 2024,
    category: 'Savory garden cocktail',
    ingredients: [
      { name: 'bourbon', amount: 2, unit: 'oz' },
      { name: 'bruto americano', amount: 0.5, unit: 'oz' },
      { name: 'yellow chartreuse', amount: 0.25, unit: 'oz' },
      { name: 'lemon juice', amount: 0.75, unit: 'oz' },
      { name: 'simple syrup', amount: 0.5, unit: 'oz' },
      { name: 'salt', amount: 1, unit: 'pinch' }
    ],
    method: 'Muddle fresh basil and cherry tomatoes, add spirits and juices, shake with ice, double strain over ice · bacon fat-wash bourbon recommended',
    glass: 'Rocks',
    garnish: 'Cherry tomato on pick, fresh basil leaf, cracked black pepper',
    tags: ['bourbon', 'bruto', 'bacon', 'fat-washed', 'savory', 'shaken', 'garden', 'vegetable', 'terry-original'],
    balance: "Literal BLT — bacon fat bourbon, basil (muddled), tomato (muddled). Bruto's earthy-orange bitterness complements tomato acidity. Most unique savory cocktail in the collection.",
    flavorProfile: { bitter: 0.5, sweet: 0.3, citrus: 0.6, herbal: 0.5, smoky: 0.3, spicy: 0.3, strength: 0.6 }
  }
];

// ============================================
// INGREDIENT NORMALIZATION
// ============================================

export const ingredientAliases: Record<string, string> = {
  // Whiskey variants
  'bourbon whiskey': 'bourbon',
  'rye': 'rye whiskey',
  'canadian rye': 'rye whiskey',
  'canadian whisky': 'rye whiskey',
  'scotch': 'blended scotch',
  'scotch whisky': 'blended scotch',
  
  // Chartreuse (VEP is a distinct inventory item — both Green and Yellow VEPs map to base expressions)
  'chartreuse green': 'green chartreuse',
  'chartreuse yellow': 'yellow chartreuse',
  'green chartreuse vep': 'green chartreuse',
  'yellow chartreuse vep': 'yellow chartreuse',
  'vep': 'chartreuse vep',
  'chartreuse vep mof': 'chartreuse vep',

  // Liqueurs
  'luxardo maraschino': 'maraschino liqueur',
  'maraschino': 'maraschino liqueur',
  'luxardo': 'maraschino liqueur',
  'amaro nonino quintessentia': 'amaro nonino',
  'nonino': 'amaro nonino',
  'averna amaro': 'averna',
  'amaro averna': 'averna',
  'mr black': 'coffee liqueur',
  'mr. black': 'coffee liqueur',
  'kahlua': 'coffee liqueur',
  'tia maria': 'coffee liqueur',
  'elderflower liqueur': 'st-germain',
  'elderflower': 'st-germain',
  'velvet falernum': 'falernum',
  'john d taylor': 'falernum',
  'lillet': 'lillet blanc',
  'violet liqueur': 'creme de violette',
  // Fernet & Amaro shortcuts
  'fernet': 'fernet branca',
  'amaro fernet': 'fernet branca',
  'bruto': 'bruto americano',
  // Amaretto / Disaronno
  'amaretto': 'disaronno',
  'disaronno amaretto': 'disaronno',
  // Port
  'port': 'tawny port',
  'tawny': 'tawny port',
  '20 year tawny port': 'tawny port',
  'tawny port wine': 'tawny port',
  'sandeman 20 year': 'tawny port',
  'ruby port': 'tawny port',
  
  // Citrus
  'fresh lemon juice': 'lemon juice',
  'fresh lime juice': 'lime juice',
  'fresh orange juice': 'orange juice',
  'fresh grapefruit juice': 'grapefruit juice',
  
  // Sweeteners
  'simple': 'simple syrup',
  '2:1 simple syrup': 'simple syrup',
  'rich simple syrup': 'simple syrup',
  'demerara syrup': 'simple syrup',
  'honey syrup': 'honey ginger syrup',
  'ginger syrup': 'honey ginger syrup',
  'honey': 'honey ginger syrup',
  'raw honey': 'honey ginger syrup',
  'agave': 'agave syrup',
  'agave nectar': 'agave syrup',
  'pepper honey syrup': 'black pepper honey syrup',
  'black pepper syrup': 'black pepper honey syrup',
  
  // Bitters
  'angostura': 'angostura bitters',
  'ango': 'angostura bitters',
  'peychauds': 'peychauds bitters',
  'absinthe bitters': 'absinthe',
  
  // Sparkling
  'prosecco': 'champagne',
  'sparkling wine': 'champagne',
  'cava': 'champagne',
  'brut': 'champagne',
  
  // Orange liqueurs
  'triple sec': 'cointreau',
  'orange curacao': 'cointreau',
  'dry curacao': 'cointreau',
  'grand marnier': 'cointreau',
  
  // Vermouth
  'carpano antica': 'sweet vermouth',
  'cocchi vermouth di torino': 'sweet vermouth',
  'dolin rouge': 'sweet vermouth',
  'punt e mes': 'sweet vermouth',
  'dolin dry': 'dry vermouth',
  'noilly prat': 'dry vermouth',
  
  // Rum
  'dark rum': 'aged rum',
  'jamaican rum': 'aged rum',
  'plantation rum': 'aged rum',
  'light rum': 'white rum',
  'silver rum': 'white rum',
  'bacardi': 'white rum',
  'rhum agricole': 'aged rum',
  
  // Tequila/Mezcal
  'tequila': 'blanco tequila',
  'silver tequila': 'blanco tequila',
  'anejo tequila': 'reposado tequila',
  'del maguey': 'mezcal',
  
  // Other spirits
  'brandy': 'cognac',
  'apple brandy': 'calvados',
  'pernod': 'absinthe',
  'pastis': 'absinthe',
  'herbsaint': 'absinthe',
  
  // Mixers
  'club soda': 'soda water',
  'sparkling water': 'soda water',
  'tonic': 'tonic water',
  'fever tree': 'ginger beer',
  
  // Fresh ingredients
  'fresh mint': 'mint',
  'mint leaves': 'mint',
  'spearmint': 'mint'
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export function normalizeIngredient(name: string): string {
  const normalized = name.toLowerCase().trim();
  return ingredientAliases[normalized] || normalized;
}

export function canMakeRecipe(recipe: Recipe, inventory: string[]): boolean {
  const normalizedInventory = inventory.map(normalizeIngredient);
  return recipe.ingredients.every(ing => 
    normalizedInventory.includes(normalizeIngredient(ing.name))
  );
}

export function getMakeableRecipes(inventory: string[]): Recipe[] {
  return recipes.filter(recipe => canMakeRecipe(recipe, inventory));
}

export function getMissingIngredients(recipe: Recipe, inventory: string[]): string[] {
  const normalizedInventory = inventory.map(normalizeIngredient);
  return recipe.ingredients
    .filter(ing => !normalizedInventory.includes(normalizeIngredient(ing.name)))
    .map(ing => ing.name);
}
