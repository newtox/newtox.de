import * as si from 'simple-icons'

export type Icon = { path: string; hex: string; title: string }

const fallback: Icon = {
  title: 'Package',
  hex: 'cccccc',
  path: 'M12 1.5 2 6.75v10.5L12 22.5l10-5.25V6.75L12 1.5Zm0 2.26 7.36 3.86L12 11.48 4.64 7.62 12 3.76ZM4 9.32l7 3.67v7.06l-7-3.67V9.32Zm9 10.73v-7.06l7-3.67v7.06l-7 3.67Z',
}

const windows: Icon = {
  title: 'Windows',
  hex: '0078D4',
  path: 'M0 3.45 9.83 2.1v9.48H0V3.45Zm0 17.1 9.83 1.35v-9.36H0v8.01Zm10.92 1.5L24 24V12.54H10.92v9.51Zm0-19.98v9.6H24V0L10.92 2.07Z',
}

export function icon(name: string): Icon {
  if (name === 'windows') return windows
  const key = 'si' + name.charAt(0).toUpperCase() + name.slice(1)
  return (si as unknown as Record<string, Icon | undefined>)[key] ?? fallback
}
