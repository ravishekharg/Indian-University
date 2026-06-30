import { useEffect, useState } from "react";
import api from "../services/api";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/courses")
      .then((response) => setCourses(response.data))
      .catch(() => setError("Couldn't load the course catalog. Try refreshing the page."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="page-header">
        <div className="page-eyebrow">Course Catalog</div>
        <h1>Courses</h1>
        <p>Active courses offered this term.</p>
      </div>

      {loading && <div className="state-banner info">Loading courses…</div>}
      {error && <div className="state-banner error">{error}</div>}

      {!loading && !error && courses.length === 0 && (
        <div className="state-banner empty">No courses have been added yet.</div>
      )}

      {!loading && !error && courses.length > 0 && (
        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Duration</th>
                <th>Fees</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.course_name}</td>
                  <td>{course.duration}</td>
                  <td>₹{course.fees.toLocaleString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Courses;
