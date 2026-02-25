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
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    type: "internship",
    status: "applied"
  });

  const year = 2026;

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("careerEvents"));
    if (saved) setEvents(saved);
  }, []);

  const saveEvents = (newEvents) => {
    setEvents(newEvents);
    localStorage.setItem("careerEvents", JSON.stringify(newEvents));
  };

  const nextFour = () => {
    if (startMonth + 4 < 12) {
      setStartMonth(startMonth + 4);
    }
  };

  const prevFour = () => {
    if (startMonth - 4 >= 0) {
      setStartMonth(startMonth - 4);
    }
  };

  const generateDays = (monthIndex) => {
    const firstDay = new Date(year, monthIndex, 1).getDay();
    const totalDays = new Date(year, monthIndex + 1, 0).getDate();
    const blanks = Array(firstDay).fill("");
    const numbers = Array.from({ length: totalDays }, (_, i) => i + 1);
    return [...blanks, ...numbers];
  };

  const openModal = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (!formData.title) return;

    const newEvents = {
      ...events,
      [selectedDate]: formData
    };

    saveEvents(newEvents);
    setShowModal(false);
    setFormData({ title: "", type: "internship", status: "applied" });
  };

  const getColor = (status) => {
    if (status === "applied") return "#4CAF50";
    if (status === "interview") return "#2196F3";
    if (status === "deadline") return "#f44336";
    return "#999";
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={prevFour}>{"<"}</button>
        <h1>Career Calendar {year}</h1>
        <button onClick={nextFour}>{">"}</button>
      </div>

      <div className={styles.SecondContainer}>
        {months.slice(startMonth, startMonth + 4).map((month, index) => {
          const monthIndex = startMonth + index;
          const monthDays = generateDays(monthIndex);

          return (
            <div key={month} className={styles.monthCard}>
              <div className={styles.monthTitle}>
                {month} {year}
              </div>

              <div className={styles.weekRow}>
                {days.map((day) => (
                  <div key={day}>{day}</div>
                ))}
              </div>

              <div className={styles.daysGrid}>
                {monthDays.map((day, i) => {
                  if (!day) return <div key={i}></div>;

                  const fullDate = `${year}-${String(monthIndex + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
                  const event = events[fullDate];

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

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Add Career Event</h3>

            <input
              type="text"
              placeholder="Event Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <option value="internship">Internship</option>
              <option value="placement">Placement</option>
            </select>

            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="deadline">Deadline</option>
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