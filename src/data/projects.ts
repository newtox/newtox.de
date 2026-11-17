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
    name: 'newtox.de',
    repo: 'https://github.com/newtox/newtox.de',
    tag: { en: 'Personal website', de: 'Persönliche Website' },
    desc: {
      en: 'My personal website, the one you are looking at.',
      de: 'Meine persönliche Website, die du gerade siehst.',
    },
    main: 'Astro',
    sub: 'TypeScript',
    special: 'Canvas · Lanyard',
    icon: 'astro',
  },
  {
    name: 'Shiori',
    repo: 'https://github.com/newtox/shiori',
    tag: { en: 'Discord bot', de: 'Discord-Bot' },
    desc: {
      en: 'Discord bot with levels, credits, tickets, moderation and stream notifications, plus a web dashboard.',
      de: 'Discord-Bot mit Leveln, Credits, Tickets, Moderation und Stream-Benachrichtigungen, dazu ein Web-Dashboard.',
    },
    main: 'Dart · nyxx',
    sub: 'Laravel · Livewire',
    special: 'MySQL',
    icon: 'dart',
  },
  {
    name: 'graf-cedric.de',
    repo: 'https://github.com/newtox/graf-cedric.de',
    url: 'https://graf-cedric.de',
    tag: { en: 'Website', de: 'Website' },
    desc: {
      en: 'Website for Graf Cedric von Leuchtenberg with game management, roles and an admin area in a retro pixel-art look.',
      de: 'Website für Graf Cedric von Leuchtenberg mit Spieleverwaltung, Rollen und Admin-Bereich im Retro-Pixel-Art-Look.',
    },
    main: 'Laravel 13',
    sub: 'Alpine.js',
    special: 'Pixel-art UI',
    icon: 'laravel',
  },
  {
    name: 'Coonstagram',
    repo: 'https://github.com/newtox/coonstagram',
    tag: { en: 'Fan project', de: 'Fan-Projekt' },
    desc: {
      en: 'Coonstagram from South Park: The Fractured But Whole as a real social feed with likes, comments and follows.',
      de: 'Coonstagram aus South Park: Die rektakuläre Zerreißprobe als echter Social Feed mit Likes, Kommentaren und Follows.',
    },
    main: 'Laravel 12',
    sub: 'Alpine.js',
    special: 'Tailwind CSS',
    icon: 'php',
  },
  {
    name: 'wa-admin-server',
    repo: 'https://github.com/newtox/wa-admin-server',
    tag: { en: 'WorkAdventure admin API', de: 'WorkAdventure-Admin-API' },
    desc: {
      en: 'Self-hosted admin API for WorkAdventure: live roles from OpenID Connect, saved wokas, cosmetics and personal rooms.',
      de: 'Selbst gehostete Admin-API für WorkAdventure: Live-Rollen über OpenID Connect, gespeicherte Wokas, Cosmetics und eigene Räume.',
    },
    main: 'TypeScript',
    sub: 'Node.js · SQLite',
    special: 'OpenID Connect',
    icon: 'typescript',
  },
  {
    name: 'Soundpad_Linux',
    repo: 'https://github.com/newtox/soundpad_linux',
    tag: { en: 'Soundboard', de: 'Soundboard' },
    desc: {
      en: 'Soundpad alternative for Linux with a virtual microphone, .spl import, EasyEffects support and colored categories.',
      de: 'Soundpad-Alternative für Linux mit virtuellem Mikrofon, .spl-Import, EasyEffects-Support und farbigen Kategorien.',
    },
    main: 'Python',
    sub: 'PySide6',
    special: 'PipeWire',
    icon: 'python',
  },
]
