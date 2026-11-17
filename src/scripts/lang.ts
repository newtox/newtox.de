import { dict, type Key } from '../data/i18n'

export type Lang = 'en' | 'de'

export function lang(): Lang {
  return document.documentElement.lang === 'de' ? 'de' : 'en'
}

export function toggleLang() {
  const next: Lang = lang() === 'en' ? 'de' : 'en'
  document.documentElement.lang = next
  try {
    localStorage.setItem('lang', next)
  } catch {}
  window.dispatchEvent(new CustomEvent('lang:change'))
}

export function bi(key: Key) {
  const wrap = document.createElement('span')
  for (const l of ['en', 'de'] as const) {
    const s = document.createElement('span')
    s.dataset.l = l
    s.textContent = dict[l][key]
    wrap.append(s)
  }
  return wrap
}
