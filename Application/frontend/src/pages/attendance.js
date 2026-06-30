import { useEffect, useState } from "react";
import api from "../services/api";

const STATUSES = ["Present", "Absent", "Late", "Excused"];

function Attendance() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [studentId, setStudentId] = useState("");
  const [status, setStatus] = useState("Present");
  const [submitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState(null);

  const loadSummary = () => {
    setLoading(true);
    // Previously this called GET /attendance, but the backend only ever
    // exposed POST /attendance - every page load 405'd. Fixed to call the
    // dedicated summary endpoint instead.
    api
      .get("/attendance/summary")
      .then((response) => setSummary(response.data))
      .catch(() => setError("Couldn't load today's attendance summary."))
      .finally(() => setLoading(false));
  };

  useEffect(loadSummary, []);

  const submit = async (e) => {
    e.preventDefault();
    setFormMessage(null);

    const id = parseInt(studentId, 10);
    if (!Number.isInteger(id)) {
      setFormMessage({ type: "error", text: "Enter a numeric student ID." });
      return;
    }

    setSubmitting(true);
    try {
      await api.post("/attendance", { student_id: id, status });
      setFormMessage({ type: "success", text: `Marked student ${id} as ${status}.` });
      setStudentId("");
      loadSummary();
    } catch (err) {
      setFormMessage({
        type: "error",
        text: err.response?.data?.error || "Couldn't record attendance.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-eyebrow">Today</div>
        <h1>Attendance</h1>
        <p>Mark attendance and review today's totals.</p>
      </div>

      {loading && <div className="state-banner info">Loading today's summary…</div>}
      {error && <div className="state-banner error">{error}</div>}

      {summary && (
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-label">Present</div>
            <div className="stat-value accent">{summary.present}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Absent</div>
            <div className="stat-value">{summary.absent}</div>
          </div>
        </div>
      )}

      <h2>Mark attendance</h2>

      {formMessage && (
        <div className={`state-banner ${formMessage.type === "error" ? "error" : "info"}`}>
          {formMessage.text}
        </div>
      )}

      <form onSubmit={submit} style={{ maxWidth: 320 }}>
        <div className="field">
          <label htmlFor="studentId">Student ID</label>
          <input
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="e.g. 101"
            inputMode="numeric"
          />
        </div>

        <div className="field">
          <label htmlFor="status">Status</label>
          <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? "Recording…" : "Record attendance"}
        </button>
      </form>
    </div>
  );
}

export default Attendance;
