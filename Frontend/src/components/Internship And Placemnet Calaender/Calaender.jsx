import React, { useState } from "react";
import styles from "./Calaender.module.css";

const months = [
  "January", "February", "March",
  "April", "May", "June",
  "July", "August", "September",
  "October", "November", "December"
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
  const [startMonth, setStartMonth] = useState(0);
  const year = 2026;

  const nextSix = () => {
    if (startMonth + 6 < 12) {
      setStartMonth(startMonth + 6);
    }
  };

  const prevSix = () => {
    if (startMonth - 6 >= 0) {
      setStartMonth(startMonth - 6);
    }
  };

  const generateDays = (monthIndex) => {
    const firstDay = new Date(year, monthIndex, 1).getDay();
    const totalDays = new Date(year, monthIndex + 1, 0).getDate();

    const blanks = Array(firstDay).fill("");
    const numbers = Array.from({ length: totalDays }, (_, i) => i + 1);

    return [...blanks, ...numbers];
  };

  return (
    <div className={styles.container}>
      
      {/* HEADER */}
      <div className={styles.header}>
        <button className={styles.arrow} onClick={prevSix}>{"<"}</button>
        <h1 className={styles.title}>Calendar {year}</h1>
        <button className={styles.arrow} onClick={nextSix}>{">"}</button>
      </div>

      {/* WHITE FLEX CONTAINER */}
      <div className={styles.SecondContainer}>
        {months.slice(startMonth, startMonth + 6).map((month, index) => {
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
                {monthDays.map((day, i) => (
                  <div key={i}>{day}</div>
                ))}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Calendar;
