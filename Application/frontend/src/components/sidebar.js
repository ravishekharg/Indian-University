import { Link } from "react-router-dom";

function Sidebar() {

  return (

    <div className="sidebar">

      <h2>University Portal</h2>

      <ul>

        <li>
          <Link to="/">Dashboard</Link>
        </li>

        <li>
          <Link to="/students">Students</Link>
        </li>

        <li>
          <Link to="/courses">Courses</Link>
        </li>

        <li>
          <Link to="/attendance">Attendance</Link>
        </li>

        <li>
          <Link to="/reports">Reports</Link>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;