import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import s from './AdminPanel.module.css';

const NAV = [
  { path: '/admin',               icon: '📊', label: 'Dashboard',        section: 'Main' },
  { path: '/admin/notifications', icon: '🔔', label: 'Notifications',    section: 'Main' },
  { path: '/admin/users',         icon: '👥', label: 'Manage Users',     section: 'Main' },
  { path: '/admin/attendance',    icon: '📅', label: 'Attendance',       section: 'Analytics' },
  { path: '/admin/analytics',     icon: '📈', label: 'Feature Analytics',section: 'Analytics' },
  { path: '/admin/feedback',      icon: '💬', label: 'Feedback',         section: 'Analytics' },
];

const PAGE_META = {
  '/admin':               { title: 'Dashboard',         sub: 'Welcome back, Admin 👋' },
  '/admin/notifications': { title: 'Notifications',     sub: 'Send alerts to students' },
  '/admin/users':         { title: 'Manage Users',      sub: 'Block, unblock & monitor students' },
  '/admin/attendance':    { title: 'Attendance',        sub: 'Student visit records & analysis' },
  '/admin/analytics':     { title: 'Feature Analytics', sub: 'Which features students use the most' },
  '/admin/feedback':      { title: 'Feedback Analysis', sub: 'Student feedback & sentiment' },
};

export default function AdminLayout() {
  const navigate        = useNavigate();
  const location        = useLocation();
  const user            = JSON.parse(localStorage.getItem('pm_admin_user') || '{}');
  const [sideOpen, setSideOpen] = useState(false);
  const [toast,    setToast]    = useState(null);

  const meta = PAGE_META[location.pathname] || { title: 'Admin', sub: '' };

  const showToast = (msg, type = 's') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('pm_admin_token');
    localStorage.removeItem('pm_admin_user');
    navigate('/admin/login');
  };

  const closeSidebar = () => setSideOpen(false);

  return (
    <div className={s.layout}>

      {/* ── MOBILE OVERLAY ── */}
      {sideOpen && (
        <div className={s.overlay} onClick={closeSidebar} />
      )}

      {/* ══════════════ SIDEBAR ══════════════ */}
      <aside className={`${s.sidebar} ${sideOpen ? s.sidebarOpen : ''}`}>

        <div className={s.sbLogo}>
          <div className={s.sbLogoIcon}>🎯</div>
          <div>
            <div className={s.sbLogoText}>
              Placement<span>Mantra</span>
            </div>
            <div className={s.sbLogoSub}>Admin Panel</div>
          </div>
          {/* Mobile close button */}
          <button className={s.closeBtn} onClick={closeSidebar}>✕</button>
        </div>

        <nav className={s.sbNav}>
          {['Main', 'Analytics'].map(section => (
            <div key={section}>
              <span className={s.sbLabel}>{section}</span>
              {NAV.filter(n => n.section === section).map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/admin'}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `${s.sbItem} ${isActive ? s.sbItemActive : ''}`
                  }
                >
                  <span className={s.sbIcon}>{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className={s.sbFooter}>
          <div className={s.avatar}>
            {user?.name?.[0] || 'A'}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontSize: '.84rem', fontWeight: 500,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
            }}>
              {user?.name || 'Admin'}
            </div>
            <div style={{ fontSize: '.68rem', color: 'var(--muted)' }}>
              Super Admin
            </div>
          </div>
          <button className={s.logoutBtn} onClick={handleLogout} title="Logout">
            🚪
          </button>
        </div>

      </aside>

      {/* ══════════════ MAIN ══════════════ */}
      <div className={s.main}>

        {/* ── TOPBAR ── */}
        <header className={s.topbar}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>

            {/* Hamburger — mobile only */}
            <button
              className={s.hamburger}
              onClick={() => setSideOpen(true)}
              title="Open Menu"
            >
              ☰
            </button>

            <div>
              <div className={s.topbarTitle}>{meta.title}</div>
              <div className={s.topbarSub}>{meta.sub}</div>
            </div>
          </div>
        </header>

        {/* ── PAGE CONTENT ── */}
        <div className={s.page}>
          <Outlet context={{ showToast }} />
        </div>

      </div>

      {/* ══════════════ TOAST ══════════════ */}
      {toast && (
        <div className={s.toastWrap}>
          <div className={`${s.toast} ${
            toast.type === 's' ? s.toastS :
            toast.type === 'e' ? s.toastE :
            s.toastI
          }`}>
            {toast.msg}
          </div>
        </div>
      )}

    </div>
  );
}