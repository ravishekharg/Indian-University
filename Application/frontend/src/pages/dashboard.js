import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const MODULES = [
  { to: "/students", title: "Students", desc: "Search and review enrolled student records." },
  { to: "/courses", title: "Courses", desc: "Browse the active course catalog and fees." },
  { to: "/attendance", title: "Attendance", desc: "Mark and review today's attendance." },
  { to: "/reports", title: "Reports", desc: "Generate student, attendance, and placement reports." },
];

function todayLabel() {
  return new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    Promise.allSettled([api.get("/dashboard"), api.get("/attendance/summary")])
      .then(([dashboardResult, attendanceResult]) => {
        if (cancelled) return;

        if (dashboardResult.status === "rejected") {
          setError("Couldn't load today's overview. Try refreshing the page.");
          setLoading(false);
          return;
        }

        setStats({
          students: dashboardResult.value.data.students,
          courses: dashboardResult.value.data.courses,
          presentToday:
            attendanceResult.status === "fulfilled"
              ? attendanceResult.value.data.present
              : null,
        });
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <div className="page-header">
        <div className="page-eyebrow">{todayLabel()}</div>
        <h1>Welcome back</h1>
        <p>Here's where things stand across the platform today.</p>
      </div>

      {loading && <div className="state-banner info">Loading today's overview…</div>}
      {error && <div className="state-banner error">{error}</div>}

      {stats && (
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-label">Students enrolled</div>
            <div className="stat-value">{stats.students ?? "—"}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Active courses</div>
            <div className="stat-value">{stats.courses ?? "—"}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Present today</div>
            <div className="stat-value accent">
              {stats.presentToday ?? "—"}
            </div>
          </div>
        </div>
      )}

      <h2>Modules</h2>
      <div className="module-grid">
        {MODULES.map((mod) => (
          <Link key={mod.to} className="module-card" to={mod.to}>
            <h3>{mod.title}</h3>
            <p>{mod.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
