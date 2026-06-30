import { useState } from "react";

const REPORTS = [
  { id: "students", title: "Student report", desc: "Enrollment by course and intake year." },
  { id: "attendance", title: "Attendance report", desc: "Daily and monthly attendance trends." },
  { id: "placement", title: "Placement report", desc: "Placement outcomes by department." },
];

function Reports() {
  const [message, setMessage] = useState(null);

  const generate = (report) => {
    // No backend endpoint exists for report generation yet - this is
    // intentionally honest about that rather than a dead button that does
    // nothing with no feedback.
    setMessage(`${report.title} generation isn't wired up to the backend yet.`);
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-eyebrow">Reporting</div>
        <h1>Reports</h1>
        <p>Generate operational reports across the platform.</p>
      </div>

      {message && <div className="state-banner info">{message}</div>}

      <div className="module-grid">
        {REPORTS.map((report) => (
          <div className="module-card" key={report.id}>
            <h3>{report.title}</h3>
            <p>{report.desc}</p>
            <div className="btn-row" style={{ marginTop: 12 }}>
              <button className="btn btn-secondary" onClick={() => generate(report)}>
                Generate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reports;
