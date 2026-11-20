type Detectable = { id: string; icon?: string | null }

export async function GET() {
  const icons: Record<string, string> = {}
  try {
    const res = await fetch('https://discord.com/api/v10/applications/detectable', {
      headers: { 'User-Agent': 'newtox.de (https://newtox.de, 1.0)' },
      signal: AbortSignal.timeout(30000),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const apps = (await res.json()) as Detectable[]
    for (const app of apps) if (app.icon) icons[app.id] = app.icon
    console.log(`[discord] saved ${Object.keys(icons).length} game icons`)
  } catch (err) {
    console.warn('[discord] could not load game icons:', err)
  }
  return new Response(JSON.stringify(icons), { headers: { 'Content-Type': 'application/json' } })
}
