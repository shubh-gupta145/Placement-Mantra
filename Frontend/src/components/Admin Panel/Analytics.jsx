import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, Radar
} from 'recharts';
import adminApi from '../../utils/adminApi';
import s from './AdminPanel.module.css';

const FEATURES = [
  { key: 'mock-interview',     label: 'Mock Interview',    emoji: '🎤', color: '#f97316' },
  { key: 'english-lab',        label: 'English Lab',       emoji: '🗣️', color: '#3b82f6' },
  { key: 'cgpa-page',          label: 'CGPA Page',         emoji: '📊', color: '#10b981' },
  { key: 'roadmap',            label: 'Roadmap',           emoji: '🗺️', color: '#a855f7' },
  { key: 'free-resources',     label: 'Free Resources',    emoji: '📚', color: '#fbbf24' },
  { key: 'internship',         label: 'Internship',        emoji: '💼', color: '#ef4444' },
  { key: 'placement-calendar', label: 'Placement Cal.',    emoji: '📅', color: '#06b6d4' },
  { key: 'it-news',            label: 'IT News',           emoji: '📰', color: '#8b5cf6' },
  { key: 'about-us',           label: 'About Us',          emoji: 'ℹ️', color: '#ec4899' },
  { key: 'test-page',          label: 'Test Page',         emoji: '📝', color: '#14b8a6' },
];

const MOCK_FEAT = [
  { feature: 'mock-interview',     visits: 842, uniqueUsers: 310, totalTime: 168400 },
  { feature: 'roadmap',            visits: 710, uniqueUsers: 278, totalTime: 142000 },
  { feature: 'free-resources',     visits: 634, uniqueUsers: 240, totalTime: 126800 },
  { feature: 'english-lab',        visits: 521, uniqueUsers: 198, totalTime: 104200 },
  { feature: 'placement-calendar', visits: 398, uniqueUsers: 165, totalTime: 79600  },
  { feature: 'cgpa-page',          visits: 312, uniqueUsers: 130, totalTime: 62400  },
  { feature: 'it-news',            visits: 288, uniqueUsers: 115, totalTime: 57600  },
  { feature: 'internship',         visits: 245, uniqueUsers: 98,  totalTime: 49000  },
  { feature: 'test-page',          visits: 198, uniqueUsers: 82,  totalTime: 39600  },
  { feature: 'about-us',           visits: 142, uniqueUsers: 60,  totalTime: 28400  },
];

const MOCK_USERS = [
  { name: 'Ananya Sharma',  department: 'CSE', totalVisitTime: 14400, visitCount: 48 },
  { name: 'Rohan Kumar',    department: 'IT',  totalVisitTime: 12600, visitCount: 42 },
  { name: 'Priya Singh',    department: 'CSE', totalVisitTime: 10800, visitCount: 36 },
  { name: 'Aman Mishra',    department: 'MBA', totalVisitTime: 9000,  visitCount: 30 },
  { name: 'Sneha Kaur',     department: 'ECE', totalVisitTime: 7200,  visitCount: 24 },
];

const getInfo  = key => FEATURES.find(f => f.key === key) || { label: key, color: '#3b82f6', emoji: '📌' };
const fmtTime  = s => { const m = Math.floor(s / 60); return m > 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m}m`; };
const TOOLTIP_STYLE = { backgroundColor: '#141c2e', border: '1px solid #243350', borderRadius: 10, fontSize: 12, color: '#e8edf8' };

export default function Analytics() {
  const [features, setFeatures] = useState([]);
  const [userTime, setUserTime] = useState([]);
  const [view,     setView]     = useState('visits');

  useEffect(() => {
    adminApi.get('/api/analytics/features')
      .then(r => setFeatures(r.data))
      .catch(() => setFeatures(MOCK_FEAT));

    adminApi.get('/api/analytics/user-time')
      .then(r => setUserTime(r.data))
      .catch(() => setUserTime(MOCK_USERS));
  }, []);

  const fData  = features.length ? features : MOCK_FEAT;
  const uData  = userTime.length ? userTime : MOCK_USERS;
  const maxVal = Math.max(...fData.map(f =>
    view === 'time' ? f.totalTime : view === 'users' ? f.uniqueUsers : f.visits
  ));

  const totalVisits = fData.reduce((a, f) => a + f.visits, 0);

  const radarData = fData.slice(0, 6).map(f => ({
    feature: getInfo(f.feature).label.slice(0, 12),
    value:   Math.round((f.visits / Math.max(...fData.map(x => x.visits))) * 100)
  }));

  return (
    <>
      {/* Stat Cards */}
      <div className={s.statGrid}>
        <div className={`${s.statCard} ${s.scOrange}`}>
          <div className={s.statLabel}>Total Feature Visits</div>
          <div className={s.statValue}>{totalVisits.toLocaleString()}</div>
        </div>
        <div className={`${s.statCard} ${s.scBlue}`}>
          <div className={s.statLabel}>Top Feature</div>
          <div className={s.statValue} style={{ fontSize: '.95rem', marginTop: 8 }}>
            {getInfo(fData[0]?.feature).emoji} {getInfo(fData[0]?.feature).label}
          </div>
          <div className={s.statDelta}>▲ {fData[0]?.visits} visits</div>
        </div>
        <div className={`${s.statCard} ${s.scGreen}`}>
          <div className={s.statLabel}>Unique Feature Users</div>
          <div className={s.statValue}>{fData.reduce((a, f) => a + (f.uniqueUsers || 0), 0)}</div>
        </div>
        <div className={`${s.statCard} ${s.scPurple}`}>
          <div className={s.statLabel}>Avg Time/Visit</div>
          <div className={s.statValue} style={{ fontSize: '1.4rem' }}>
            {fmtTime(Math.round(
              fData.reduce((a, f) => a + (f.totalTime || 0), 0) /
              Math.max(totalVisits, 1)
            ))}
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
        {[
          { val: 'visits', label: '📊 Visits'       },
          { val: 'time',   label: '⏱️ Time Spent'   },
          { val: 'users',  label: '👥 Unique Users'  },
        ].map(v => (
          <button key={v.val}
            className={`${s.btn} ${view === v.val ? s.btnP : s.btnS}`}
            onClick={() => setView(v.val)}>
            {v.label}
          </button>
        ))}
      </div>

      {/* Main Bar Chart */}
      <div className={s.card}>
        <div className={s.cardH}>
          <span className={s.cardTitle}>🔥 Feature Popularity</span>
        </div>
        <div className={s.cardB}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={fData} barCategoryGap="25%">
              <XAxis dataKey="feature"
                tickFormatter={k => getInfo(k).emoji + ' ' + getInfo(k).label.slice(0, 8)}
                tick={{ fill: '#5a6a85', fontSize: 10 }}
                axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#5a6a85', fontSize: 11 }}
                axisLine={false} tickLine={false} />
              <Tooltip
                labelFormatter={k => getInfo(k).label}
                formatter={v => [
                  view === 'time' ? fmtTime(v) : v,
                  view === 'visits' ? 'Visits' : view === 'time' ? 'Time' : 'Users'
                ]}
                contentStyle={TOOLTIP_STYLE} />
              <Bar
                dataKey={view === 'time' ? 'totalTime' : view === 'users' ? 'uniqueUsers' : 'visits'}
                radius={[6, 6, 0, 0]}>
                {fData.map((f, i) => (
                  <Cell key={i} fill={getInfo(f.feature).color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Radar + Ranking */}
      <div className={s.geq}>
        <div className={s.card} style={{ marginBottom: 0 }}>
          <div className={s.cardH}>
            <span className={s.cardTitle}>🕸️ Feature Reach Radar</span>
          </div>
          <div className={s.cardB}>
            <ResponsiveContainer width="100%" height={240}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#1e2d45" />
                <PolarAngleAxis dataKey="feature"
                  tick={{ fill: '#5a6a85', fontSize: 10 }} />
                <Radar name="Usage" dataKey="value"
                  stroke="#f97316" fill="#f97316"
                  fillOpacity={0.15} strokeWidth={2} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={s.card} style={{ marginBottom: 0 }}>
          <div className={s.cardH}>
            <span className={s.cardTitle}>📌 Feature Rankings</span>
          </div>
          <div className={s.cardB}>
            {fData.map((f, i) => {
              const info = getInfo(f.feature);
              const pct  = Math.round((f.visits / Math.max(...fData.map(x => x.visits))) * 100);
              return (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    marginBottom: 4, fontSize: '.8rem'
                  }}>
                    <span>{info.emoji} {info.label}</span>
                    <span style={{ color: info.color, fontWeight: 600 }}>{f.visits}</span>
                  </div>
                  <div className={s.progTrack}>
                    <div className={s.progFill}
                      style={{ width: `${pct}%`, background: info.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Users Table */}
      <div className={s.card}>
        <div className={s.cardH}>
          <span className={s.cardTitle}>⏱️ Top Students by Time Spent</span>
        </div>
        <div className={s.tableWrap}>
          <table>
            <thead>
              <tr>
                <th>#</th><th>Student</th><th>Dept</th>
                <th>Total Time</th><th>Visits</th><th>Engagement</th>
              </tr>
            </thead>
            <tbody>
              {uData.map((u, i) => {
                const pct = Math.round((u.totalVisitTime / (uData[0]?.totalVisitTime || 1)) * 100);
                return (
                  <tr key={i}>
                    <td style={{ color: 'var(--muted)', fontWeight: 600 }}>#{i + 1}</td>
                    <td style={{ fontWeight: 500 }}>{u.name}</td>
                    <td><span className={`${s.pill} ${s.pillPurple}`}>{u.department}</span></td>
                    <td style={{ color: 'var(--green)', fontFamily: 'Syne,sans-serif', fontWeight: 700 }}>
                      {fmtTime(u.totalVisitTime)}
                    </td>
                    <td style={{ color: 'var(--text2)' }}>{u.visitCount}</td>
                    <td style={{ minWidth: 90 }}>
                      <div className={s.progTrack}>
                        <div className={s.progFill}
                          style={{
                            width: `${pct}%`,
                            background: 'linear-gradient(90deg,var(--accent),var(--gold))'
                          }} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}