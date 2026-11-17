export type Project = {
  name: string
  repo: string
  url?: string
  tag: { en: string; de: string }
  desc: { en: string; de: string }
  main: string
  sub: string
  special: string
  icon: string
}

export const projects: Project[] = [
  {
    name: 'Hearth',
    repo: 'https://github.com/newtox/hearth',
    tag: { en: 'Chat platform', de: 'Chat-Plattform' },
    desc: {
      en: 'Self-hosted chat with servers, roles, DMs, group chats, voice and screen sharing. Browser, Windows, Linux and Android.',
      de: 'Selbst gehosteter Chat mit Servern, Rollen, DMs, Gruppen, Voice und Screenshare. Browser, Windows, Linux und Android.',
    },
    main: 'Rust · Axum',
    sub: 'Svelte 5',
    special: 'Tauri 2 · LiveKit',
    icon: 'rust',
  },
  {
    name: 'Shiori',
    repo: 'https://github.com/newtox/Toxbot',
    tag: { en: 'Discord bot', de: 'Discord-Bot' },
    desc: {
      en: 'Discord bot with roleplay, generators and server setup, plus a web dashboard that changes settings live.',
      de: 'Discord-Bot mit Roleplay, Generatoren und Server-Setup, dazu ein Web-Dashboard, das Einstellungen live ändert.',
    },
    main: 'Dart · nyxx',
    sub: 'Laravel · Livewire',
    special: 'MySQL',
    icon: 'dart',
  },
  {
    name: 'Coonstagram',
    repo: 'https://github.com/newtox/coonstagram',
    tag: { en: 'Social feed', de: 'Social Feed' },
    desc: {
      en: 'Fan-made social media clone with feed, likes, threaded comments, follows and moderation tools.',
      de: 'Fan-Projekt eines Social-Media-Klons mit Feed, Likes, verschachtelten Kommentaren, Follows und Moderation.',
    },
    main: 'Laravel 12',
    sub: 'Alpine.js',
    special: 'Tailwind CSS',
    icon: 'laravel',
  },
  {
    name: 'graf-cedric.de',
    repo: 'https://github.com/newtox/graf-cedric.de',
    url: 'https://graf-cedric.de',
    tag: { en: 'Game management', de: 'Spieleverwaltung' },
    desc: {
      en: 'Game management app with roles, permissions and an admin area in a retro pixel-art theme.',
      de: 'Spieleverwaltung mit Rollen, Rechten und Admin-Bereich im Retro-Pixel-Art-Look.',
    },
    main: 'Laravel 13',
    sub: 'Alpine.js',
    special: 'Pixel-art UI',
    icon: 'php',
  },
]
