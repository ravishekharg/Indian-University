import { useEffect, useState } from "react";
import api from "../services/api";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/students")
      .then((response) => setStudents(response.data))
      .catch(() => setError("Couldn't load the student list. Try refreshing the page."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="page-header">
        <div className="page-eyebrow">Student Records</div>
        <h1>Students</h1>
        <p>All currently enrolled students.</p>
      </div>

      {loading && <div className="state-banner info">Loading students…</div>}
      {error && <div className="state-banner error">{error}</div>}

      {!loading && !error && students.length === 0 && (
        <div className="state-banner empty">No students enrolled yet.</div>
      )}

      {!loading && !error && students.length > 0 && (
        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.first_name}</td>
                  <td>{student.last_name}</td>
                  <td>{student.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Students;
