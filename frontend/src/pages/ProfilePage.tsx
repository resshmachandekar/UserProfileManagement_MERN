import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { isValidEmail, isNonEmpty } from '../utils/validation';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const [profile, setProfile] = useState<{ name: string; email: string } | null>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: '', email: '' });
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/'); return; }
    axios.get('http://localhost:4000/api/v1/profile', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => { setProfile(res.data.profile); setForm(res.data.profile); })
      .catch((err: any) => {
        const msg = err.response?.data?.message || 'Failed to load profile';
        setServerError(msg);
        // If unauthorized or user not found, clear token and send back to login after short delay
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          setTimeout(() => navigate('/'), 800);
        }
      });
  }, [navigate]);

  function save() {
    setFieldError(null); setServerError(null);
    if (!isNonEmpty(form.name)) { setFieldError('Name is required'); return; }
    if (!isValidEmail(form.email)) { setFieldError('Invalid email'); return; }
    const token = localStorage.getItem('token');
    axios.put('http://localhost:4000/api/v1/profile', form, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => { setProfile(res.data.profile); setEditing(false); })
      .catch((err: any) => { setServerError(err.response?.data?.message || 'Failed to save'); });
  }

  if (!profile) {
    return (
      <div className="app-container">
        <div className="card">
          {serverError ? (
            <div>
              <div style={{ color: 'red', marginBottom: 12 }}>{serverError}</div>
              <div className="row">
                <button className="btn" onClick={() => { localStorage.removeItem('token'); navigate('/'); }}>Go to Login</button>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="card">
        <div className="header"><h1>Profile</h1><div /> </div>
        {editing ? (
          <div className="form">
            <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            {fieldError && <div style={{ color: 'red' }}>{fieldError}</div>}
            {serverError && <div style={{ color: 'red' }}>{serverError}</div>}
            <div className="row">
              <button className="btn" onClick={save}>Save</button>
              <button className="btn secondary" onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <div>
            <div className="profile-field"><strong>Name:</strong> {profile.name}</div>
            <div className="profile-field"><strong>Email:</strong> {profile.email}</div>
            <div className="row">
              <button className="btn" onClick={() => setEditing(true)}>Edit</button>
              <button className="btn secondary" onClick={() => { localStorage.removeItem('token'); window.location.href = '/'; }}>Logout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}