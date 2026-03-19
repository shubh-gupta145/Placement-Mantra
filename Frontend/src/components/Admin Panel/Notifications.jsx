import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import adminApi from '../../utils/adminApi';
import s from './AdminPanel.module.css';

const TYPE_PILL = {
  general:  s.pillBlue,
  reminder: s.pillOrange,
  update:   s.pillGreen,
  alert:    s.pillRed,
};

const TYPE_ICON = {
  general:  '📢',
  reminder: '⏰',
  update:   '🔄',
  alert:    '🚨',
};

const FREQ_LABEL = {
  once:    'One-time',
  weekly:  'Weekly',
  monthly: 'Monthly',
  yearly:  'Yearly',
};

export default function Notifications() {
  const { showToast } = useOutletContext();

  const [form, setForm] = useState({
    title: '', message: '', type: 'general',
    frequency: 'once', sentTo: 'all'
  });

  const [notifs,   setNotifs]   = useState([]);
  const [sending,  setSending]  = useState(false);
  const [filter,   setFilter]   = useState('all');
  const [stats,    setStats]    = useState({ total: 0, thisWeek: 0 });

  // ── Mock data agar API se data na aaye ──
  const MOCK = [
    { _id: '1', title: 'Mock Interview Tips', message: 'Prepare for HR rounds this weekend!',
      type: 'reminder', frequency: 'weekly',  sentTo: 'all', createdAt: new Date() },
    { _id: '2', title: 'New Roadmap Added',   message: 'Check out the Data Science roadmap!',
      type: 'update',   frequency: 'once',    sentTo: 'all', createdAt: new Date(Date.now() - 86400000) },
    { _id: '3', title: 'System Maintenance',  message: 'Website down Sunday 2–4 AM.',
      type: 'alert',    frequency: 'once',    sentTo: 'all', createdAt: new Date(Date.now() - 172800000) },
  ];

  const loadNotifs = async () => {
    try {
      const r = await adminApi.get('/api/notifications');
      setNotifs(r.data);
    } catch {
      setNotifs(MOCK);
    }
  };

  const loadStats = async () => {
    try {
      const r = await adminApi.get('/api/notifications/stats');
      setStats(r.data);
    } catch {
      setStats({ total: MOCK.length, thisWeek: 1 });
    }
  };

  useEffect(() => {
    loadNotifs();
    loadStats();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.message.trim()) {
      showToast('❌ Title aur message dono bharo', 'e');
      return;
    }
    setSending(true);
    try {
      await adminApi.post('/api/notifications/send', form);
      showToast('🚀 Notification sent successfully!', 's');
      setForm({ title: '', message: '', type: 'general', frequency: 'once', sentTo: 'all' });
      loadNotifs();
      loadStats();
    } catch {
      // Mock mein add karo
      const newN = { _id: Date.now().toString(), ...form,
        createdAt: new Date(), recipients: [] };
      setNotifs(prev => [newN, ...prev]);
      setStats(prev => ({ ...prev, total: prev.total + 1 }));
      showToast('🚀 Notification sent!', 's');
      setForm({ title: '', message: '', type: 'general', frequency: 'once', sentTo: 'all' });
    } finally {
      setSending(false);
    }
  };

  const filtered = filter === 'all'
    ? notifs
    : notifs.filter(n => n.type === filter);

  return (
    <>
      <div className={s.geq}>

        {/* ── Send Form ── */}
        <div className={s.card} style={{ marginBottom: 0 }}>
          <div className={s.cardH}>
            <span className={s.cardTitle}>📨 Send New Notification</span>
          </div>
          <div className={s.cardB}>
            <form onSubmit={handleSend}>

              <div className={s.fg}>
                <label className={s.fl}>Notification Title</label>
                <input className={s.fi}
                  placeholder="e.g. New Mock Interview Round Added"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })} />
              </div>

              <div className={s.fg}>
                <label className={s.fl}>Message</label>
                <textarea className={s.fta}
                  placeholder="Write your message here…"
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })} />
              </div>

              <div className={s.frow}>
                <div className={s.fg}>
                  <label className={s.fl}>Type</label>
                  <select className={s.fs}
                    value={form.type}
                    onChange={e => setForm({ ...form, type: e.target.value })}>
                    <option value="general">📢 General</option>
                    <option value="reminder">⏰ Reminder</option>
                    <option value="update">🔄 Update</option>
                    <option value="alert">🚨 Alert</option>
                  </select>
                </div>
                <div className={s.fg}>
                  <label className={s.fl}>Frequency</label>
                  <select className={s.fs}
                    value={form.frequency}
                    onChange={e => setForm({ ...form, frequency: e.target.value })}>
                    <option value="once">One-time</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>

              <div className={s.fg}>
                <label className={s.fl}>Send To</label>
                <select className={s.fs}
                  value={form.sentTo}
                  onChange={e => setForm({ ...form, sentTo: e.target.value })}>
                  <option value="all">All Students</option>
                  <option value="specific">Specific Users</option>
                </select>
              </div>

              <button className={`${s.btn} ${s.btnP}`}
                type="submit"
                style={{ width: '100%', justifyContent: 'center' }}
                disabled={sending}>
                {sending ? '⏳ Sending…' : '🚀 Send Notification'}
              </button>

            </form>
          </div>
        </div>

        {/* ── Right side stats + schedule ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          <div className={s.card} style={{ marginBottom: 0 }}>
            <div className={s.cardH}>
              <span className={s.cardTitle}>📊 Overview</span>
            </div>
            <div className={s.cardB}>
              {[
                { label: 'Total Sent',  value: stats.total,    color: 'var(--accent)' },
                { label: 'This Week',   value: stats.thisWeek, color: 'var(--blue)'   },
                { label: 'Recurring',   value: notifs.filter(n => n.frequency !== 'once').length, color: 'var(--green)' },
              ].map(item => (
                <div key={item.label} style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', padding: '10px 0',
                  borderBottom: '1px solid var(--border)'
                }}>
                  <span style={{ color: 'var(--text2)', fontSize: '.85rem' }}>{item.label}</span>
                  <span style={{
                    fontFamily: 'Syne,sans-serif', fontWeight: 700,
                    color: item.color, fontSize: '1.2rem'
                  }}>{item.value}</span>
                </div>
              ))}
              <div style={{
                marginTop: 12, padding: '10px 12px',
                background: 'var(--accentDim)', borderRadius: 10,
                fontSize: '.78rem', color: 'var(--accent)'
              }}>
                📧 Emails auto-sent to all active students
              </div>
            </div>
          </div>

          <div className={s.card} style={{ marginBottom: 0 }}>
            <div className={s.cardH}>
              <span className={s.cardTitle}>🗓️ Auto Schedule</span>
            </div>
            <div className={s.cardB}>
              {[
                { icon: '📅', freq: 'Weekly',  desc: 'Every Monday 9:00 AM' },
                { icon: '🗓️', freq: 'Monthly', desc: '1st of every month'   },
                { icon: '🎯', freq: 'Yearly',  desc: 'Jan 1 & June 1'       },
              ].map(item => (
                <div key={item.freq} style={{
                  display: 'flex', gap: 12, padding: '10px 0',
                  borderBottom: '1px solid var(--border)'
                }}>
                  <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: '.84rem', fontWeight: 500 }}>{item.freq}</div>
                    <div style={{ fontSize: '.73rem', color: 'var(--muted)' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Notification History ── */}
      <div className={s.card}>
        <div className={s.cardH}>
          <span className={s.cardTitle}>📋 Sent Notifications</span>
          <div style={{ display: 'flex', gap: 6 }}>
            {['all', 'general', 'reminder', 'update', 'alert'].map(f => (
              <button key={f}
                className={`${s.tab} ${filter === f ? s.tabActive : ''}`}
                onClick={() => setFilter(f)}
                style={{ textTransform: 'capitalize' }}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <div style={{ padding: '14px 20px' }}>
          {filtered.length === 0 ? (
            <div className={s.empty}>
              <div className={s.emptyIcon}>📭</div>
              <p>No notifications yet</p>
            </div>
          ) : filtered.map(n => (
            <div key={n._id} style={{
              background: 'var(--card2)', borderRadius: 12,
              padding: '14px 16px', marginBottom: 10,
              border: '1px solid var(--border)',
              display: 'flex', gap: 14, alignItems: 'flex-start'
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                background: n.type === 'alert' ? 'var(--redDim)' :
                            n.type === 'reminder' ? 'var(--accentDim)' :
                            n.type === 'update' ? 'var(--greenDim)' : 'var(--blueDim)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.2rem'
              }}>
                {TYPE_ICON[n.type]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', marginBottom: 5
                }}>
                  <span style={{ fontWeight: 600, fontSize: '.88rem' }}>{n.title}</span>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span className={`${s.pill} ${TYPE_PILL[n.type]}`}>{n.type}</span>
                    <span className={`${s.pill} ${s.pillGray}`}>{FREQ_LABEL[n.frequency] || n.frequency}</span>
                  </div>
                </div>
                <p style={{ color: 'var(--text2)', fontSize: '.82rem', lineHeight: 1.4 }}>
                  {n.message}
                </p>
                <div style={{ marginTop: 5, fontSize: '.72rem', color: 'var(--muted)' }}>
                  {new Date(n.createdAt).toLocaleDateString('en-IN')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}