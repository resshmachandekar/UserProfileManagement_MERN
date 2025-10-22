import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { isValidEmail } from '../utils/validation';

export default function LoginPage() {
  const [email, setEmail] = useState('demo@example.com');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setFieldError(null);
    if (!isValidEmail(email)) { setFieldError('Please enter a valid email'); return; }
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:4000/api/v1/auth/login', { email });
      const token = res.data.token;
      localStorage.setItem('token', token);
      navigate('/profile');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-container">
      <div className="card">
        <div className="header"><h1>Login</h1><div className="small-muted">Demo: demo@example.com</div></div>
        <form className="form" onSubmit={handleLogin} noValidate>
          <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
          {fieldError && <div style={{ color: 'red' }}>{fieldError}</div>}
          <div className="row">
            <button className="btn" disabled={loading}>{loading ? 'Logging...' : 'Login'}</button>
            <button className="btn secondary" type="button" onClick={() => { setEmail('demo@example.com'); }}>Use demo</button>
          </div>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
      </div>
    </div>
  );
}