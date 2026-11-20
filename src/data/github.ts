export type Language = { name: string; color: string }

export type Repo = {
  name: string
  url: string
  homepage: string | null
  description: string | null
  stars: number
  topics: string[]
  languages: Language[]
  primary: string | null
}

const query = `query ($login: String!) {
  user(login: $login) {
    pinnedItems(first: 6, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name
          url
          homepageUrl
          description
          stargazerCount
          primaryLanguage { name }
          repositoryTopics(first: 20) { nodes { topic { name } } }
          languages(first: 3, orderBy: { field: SIZE, direction: DESC }) { nodes { name color } }
        }
      }
    }
  }
}`

type Node = {
  name: string
  url: string
  homepageUrl: string | null
  description: string | null
  stargazerCount: number
  primaryLanguage: { name: string } | null
  repositoryTopics: { nodes: { topic: { name: string } }[] }
  languages: { nodes: { name: string; color: string | null }[] }
}

const env = (globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env ?? {}

export async function pinnedRepos(login: string): Promise<Repo[]> {
  const token = import.meta.env.GITHUB_TOKEN ?? env.GITHUB_TOKEN
  if (!token) {
    console.warn('[github] GITHUB_TOKEN is not set, skipping pinned repositories')
    return []
  }
  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { login } }),
    })
    const json = await res.json()
    if (!res.ok || json.errors) throw new Error(JSON.stringify(json.errors ?? json))
    const nodes: Node[] = json.data?.user?.pinnedItems?.nodes ?? []
    return nodes.map((n) => ({
      name: n.name,
      url: n.url,
      homepage: n.homepageUrl || null,
      description: n.description,
      stars: n.stargazerCount,
      topics: n.repositoryTopics.nodes.map((t) => t.topic.name).sort((a, b) => a.localeCompare(b)),
      languages: n.languages.nodes.map((l) => ({ name: l.name, color: l.color ?? '#888888' })),
      primary: n.primaryLanguage?.name ?? null,
    }))
  } catch (err) {
    console.warn('[github] could not load pinned repositories:', err)
    return []
  }
}
