# AI Agent Instructions for PBNTC Frontend

## Project Overview
**PBNTC Frontend** is a React 19 + TypeScript + Vite web application for an interactive campus map with location discovery and information browsing. It targets Thai higher education institutions, built with Tailwind CSS for styling and Framer Motion for animations.

### Key Stack
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite (with rolldown-vite) + SWC for fast refresh
- **Styling**: Tailwind CSS 4 + custom theme system
- **Routing**: React Router v7
- **Animations**: Framer Motion for transitions
- **UI Components**: Lucide React icons + custom components
- **Map Interaction**: react-zoom-pan-pinch for pan/zoom/pinch controls

## Architecture Patterns

### Theme System (Context-based)
The app uses a **dual-theme system** with purple and red color palettes:
- **Provider**: [src/context/ThemeContext.tsx](src/context/ThemeContext.tsx) exports `ThemeProvider` and `useTheme` hook
- **Config**: [src/config/theme.ts](src/config/theme.ts) defines `THEMES` object with Tailwind class names
- **Usage**: Components access theme with `const { theme, toggleTheme, styles } = useTheme()`
- **Pattern**: Theme colors use CSS class strings (e.g., `text-indigo-400`, `bg-indigo-600`) stored in the config object

### Data Layer Structure
- **Types**: [src/types/index.ts](src/types/index.ts) defines `MapLocation`, `CategoryType`, `Teacher`, `MapData` interfaces
- **Locations Data**: [src/data/locations.ts](src/data/locations.ts) - array of location objects with coordinates (x, y as percentages), category, images, and teacher associations
- **Constants**: [src/data/constants.ts](src/data/constants.ts) - `CATEGORY_STYLES` map with Tailwind styling and Lucide icons per location type
- **Map Config**: [src/assets/map.json](src/assets/map.json) - JSON structure for icogram (building layout diagram) elements

### Component Organization
```
components/layout/     - Page shell components (Header, Footer, MainLayout)
components/ui/         - Reusable feature components (MapPin, LocationDetailCard)
pages/                  - Route pages (Home, MapPage, AboutPage, Contact)
```

## MapPage Implementation Details
The most complex component ([src/pages/MapPage.tsx](src/pages/MapPage.tsx) - 328 lines) manages three interactive modes:

1. **Static Mode**: Display-only map with location markers
2. **Interactive Mode**: Pan/zoom via `react-zoom-pan-pinch` library, click markers for details
3. **Developer Mode**: Coordinate picker for calibrating location x,y values on the map image

### Key State Management
- `mode`: Controls UI visibility and interaction behavior
- `searchTerm`: Filters locations via `useMemo` for search functionality
- `selectedLoc`: Selected location for detail panel display
- `devCoords`: Developer mode coordinate tracking with copy-to-clipboard feedback

### Critical Functions
- `fitToContainer()`: Calculates optimal zoom level to fit map to viewport
- `handleMapClick()`: Captures coordinates for developer mode or selects locations
- `handleMouseMove()`: Shows coordinate overlay in developer mode

## Developer Workflows

### Commands
```bash
npm run dev        # Start Vite dev server with HMR (http://localhost:5173)
npm run build      # TypeScript compile + Vite production build
npm run lint       # Run ESLint on codebase
npm run preview    # Preview production build locally
```

### TypeScript Configuration
- **tsconfig.json**: Base configuration with strict mode enabled
- **tsconfig.app.json**: App-specific settings (include src/, exclude node_modules)
- **tsconfig.node.json**: Build tool configuration (vite.config.ts, eslint.config.js)

### Styling Conventions
- **Tailwind Classes**: Use with theme colors from config (indigo for purple theme, yellow for red theme)
- **Framer Motion**: Import `motion` and `AnimatePresence` from framer-motion; define animation variants separately
- **Responsive Design**: Use Tailwind breakpoints (e.g., `md:`, `lg:`) for responsive layouts

## Project-Specific Conventions

### Naming
- **Thai Comments**: Comments are in Thai language to clarify business logic and domain terms
- **Component Files**: PascalCase (e.g., MapPage.tsx, LocationDetailCard.tsx)
- **Hook Files**: useTheme hook exported from ThemeContext
- **Type Exports**: Central export in types/index.ts

### Location Coordinate System
- **X, Y Values**: Stored as **percentages (0-100)** of map image dimensions, not pixels
- **Calibration**: Developer mode allows clicking on map to get coordinates for new locations
- **Icogram**: map.json contains layout elements; coordinates reference this visual structure

### Lucide React Icon Integration
Icons imported via named imports: `import { Search, X, Maximize2 } from "lucide-react"`
For React icons (e.g., FaGraduationCap): use `react-icons` library separate import

### Location Detail Card
The [LocationDetailCard](src/components/ui/LocationDetailCard.tsx) component displays:
- Title, category badge (with icon), description
- Facilities list (if available)
- Teacher information (if teacherIds referenced)
- Image carousel (if images array exists)

## Build & Deployment Notes
- **ESLint**: Flat config in eslint.config.js with plugin-react-hooks and plugin-react-refresh rules
- **Vite Config**: Uses @vitejs/plugin-react-swc for fast refresh (Babel alternative with SWC)
- **TypeScript Strict**: Strict mode enforced; use `// eslint-disable-next-line` for necessary exemptions (e.g., only-export-components in hooks)
- **Asset Optimization**: Images lazy-load via react-zoom-pan-pinch for map performance

## Common Tasks & Files
| Task | Primary Files |
|------|---|
| Add new location | [locations.ts](src/data/locations.ts), optionally [constants.ts](src/data/constants.ts) if new category |
| Theme customization | [theme.ts](src/config/theme.ts) |
| Add route/page | [App.tsx](src/App.tsx), new file in [pages/](src/pages/) |
| Create component | New file in [components/ui/](src/components/ui/) or [components/layout/](src/components/layout/) |
| Modify header/footer | [Header.tsx](src/components/layout/Header.tsx), [Footer.tsx](src/components/layout/Footer.tsx) |

## Quick Reference
- **Theme Hook**: `const { theme, toggleTheme, styles } = useTheme()`
- **Location Search**: Filter `locations` array by `MapLocation.title` or `MapLocation.label`
- **New Category**: Add entry to `CategoryType` union in types/index.ts, add style in CATEGORY_STYLES object
- **Map Interaction**: TransformComponent wraps the zoomable element; transformRef manages zoom state
