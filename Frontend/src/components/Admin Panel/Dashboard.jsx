import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, CartesianGrid
} from 'recharts';
import adminApi from '../../utils/adminApi';
import s from './AdminPanel.module.css';

const COLORS = ['#f97316','#3b82f6','#10b981','#a855f7','#fbbf24','#ef4444','#06b6d4','#ec4899','#14b8a6','#8b5cf6'];

const SENT_COLOR = {
  positive: '#10b981',
  neutral:  '#fbbf24',
  negative: '#ef4444'
};

const fLabel = f => (f || '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

const TOOLTIP_STYLE = {
  backgroundColor: '#141c2e',
  border: '1px solid #243350',
  borderRadius: 10,
  fontSize: 12,
  color: '#e8edf8'
};

export default function Dashboard() {
  const [overview,   setOverview]   = useState(null);
  const [features,   setFeatures]   = useState([]);
  const [sentiment,  setSentiment]  = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [notifStats, setNotifStats] = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(false);
      try {
        const [ov, ft, fb, att, ns] = await Promise.all([
          adminApi.get('/api/analytics/overview'),
          adminApi.get('/api/analytics/features'),
          adminApi.get('/api/feedback/analysis'),
          adminApi.get('/api/attendance/daily?days=14'),
          adminApi.get('/api/notifications/stats'),
        ]);

        setOverview(ov.data);
        setFeatures(ft.data.slice(0, 6));
        setSentiment(fb.data.sentimentCounts || []);
        setAttendance(att.data);
        setNotifStats(ns.data);

      } catch (err) {
        console.error("Dashboard API Error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className={s.spinner} />;

  if (error) return (
    <div style={{
      textAlign: 'center', padding: '60px 20px', color: 'var(--muted)'
    }}>
      <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>⚠️</div>
      <p style={{ fontSize: '1rem', marginBottom: 8 }}>API se data load nahi hua</p>
      <p style={{ fontSize: '.85rem' }}>Backend chalu hai? <code>npm run dev</code></p>
      <button
        onClick={() => window.location.reload()}
        style={{
          marginTop: 16, padding: '8px 20px',
          background: 'var(--accent)', color: '#fff',
          border: 'none', borderRadius: 8, cursor: 'pointer'
        }}
      >
        🔄 Retry
      </button>
    </div>
  );

  // ── Real data — 0 default ──
  const ov = {
    totalUsers:         overview?.totalUsers         ?? 0,
    activeToday:        overview?.activeToday        ?? 0,
    activeUsers:        overview?.activeUsers        ?? 0,
    totalFeatureVisits: overview?.totalFeatureVisits ?? 0,
    topFeature:         overview?.topFeature         ?? 'N/A',
    blockedUsers:       overview?.blockedUsers       ?? 0,
  };

  const ns = {
    total:    notifStats?.total    ?? 0,
    thisWeek: notifStats?.thisWeek ?? 0,
  };

  const fData = features;
  const aData = attendance;
  const sData = sentiment;

  const engagementRate = ov.totalUsers > 0
    ? Math.round((ov.activeToday / ov.totalUsers) * 100)
    : 0;

  return (
    <>
      {/* ── Stat Cards ── */}
      <div className={s.statGrid}>
        <div className={`${s.statCard} ${s.scOrange}`}>
          <div className={s.statLabel}>Total Students</div>
          <div className={s.statValue}>{ov.totalUsers.toLocaleString()}</div>
          <div className={s.statDelta}>
            ▲ Active: {ov.activeUsers.toLocaleString()}
          </div>
        </div>

        <div className={`${s.statCard} ${s.scBlue}`}>
          <div className={s.statLabel}>Active Today</div>
          <div className={s.statValue}>{ov.activeToday}</div>
          <div className={s.statDelta}>▲ Online now</div>
        </div>

        <div className={`${s.statCard} ${s.scGreen}`}>
          <div className={s.statLabel}>Feature Visits</div>
          <div className={s.statValue}>{ov.totalFeatureVisits.toLocaleString()}</div>
          <div className={s.statDelta}>▲ Top: {fLabel(ov.topFeature)}</div>
        </div>

        <div className={`${s.statCard} ${s.scPurple}`}>
          <div className={s.statLabel}>Notifications Sent</div>
          <div className={s.statValue}>{ns.total}</div>
          <div className={s.statDelta}>▲ {ns.thisWeek} this week</div>
        </div>
      </div>

      {/* ── Attendance + Sentiment ── */}
      <div className={s.g2}>

        {/* Attendance Chart */}
        <div className={s.card} style={{ marginBottom: 0 }}>
          <div className={s.cardH}>
            <span className={s.cardTitle}>📅 Daily Attendance (Last 14 Days)</span>
          </div>
          <div className={s.cardB}>
            {aData.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--muted)' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>📭</div>
                <p style={{ fontSize: '.85rem' }}>Abhi koi attendance data nahi hai</p>
                <p style={{ fontSize: '.78rem', marginTop: 4 }}>Students login karenge toh data aayega</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={aData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e2d45" />
                  <XAxis
                    dataKey="_id"
                    tick={{ fill: '#5a6a85', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: '#5a6a85', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#3b82f6"
                    strokeWidth={2.5}
                    dot={{ fill: '#3b82f6', r: 3 }}
                    activeDot={{ r: 6 }}
                    name="Students"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Feedback Sentiment */}
        <div className={s.card} style={{ marginBottom: 0 }}>
          <div className={s.cardH}>
            <span className={s.cardTitle}>💬 Feedback Sentiment</span>
          </div>
          <div className={s.cardB} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {sData.length === 0 ? (
              <div style={{ textAlign: 'center', width: '100%', padding: '30px 0', color: 'var(--muted)' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>💬</div>
                <p style={{ fontSize: '.85rem' }}>Abhi koi feedback nahi hai</p>
              </div>
            ) : (
              <>
                <ResponsiveContainer width="55%" height={160}>
                  <PieChart>
                    <Pie
                      data={sData}
                      dataKey="count"
                      nameKey="_id"
                      cx="50%" cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                    >
                      {sData.map((item, i) => (
                        <Cell key={i} fill={SENT_COLOR[item._id] || COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={TOOLTIP_STYLE} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ flex: 1 }}>
                  {sData.map((item, i) => (
                    <div key={i} style={{ marginBottom: 12 }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 4
                      }}>
                        <span style={{
                          fontSize: '.8rem',
                          textTransform: 'capitalize',
                          color: '#a0aec0'
                        }}>
                          {item._id}
                        </span>
                        <span style={{
                          fontWeight: 700,
                          color: SENT_COLOR[item._id] || COLORS[i]
                        }}>
                          {item.count}
                        </span>
                      </div>
                      <div className={s.progTrack}>
                        <div className={s.progFill}
                          style={{
                            width: `${Math.round(
                              (item.count / sData.reduce((a, x) => a + x.count, 0)) * 100
                            )}%`,
                            background: SENT_COLOR[item._id] || COLORS[i]
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Feature Bar Chart ── */}
      <div className={s.card}>
        <div className={s.cardH}>
          <span className={s.cardTitle}>🔥 Most Used Features</span>
        </div>
        <div className={s.cardB}>
          {fData.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '40px 0', color: 'var(--muted)'
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>📊</div>
              <p style={{ fontSize: '.85rem' }}>Abhi koi feature visit nahi hua</p>
              <p style={{ fontSize: '.78rem', marginTop: 4 }}>
                Students pages visit karenge toh chart dikhega
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={fData} barCategoryGap="30%">
                <XAxis
                  dataKey="feature"
                  tickFormatter={fLabel}
                  tick={{ fill: '#5a6a85', fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#5a6a85', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  labelFormatter={fLabel}
                  formatter={v => [v, 'Visits']}
                  contentStyle={TOOLTIP_STYLE}
                />
                <Bar dataKey="visits" radius={[6, 6, 0, 0]}>
                  {fData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* ── Bottom 3 Cards ── */}
      <div className={s.g3}>
        <div className={s.card} style={{ marginBottom: 0 }}>
          <div className={s.cardH}>
            <span className={s.cardTitle}>🚫 Blocked Users</span>
          </div>
          <div className={s.cardB} style={{ textAlign: 'center', paddingTop: 24 }}>
            <div style={{
              fontFamily: 'Syne,sans-serif',
              fontWeight: 800,
              fontSize: '2.8rem',
              color: 'var(--red)'
            }}>
              {ov.blockedUsers}
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '.8rem', marginTop: 6 }}>
              students blocked
            </div>
          </div>
        </div>

        <div className={s.card} style={{ marginBottom: 0 }}>
          <div className={s.cardH}>
            <span className={s.cardTitle}>🎯 Top Feature</span>
          </div>
          <div className={s.cardB} style={{ textAlign: 'center', paddingTop: 18 }}>
            <div style={{ fontSize: '2rem', marginBottom: 8 }}>
              {ov.topFeature === 'mock-interview'     ? '🎤' :
               ov.topFeature === 'english-lab'        ? '🗣️' :
               ov.topFeature === 'cgpa-page'          ? '📊' :
               ov.topFeature === 'roadmap'            ? '🗺️' :
               ov.topFeature === 'free-resources'     ? '📚' :
               ov.topFeature === 'internship'         ? '💼' :
               ov.topFeature === 'placement-calendar' ? '📅' :
               ov.topFeature === 'it-news'            ? '📰' :
               ov.topFeature === 'test-page'          ? '📝' : '🎯'}
            </div>
            <div style={{
              fontFamily: 'Syne,sans-serif',
              fontWeight: 700,
              color: 'var(--accent)',
              fontSize: '1rem'
            }}>
              {fLabel(ov.topFeature)}
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '.78rem', marginTop: 4 }}>
              most visited feature
            </div>
          </div>
        </div>

        <div className={s.card} style={{ marginBottom: 0 }}>
          <div className={s.cardH}>
            <span className={s.cardTitle}>📊 Engagement</span>
          </div>
          <div className={s.cardB} style={{ textAlign: 'center', paddingTop: 24 }}>
            <div style={{
              fontFamily: 'Syne,sans-serif',
              fontWeight: 800,
              fontSize: '2.8rem',
              color: 'var(--green)'
            }}>
              {engagementRate}%
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '.8rem', marginTop: 6 }}>
              daily active rate
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
