import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';
import adminApi from '../../utils/adminApi';
import s from './AdminPanel.module.css';

const SENT_COLOR  = { positive: '#10b981', neutral: '#fbbf24', negative: '#ef4444' };
const SENT_BG     = { positive: 'var(--greenDim)', neutral: 'rgba(251,191,36,.12)', negative: 'var(--redDim)' };
const SENT_BORDER = { positive: 'rgba(16,185,129,.2)', neutral: 'rgba(251,191,36,.2)', negative: 'rgba(239,68,68,.2)' };
const SENT_EMOJI  = { positive: '😊', neutral: '😐', negative: '😞' };
const RATING_COL  = ['#ef4444','#f97316','#fbbf24','#3b82f6','#10b981'];
const TOOLTIP_STYLE = { backgroundColor: '#141c2e', border: '1px solid #243350', borderRadius: 10, fontSize: 12, color: '#e8edf8' };

const stars  = n => '★'.repeat(n) + '☆'.repeat(5 - n);
const starCol = n => n >= 4 ? 'var(--green)' : n === 3 ? 'var(--gold)' : 'var(--red)';

const MOCK_ANALYSIS = {
  sentimentCounts: [
    { _id: 'positive', count: 148, avgRating: 4.5 },
    { _id: 'neutral',  count: 62,  avgRating: 3.0 },
    { _id: 'negative', count: 28,  avgRating: 1.8 },
  ],
  ratingDistribution: [
    { _id: 1, count: 12 }, { _id: 2, count: 16 },
    { _id: 3, count: 62 }, { _id: 4, count: 86 }, { _id: 5, count: 62 }
  ],
  featureBreakdown: [
    { _id: 'Mock Interview',  total: 58, avgRating: 4.4, positive: 42, neutral: 10, negative: 6  },
    { _id: 'Roadmap',         total: 44, avgRating: 4.2, positive: 32, neutral: 8,  negative: 4  },
    { _id: 'English Lab',     total: 36, avgRating: 3.1, positive: 16, neutral: 12, negative: 8  },
    { _id: 'Free Resources',  total: 32, avgRating: 3.8, positive: 20, neutral: 8,  negative: 4  },
    { _id: 'CGPA Page',       total: 26, avgRating: 4.6, positive: 22, neutral: 2,  negative: 2  },
  ],
  total: 238
};

const MOCK_FBS = [
  { _id:'1', userName:'Ananya Sharma', feature:'Mock Interview', rating:5, message:'Mock interviews are amazing! Helped me crack placement.', sentiment:'positive', isResolved:false },
  { _id:'2', userName:'Rohan Kumar',   feature:'Roadmap',        rating:4, message:'Very clear and structured. Loved it!', sentiment:'positive', isResolved:true  },
  { _id:'3', userName:'Priya Singh',   feature:'English Lab',    rating:2, message:'Needs more content. Feels incomplete.', sentiment:'negative', isResolved:false },
  { _id:'4', userName:'Aman Mishra',   feature:'Free Resources', rating:3, message:'Good but needs regular updates.', sentiment:'neutral',  isResolved:false },
  { _id:'5', userName:'Sneha Kaur',    feature:'CGPA Page',      rating:5, message:'Super accurate calculator!', sentiment:'positive', isResolved:true  },
];

export default function FeedbackPage() {
  const [analysis,  setAnalysis]  = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [filter,    setFilter]    = useState('all');

  useEffect(() => {
    adminApi.get('/api/feedback/analysis')
      .then(r => setAnalysis(r.data))
      .catch(() => setAnalysis(MOCK_ANALYSIS));

    adminApi.get('/api/feedback')
      .then(r => setFeedbacks(r.data))
      .catch(() => setFeedbacks(MOCK_FBS));
  }, []);

  const an = analysis || MOCK_ANALYSIS;
  const fb = feedbacks.length ? feedbacks : MOCK_FBS;

  const positive = an.sentimentCounts?.find(s => s._id === 'positive')?.count || 0;
  const neutral  = an.sentimentCounts?.find(s => s._id === 'neutral')?.count  || 0;
  const negative = an.sentimentCounts?.find(s => s._id === 'negative')?.count || 0;
  const total    = an.total || positive + neutral + negative;

  const filtered = filter === 'all' ? fb : fb.filter(f => f.sentiment === filter);

  const resolve = async (id) => {
    try { await adminApi.patch(`/api/feedback/${id}/resolve`); } catch {}
    setFeedbacks(prev => prev.map(f => f._id === id ? { ...f, isResolved: true } : f));
  };

  return (
    <>
      {/* Stat Cards */}
      <div className={s.statGrid}>
        <div className={`${s.statCard} ${s.scGreen}`}>
          <div className={s.statLabel}>Positive Feedback</div>
          <div className={s.statValue}>{positive}</div>
          <div className={s.statDelta}>▲ {Math.round((positive / Math.max(total, 1)) * 100)}% of total</div>
        </div>
        <div className={`${s.statCard} ${s.scOrange}`}>
          <div className={s.statLabel}>Neutral Feedback</div>
          <div className={s.statValue} style={{ color: 'var(--gold)' }}>{neutral}</div>
        </div>
        <div className={`${s.statCard} ${s.scPurple}`}>
          <div className={s.statLabel}>Negative Feedback</div>
          <div className={s.statValue} style={{ color: 'var(--red)' }}>{negative}</div>
          <div className={s.statDelta} style={{ color: 'var(--red)' }}>
            ▼ {Math.round((negative / Math.max(total, 1)) * 100)}% of total
          </div>
        </div>
        <div className={`${s.statCard} ${s.scBlue}`}>
          <div className={s.statLabel}>Total Feedbacks</div>
          <div className={s.statValue}>{total}</div>
        </div>
      </div>

      {/* Pie + Rating Chart */}
      <div className={s.geq}>
        <div className={s.card} style={{ marginBottom: 0 }}>
          <div className={s.cardH}><span className={s.cardTitle}>😊 Sentiment Breakdown</span></div>
          <div className={s.cardB} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie data={an.sentimentCounts} dataKey="count" nameKey="_id"
                  cx="50%" cy="50%" innerRadius={50} outerRadius={75}>
                  {an.sentimentCounts?.map((sc, i) => (
                    <Cell key={i} fill={SENT_COLOR[sc._id]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={TOOLTIP_STYLE} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1 }}>
              {an.sentimentCounts?.map((sc, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: '.8rem', textTransform: 'capitalize', color: 'var(--text2)' }}>
                      {sc._id}
                    </span>
                    <span style={{ fontWeight: 700, color: SENT_COLOR[sc._id] }}>{sc.count}</span>
                  </div>
                  <div className={s.progTrack}>
                    <div className={s.progFill}
                      style={{
                        width: `${Math.round((sc.count / Math.max(total, 1)) * 100)}%`,
                        background: SENT_COLOR[sc._id]
                      }} />
                  </div>
                  <div style={{ fontSize: '.7rem', color: 'var(--muted)', marginTop: 2 }}>
                    Avg rating: {sc.avgRating?.toFixed(1)} ⭐
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={s.card} style={{ marginBottom: 0 }}>
          <div className={s.cardH}><span className={s.cardTitle}>⭐ Rating Distribution</span></div>
          <div className={s.cardB}>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={an.ratingDistribution}>
                <XAxis dataKey="_id" tickFormatter={v => `${v}★`}
                  tick={{ fill: '#5a6a85', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#5a6a85', fontSize: 11 }}
                  axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TOOLTIP_STYLE}
                  formatter={v => [v, 'Feedbacks']} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {an.ratingDistribution?.map((_, i) => (
                    <Cell key={i} fill={RATING_COL[i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Feature-wise Table */}
      <div className={s.card}>
        <div className={s.cardH}><span className={s.cardTitle}>📌 Feature-wise Breakdown</span></div>
        <div className={s.tableWrap}>
          <table>
            <thead>
              <tr>
                <th>Feature</th><th>Total</th><th>Avg Rating</th>
                <th>Positive</th><th>Neutral</th><th>Negative</th><th>Satisfaction</th>
              </tr>
            </thead>
            <tbody>
              {an.featureBreakdown?.map((f, i) => {
                const pct = Math.round((f.positive / Math.max(f.total, 1)) * 100);
                const rc  = f.avgRating >= 4 ? 'var(--green)' : f.avgRating >= 3 ? 'var(--gold)' : 'var(--red)';
                return (
                  <tr key={i}>
                    <td style={{ fontWeight: 500 }}>{f._id}</td>
                    <td style={{ color: 'var(--text2)' }}>{f.total}</td>
                    <td style={{ color: rc, fontFamily: 'Syne,sans-serif', fontWeight: 700 }}>
                      {f.avgRating?.toFixed(1)} ★
                    </td>
                    <td><span className={`${s.pill} ${s.pillGreen}`}>{f.positive}</span></td>
                    <td><span className={`${s.pill} ${s.pillOrange}`}>{f.neutral}</span></td>
                    <td><span className={`${s.pill} ${s.pillRed}`}>{f.negative}</span></td>
                    <td style={{ minWidth: 100 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div className={s.progTrack} style={{ flex: 1 }}>
                          <div className={s.progFill}
                            style={{
                              width: `${pct}%`,
                              background: pct >= 70 ? 'var(--green)' : pct >= 40 ? 'var(--gold)' : 'var(--red)'
                            }} />
                        </div>
                        <span style={{ fontSize: '.72rem', color: 'var(--muted)', minWidth: 28 }}>{pct}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Individual Feedbacks */}
      <div className={s.card}>
        <div className={s.cardH}>
          <span className={s.cardTitle}>💬 Student Feedbacks</span>
          <div style={{ display: 'flex', gap: 6 }}>
            {['all','positive','neutral','negative'].map(f => (
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
          {filtered.map(f => (
            <div key={f._id} className={s.fbCard}
              style={{ borderColor: SENT_BORDER[f.sentiment] }}>
              <div className={s.fbIcon}
                style={{ background: SENT_BG[f.sentiment] }}>
                {SENT_EMOJI[f.sentiment]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'flex-start', marginBottom: 6
                }}>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: '.87rem' }}>
                      {f.userName || f.user?.name || 'Anonymous'}
                    </span>
                    <span className={`${s.pill} ${s.pillGray}`}
                      style={{ marginLeft: 8, fontSize: '.67rem' }}>
                      {f.feature}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: starCol(f.rating), fontSize: '.83rem' }}>
                      {stars(f.rating || 0)}
                    </span>
                    {f.isResolved ? (
                      <span className={`${s.pill} ${s.pillGreen}`} style={{ fontSize: '.67rem' }}>
                        ✅ Resolved
                      </span>
                    ) : (
                      <button className={`${s.btn} ${s.btnS} ${s.btnSm}`}
                        onClick={() => resolve(f._id)}>
                        Mark Resolved
                      </button>
                    )}
                  </div>
                </div>
                <p style={{ color: 'var(--text2)', fontSize: '.84rem', lineHeight: 1.5 }}>
                  {f.message}
                </p>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className={s.empty}>
              <div className={s.emptyIcon}>💬</div>
              <p>No feedbacks in this category</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}