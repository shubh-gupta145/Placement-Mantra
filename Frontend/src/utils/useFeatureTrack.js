import { useEffect } from 'react';

const useFeatureTrack = (featureName) => {
  useEffect(() => {
    const token = localStorage.getItem("pm_admin_token");
    if (!token) return;

    // ── Admin ka visit track mat karo ──
    const adminUser = localStorage.getItem("pm_admin_user");
    if (adminUser) {
      const user = JSON.parse(adminUser);
      if (user?.role === 'admin') return; // Admin hai toh skip karo
    }

    const startTime = Date.now();

    // Feature visit record karo
    fetch("${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/analytics/track-feature", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        feature: featureName,
        duration: 0
      })
    }).catch(err => console.log("Track error:", err));

    // Page chhodne pe duration save karo
    return () => {
      const duration = Math.round((Date.now() - startTime) / 1000);
      if (duration < 2) return;

      fetch("${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/analytics/track-feature", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          feature: featureName,
          duration
        })
      }).catch(err => console.log("Track error:", err));
    };
  }, [featureName]);
};

export default useFeatureTrack;