[![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]

This work is licensed under a
[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License][cc-by-nc-sa].

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]

[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg

# newtox.de

Personal website of Newtox aka Justin. Built with Astro as a fully static site, with a Splatfest-inspired look: click anywhere to ink the page, switch teams, and watch the live Discord lobby card. The interactive parts are small vanilla TypeScript scripts, everything else is plain HTML.

## Features

- Ink canvas with turf meter, team switching and random Splatfest color pairs
- Live Discord presence (status, game, Spotify) via [Lanyard](https://github.com/Phineas/lanyard)
- Projects as loadout cards, tech stack as filterable gear
- English and German, picked from the browser language
- Self-hosted fonts (Rubik, Rubik Spray Paint), no requests to Google Fonts

## Development

```bash
git clone https://github.com/newtox/newtox.de.git
cd newtox.de
nix develop
pnpm install
pnpm dev
```

Without Nix you need Node.js 22.23 or newer and pnpm.

## Build

```bash
pnpm build
```

The static site is written to `dist/`. Serve that folder with Caddy or any static web server.

## Editing content

- Projects: `src/data/projects.ts`
- Tech stack: `src/data/gear.ts`
- Social links and Discord ID: `src/data/socials.ts`
- Texts in both languages: `src/data/i18n.ts`
- Splatfest color pairs: `src/data/theme.ts`
