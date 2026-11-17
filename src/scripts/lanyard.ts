import { DISCORD_ID } from '../data/socials'

export type Activity = {
  type: number
  name: string
  details?: string
  state?: string
  application_id?: string
  timestamps?: { start?: number; end?: number }
  assets?: { large_image?: string }
  emoji?: { name: string; id?: string }
}

export type Presence = {
  discord_user: { id: string; username: string; global_name?: string; avatar?: string }
  discord_status: 'online' | 'idle' | 'dnd' | 'offline'
  activities: Activity[]
  listening_to_spotify: boolean
  spotify: {
    song: string
    artist: string
    album_art_url: string
    track_id: string
    timestamps: { start: number; end: number }
  } | null
}

export function subscribe(onData: (p: Presence) => void) {
  let beat: ReturnType<typeof setInterval> | undefined
  let retry = 0

  fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`)
    .then((r) => r.json())
    .then((j) => j.success && onData(j.data))
    .catch(() => {})

  function connect() {
    let ws: WebSocket
    try {
      ws = new WebSocket('wss://api.lanyard.rest/socket')
    } catch {
      return
    }
    ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data)
      if (msg.op === 1) {
        clearInterval(beat)
        beat = setInterval(() => ws.send(JSON.stringify({ op: 3 })), msg.d.heartbeat_interval)
        ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: DISCORD_ID } }))
      } else if (msg.op === 0 && (msg.t === 'INIT_STATE' || msg.t === 'PRESENCE_UPDATE')) {
        retry = 0
        onData(msg.d)
      }
    }
    ws.onclose = () => {
      clearInterval(beat)
      if (retry++ > 5) return
      setTimeout(connect, 2000 * retry)
    }
  }

  connect()
}

export function activityImage(a: Activity) {
  const img = a.assets?.large_image
  if (!img) return null
  if (img.startsWith('mp:')) return `https://media.discordapp.net/${img.slice(3)}`
  if (img.startsWith('spotify:')) return `https://i.scdn.co/image/${img.slice(8)}`
  if (a.application_id) return `https://cdn.discordapp.com/app-assets/${a.application_id}/${img}.png`
  return null
}

export function clock(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = String(s % 60).padStart(2, '0')
  return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${sec}` : `${m}:${sec}`
}
