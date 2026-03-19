import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, CartesianGrid
} from 'recharts';
import adminApi from '../../utils/adminApi';
import s from './AdminPanel.module.css';

const COLORS = ['#f97316','#3b82f6','#10b981','#a855f7','#fbbf24','#ef4444','#06b6d4','#ec4899','#14b8a6','#8b5cf6'];

const MOCK_FEATURES = [
  { feature: 'mock-interview',     visits: 842 },
  { feature: 'roadmap',            visits: 710 },
  { feature: 'free-resources',     visits: 634 },
  { feature: 'english-lab',        visits: 521 },
  { feature: 'placement-calendar', visits: 398 },
  { feature: 'cgpa-page',          visits: 312 },
];

const MOCK_ATT = Array.from({ length: 14 }, (_, i) => ({
  _id: `Mar ${i + 5}`,
  count: Math.floor(Math.random() * 80 + 40)
}));

const MOCK_SENT = [
  { _id: 'positive', count: 148 },
  { _id: 'neutral',  count: 62  },
  { _id: 'negative', count: 28  },
];

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
  const [overview,    setOverview]    = useState({});
  const [features,    setFeatures]    = useState([]);
  const [sentiment,   setSentiment]   = useState([]);
  const [attendance,  setAttendance]  = useState([]);
  const [notifStats,  setNotifStats]  = useState({});
  const [loading,     setLoading]     = useState(true);

  useEffect(() => {
    const load = async () => {
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
      } catch {
        // Use mock data if API fails
        setFeatures(MOCK_FEATURES);
        setAttendance(MOCK_ATT);
        setSentiment(MOCK_SENT);
        setOverview({ totalUsers: 2847, activeToday: 342, totalFeatureVisits: 12480, topFeature: 'mock-interview' });
        setNotifStats({ total: 48, thisWeek: 7 });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className={s.spinner} />;

  const ov = Object.keys(overview).length ? overview : {
    totalUsers: 2847, activeToday: 342,
    totalFeatureVisits: 12480, topFeature: 'mock-interview',
    blockedUsers: 13
  };
  const ns  = Object.keys(notifStats).length ? notifStats : { total: 48, thisWeek: 7 };
  const fData = features.length ? features : MOCK_FEATURES;
  const aData = attendance.length ? attendance : MOCK_ATT;
  const sData = sentiment.length ? sentiment : MOCK_SENT;

  return (
    <>
      {/* Stat Cards */}
      <div className={s.statGrid}>
        <div className={`${s.statCard} ${s.scOrange}`}>
          <div className={s.statLabel}>Total Students</div>
          <div className={s.statValue}>{ov.totalUsers?.toLocaleString()}</div>
          <div className={s.statDelta}>▲ Active: {ov.activeUsers?.toLocaleString() || ov.totalUsers}</div>
        </div>
        <div className={`${s.statCard} ${s.scBlue}`}>
          <div className={s.statLabel}>Active Today</div>
          <div className={s.statValue}>{ov.activeToday}</div>
          <div className={s.statDelta}>▲ Online now</div>
        </div>
        <div className={`${s.statCard} ${s.scGreen}`}>
          <div className={s.statLabel}>Feature Visits</div>
          <div className={s.statValue}>{ov.totalFeatureVisits?.toLocaleString()}</div>
          <div className={s.statDelta}>▲ Top: {fLabel(ov.topFeature)}</div>
        </div>
        <div className={`${s.statCard} ${s.scPurple}`}>
          <div className={s.statLabel}>Notifications Sent</div>
          <div className={s.statValue}>{ns.total}</div>
          <div className={s.statDelta}>▲ {ns.thisWeek} this week</div>
        </div>
      </div>

      {/* Attendance + Sentiment */}
      <div className={s.g2}>
        <div className={s.card} style={{ marginBottom: 0 }}>
          <div className={s.cardH}>
            <span className={s.cardTitle}>📅 Daily Attendance (Last 14 Days)</span>
          </div>
          <div className={s.cardB}>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={aData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2d45" />
                <XAxis dataKey="_id" tick={{ fill: '#5a6a85', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#5a6a85', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2.5}
                  dot={{ fill: '#3b82f6', r: 3 }} activeDot={{ r: 6 }} name="Students" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={s.card} style={{ marginBottom: 0 }}>
          <div className={s.cardH}>
            <span className={s.cardTitle}>💬 Feedback Sentiment</span>
          </div>
          <div className={s.cardB} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <ResponsiveContainer width="55%" height={160}>
              <PieChart>
                <Pie data={sData} dataKey="count" nameKey="_id"
                  cx="50%" cy="50%" innerRadius={45} outerRadius={70}>
                  {sData.map((s2, i) => (
                    <Cell key={i} fill={SENT_COLOR[s2._id] || COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={TOOLTIP_STYLE} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1 }}>
              {sData.map((s2, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: '.8rem', textTransform: 'capitalize', color: '#a0aec0' }}>{s2._id}</span>
                    <span style={{ fontWeight: 700, color: SENT_COLOR[s2._id] || COLORS[i] }}>{s2.count}</span>
                  </div>
                  <div className={s.progTrack}>
                    <div className={s.progFill}
                      style={{
                        width: `${Math.round((s2.count / sData.reduce((a, x) => a + x.count, 0)) * 100)}%`,
                        background: SENT_COLOR[s2._id] || COLORS[i]
                      }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Feature Bar Chart */}
      <div className={s.card}>
        <div className={s.cardH}>
          <span className={s.cardTitle}>🔥 Most Used Features</span>
        </div>
        <div className={s.cardB}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={fData} barCategoryGap="30%">
              <XAxis dataKey="feature" tickFormatter={fLabel}
                tick={{ fill: '#5a6a85', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#5a6a85', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip labelFormatter={fLabel} formatter={v => [v, 'Visits']}
                contentStyle={TOOLTIP_STYLE} />
              <Bar dataKey="visits" radius={[6, 6, 0, 0]}>
                {fData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom 3 cards */}
      <div className={s.g3}>
        <div className={s.card} style={{ marginBottom: 0 }}>
          <div className={s.cardH}><span className={s.cardTitle}>🚫 Blocked Users</span></div>
          <div className={s.cardB} style={{ textAlign: 'center', paddingTop: 24 }}>
            <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '2.8rem', color: 'var(--red)' }}>
              {ov.blockedUsers || 0}
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '.8rem', marginTop: 6 }}>students blocked</div>
          </div>
        </div>
        <div className={s.card} style={{ marginBottom: 0 }}>
          <div className={s.cardH}><span className={s.cardTitle}>🎯 Top Feature</span></div>
          <div className={s.cardB} style={{ textAlign: 'center', paddingTop: 18 }}>
            <div style={{ fontSize: '2rem', marginBottom: 8 }}>🎤</div>
            <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, color: 'var(--accent)', fontSize: '1rem' }}>
              {fLabel(ov.topFeature || 'mock-interview')}
            </div>
          </div>
        </div>
        <div className={s.card} style={{ marginBottom: 0 }}>
          <div className={s.cardH}><span className={s.cardTitle}>📊 Engagement</span></div>
          <div className={s.cardB} style={{ textAlign: 'center', paddingTop: 24 }}>
            <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '2.8rem', color: 'var(--green)' }}>
              {ov.totalUsers ? Math.round((ov.activeToday / ov.totalUsers) * 100) : 12}%
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '.8rem', marginTop: 6 }}>daily active rate</div>
          </div>
        </div>
      </div>
    </>
  );
}