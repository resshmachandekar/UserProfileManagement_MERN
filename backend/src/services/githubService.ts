import axios from 'axios';

type Repo = { id: number; name: string; html_url: string; description?: string };

const cache = new Map<string, { ts: number; data: Repo[] }>();
const TTL = Number(process.env.GITHUB_CACHE_TTL || 300) * 1000;

export async function fetchRepos(username: string, page = 1, per_page = 30): Promise<Repo[]> {
  const key = `${username}:${page}:${per_page}`;
  const now = Date.now();
  const cached = cache.get(key);
  if (cached && now - cached.ts < TTL) return cached.data;

  const url = `https://api.github.com/users/${encodeURIComponent(username)}/repos`;
  const res = await axios.get(url, { params: { page, per_page, sort: 'pushed' } });
  const data = (res.data || []).map((r: any) => ({ id: r.id, name: r.name, html_url: r.html_url, description: r.description }));
  cache.set(key, { ts: now, data });
  return data;
}

export function clearCache() { cache.clear(); }
