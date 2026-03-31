# CLAUDE.md

This file provides guidance for AI agents working with this codebase.

## Project Overview

**PlayCN** — An interactive playground for customising and previewing shadcn/ui components. Users can prototype component variations with live code editing (Sandpack), switch themes via a command palette, and see persistent changes across components.

## Tech Stack

- **Framework**: Next.js (App Router) with React 19
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **UI Primitives**: shadcn/ui + Radix UI
- **State**: Zustand
- **Code Editor**: `@codesandbox/sandpack-react`
- **Linter/Formatter**: Biome (replaces ESLint + Prettier)
- **Package Manager**: pnpm

## Repository Structure

```
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout (fonts, providers)
│   ├── page.tsx                # Entry point — redirects mobile to splash
│   ├── providers.tsx           # React Query + theme providers
│   ├── globals.css             # Global styles, CSS variables, theme tokens
│   └── api/
│       └── components/
│           ├── route.ts        # POST /api/components
│           ├── all/route.ts    # GET  /api/components/all
│           └── [name]/route.ts # GET  /api/components/:name
│
├── components/
│   ├── ui/                     # shadcn/ui primitives (do not edit manually)
│   ├── app.tsx                 # Root app shell — layout, sidebar, viewer
│   ├── component-viewer.tsx    # Sandpack live preview for a component
│   ├── component-sidebar.tsx   # Left nav listing all components
│   ├── code-formatter.tsx      # Formats code on save via Biome WASM
│   ├── theme-switcher.tsx      # Light/dark toggle
│   ├── theme-command-palette.tsx # Cmd+K palette to switch theme presets
│   ├── splash-screen.tsx       # Mobile landing screen
│   ├── text-loop.tsx           # Animated text cycling
│   └── kibo-ui/
│       └── sandbox/index.tsx   # Sandpack wrapper from @kibo-ui registry
│
├── hooks/
│   ├── use-mobile.ts           # Boolean hook: is viewport mobile-width?
│   └── use-components.ts       # React Query hook to fetch component list
│
├── lib/
│   ├── utils.ts                # `cn()` helper (clsx + tailwind-merge)
│   ├── config.ts               # Site-level constants (name, links, etc.)
│   ├── component-registry.ts   # Source of truth: all component metadata + deps
│   └── theme-presets.ts        # Named theme preset definitions (CSS vars)
│
└── stores/
    └── use-active-component.ts # Zustand store: which component is selected
```

## Key Concepts

### Component Registry (`src/lib/component-registry.ts`)
Central manifest that lists every component available in the playground. Each entry includes the component name, its source code, and any peer dependencies. The API routes (`/api/components/*`) serve data from this registry. **When adding a new component to the playground, start here.**

### API Routes (`src/app/api/components/`)
Thin Next.js route handlers that read from the registry:
- `GET /api/components/all` — returns all component entries
- `GET /api/components/:name` — returns one component by name
- `POST /api/components` — accepts a name in the body, returns that component

### Component Viewer (`src/components/component-viewer.tsx`)
Wraps Sandpack to render a live, editable preview of a component. Receives the component's source from the registry and passes it into the sandbox.

### Theme System (`src/lib/theme-presets.ts` + `src/app/globals.css`)
Themes are defined as named sets of CSS custom properties. `theme-presets.ts` exports the preset objects; `globals.css` defines the base token structure. The command palette (`Cmd+K`) lets users switch presets at runtime.

### State (`src/stores/use-active-component.ts`)
Single Zustand store tracking which component is currently selected in the sidebar. Components read/write this with `useActiveComponent()`.

## Common Tasks

### Adding a new playground component
1. Add an entry to `src/lib/component-registry.ts` with the component name, source code string, and dependencies.
2. The component will automatically appear in the sidebar and be fetchable via the API — no other wiring needed.

### Adding a new theme preset
1. Add a new named export to `src/lib/theme-presets.ts`.
2. The command palette picks it up automatically.

### Modifying UI primitives
The files under `src/components/ui/` are shadcn/ui generated components. Prefer extending them via wrapper components rather than editing them directly, to make future shadcn upgrades easier.

### Running locally
```bash
pnpm install
pnpm dev        # http://localhost:3000
```

### Linting & formatting
```bash
pnpm lint       # Biome lint check
pnpm format     # Biome auto-format (runs on save via editor integration too)
```

Biome config lives in `biome.json`. There is no ESLint or Prettier config — do not add them.

## Path Aliases

`@/*` resolves to `src/*` (configured in `tsconfig.json`). Always use this alias for imports within `src/`.

```ts
import { cn } from "@/lib/utils";
import { useActiveComponent } from "@/stores/use-active-component";
```

## No Test Suite

There are currently no automated tests. Manual testing is done through the interactive UI in the browser.

## Notes for Agents

- Mobile viewports show a splash screen (`src/components/splash-screen.tsx`) instead of the main app — check `page.tsx` for the redirect logic.
- The `src/components/kibo-ui/` subtree is sourced from the `@kibo-ui` external registry (see `components.json`). Treat it similarly to `ui/` — extend, don't rewrite.
- Biome enforces 2-space indentation and the "recommended" rule set. Run `pnpm format` before committing.
