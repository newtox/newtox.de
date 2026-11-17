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

## GitHub token

The projects section shows the repositories pinned on the GitHub profile. They are fetched once at build time through the GitHub GraphQL API, which needs a token. Without a token, or if GitHub cannot be reached, the build still works and the projects section is left out.

1. Create a fine-grained token at https://github.com/settings/personal-access-tokens with "Public repositories (read-only)" access and no extra permissions
2. Copy `.env.example` to `.env` and put the token in `GITHUB_TOKEN`

The token is only used during the build and never ends up on the website.

## Build

```bash
pnpm build
```

The static site is written to `dist/`. Serve that folder with Caddy or any static web server.

## Deployment

Every push to `main`, and once a day at night, a GitHub Action builds a Docker image with the finished site and pushes it to `ghcr.io/newtox/newtox.de`. The daily build picks up changes to the pinned repositories. Watchtower on the server pulls new images automatically.

The image only contains the static files and a small Caddy that serves them on port 80.

For the pinned repositories the Action uses the repository secret `PINNED_REPOS_TOKEN` if it exists, otherwise its own `GITHUB_TOKEN`.

On the server, start the container with `docker compose up -d` (see `docker-compose.yml`, it listens on `127.0.0.1:8085`) and point the main Caddy at it:

```
newtox.de {
	reverse_proxy 127.0.0.1:8085
}
```

## Editing content

- Projects: pin or unpin repositories on GitHub, then rebuild
- Tech stack: `src/data/gear.ts`
- Social links and Discord ID: `src/data/socials.ts`
- Texts in both languages: `src/data/i18n.ts`
- Splatfest color pairs: `src/data/theme.ts`
