# CODEX_DEPLOY_PROMPT.md — mcjhome-portal

## Project Overview

Deploy the mcjhome.space family portal — a React + Vite single-page app that serves as the home page and app launcher for the mcjhome.space ecosystem.

## What's Already Done

- Complete React + Vite project with all source code
- Password gate (sessionStorage-based, password: `mcjhome2026`)
- Responsive portal page with app cards linking to subdomains
- CLAUDE.md with architecture documentation
- Project builds successfully with `npm run build`

## Your Tasks

### 1. Initialize Git & Push to GitHub

```bash
cd mcjhome-portal
git init
git add -A
git commit -m "feat: mcjhome.space family portal — initial release"
git remote add origin https://github.com/<OWNER>/mcjhome-portal.git
git branch -M main
git push -u origin main
```

Use the existing GitHub account (same as other mcjhome projects).

### 2. Deploy to Vercel

- Create a new Vercel project linked to the `mcjhome-portal` repo
- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`
- No environment variables needed (pure static frontend)
- Deploy under the same Vercel team: `gfnfsfsr4j-labs-projects`

### 3. Domain Configuration

This is the critical step. The root domain `mcjhome.space` currently points to the Family Quiz Night project. We need to:

#### A. Move Quiz Night to subdomain
1. In Vercel, go to the **existing Quiz Night project**
2. Remove `mcjhome.space` (and `www.mcjhome.space`) from its domain settings
3. Add `quiz.mcjhome.space` as the new domain for Quiz Night

#### B. Point root domain to this portal
1. In Vercel, go to this **new mcjhome-portal project**
2. Add `mcjhome.space` and `www.mcjhome.space` as domains

#### C. Update DNS at Aliyun (阿里云)
Add/update these DNS records:

```
Type    Host    Value                       TTL
CNAME   quiz    cname.vercel-dns.com.       600
CNAME   @       cname.vercel-dns.com.       600
CNAME   www     cname.vercel-dns.com.       600
```

Note: The `closet` and `trip` CNAME records should already exist — do NOT modify them.

### 4. Verify

After deployment, verify all URLs work:
- [ ] `mcjhome.space` → shows password gate, enter `mcjhome2026` → portal
- [ ] `www.mcjhome.space` → same as above (redirects or serves)
- [ ] `quiz.mcjhome.space` → Family Quiz Night app
- [ ] `closet.mcjhome.space` → Closet Compass (unchanged)
- [ ] `trip.mcjhome.space` → Europe Trip 2026 (unchanged)

### 5. Post-Deploy Cleanup

- Ensure Quiz Night app still works correctly on new subdomain
- If Quiz Night has any hardcoded references to `mcjhome.space` (e.g., in meta tags, OAuth callbacks, or share URLs), update them to `quiz.mcjhome.space`

## Important Notes

- Do NOT touch the `closet` or `trip` subdomain configurations
- The password gate is frontend-only (sessionStorage) — not meant for real security, just a family "front door"
- DNS propagation may take a few minutes to a few hours
- If Vercel shows SSL certificate errors for the new domain, wait — it auto-provisions Let's Encrypt certs

## Project Structure

```
mcjhome-portal/
├── index.html          # Entry HTML
├── public/
│   └── favicon.svg     # Serif "m" favicon
├── src/
│   ├── main.jsx        # React entry
│   └── App.jsx         # All components (Gate, Portal, Cards, Styles)
├── package.json
├── vite.config.js
└── CLAUDE.md           # Architecture docs
```
