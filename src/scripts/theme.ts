import { pairs } from '../data/theme'

export type Team = 0 | 1

const root = () => document.documentElement

export function state() {
  const pair = Number(root().dataset.pair ?? 0)
  const team = (Number(root().dataset.team ?? 0) === 1 ? 1 : 0) as Team
  const p = pairs[pair] ?? pairs[0]
  return {
    pair,
    team,
    name: p.name,
    a: p.a,
    b: p.b,
    mine: team === 0 ? p.a : p.b,
    theirs: team === 0 ? p.b : p.a,
  }
}

export function apply(pair: number, team: Team) {
  const p = pairs[pair]
  const el = root()
  el.dataset.pair = String(pair)
  el.dataset.team = String(team)
  el.style.setProperty('--a', p.a)
  el.style.setProperty('--b', p.b)
  window.dispatchEvent(new CustomEvent('theme:change'))
}

export function swapTeam(x: number, y: number) {
  const s = state()
  apply(s.pair, s.team === 0 ? 1 : 0)
  window.dispatchEvent(new CustomEvent('team:wave', { detail: { x, y } }))
}

export function reroll() {
  const s = state()
  let next = s.pair
  while (next === s.pair) next = Math.floor(Math.random() * pairs.length)
  apply(next, s.team)
}

export function splat(x: number, y: number, team: Team = state().team, big = true) {
  window.dispatchEvent(new CustomEvent('ink:splat', { detail: { x, y, team, big } }))
}
