# mcjhome-portal

Family digital hub / app launcher for mcjhome.space ecosystem.

## Architecture

- **Framework**: React 19 + Vite
- **Deployment**: Vercel (static)
- **Domain**: mcjhome.space (root domain)
- **Auth**: Front-end password gate (sessionStorage, password: mcjhome2026)

## Design System

- **Aesthetic**: Fluid Glass inspired — architectural minimalism, Cormorant Garamond serif + DM Sans
- **Background**: Blueprint dot-grid pattern with decorative concentric circles
- **Colors**: Warm linen palette (#f0ede6 base), minimal accent colors
- **Mobile**: Responsive, single-column below 640px

## File Structure

- `src/App.jsx` — Single file containing all components (PasswordGate, Portal, AppCard, Styles)
- `public/favicon.svg` — Minimal serif "m" favicon

## App Registry

Apps are defined in the `apps` array in App.jsx. Each entry has:
- `id`, `name`, `nameCn`, `desc`, `url`, `domain`, `accent`

To add a new app, add an entry to this array.

## Commands

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
```
