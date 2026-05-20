# Speakeasier 🍸

**Your personal AI mixologist. Always on. Always learning.**

Speakeasier is a premium cocktail recommendation app that knows your bar, learns your taste, and suggests drinks you can actually make.

![Speakeasier](https://via.placeholder.com/800x400/080808/D85A30?text=Speakeasier)

## Features

- 🤖 **AI-Powered Recommendations** - Claude understands context (pre-dinner, nightcap, unwinding) and recommends accordingly
- 📦 **Your Bar Only** - Only suggests drinks you can make with your current inventory
- 🎯 **Learns Your Taste** - Tracks what you make and adjusts recommendations over time
- 📚 **150+ Curated Recipes** - From Death & Co, Milk & Honey, PDT, Employees Only, and more
- ⚖️ **Balance Philosophy** - Every recommendation explains WHY the drink works

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Anthropic API key ([get one here](https://console.anthropic.com/))

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/speakeasier.git
cd speakeasier

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your ANTHROPIC_API_KEY

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
speakeasier/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts      # Claude API endpoint
│   ├── globals.css           # Tailwind + custom styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main app page
├── components/
│   └── ui.tsx                # Reusable UI components
├── data/
│   └── recipes.ts            # Recipe database
├── lib/
│   ├── prompts.ts            # AI system prompts
│   └── store.ts              # Zustand state management
├── public/
├── .env.example
├── package.json
├── tailwind.config.ts
└── README.md
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **AI**: Claude API (Anthropic)
- **Styling**: Tailwind CSS
- **State**: Zustand (with persistence)
- **Language**: TypeScript

## Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Ember | `#D85A30` | Primary accent, CTAs |
| Forest | `#1D9E75` | "Ready" indicators |
| Amber | `#BA7517` | Secondary accent |
| Midnight | `#080808` | Background |

## Recipe Database

The app includes 20+ recipes from legendary bars:

- **Death & Co** - Oaxaca Old Fashioned, Naked and Famous, Paper Plane
- **Milk & Honey / Attaboy** - Penicillin, Gold Rush
- **PDT** - Benton's Old Fashioned
- **Pegu Club** - Gin-Gin Mule, Old Cuban
- **Employees Only** - Amelia, Ginger Smash
- **Classics** - Negroni, Manhattan, Last Word, Daiquiri

Each recipe includes:
- Creator and origin bar
- Full ingredient specs
- Method, glass, garnish
- Balance analysis (why it works)
- Flavor profile scores

## Customization

### Adding Recipes

Edit `data/recipes.ts` to add new recipes:

```typescript
{
  id: 'my-recipe',
  name: 'My Recipe',
  creator: 'Your Name',
  source: 'Your Bar',
  ingredients: [
    { name: 'bourbon', amount: 2, unit: 'oz' },
    // ...
  ],
  method: 'Stir with ice, strain',
  glass: 'Coupe',
  garnish: 'Lemon twist',
  tags: ['spirit-forward', 'bourbon'],
  balance: 'Why this combination works...',
  flavorProfile: {
    bitter: 0.3,
    sweet: 0.4,
    citrus: 0.2,
    herbal: 0.3,
    smoky: 0,
    spicy: 0.1,
    strength: 0.8
  }
}
```

### Modifying the AI Personality

Edit `lib/prompts.ts` to customize the mixologist's personality and behavior.

## Roadmap

- [ ] Barcode scanning for inventory management
- [ ] Photo recognition for bottles
- [ ] Social features (share your creations)
- [ ] Advanced technique tutorials
- [ ] Seasonal/holiday recommendations
- [ ] Integration with grocery delivery
- [ ] Native iOS/Android apps

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## License

MIT License - see LICENSE for details.

---

**Built with 🥃 by cocktail enthusiasts, for cocktail enthusiasts.**
