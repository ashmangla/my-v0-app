# Habit Garden 🌱

A beautiful and interactive habit tracking application where you can cultivate healthy habits and watch them grow like plants in a garden.

## Features

- 🌱 **Plant Habits**: Add new habits with custom names and frequency goals
- 💧 **Track Progress**: Complete habits daily and watch them grow through different stages
- 🌻 **Visual Growth**: Habits progress from seeds to blooming plants as you complete them
- ☀️ **Weather Report**: See your daily completion rate with a weather-themed progress indicator
- 🎵 **Sound Feedback**: Enjoy satisfying sounds when you complete habits and reach milestones
- 💾 **Local Storage**: Your habits are automatically saved to your browser's local storage

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js) or **yarn** or **pnpm**

You can check if you have Node.js installed by running:
```bash
node --version
```

## Installation

1. **Navigate to the project directory:**
   ```bash
   cd habit_garden
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   
   Or if you're using yarn:
   ```bash
   yarn install
   ```
   
   Or if you're using pnpm:
   ```bash
   pnpm install
   ```

## Launching the App

### Development Mode

To start the development server:

```bash
npm run dev
```

Or with yarn:
```bash
yarn dev
```

Or with pnpm:
```bash
pnpm dev
```

Once the server is running, open your browser and navigate to:
```
http://localhost:3000
```

The page will automatically reload when you make changes to the code.

### Production Build

To create an optimized production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Project Structure

```
habit_garden/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main habit tracking page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── habit-card.tsx     # Individual habit card component
│   ├── weather-report.tsx # Weather-themed progress indicator
│   └── ui/                # shadcn/ui components
├── lib/                   # Utility functions
│   └── utils.ts          # Helper utilities
└── public/               # Static assets
```

## Technologies Used

- **Next.js 16** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **shadcn/ui** - UI component library
- **Sonner** - Toast notifications
- **Lucide React** - Icons

## Usage

1. **Add a Habit**: Click the "Plant Your Seed" button (or the floating sun button if you have habits) to add a new habit
2. **Complete Habits**: Click on a habit card to mark it as completed for the day
3. **Watch Growth**: As you complete habits, they progress through growth stages (seed → sprout → plant → blooming)
4. **Track Progress**: View your daily completion rate in the weather report section

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Browser Support

This app uses modern web APIs and is best viewed in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- All habit data is stored locally in your browser's localStorage
- Habits reset their completion status at midnight
- Missing a day will cause a habit to "wilt" and lose some growth progress

## Troubleshooting

**Port already in use?**
If port 3000 is already in use, Next.js will automatically try the next available port (3001, 3002, etc.). Check the terminal output for the actual port number.

**Dependencies not installing?**
Try deleting `node_modules` and `package-lock.json`, then run `npm install` again.

**Build errors?**
Make sure you're using Node.js version 18 or higher. You can check with `node --version`.

## License

This project is private and not licensed for public use.
