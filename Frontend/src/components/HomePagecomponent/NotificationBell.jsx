import { useState, useEffect, useRef } from "react";
import styles from "./NotificationBell.module.css";

const TYPE_EMOJI = {
  general:  '📢',
  reminder: '⏰',
  update:   '🔄',
  alert:    '🚨',
};

const timeAgo = (date) => {
  const diff = Math.floor((Date.now() - new Date(date)) / 1000);
  if (diff < 60)    return `${diff}s ago`;
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

export default function NotificationBell() {
  const [notifications,  setNotifications]  = useState([]);
  const [unreadCount,    setUnreadCount]    = useState(0);
  const [showPanel,      setShowPanel]      = useState(false);
  const panelRef = useRef(null);

  // ── Notifications fetch ──
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("pm_admin_token");
      if (!token) return;

      const res  = await fetch("${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/notifications/user", {
        headers: { "Authorization": `Bearer ${token}` }
      });

      const data = await res.json();

      if (Array.isArray(data)) {
        setNotifications(data);
        const readIds = JSON.parse(localStorage.getItem("read_notifs") || "[]");
        const unread  = data.filter(n => !readIds.includes(n._id));
        setUnreadCount(unread.length);
      }
    } catch (err) {
      console.log("Notif error:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Har 60 second mein check karo
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  // ── Panel bahar click karo toh band ho ──
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setShowPanel(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleBellClick = () => {
    setShowPanel(prev => !prev);
    if (!showPanel) {
      const allIds = notifications.map(n => n._id);
      localStorage.setItem("read_notifs", JSON.stringify(allIds));
      setUnreadCount(0);
    }
  };

  const markAllRead = () => {
    const allIds = notifications.map(n => n._id);
    localStorage.setItem("read_notifs", JSON.stringify(allIds));
    setUnreadCount(0);
  };

  return (
    <div className={styles.wrapper} ref={panelRef}>

      {/* ── Bell Button ── */}
      <button
        className={styles.bellBtn}
        onClick={handleBellClick}
        title="Notifications"
      >
        🔔
        {unreadCount > 0 && (
          <span className={styles.badge}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* ── Notification Panel ── */}
      {showPanel && (
        <div className={styles.panel}>

          {/* Header */}
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>🔔 Notifications</span>
            {unreadCount > 0 && (
              <span className={styles.newBadge}>{unreadCount} new</span>
            )}
          </div>

          {/* List */}
          <div className={styles.list}>
            {notifications.length === 0 ? (
              <div className={styles.empty}>
                <div className={styles.emptyIcon}>📭</div>
                <p>No notifications yet</p>
                <span>Admin will send updates here</span>
              </div>
            ) : (
              notifications.map((n) => {
                const readIds = JSON.parse(
                  localStorage.getItem("read_notifs") || "[]"
                );
                const isRead = readIds.includes(n._id);
                return (
                  <div
                    key={n._id}
                    className={`${styles.notifItem} ${!isRead ? styles.unread : ''}`}
                  >
                    {/* Icon */}
                    <div className={`${styles.notifIcon} ${styles[`icon_${n.type}`]}`}>
                      {TYPE_EMOJI[n.type] || '📢'}
                    </div>

                    {/* Content */}
                    <div className={styles.notifContent}>
                      <div className={styles.notifTop}>
                        <span className={styles.notifTitle}>{n.title}</span>
                        {!isRead && <span className={styles.dot} />}
                      </div>
                      <p className={styles.notifMsg}>
                        {n.message?.slice(0, 90)}
                        {n.message?.length > 90 ? '…' : ''}
                      </p>
                      <span className={styles.notifTime}>
                        {timeAgo(n.createdAt)}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className={styles.panelFooter}>
              <button
                className={styles.markReadBtn}
                onClick={markAllRead}
              >
                ✓ Mark all as read
              </button>
            </div>
          )}

        </div>
      )}
    </div>
  );
}