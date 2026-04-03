import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminLogin() {
  const [form,    setForm]    = useState({ email: '', password: '' });
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // ── Direct axios use karo adminApi nahi ──
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/signin`,
        form
      );

      console.log("Login Response:", res.data); // Debug ke liye

      const { token, user, message } = res.data;

      // ── Pehle message check karo ──
      if (message === "User not found" || message === "Wrong Password") {
        setError(message);
        return;
      }

      // ── Role check karo ──
      if (!user || user.role !== 'admin') {
        setError('Admin access only. You are not an admin.');
        return;
      }

      // ── Token aur user save karo ──
      localStorage.setItem('pm_admin_token', token);
      localStorage.setItem('pm_admin_user', JSON.stringify(user));

      // ── Admin panel pe bhejo ──
      navigate('/admin');

    } catch (err) {
      console.error("Login Error:", err);
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Login failed. Check credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#090d18',
      fontFamily: 'DM Sans, sans-serif'
    }}>
      <div style={{ width: '100%', maxWidth: 420, padding: '0 20px' }}>

        {/* ── Logo ── */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            width: 60, height: 60,
            background: 'linear-gradient(135deg,#f97316,#fbbf24)',
            borderRadius: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.8rem', margin: '0 auto 14px'
          }}>🎯</div>
          <div style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800, fontSize: '1.4rem', color: '#e8edf8'
          }}>
            Placement<span style={{ color: '#f97316' }}>Mantra</span>
          </div>
          <div style={{ color: '#5a6a85', fontSize: '.8rem', marginTop: 4 }}>
            Admin Panel — Sign in to continue
          </div>
        </div>

        {/* ── Form Card ── */}
        <div style={{
          background: '#141c2e',
          border: '1px solid #1e2d45',
          borderRadius: 16, padding: 24
        }}>
          <form onSubmit={handle}>

            {/* Email */}
            <div style={{ marginBottom: 14 }}>
              <label style={{
                display: 'block', fontSize: '.78rem',
                color: '#a0aec0', marginBottom: 5, fontWeight: 500
              }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="admin@placementmantra.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
                style={{
                  width: '100%',
                  background: '#1a2340',
                  border: '1px solid #243350',
                  borderRadius: 9, padding: '9px 13px',
                  color: '#e8edf8',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '.85rem', outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 16 }}>
              <label style={{
                display: 'block', fontSize: '.78rem',
                color: '#a0aec0', marginBottom: 5, fontWeight: 500
              }}>
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
                style={{
                  width: '100%',
                  background: '#1a2340',
                  border: '1px solid #243350',
                  borderRadius: 9, padding: '9px 13px',
                  color: '#e8edf8',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '.85rem', outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div style={{
                color: '#ef4444', fontSize: '.82rem',
                marginBottom: 12,
                background: 'rgba(239,68,68,.1)',
                padding: '8px 12px', borderRadius: 8
              }}>
                ⚠️ {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: loading ? '#666' : '#f97316',
                color: '#fff', border: 'none',
                borderRadius: 9, padding: '11px',
                fontSize: '.9rem', fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'DM Sans, sans-serif',
                transition: 'background .2s'
              }}>
              {loading ? '⏳ Signing in…' : '🔐 Sign In'}
            </button>

          </form>
        </div>

        <div style={{
          textAlign: 'center', marginTop: 16,
          color: '#5a6a85', fontSize: '.75rem'
        }}>
          Placement Mantra © 2026 — Guidance for Students
        </div>

      </div>
    </div>
  );
}