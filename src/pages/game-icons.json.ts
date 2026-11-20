type Detectable = { id: string; icon?: string | null }

export async function GET() {
  const icons: Record<string, string> = {}
  try {
    const res = await fetch('https://discord.com/api/v10/applications/detectable', {
      signal: AbortSignal.timeout(20000),
    })
    if (res.ok) {
      const apps = (await res.json()) as Detectable[]
      for (const app of apps) if (app.icon) icons[app.id] = app.icon
    }
  } catch {}
  return new Response(JSON.stringify(icons), { headers: { 'Content-Type': 'application/json' } })
}
