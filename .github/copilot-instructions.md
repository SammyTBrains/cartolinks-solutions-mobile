# Copilot Instructions for this Repo

These notes help AI coding agents work productively in this Expo + Expo Router app. Keep guidance short, specific, and tied to this codebase.

## High-level architecture

- Runtime: Expo SDK 54 (React Native 0.81, React 19) with Expo Router v6 (file-based routing). Entry is `expo-router/entry`.
- App structure follows Expo Router:
  - `app/_layout.tsx` defines the root Stack. In the starter, it is minimal; use the example in `app-example/app/_layout.tsx` for ThemeProvider and modal routing.
  - Screens live under `app/**`. File/dir names map to routes. A `(group)` folder is a route group (not part of the URL).
  - The template with tabs lives under `app-example/app/(tabs)/**` and demonstrates bottom tabs.
- Shared UI and hooks are in the example folder for reference:
  - Components: `app-example/components/**` (e.g., `parallax-scroll-view.tsx`, `themed-text.tsx`).
  - Hooks: `app-example/hooks/**` (e.g., `use-color-scheme.ts`).
  - Theme: `app-example/constants/theme.ts`.

## Conventions and patterns

- Use absolute imports with `@/*` path alias (configured in `tsconfig.json`). When moving code from `app-example/**` into `app/**`, keep the alias paths or adjust to relative if staying outside the project root.
- Prefer Themed primitives from the example (`ThemedText`, `ThemedView`, `useThemeColor`) for dark/light support.
- Icons: use `components/ui/icon-symbol.tsx` which maps iOS SF Symbol names to Material Icons for Android/Web. Use SF Symbol names in code and extend the mapping as needed.
- Animations/scroll effects rely on `react-native-reanimated` 4 APIs (e.g., `useScrollOffset`, `useAnimatedRef`) as shown in `parallax-scroll-view.tsx`.
- Route metadata: modal example lives at `app-example/app/modal.tsx` and is registered in the root `Stack` with `presentation: 'modal'`.

## Developer workflows

- Install deps: `npm install`.
- Run the dev server: `npm start` (alias for `expo start`). For platform shortcuts: `npm run android` / `npm run ios` / `npm run web`.
- Lint: `npm run lint` (eslint-config-expo, ignores `dist/*`).
- Reset to a blank `app/`: `npm run reset-project` moves the current app into `app-example/` and creates a fresh `app/`.
- New Architecture (Fabric/Turbo): enabled via `app.json` (`newArchEnabled: true`). Favor modern APIs and avoid deprecated RN patterns.

## Routing examples

- Root stack with tabs (reference): see `app-example/app/_layout.tsx` and `app-example/app/(tabs)/_layout.tsx`.
- Adding a screen:
  1. Create `app/feature/index.tsx` to expose `/feature`.
  2. If using a modal: add `app/feature-modal.tsx` and include a `<Stack.Screen name="feature-modal" options={{ presentation: 'modal' }} />` in `app/_layout.tsx`.
- Linking between screens: use `import { Link } from 'expo-router'` and `<Link href="/modal" />` as shown in `app-example/app/(tabs)/index.tsx`.

## Theming

- Color sets in `constants/theme.ts` show the light/dark palette and web/ios font fallbacks. Use `useColorScheme()` and `ThemeProvider` (see example root layout) to switch themes.

## Assets and config

- App icons and splash are configured in `app.json` under `expo.android.adaptiveIcon` and `plugins[expo-splash-screen]`.
- Web output is `static`; favicon at `assets/images/favicon.png`.

## Libraries and versions

- Router: `expo-router@~6`. Navigation helpers from `@react-navigation/*` are used via Expo Router.
- UI/Platform: `expo-*` packages (image, status-bar, symbols, haptics, web-browser, system-ui, constants).
- Gesture/animation: `react-native-gesture-handler`, `react-native-reanimated`.

## Project-specific tips for AI agents

- This repo currently keeps the fully-featured starter under `app-example/**`. When implementing real features, add code under `app/**` and copy patterns from `app-example/**` as needed.
- Preserve the path alias `@/*` in moved files so imports keep working (example: `import { ThemedText } from '@/components/themed-text'`). If you keep components inside `app/`, adjust tsconfig or use relative paths.
- For pixel-perfect UI tasks, reference the example components (ParallaxScrollView, ThemedText/View) to get spacing and typography consistent.
- When adding icons, extend `components/ui/icon-symbol.tsx` mapping for any new symbol names.
- Keep files small and co-locate per-route UI in `app/<route>/` directories. Reusable UI should live in `components/` (create at repo root if promoting from example).

## Where to start for the internship assignment

- Build the “Design Poster Generator” screen under `app/poster-generator/index.tsx` using Expo Router. Follow the layout from the attached image (header tabs, prompt text area, settings list items, generate button). Use `ThemedText/ThemedView` from the example for consistent styling.

If anything here is unclear or you see missing conventions specific to your team, comment in this file and we will update it.
