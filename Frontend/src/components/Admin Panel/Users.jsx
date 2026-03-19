import React, { useState, useEffect, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import adminApi from '../../utils/adminApi';
import s from './AdminPanel.module.css';

const AV_COLORS = ['#f97316','#3b82f6','#10b981','#a855f7','#fbbf24','#ef4444'];

const MOCK_USERS = Array.from({ length: 10 }, (_, i) => ({
  _id: String(i + 1),
  name: ['Ananya Sharma','Rohan Kumar','Priya Singh','Aman Mishra','Sneha Kaur',
         'Vikram Patel','Riya Joshi','Arjun Gupta','Neha Yadav','Karan Mehta'][i],
  email: `student${i + 1}@email.com`,
  department: ['CSE','IT','ECE','MBA','Mech','Civil'][i % 6],
  isBlocked: i === 3 || i === 8,
  blockReason: i === 3 ? 'Spam activity' : i === 8 ? 'Inappropriate behavior' : '',
  visitCount: Math.floor(Math.random() * 50 + 5),
  totalVisitTime: Math.floor(Math.random() * 7200 + 600),
  lastSeen: new Date(Date.now() - Math.random() * 7 * 86400000),
}));

const fmtTime = s => {
  const m = Math.floor(s / 60);
  return m > 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m}m`;
};

export default function Users() {
  const { showToast } = useOutletContext();

  const [users,       setUsers]       = useState([]);
  const [search,      setSearch]      = useState('');
  const [filter,      setFilter]      = useState('all');
  const [modal,       setModal]       = useState(null);
  const [reason,      setReason]      = useState('');
  const [loading,     setLoading]     = useState(true);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const r = await adminApi.get('/api/users', {
        params: {
          search,
          blocked: filter === 'blocked' ? 'true' : undefined
        }
      });
      setUsers(r.data);
    } catch {
      setUsers(MOCK_USERS);
    } finally {
      setLoading(false);
    }
  }, [search, filter]);

  useEffect(() => { loadUsers(); }, [loadUsers]);

  const handleBlock = async () => {
    try {
      await adminApi.patch(`/api/users/${modal.user._id}/block`, { reason });
    } catch { /* offline — update locally */ }
    setUsers(prev => prev.map(u =>
      u._id === modal.user._id
        ? { ...u, isBlocked: true, blockReason: reason || 'Blocked by admin' }
        : u
    ));
    showToast(`🚫 ${modal.user.name} blocked`, 'e');
    setModal(null);
    setReason('');
  };

  const handleUnblock = async () => {
    try {
      await adminApi.patch(`/api/users/${modal.user._id}/unblock`);
    } catch { /* offline — update locally */ }
    setUsers(prev => prev.map(u =>
      u._id === modal.user._id
        ? { ...u, isBlocked: false, blockReason: '' }
        : u
    ));
    showToast(`✅ ${modal.user.name} unblocked`, 's');
    setModal(null);
  };

  const filtered = users.filter(u => {
    if (filter === 'blocked') return u.isBlocked;
    if (filter === 'active')  return !u.isBlocked;
    return true;
  }).filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const total   = users.length;
  const blocked = users.filter(u => u.isBlocked).length;
  const active  = total - blocked;

  return (
    <>
      {/* Stat Cards */}
      <div className={`${s.statGrid} ${s.statGrid3}`}>
        <div className={`${s.statCard} ${s.scBlue}`}>
          <div className={s.statLabel}>Total Students</div>
          <div className={s.statValue}>{total}</div>
        </div>
        <div className={`${s.statCard} ${s.scGreen}`}>
          <div className={s.statLabel}>Active</div>
          <div className={s.statValue}>{active}</div>
        </div>
        <div className={`${s.statCard} ${s.scOrange}`}>
          <div className={s.statLabel}>Blocked</div>
          <div className={s.statValue} style={{ color: 'var(--red)' }}>{blocked}</div>
        </div>
      </div>

      {/* Table */}
      <div className={s.card}>
        <div className={s.cardH}>
          <span className={s.cardTitle}>👥 All Students</span>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <div className={s.searchBox}>
              <span>🔍</span>
              <input placeholder="Search name or email…"
                value={search}
                onChange={e => setSearch(e.target.value)} />
            </div>
            {['all', 'active', 'blocked'].map(f => (
              <button key={f}
                className={`${s.tab} ${filter === f ? s.tabActive : ''}`}
                onClick={() => setFilter(f)}
                style={{ textTransform: 'capitalize' }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className={s.tableWrap}>
          {loading ? (
            <div className={s.spinner} />
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Student</th>
                  <th>Department</th>
                  <th>Visits</th>
                  <th>Time Spent</th>
                  <th>Last Seen</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, i) => (
                  <tr key={u._id}>
                    <td style={{ color: 'var(--muted)', fontWeight: 600 }}>#{i + 1}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 34, height: 34, borderRadius: '50%',
                          background: AV_COLORS[i % 6],
                          display: 'flex', alignItems: 'center',
                          justifyContent: 'center', fontWeight: 700,
                          fontSize: '.78rem', color: '#fff', flexShrink: 0,
                          textTransform: 'uppercase'
                        }}>
                          {u.name?.slice(0, 2)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 500, fontSize: '.87rem' }}>{u.name}</div>
                          <div style={{ color: 'var(--muted)', fontSize: '.72rem' }}>{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`${s.pill} ${s.pillBlue}`}>{u.department || 'N/A'}</span>
                    </td>
                    <td style={{ color: 'var(--text2)' }}>{u.visitCount || 0}</td>
                    <td style={{ color: 'var(--text2)' }}>{fmtTime(u.totalVisitTime || 0)}</td>
                    <td style={{ color: 'var(--muted)', fontSize: '.8rem' }}>
                      {new Date(u.lastSeen).toLocaleDateString('en-IN')}
                    </td>
                    <td>
                      {u.isBlocked
                        ? <span className={`${s.pill} ${s.pillRed}`}>🚫 Blocked</span>
                        : <span className={`${s.pill} ${s.pillGreen}`}>✅ Active</span>
                      }
                    </td>
                    <td>
                      {u.isBlocked ? (
                        <button className={`${s.btn} ${s.btnG} ${s.btnSm}`}
                          onClick={() => setModal({ type: 'unblock', user: u })}>
                          ✅ Unblock
                        </button>
                      ) : (
                        <button className={`${s.btn} ${s.btnD} ${s.btnSm}`}
                          onClick={() => setModal({ type: 'block', user: u })}>
                          🚫 Block
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!loading && filtered.length === 0 && (
            <div className={s.empty}>
              <div className={s.emptyIcon}>👤</div>
              <p>No students found</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Block/Unblock Modal ── */}
      {modal && (
        <div className={s.modalOv}
          onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className={s.modal}>

            {modal.type === 'block' ? (
              <>
                <div className={s.modalTitle}>🚫 Block Student</div>
                <p style={{ color: 'var(--text2)', fontSize: '.87rem', marginBottom: 16 }}>
                  Are you sure you want to block{' '}
                  <strong style={{ color: 'var(--text)' }}>{modal.user.name}</strong>?
                  They won't be able to login.
                </p>
                <div className={s.fg}>
                  <label className={s.fl}>Reason for blocking</label>
                  <textarea className={s.fta}
                    placeholder="e.g. Spam activity, Inappropriate behavior…"
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    style={{ minHeight: 80 }} />
                </div>
                <div className={s.modalFooter}>
                  <button className={`${s.btn} ${s.btnS}`} onClick={() => setModal(null)}>
                    Cancel
                  </button>
                  <button className={`${s.btn} ${s.btnD}`} onClick={handleBlock}>
                    🚫 Block User
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className={s.modalTitle}>✅ Unblock Student</div>
                <p style={{ color: 'var(--text2)', fontSize: '.87rem', marginBottom: 16 }}>
                  Unblock{' '}
                  <strong style={{ color: 'var(--text)' }}>{modal.user.name}</strong>?
                  They will regain full access.
                </p>
                {modal.user.blockReason && (
                  <div style={{
                    background: 'var(--redDim)',
                    border: '1px solid rgba(239,68,68,.2)',
                    borderRadius: 10, padding: '10px 14px',
                    fontSize: '.82rem', color: 'var(--red)', marginBottom: 16
                  }}>
                    Block reason: {modal.user.blockReason}
                  </div>
                )}
                <div className={s.modalFooter}>
                  <button className={`${s.btn} ${s.btnS}`} onClick={() => setModal(null)}>
                    Cancel
                  </button>
                  <button className={`${s.btn} ${s.btnG}`} onClick={handleUnblock}>
                    ✅ Unblock User
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </>
  );
}