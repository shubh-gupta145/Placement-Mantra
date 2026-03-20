import { useState } from 'react';
import styles from './FeedbackForm.module.css';

const FEATURES = [
  { value: 'mock-interview',     label: '🎤 Mock Interview' },
  { value: 'english-lab',        label: '🗣️ English Lab' },
  { value: 'cgpa-page',          label: '📊 CGPA Page' },
  { value: 'roadmap',            label: '🗺️ Roadmap' },
  { value: 'free-resources',     label: '📚 Free Resources' },
  { value: 'internship',         label: '💼 Internship' },
  { value: 'placement-calendar', label: '📅 Placement Calendar' },
  { value: 'it-news',            label: '📰 IT News' },
  { value: 'test-page',          label: '📝 Test Page' },
  { value: 'general',            label: '💬 General' },
];

export default function FeedbackForm() {
  const [form,    setForm]    = useState({ feature: 'general', rating: 0, message: '' });
  const [hover,   setHover]   = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error,   setError]   = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.rating === 0) {
      setError('Please select a rating ⭐');
      return;
    }
    if (!form.message.trim()) {
      setError('Please write a message');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const userStr  = localStorage.getItem('pm_admin_user');
      const userName = userStr ? JSON.parse(userStr).name : 'Anonymous';
      const userId   = userStr ? JSON.parse(userStr).id   : null;

      const res = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message:  form.message,
          feature:  form.feature,
          rating:   form.rating,
          userName: userName,
          userId:   userId,
        })
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setForm({ feature: 'general', rating: 0, message: '' });
        setTimeout(() => setSuccess(false), 4000);
      } else {
        setError('Something went wrong. Try again.');
      }

    } catch (err) {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainWrapper}>

        {/* ── FORM CARD ── */}
        <div className={styles.card}>

          <div className={styles.title}>💬 Give Your Feedback</div>
          <div className={styles.subtitle}>
            Help us improve Placement Mantra for you!
          </div>

          {/* Success */}
          {success && (
            <div className={styles.success}>
              ✅ Feedback submitted! Thank you.
            </div>
          )}

          {/* Error */}
          {error && (
            <div className={styles.error}>
              ⚠️ {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >

            {/* Feature Select */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Which feature are you rating?
              </label>
              <select
                className={styles.select}
                value={form.feature}
                onChange={e => setForm({ ...form, feature: e.target.value })}
              >
                {FEATURES.map(f => (
                  <option key={f.value} value={f.value}>{f.label}</option>
                ))}
              </select>
            </div>

            {/* Star Rating */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Rating</label>
              <div className={styles.starsRow}>
                {[1, 2, 3, 4, 5].map(star => (
                  <span
                    key={star}
                    className={`${styles.star} ${
                      star <= (hover || form.rating) ? styles.starFilled : ''
                    }`}
                    onClick={() => setForm({ ...form, rating: star })}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Your Feedback</label>
              <textarea
                className={styles.textarea}
                placeholder="Share your experience with us…"
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? '⏳ Submitting…' : '🚀 Submit Feedback'}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}