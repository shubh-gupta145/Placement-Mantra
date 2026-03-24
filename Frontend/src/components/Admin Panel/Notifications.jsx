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
    frequency: 'once', sentTo: 'all',
    recipientIds: []
  });

  const [notifs,        setNotifs]        = useState([]);
  const [sending,       setSending]       = useState(false);
  const [filter,        setFilter]        = useState('all');
  const [stats,         setStats]         = useState({ total: 0, thisWeek: 0 });
  const [users,         setUsers]         = useState([]);  // ← saare students
  const [userSearch,    setUserSearch]    = useState('');  // ← search filter
  const [loadingUsers,  setLoadingUsers]  = useState(false);

  // ── Load notifications + stats ──
  const loadNotifs = async () => {
    try {
      const r = await adminApi.get('/api/notifications');
      setNotifs(r.data);
    } catch {
      setNotifs([]);
    }
  };

  const loadStats = async () => {
    try {
      const r = await adminApi.get('/api/notifications/stats');
      setStats(r.data);
    } catch {
      setStats({ total: 0, thisWeek: 0 });
    }
  };

  // ── Load users jab Specific Users select karo ──
  const loadUsers = async () => {
    if (users.length > 0) return; // Already loaded
    setLoadingUsers(true);
    try {
      const r = await adminApi.get('/api/users');
      setUsers(r.data?.data || r.data || []);
    } catch {
      setUsers([]);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    loadNotifs();
    loadStats();
  }, []);

  // ── Jab sentTo change ho ──
  const handleSentToChange = (val) => {
    setForm({ ...form, sentTo: val, recipientIds: [] });
    if (val === 'specific') loadUsers();
  };

  // ── User select/deselect karo ──
  const toggleUser = (userId) => {
    setForm(prev => ({
      ...prev,
      recipientIds: prev.recipientIds.includes(userId)
        ? prev.recipientIds.filter(id => id !== userId)
        : [...prev.recipientIds, userId]
    }));
  };

  // ── Select All / Deselect All ──
  const toggleAll = () => {
    const filtered = filteredUsers();
    const allSelected = filtered.every(u =>
      form.recipientIds.includes(u._id)
    );
    if (allSelected) {
      setForm(prev => ({
        ...prev,
        recipientIds: prev.recipientIds.filter(
          id => !filtered.map(u => u._id).includes(id)
        )
      }));
    } else {
      const newIds = filtered.map(u => u._id);
      setForm(prev => ({
        ...prev,
        recipientIds: [...new Set([...prev.recipientIds, ...newIds])]
      }));
    }
  };

  const filteredUsers = () => {
    return users.filter(u =>
      u.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email?.toLowerCase().includes(userSearch.toLowerCase())
    );
  };

  const handleSend = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.message.trim()) {
      showToast('❌ Title aur message dono bharo', 'e');
      return;
    }

    if (form.sentTo === 'specific' && form.recipientIds.length === 0) {
      showToast('❌ Kam se kam ek user select karo', 'e');
      return;
    }

    setSending(true);
    try {
      await adminApi.post('/api/notifications/send', {
        title:        form.title,
        message:      form.message,
        type:         form.type,
        frequency:    form.frequency,
        sentTo:       form.sentTo,
        recipientIds: form.sentTo === 'specific' ? form.recipientIds : []
      });

      const count = form.sentTo === 'all'
        ? 'all students'
        : `${form.recipientIds.length} student(s)`;

      showToast(`🚀 Notification sent to ${count}!`, 's');
      setForm({
        title: '', message: '', type: 'general',
        frequency: 'once', sentTo: 'all', recipientIds: []
      });
      setUserSearch('');
      loadNotifs();
      loadStats();
    } catch (err) {
      showToast('❌ Failed to send. Try again.', 'e');
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

              {/* Title */}
              <div className={s.fg}>
                <label className={s.fl}>Notification Title</label>
                <input className={s.fi}
                  placeholder="e.g. New Mock Interview Round Added"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })} />
              </div>

              {/* Message */}
              <div className={s.fg}>
                <label className={s.fl}>Message</label>
                <textarea className={s.fta}
                  placeholder="Write your message here…"
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })} />
              </div>

              {/* Type + Frequency */}
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

              {/* Send To */}
              <div className={s.fg}>
                <label className={s.fl}>Send To</label>
                <select className={s.fs}
                  value={form.sentTo}
                  onChange={e => handleSentToChange(e.target.value)}>
                  <option value="all">All Students</option>
                  <option value="specific">Specific Users</option>
                </select>
              </div>

              {/* ── Specific Users List ── */}
              {form.sentTo === 'specific' && (
                <div className={s.fg}>
                  <label className={s.fl}>
                    Select Students
                    {form.recipientIds.length > 0 && (
                      <span style={{
                        marginLeft: 8,
                        background: 'var(--accentDim)',
                        color: 'var(--accent)',
                        padding: '2px 8px',
                        borderRadius: 10,
                        fontSize: '.72rem',
                        fontWeight: 600,
                      }}>
                        {form.recipientIds.length} selected
                      </span>
                    )}
                  </label>

                  {/* Search box */}
                  <input
                    className={s.fi}
                    placeholder="🔍 Search by name or email…"
                    value={userSearch}
                    onChange={e => setUserSearch(e.target.value)}
                    style={{ marginBottom: 8 }}
                  />

                  {/* Select All button */}
                  {filteredUsers().length > 0 && (
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 8,
                      padding: '4px 0',
                    }}>
                      <span style={{
                        fontSize: '.75rem',
                        color: 'var(--muted)'
                      }}>
                        {filteredUsers().length} students found
                      </span>
                      <button
                        type="button"
                        onClick={toggleAll}
                        className={`${s.btn} ${s.btnS} ${s.btnSm}`}
                      >
                        {filteredUsers().every(u =>
                          form.recipientIds.includes(u._id))
                          ? '☐ Deselect All'
                          : '☑ Select All'
                        }
                      </button>
                    </div>
                  )}

                  {/* Users list */}
                  <div style={{
                    maxHeight: 220,
                    overflowY: 'auto',
                    border: '1px solid var(--border2)',
                    borderRadius: 10,
                    background: 'var(--card2)',
                  }}>
                    {loadingUsers ? (
                      <div style={{
                        textAlign: 'center',
                        padding: '20px',
                        color: 'var(--muted)',
                        fontSize: '.84rem'
                      }}>
                        ⏳ Loading users...
                      </div>
                    ) : filteredUsers().length === 0 ? (
                      <div style={{
                        textAlign: 'center',
                        padding: '20px',
                        color: 'var(--muted)',
                        fontSize: '.84rem'
                      }}>
                        No students found
                      </div>
                    ) : (
                      filteredUsers().map(u => {
                        const isSelected = form.recipientIds.includes(u._id);
                        return (
                          <div
                            key={u._id}
                            onClick={() => toggleUser(u._id)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 12,
                              padding: '10px 14px',
                              cursor: 'pointer',
                              borderBottom: '1px solid var(--border)',
                              background: isSelected
                                ? 'rgba(249,115,22,0.08)'
                                : 'transparent',
                              transition: 'background .15s',
                            }}
                          >
                            {/* Checkbox */}
                            <div style={{
                              width: 18, height: 18,
                              borderRadius: 5,
                              border: `2px solid ${isSelected
                                ? 'var(--accent)'
                                : 'var(--border2)'}`,
                              background: isSelected
                                ? 'var(--accent)'
                                : 'transparent',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              transition: 'all .15s',
                            }}>
                              {isSelected && (
                                <span style={{
                                  color: '#fff',
                                  fontSize: '.65rem',
                                  fontWeight: 700
                                }}>✓</span>
                              )}
                            </div>

                            {/* Avatar */}
                            <div style={{
                              width: 32, height: 32,
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#fff',
                              fontWeight: 700,
                              fontSize: '.78rem',
                              flexShrink: 0,
                            }}>
                              {u.name?.[0]?.toUpperCase() || '?'}
                            </div>

                            {/* Info */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{
                                fontSize: '.84rem',
                                fontWeight: 500,
                                color: isSelected
                                  ? 'var(--accent)'
                                  : 'var(--text)',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}>
                                {u.name}
                              </div>
                              <div style={{
                                fontSize: '.72rem',
                                color: 'var(--muted)',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}>
                                {u.email}
                              </div>
                            </div>

                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}

              {/* Send Button */}
              <button
                className={`${s.btn} ${s.btnP}`}
                type="submit"
                style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}
                disabled={sending}
              >
                {sending ? '⏳ Sending…' : (
                  form.sentTo === 'specific'
                    ? `🚀 Send to ${form.recipientIds.length} Student(s)`
                    : '🚀 Send to All Students'
                )}
              </button>

            </form>
          </div>
        </div>

        {/* ── Right Side ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Stats */}
          <div className={s.card} style={{ marginBottom: 0 }}>
            <div className={s.cardH}>
              <span className={s.cardTitle}>📊 Overview</span>
            </div>
            <div className={s.cardB}>
              {[
                { label: 'Total Sent', value: stats.total,    color: 'var(--accent)' },
                { label: 'This Week',  value: stats.thisWeek, color: 'var(--blue)'   },
                { label: 'Recurring',  value: notifs.filter(n => n.frequency !== 'once').length, color: 'var(--green)' },
              ].map(item => (
                <div key={item.label} style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', padding: '10px 0',
                  borderBottom: '1px solid var(--border)'
                }}>
                  <span style={{ color: 'var(--text2)', fontSize: '.85rem' }}>
                    {item.label}
                  </span>
                  <span style={{
                    fontFamily: 'Syne,sans-serif', fontWeight: 700,
                    color: item.color, fontSize: '1.2rem'
                  }}>
                    {item.value}
                  </span>
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

          {/* Auto Schedule */}
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
                    <div style={{ fontSize: '.84rem', fontWeight: 500 }}>
                      {item.freq}
                    </div>
                    <div style={{ fontSize: '.73rem', color: 'var(--muted)' }}>
                      {item.desc}
                    </div>
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
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
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
                background: n.type === 'alert'    ? 'var(--redDim)'    :
                            n.type === 'reminder' ? 'var(--accentDim)' :
                            n.type === 'update'   ? 'var(--greenDim)'  : 'var(--blueDim)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '1.2rem'
              }}>
                {TYPE_ICON[n.type]}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', marginBottom: 5,
                  flexWrap: 'wrap', gap: 6
                }}>
                  <span style={{ fontWeight: 600, fontSize: '.88rem' }}>
                    {n.title}
                  </span>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <span className={`${s.pill} ${TYPE_PILL[n.type]}`}>
                      {n.type}
                    </span>
                    <span className={`${s.pill} ${s.pillGray}`}>
                      {FREQ_LABEL[n.frequency] || n.frequency}
                    </span>
                    {n.sentTo === 'specific' && n.recipients?.length > 0 && (
                      <span className={`${s.pill} ${s.pillPurple}`}>
                        {n.recipients.length} users
                      </span>
                    )}
                  </div>
                </div>
                <p style={{
                  color: 'var(--text2)', fontSize: '.82rem', lineHeight: 1.4
                }}>
                  {n.message}
                </p>
                <div style={{
                  marginTop: 5, fontSize: '.72rem', color: 'var(--muted)'
                }}>
                  {new Date(n.createdAt).toLocaleDateString('en-IN')}
                  {n.sentTo === 'all' && (
                    <span style={{ marginLeft: 8, color: 'var(--green)' }}>
                      • Sent to all students
                    </span>
                  )}
                  {n.sentTo === 'specific' && (
                    <span style={{ marginLeft: 8, color: 'var(--purple)' }}>
                      • Sent to {n.recipients?.length || 0} specific students
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}