import React, { useState } from 'react';
import axios from 'axios';
import { isNonEmpty } from '../utils/validation';

export default function GithubPage() {
  const [username, setUsername] = useState('octocat');
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  async function fetch() {
    setLoading(true); setError(null);
    if (!isNonEmpty(username)) { setError('Please enter a GitHub username'); setLoading(false); return; }
    try {
      const res = await axios.get(`http://localhost:4000/api/v1/github/${encodeURIComponent(username)}?page=${page}&per_page=10`);
      setRepos(res.data.repos);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch');
    } finally { setLoading(false); }
  }

  return (
    <div className="app-container">
      <div className="card">
        <div className="header"><h1>GitHub Repos</h1><div className="small-muted">Search public repos</div></div>
        <div className="form">
          <input className="input" value={username} onChange={e => setUsername(e.target.value)} />
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <div className="row">
            <button className="btn" onClick={() => { setPage(1); fetch(); }}>Fetch</button>
            <div className="small-muted">Page {page}</div>
          </div>
          {loading && <div>Loading...</div>}
          <ul className="repo-list">
            {repos.map(r => (
              <li className="repo-item" key={r.id}>
                <a href={r.html_url} target='_blank' rel='noreferrer'>{r.name}</a>
                <div className="small-muted">{r.description}</div>
              </li>
            ))}
          </ul>
          <div className="row" style={{ marginTop: 12 }}>
            <button className="btn secondary" disabled={page <= 1} onClick={() => { setPage(p => p-1); fetch(); }}>Prev</button>
            <button className="btn secondary" onClick={() => { setPage(p => p+1); fetch(); }}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}