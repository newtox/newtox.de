import { mulberry32 } from './rng'
import { state, type Team } from './theme'

type Splat = { x: number; y: number; r: number; team: Team; seed: number; drops: boolean }

const COLS = 72
const MAX = 900

export function mountInk(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  let splats: Splat[] = []
  let w = 0
  let h = 0
  let rows = 40
  let grid = new Uint8Array(0)
  let down = false
  let last = { x: 0, y: 0 }
  let cover = { mine: 0, theirs: 0 }
  let lastActive = 0

  const colorOf = (team: Team) => (team === 0 ? state().a : state().b)

  function blob(x: number, y: number, r: number, rand: () => number, n: number, jag: number) {
    const pts: [number, number][] = []
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + rand() * 0.2
      const rr = r * (1 - jag + rand() * jag * 2)
      pts.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr])
    }
    const mid = (p: [number, number], q: [number, number]) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2] as const
    ctx!.beginPath()
    const start = mid(pts[n - 1], pts[0])
    ctx!.moveTo(start[0], start[1])
    for (let i = 0; i < n; i++) {
      const m = mid(pts[i], pts[(i + 1) % n])
      ctx!.quadraticCurveTo(pts[i][0], pts[i][1], m[0], m[1])
    }
    ctx!.closePath()
    ctx!.fill()
  }

  function draw(s: Splat) {
    const c = ctx!
    const rand = mulberry32(s.seed)
    const cx = s.x * w
    const cy = s.y * h
    const r = s.r
    c.fillStyle = colorOf(s.team)
    blob(cx, cy, r, rand, s.drops ? 18 : 10, s.drops ? 0.3 : 0.18)
    if (s.drops) {
      const n = 5 + Math.floor(rand() * 7)
      for (let i = 0; i < n; i++) {
        const a = rand() * Math.PI * 2
        const dist = r * (1.1 + rand() * 1.4)
        const dr = r * (0.06 + rand() * 0.16)
        const steps = 3 + Math.floor(rand() * 4)
        for (let k = 0; k <= steps; k++) {
          const t = k / steps
          const d = r * 0.7 + (dist - r * 0.7) * t
          const rad = dr * (0.35 + 0.65 * t) * (k === steps ? 1.4 : 1)
          c.beginPath()
          c.arc(cx + Math.cos(a) * d, cy + Math.sin(a) * d, rad, 0, Math.PI * 2)
          c.fill()
        }
      }
      if (rand() < 0.6) {
        const dx = cx + (rand() - 0.5) * r
        const len = r * (0.6 + rand() * 1.2)
        const dw = r * (0.1 + rand() * 0.08)
        c.beginPath()
        c.roundRect(dx - dw / 2, cy, dw, r * 0.6 + len, dw / 2)
        c.fill()
        c.beginPath()
        c.arc(dx, cy + r * 0.6 + len, dw * 0.9, 0, Math.PI * 2)
        c.fill()
      }
    }
    c.save()
    c.globalAlpha = 0.22
    c.fillStyle = '#ffffff'
    blob(cx - r * 0.3, cy - r * 0.32, r * 0.28, rand, 8, 0.25)
    c.restore()
    mark(s)
  }

  function mark(s: Splat) {
    const cell = w / COLS
    const cx = s.x * w
    const cy = s.y * h
    const rr = s.r * (s.drops ? 1.05 : 0.9)
    const c0 = Math.max(0, Math.floor((cx - rr) / cell))
    const c1 = Math.min(COLS - 1, Math.floor((cx + rr) / cell))
    const r0 = Math.max(0, Math.floor((cy - rr) / cell))
    const r1 = Math.min(rows - 1, Math.floor((cy + rr) / cell))
    for (let r = r0; r <= r1; r++) {
      for (let c = c0; c <= c1; c++) {
        const px = (c + 0.5) * cell - cx
        const py = (r + 0.5) * cell - cy
        if (px * px + py * py <= rr * rr) grid[r * COLS + c] = s.team + 1
      }
    }
  }

  function report() {
    let a = 0
    let b = 0
    for (const v of grid) {
      if (v === 1) a++
      else if (v === 2) b++
    }
    const total = grid.length || 1
    const pa = (a / total) * 100
    const pb = (b / total) * 100
    const mine = state().team === 0 ? pa : pb
    const theirs = state().team === 0 ? pb : pa
    cover = { mine, theirs }
    window.dispatchEvent(new CustomEvent('ink:coverage', { detail: { mine, theirs } }))
  }

  function redrawAll() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    ctx!.setTransform(1, 0, 0, 1, 0, 0)
    ctx!.clearRect(0, 0, canvas.width, canvas.height)
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    grid = new Uint8Array(COLS * rows)
    for (const s of splats) draw(s)
    report()
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    w = window.innerWidth
    h = window.innerHeight
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    rows = Math.max(1, Math.round((COLS * h) / w))
    redrawAll()
  }

  function add(x: number, y: number, team: Team, big: boolean) {
    const base = Math.min(w, h)
    const r = big ? base * (0.045 + Math.random() * 0.05) : base * (0.012 + Math.random() * 0.01)
    const s: Splat = { x: x / w, y: y / h, r, team, seed: (Math.random() * 2 ** 32) >>> 0, drops: big }
    splats.push(s)
    if (team === state().team) lastActive = Date.now()
    if (splats.length > MAX) {
      splats = splats.slice(-MAX)
      redrawAll()
    } else {
      draw(s)
      report()
    }
  }

  const blocked = (t: EventTarget | null) =>
    t instanceof Element && !!t.closest('a, button, input, textarea, select, label, [data-no-ink]')

  window.addEventListener('pointerdown', (e) => {
    if (e.button !== 0 || blocked(e.target)) return
    const inPanel = e.target instanceof Element && !!e.target.closest('.panel')
    if (!inPanel) {
      down = true
      document.documentElement.classList.add('painting')
      window.getSelection()?.removeAllRanges()
    }
    last = { x: e.clientX, y: e.clientY }
    const team = state().team
    add(e.clientX, e.clientY, team, true)
    if (Math.random() < 0.6) {
      const enemy: Team = team === 0 ? 1 : 0
      setTimeout(() => add(Math.random() * w, Math.random() * h, enemy, true), 300 + Math.random() * 500)
    }
  })

  window.addEventListener('pointermove', (e) => {
    if (!down) return
    const dx = e.clientX - last.x
    const dy = e.clientY - last.y
    if (dx * dx + dy * dy < 22 * 22) return
    last = { x: e.clientX, y: e.clientY }
    add(e.clientX, e.clientY, state().team, false)
  })

  const up = () => {
    down = false
    document.documentElement.classList.remove('painting')
  }
  window.addEventListener('pointerup', up)
  window.addEventListener('pointercancel', up)

  window.addEventListener('ink:splat', (e) => {
    const d = (e as CustomEvent).detail as { x: number; y: number; team: Team; big: boolean }
    add(d.x, d.y, d.team, d.big)
  })

  window.addEventListener('ink:wipe', () => {
    splats = []
    redrawAll()
  })

  window.addEventListener('theme:change', redrawAll)

  let t: ReturnType<typeof setTimeout>
  window.addEventListener('resize', () => {
    clearTimeout(t)
    t = setTimeout(resize, 120)
  })

  setInterval(() => {
    if (Date.now() - lastActive > 4000) return
    if (cover.theirs >= cover.mine * 0.9) return
    const enemy: Team = state().team === 0 ? 1 : 0
    add(Math.random() * w, Math.random() * h, enemy, true)
  }, 600)

  resize()
}
