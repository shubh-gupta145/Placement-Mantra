import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import adminApi from '../../utils/adminApi';
import s from './AdminPanel.module.css';

const fmtTime = sec => {
  const m = Math.floor(sec / 60);
  return m > 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m}m`;
};

const TOOLTIP_STYLE = {
  backgroundColor: '#141c2e',
  border: '1px solid #243350',
  borderRadius: 10, fontSize: 12, color: '#e8edf8'
};

export default function Attendance() {
  const [period,   setPeriod]   = useState('month');
  const [summary,  setSummary]  = useState([]);
  const [daily,    setDaily]    = useState([]);
  const [weekly,   setWeekly]   = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const days = period === 'week' ? 7 : period === 'month' ? 30 : 365;

        const [sum, day] = await Promise.all([
          adminApi.get(`/api/attendance/summary?period=${period}`),
          adminApi.get(`/api/attendance/daily?days=${days}`),
        ]);

        setSummary(sum.data);
        setDaily(day.data);

        // ── Weekly comparison — daily data se calculate karo ──
        const dayData = day.data;
        if (dayData.length > 0) {
          const weeks = [];
          const chunkSize = Math.ceil(dayData.length / 4);
          for (let i = 0; i < 4; i++) {
            const chunk = dayData.slice(i * chunkSize, (i + 1) * chunkSize);
            const count = chunk.reduce((a, d) => a + d.count, 0);
            weeks.push({ week: `Week ${i + 1}`, count });
          }
          setWeekly(weeks);
        } else {
          setWeekly([]);
        }

      } catch (err) {
        console.error("Attendance API Error:", err);
        setSummary([]);
        setDaily([]);
        setWeekly([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [period]);

  const filteredSummary = summary.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPresent = daily.reduce((a, d) => a + d.count, 0);
  const avgPerDay    = daily.length ? Math.round(totalPresent / daily.length) : 0;
  const topStudent   = summary[0];

  return (
    <>
      {/* ── Stat Cards ── */}
      <div className={s.statGrid}>
        <div className={`${s.statCard} ${s.scBlue}`}>
          <div className={s.statLabel}>Total Records</div>
          <div className={s.statValue}>{totalPresent.toLocaleString()}</div>
          <div className={s.statDelta}>▲ this {period}</div>
        </div>

        <div className={`${s.statCard} ${s.scGreen}`}>
          <div className={s.statLabel}>Avg Daily Visitors</div>
          <div className={s.statValue}>{avgPerDay}</div>
          <div className={s.statDelta}>▲ students/day</div>
        </div>

        <div className={`${s.statCard} ${s.scOrange}`}>
          <div className={s.statLabel}>Most Active Student</div>
          <div className={s.statValue} style={{ fontSize: '1.1rem', marginTop: 6 }}>
            {topStudent?.name?.split(' ')[0] || 'N/A'}
          </div>
          <div className={s.statDelta}>{topStudent?.totalDays || 0} days</div>
        </div>

        <div className={`${s.statCard} ${s.scPurple}`}>
          <div className={s.statLabel}>Avg Session Time</div>
          <div className={s.statValue} style={{ fontSize: '1.5rem' }}>
            {fmtTime(Math.round(
              summary.reduce((a, u) => a + (u.avgDuration || 0), 0) /
              Math.max(summary.length, 1)
            ))}
          </div>
          <div className={s.statDelta}>▲ per visit</div>
        </div>
      </div>

      {/* ── Period Filter ── */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
        {[
          { val: 'week',  label: '📅 This Week'  },
          { val: 'month', label: '🗓️ This Month' },
          { val: 'year',  label: '📊 This Year'  },
        ].map(p => (
          <button key={p.val}
            className={`${s.btn} ${period === p.val ? s.btnP : s.btnS}`}
            onClick={() => setPeriod(p.val)}>
            {p.label}
          </button>
        ))}
      </div>

      {/* ── Daily Visitor Chart ── */}
      <div className={s.card}>
        <div className={s.cardH}>
          <span className={s.cardTitle}>📈 Daily Visitor Trend</span>
        </div>
        <div className={s.cardB}>
          {daily.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--muted)' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>📭</div>
              <p style={{ fontSize: '.85rem' }}>Koi attendance data nahi hai</p>
              <p style={{ fontSize: '.78rem', marginTop: 4 }}>
                Students login karenge toh data aayega
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={daily}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2d45" />
                <XAxis
                  dataKey="_id"
                  tick={{ fill: '#5a6a85', fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={d => d?.slice(5) || d}
                />
                <YAxis
                  tick={{ fill: '#5a6a85', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  formatter={v => [v, 'Students']}
                />
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

      {/* ── Weekly Comparison — Real Data ── */}
      <div className={s.card}>
        <div className={s.cardH}>
          <span className={s.cardTitle}>📊 Weekly Comparison</span>
        </div>
        <div className={s.cardB}>
          {weekly.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--muted)' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>📊</div>
              <p style={{ fontSize: '.85rem' }}>Koi weekly data nahi hai</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={weekly}>
                <XAxis
                  dataKey="week"
                  tick={{ fill: '#5a6a85', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#5a6a85', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  formatter={v => [v, 'Students']}
                />
                <Bar dataKey="count" fill="#f97316" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* ── Student Attendance Table ── */}
      <div className={s.card}>
        <div className={s.cardH}>
          <span className={s.cardTitle}>👩‍🎓 Student Attendance Details</span>
          <div className={s.searchBox}>
            <span>🔍</span>
            <input
              placeholder="Search student…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className={s.tableWrap}>
          {loading ? (
            <div className={s.spinner} />
          ) : filteredSummary.length === 0 ? (
            <div className={s.empty}>
              <div className={s.emptyIcon}>👤</div>
              <p>Koi student nahi mila</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Student</th>
                  <th>Days Present</th>
                  <th>Total Time</th>
                  <th>Avg/Visit</th>
                  <th>Engagement</th>
                </tr>
              </thead>
              <tbody>
                {filteredSummary.map((u, i) => {
                  const pct = Math.min(
                    Math.round((u.totalDays / 30) * 100), 100
                  );
                  const col = pct > 70 ? 'var(--green)' :
                              pct > 40 ? 'var(--gold)'  : 'var(--red)';
                  return (
                    <tr key={u._id}>
                      <td style={{ color: 'var(--muted)', fontWeight: 600 }}>
                        #{i + 1}
                      </td>
                      <td>
                        <div style={{ fontWeight: 500, fontSize: '.87rem' }}>
                          {u.name}
                        </div>
                        <div style={{ color: 'var(--muted)', fontSize: '.72rem' }}>
                          {u.email}
                        </div>
                      </td>
                      <td>
                        <span style={{
                          fontFamily: 'Syne,sans-serif',
                          fontWeight: 700,
                          color: 'var(--blue)'
                        }}>
                          {u.totalDays}
                        </span>
                        <span style={{
                          color: 'var(--muted)',
                          fontSize: '.74rem'
                        }}> days</span>
                      </td>
                      <td style={{ color: 'var(--text2)' }}>
                        {fmtTime(u.totalDuration || 0)}
                      </td>
                      <td style={{ color: 'var(--text2)' }}>
                        {fmtTime(u.avgDuration || 0)}
                      </td>
                      <td style={{ minWidth: 100 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <div className={s.progTrack} style={{ flex: 1 }}>
                            <div className={s.progFill}
                              style={{ width: `${pct}%`, background: col }} />
                          </div>
                          <span style={{
                            fontSize: '.72rem',
                            color: 'var(--muted)',
                            minWidth: 28
                          }}>
                            {pct}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}