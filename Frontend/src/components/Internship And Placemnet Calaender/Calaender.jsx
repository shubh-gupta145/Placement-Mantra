import React, { useState, useEffect } from "react";
import styles from "./Calaender.module.css";

const months = [
  "January","February","March","April",
  "May","June","July","August",
  "September","October","November","December"
];

const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const Calendar = () => {
  const [startMonth, setStartMonth] = useState(0);
  const [events,     setEvents]     = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal,  setShowModal]  = useState(false);
  const [isMobile,   setIsMobile]   = useState(window.innerWidth <= 600);

  const [formData, setFormData] = useState({
    title:  "",
    type:   "internship",
    status: "applied"
  });

  const year = 2026;

  // ── Window resize track karo ──
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ── Load saved events ──
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("careerEvents"));
    if (saved) setEvents(saved);
  }, []);

  const saveEvents = (newEvents) => {
    setEvents(newEvents);
    localStorage.setItem("careerEvents", JSON.stringify(newEvents));
  };

  // ── Mobile pe 1 month, Desktop pe 4 months ──
  const step = isMobile ? 1 : 4;

  const nextMonth = () => {
    if (startMonth + step <= 11) {
      setStartMonth(prev => prev + step);
    }
  };

  const prevMonth = () => {
    if (startMonth - step >= 0) {
      setStartMonth(prev => prev - step);
    }
  };

  const generateDays = (monthIndex) => {
    const firstDay  = new Date(year, monthIndex, 1).getDay();
    const totalDays = new Date(year, monthIndex + 1, 0).getDate();
    const blanks    = Array(firstDay).fill("");
    const numbers   = Array.from({ length: totalDays }, (_, i) => i + 1);
    return [...blanks, ...numbers];
  };

  const openModal = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (!formData.title) return;
    const newEvents = { ...events, [selectedDate]: formData };
    saveEvents(newEvents);
    setShowModal(false);
    setFormData({ title: "", type: "internship", status: "applied" });
  };

  const getColor = (status) => {
    if (status === "applied")   return "#4CAF50";
    if (status === "interview") return "#2196F3";
    if (status === "deadline")  return "#f44336";
    return "#999";
  };

  // ── Kitne months dikhane hain ──
  const visibleMonths = months.slice(startMonth, startMonth + step);

  return (
    <div className={styles.container}>

      {/* ── Header ── */}
      <div className={styles.header}>
        <button
          onClick={prevMonth}
          disabled={startMonth === 0}
          style={{ opacity: startMonth === 0 ? 0.4 : 1 }}
        >
          {"<"}
        </button>

        <h1>
          Career Calendar {year}
          {/* Mobile pe current month dikhao */}
          {isMobile && (
            <span style={{
              display: 'block',
              fontSize: '.8rem',
              color: '#00eaff',
              fontWeight: 400,
              marginTop: 2
            }}>
              {months[startMonth]}
            </span>
          )}
        </h1>

        <button
          onClick={nextMonth}
          disabled={startMonth + step > 11}
          style={{ opacity: startMonth + step > 11 ? 0.4 : 1 }}
        >
          {">"}
        </button>
      </div>

      {/* ── Months Grid ── */}
      <div className={styles.SecondContainer}>
        {visibleMonths.map((month, index) => {
          const monthIndex = startMonth + index;
          const monthDays  = generateDays(monthIndex);

          return (
            <div key={month} className={styles.monthCard}>
              <div className={styles.monthTitle}>
                {month} {year}
              </div>

              <div className={styles.weekRow}>
                {days.map(day => (
                  <div key={day}>{day}</div>
                ))}
              </div>

              <div className={styles.daysGrid}>
                {monthDays.map((day, i) => {
                  if (!day) return <div key={i} />;

                  const fullDate = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  const event    = events[fullDate];

                  return (
                    <div
                      key={i}
                      className={styles.dayBox}
                      style={{
                        backgroundColor: event ? getColor(event.status) : ""
                      }}
                      onClick={() => openModal(fullDate)}
                    >
                      {day}
                      {event && (
                        <span className={styles.tooltip}>
                          {event.title} ({event.status})
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Mobile: Page indicator ── */}
      {isMobile && (
        <div style={{
          textAlign: 'center',
          marginTop: 12,
          display: 'flex',
          justifyContent: 'center',
          gap: 6
        }}>
          {months.map((_, i) => (
            <div
              key={i}
              onClick={() => setStartMonth(i)}
              style={{
                width:  i === startMonth ? 16 : 6,
                height: 6,
                borderRadius: 3,
                background: i === startMonth ? '#00eaff' : 'rgba(255,255,255,0.2)',
                cursor: 'pointer',
                transition: 'all .2s'
              }}
            />
          ))}
        </div>
      )}

      {/* ── Modal ── */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Add Career Event</h3>
            <p style={{
              fontSize: '.82rem',
              color: '#94a3b8',
              margin: '-4px 0 4px'
            }}>
              📅 {selectedDate}
            </p>

            <input
              type="text"
              placeholder="Event Title"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />

            <select
              value={formData.type}
              onChange={e => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="internship">Internship</option>
              <option value="placement">Placement</option>
            </select>

            <select
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="applied">Applied ✅</option>
              <option value="interview">Interview 🔵</option>
              <option value="deadline">Deadline 🔴</option>
            </select>

            <div className={styles.modalButtons}>
              <button onClick={handleSubmit}>Save</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Calendar;